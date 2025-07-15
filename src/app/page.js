"use client";

import { useState } from "react";
import Header from "./components/Header";
import MaxWidthWrapper from "./components/MaxWidthWrapper";


export default function Home() {
  const [imageHovered, setImageHovered] = useState(false);
  return (
    <>

      <div className="bg-background-light">
        <Header />
      
          <MaxWidthWrapper>
            <div className="flex justify-start mt-8 sm:mt-12 lg:mt-16">  {/* Outer div that is a flex box so text acts as a single line of text when window shrinks + is centered as well */}
              <h1 className="text-7xl text-center text-black"> {/* Makes it so when text is shrunk, its paragraph alignment is center */}
                <span className="font-bold font-dm-sans">Who is </span>
                <span className="font-italiana">AIDAN CHIEN </span>
                <span className="font-bold font-dm-sans">?</span>
              </h1>
            </div>

            {/* image and blurb div */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
              <img src="/About image.png" 
                  alt="A photo of Aidan Chien" 
                  width={400} 
                  height={400} />

              <div className="text-left">
                <h2 className="text-4xl font-bold text-black">Welcome!</h2>
                <p className="mt-4 text-lg text-gray-800">
                  I'm Aidan, a software engineer specializing in front-end development with React and Next.js. I focus on creating performant, accessible, and user-friendly applications.
                </p>
              </div>
            </div>

          </MaxWidthWrapper>
        
      </div>
    </>
  );
}
