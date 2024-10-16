# Next.js With TensorFlow.js & ml5.js 🛸

### Why Use JavaScript for Machine Learning? 🤔
> Machine learning (ML) has traditionally been dominated by languages like Python, but JavaScript offers unique advantages that make it a great option for specific use cases:
- __Accessibility:__ JavaScript runs in the browser, making ML models available to a large audience without the need to install specialized software.
- __Cross-Platform Support:__ JavaScript allows you to create machine learning models that can run on different platforms, including mobile and desktop browsers.
- __Real-Time Interaction:__ With JavaScript, you can create web applications that use ML models to provide instant feedback, making it perfect for interactive AI applications.

<br>
<br>

<img src="public/readme-icons/tf.svg" height="40">

### TensorFlow.js: Bringing the Power of Machine Learning to JavaScript 💪
> ***TensorFlow.js*** is an open-source library that allows to develop, train, and run machine learning models directly in the browser or on Node.js. It is a part of the TensorFlow ecosystem and provides many of the powerful features available in Python's TensorFlow, but adapted for JavaScript. Using TensorFlow.js, developers can easily integrate machine learning models into their web applications, opening up possibilities for real-time data analysis, image and speech recognition, and even AI-powered interactive experiences.

<br>
<br>

<img src="public/readme-icons/ml5.jpg" height="80">

### ml5.js: Simplifying Machine Learning for Web Developers. 😋
> ***ml5.js*** is a user-friendly JavaScript library ***built on top of TensorFlow.js***. It aims to make machine learning more approachable for creative developers, artists, and beginners. By providing easy-to-use functions and abstractions, ml5.js brings the power of machine learning to a wider audience without requiring a deep understanding of complex algorithms.

<br>
<br>

## Getting started with machine learning with React/Next.js 🚀.
<br>

**1. Create a react/next project. We will go with nextjs, if you want to use react you can still follow along. 🧑‍💻**
```bash
npx create-next-app@latest
```

> ⚠️
>***_NOTE:_**  In this project we are using Javascript and not Typescript. We are also using the Next.js `App Router` with no `src` directory.*

<br>
<br>

**2. Let's try to install ml5.js and pray to not get any errors🤲:**
```bash
npm install ml5
```
> ⚠️
>  **Here you may encounter dependency conflicts**

*Now worries. Just follow along.*
- Install the following dependencies:
```bash
npm install @tensorflow/tfjs@^3.12.0
npm install @tensorflow/tfjs-backend-webgl@^3.12.0
npm install @tensorflow/tfjs-converter@^3.12.0
```
- Install the `patch-package`:
```bash
npm install patch-package --save-dev
```

- Use `--legacy-peer-deps` Flag for installing ml5:
```bash
npm install ml5 --legacy-peer-deps
```

<br>

🥳**Congrats! we are half done almost**

> **But if you are still getting errors take help from ChatGpt🤖**

<br>
<br>
<br>


### 🟢 So, Firstly we will work with image classification using _ml5.js_ library and the _MobileNet_ model 🤖:

>So, ___MobileNet___ is a family of deep learning models designed for efficient image classification and computer vision tasks on mobile and edge devices. Developed by researchers at Google, ___MobileNet___ models are optimized to run on devices with limited computational power, such as smartphones, tablets, and embedded systems, without compromising much on performance.

### Keywords:
🔵  ___Ml5:___ It's a library that will help us to integrate Machine Learning models to our javascript project.

🔵 ___MobileNet:___ It's a free pre-trained model *(deployed on some server)* that we will use for image classification.

🔵 ___Classifier:___ A classifier is an object that conains functions that allows us to classify data, such as images, sounds, or text.

<br>

### STEPS:

- Create a React component with a file input field for image upload.

- Set the states for image and classifier:

```javascript
  const [image, setImage] = useState(null);
  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState(null);
```
>`classifier` is nothing but an instance of the model which contains desired functions for image classification. You will understand shortly.

- Load the model and get the classifier object ⬇️

```javascript
  useEffect(() => {
    const loadModel = async () => {
      const ml5 = await import("ml5");
      const loadedClassifier = await ml5.imageClassifier("MobileNet");
      setClassifier(loadedClassifier);
    };
    loadModel();
  }, []);
```
> ⚠️
>  *To avoid Hydration errors in Next.js we are dynamically importing `ml5`. But if you are using react you can use the default module import on the top of the page like below:*
```javascript
  import ml5 from "ml5";
```

> __Explanantion of the above code snippet ✅__
> - We are running useEffect to load the model on the initial render
> - Then We are importing the ml5 library.
> - we are loading the imageClassifier object from the ***MobileNet*** model.
> - `ml5.imageClassifier()` takes a string URL as argument(The location of the model)
> - Here "MobileNet" actually gives the location of the server where the model is deployed.
> - Example with other model:
> ```javascript
> const modelUrl = "https://custommodelurl.com/m/model.json"
> const loadedClassifier = await ml5.imageClassifier(modelUrl);
> ```
> - In case of **MobileNet** we don't need to explicitly define the url. It automatically identifies.
>

<br>
<br>
<br>

**After the classifier object is loaded let's define the classify function:**

- So basically the classify function is defined within the classifier object.
- It takse two arguments.
  1. The imageElement that we want to classify
  2. A callback that return the error or result.
  ```javascript
    classifier.classify(imgElement, (results, error) => {
      //
    })
  ```

- The returned result is a sorted array of objects with the label of the predicted image and the confidence (The array is sorted on basis of confidence score):

- ```json
  results: [
    {
      "label": "Cat",
      "confidence": .9533
    },
    {
      "label": "Dog",
      "confidence": .2533
    },
    {
      "label": "Cow",
      "confidence": .00933
    },
  ]
  ```

- So basically our desired result lies on `results[0]`.

- Here's an example code:

```javascript
  const classifyImage = () => {
    if (image && classifier) {

      const imgElement = document.getElementById("uploaded-image");

      classifier.classify(imgElement, (results, error) => {
        if (error) {
          return;
        }
        setResult(results[0]);
      });
    }
  };
```