"use client";
// import React from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

export default  function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-gray-50">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black ">
              Unleash the power of <br />
              <span className="text-2xl md:text-[6rem] font-bold mt-1 leading-none">
                Cutting Edge Laser Technologies
              </span>
            </h1>
          </>
        }
      >
        

         <div className="w-full max-w-[1200px] mx-auto">
           <div className="relative" style={{ paddingTop: '56.25%' }}>
             <iframe
               src="https://www.youtube.com/embed/KR5fWm6JBds?si=hkbTwC-GrFP1lE8e"
               title="YouTube video player"
               className="absolute inset-0 w-full h-full"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               loading="lazy"
             />
           </div>
         </div>
      </ContainerScroll>
    </div>
  );
}
