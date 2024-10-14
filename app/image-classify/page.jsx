"use client";
import ImageClassifyIcon from "@/components/icons/ImageClassifyIcon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";

const ImageClassify = () => {
  const [image, setImage] = useState(null);
  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      const ml5 = await import("ml5");
      const loadedClassifier = await ml5.imageClassifier("MobileNet");
      setClassifier(loadedClassifier);
    };
    loadModel();
  }, []);

  const classifyImage = () => {
    setLoading(true);
    if (image && classifier) {
      const imgElement = document.getElementById("uploaded-image");
      classifier.classify(imgElement, (results, error) => {
        if (error) {
          console.log("error: ", error);
          setLoading(false);
          return;
        }
        setResult(results[0]);
      });
    }
    setLoading(false);
  };

  //checking vowel or consonent in the label string
  let article;
  if (result) {
    const label = result.label.toLowerCase();
    article = /^[aeiou]/.test(label) ? "an" : "a";
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mt-5">
      <div className="flex flex-col items-center">
        <ImageClassifyIcon />
        <h1 className="text-2xl md:text-4xl font-semibold mt-3 text-purple-400 z-10 text-center mx-1 mb-8">
          Classify Image
        </h1>
        <input
          className="flex h-14 w-fit rounded-md bg-slate-300 hover:bg-slate-400 border-input px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 file:bg-slate-500 file:rounded-md file:mr-2 file:p-1 file:text-gray-200 cursor-pointer file:cursor-pointer file:border-gray-900 file:border"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <div className="mt-3 border border-cyan-600 flex flex-col items-center rounded-lg pb-3 relative">
          <div
            onClick={() => {
              setImage(null);
              setResult(null);
            }}
            className="absolute -top-1 -right-1 bg-rose-500 p-1 rounded-full hover:scale-105 cursor-pointer transition"
          >
            <CiTrash className="text-black text-lg" />
          </div>
          <Image
            src={image}
            alt="uploaded"
            className="rounded-t-lg object-contain"
            id="uploaded-image"
            width={300}
            height={300}
          />
          {loading ? (
            <button className="mt-5 bg-purple-400 hover:bg-purple-500 px-3 py-2 rounded-xl mb-2 text-gray-700 hover:text-gray-300 shadow-md">
              Classifying..
            </button>
          ) : (
            <button
              className="mt-5 bg-purple-400 hover:bg-purple-500 px-3 py-2 rounded-xl mb-2 text-gray-700 hover:text-gray-300 shadow-md"
              onClick={classifyImage}
            >
              Classify Image
            </button>
          )}
        </div>
      )}
      {result && (
        <div className="mt-4 border-l-2 border-purple-800 pl-2 py-1">
          <h2 className="text-black font-semibold text-lg">
            This is {article} {result.label}
          </h2>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Confidence: </span>
            {result.confidence.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageClassify;
