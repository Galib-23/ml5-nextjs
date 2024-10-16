import HomePageCard from "@/components/HomePageCard";
import React from "react";
import { CiImageOn } from "react-icons/ci";
import { LiaObjectUngroupSolid } from "react-icons/lia";
import { MdOutlineAudiotrack } from "react-icons/md";
import { IoMdBody } from "react-icons/io";
import HomeIcon from "@/components/icons/HomeIcon";

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center relative bg-[url("/images/homebg.jpg")] bg-cover bg-center'>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <HomeIcon />
      <h1 className="text-2xl md:text-4xl font-semibold mt-4 text-purple-400 z-10 text-center mx-1">
        WELCOME TO ML5 WITH NEXT.JS
      </h1>
      <p className="text-base text-center mt-2 text-cyan-200 z-10 mx-1">
        providing guidance on integrating machine learning into web development
        using the popular <br /> React-based framework, Next.js
      </p>
      <div className="z-40 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 mt-10 md:mt-16">
        <HomePageCard
          color="bg-yellow-500"
          link="/image-classify"
          CardIcon={CiImageOn}
          title="Image Classification"
        />
        <HomePageCard
          color="bg-cyan-500"
          link="/object-detection"
          CardIcon={LiaObjectUngroupSolid}
          title="Object Detection"
        />
        <HomePageCard
          color="bg-red-500"
          link="/image-classify"
          CardIcon={MdOutlineAudiotrack}
          title="Audio Classification"
        />
        <HomePageCard
          color="bg-teal-500"
          link="/image-classify"
          CardIcon={IoMdBody}
          title="Pose Classification"
        />
      </div>
    </div>
  );
};

export default Home;
