"use client"
import React from "react";

interface TitleHeaderProps {
  title: string;
  sub: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, sub }) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
        {title}
      </h2>
      <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        {sub}
      </p>
    </div>
  );
};

export default TitleHeader;
