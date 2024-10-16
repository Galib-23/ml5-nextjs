"use client";
import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

const ObjectDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      await tf.setBackend("webgl"); // Set TensorFlow.js backend to WebGL for faster performance
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      setLoading(false);
    };
    loadModel();
  }, []);

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsDetecting(true);
            detectObjects(); // Start detection once the video is ready
          };
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
    }
  };

  const detectObjects = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && model && video.readyState === 4) { // Ensure video is fully loaded
      const predictions = await model.detect(video);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      predictions.forEach((prediction) => {
        const { bbox, class: label, score } = prediction;
        const [x, y, width, height] = bbox;

        context.strokeStyle = "green";
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);
        context.fillStyle = "green";
        context.font = "16px Arial";
        context.fillText(`${label} (${(score * 100).toFixed(2)}%)`, x, y > 10 ? y - 5 : 10);
      });

      requestAnimationFrame(detectObjects);
    }
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 mt-5">
      <h1 className="text-2xl md:text-4xl font-semibold mt-3 text-purple-400 z-10 text-center mx-1 mb-8">
        Object Detection
      </h1>
      <button
        className="bg-purple-400 hover:bg-purple-500 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-300 shadow-md mb-4"
        onClick={!isDetecting ? startVideo : stopDetection}
      >
        {!isDetecting ? "Start Camera" : "Stop Detection"}
      </button>
      <div className="relative">
        <video
          ref={videoRef}
          width={640}
          height={480}
          className="border border-cyan-600"
          autoPlay
          muted
          style={{ display: isDetecting ? "block" : "none" }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute top-0 left-0"
        />
      </div>
      {loading && (
        <p className="text-lg text-purple-600 mt-4">Loading model...</p>
      )}
    </div>
  );
};

export default ObjectDetection;
