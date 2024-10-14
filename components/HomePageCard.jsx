import Link from "next/link";
import React from "react";


const HomePageCard = ({ title, CardIcon, details, color, link }) => {
  return (
    <Link
      href={link}
      className={`h-28 w-56 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 ${color} hover:bg-opacity-55 p-4`}
    >
      <div className="flex flex-col h-full items-center justify-center text-gray-300">
        <CardIcon className="text-4xl" />
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default HomePageCard;
