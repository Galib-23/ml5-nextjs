"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


const ImageClassify = () => {
  const [image, setImage] = useState(null);
  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  useEffect(() => {
    const loadModel = async () => {
      const ml5 = await import("ml5");
      const loadedClassifier = await ml5.imageClassifier("MobileNet");
      setClassifier(loadedClassifier);
    }
    loadModel();
  }, []);

  const classifyImage = () => {
    if (image && classifier) {
      const imgElement = document.getElementById('uploaded-image');
      classifier.classify(imgElement, (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        setResult(results[0]);
      })
      console.log(result)
    }
  }

  return (
    <div>
      <h1>Image classify</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {
        image && (
          <div>
            <Image src={image} alt="uploaded" id="uploaded-image" width={300} height={300} />
            <button onClick={classifyImage}>Classify Image</button>
          </div>
        )
      }
      {
        result && (
          <div>
            <h2>Result: </h2>

          </div>
        )
      }
    </div>
  )
}

export default ImageClassify