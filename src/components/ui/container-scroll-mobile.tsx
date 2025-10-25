"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

interface ContainerScrollMobileProps {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScrollMobile: React.FC<ContainerScrollMobileProps> = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth <= 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Softer, smoother motion for mobile devices
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center relative px-3 py-10 bg-gray-50"
    >
      <div
        className="w-full max-w-md mx-auto relative"
        style={{ perspective: "800px" }}
      >
        <HeaderMobile translate={translate}>{titleComponent}</HeaderMobile>
        <CardMobile rotate={rotate} scale={scale}>
          {children}
        </CardMobile>
      </div>
    </div>
  );
};

interface HeaderMobileProps {
  translate: MotionValue<number>;
  children?: React.ReactNode;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({ translate, children }) => (
  <motion.div
    style={{ translateY: translate }}
    className="text-center mb-6 text-sm font-medium text-gray-700"
  >
    {children}
  </motion.div>
);

interface CardMobileProps {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}

const CardMobile: React.FC<CardMobileProps> = ({ rotate, scale, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000002d, 0 6px 12px #00000024, 0 20px 20px #0000001a",
    }}
    className="w-full rounded-2xl border border-gray-300 bg-[#222] p-2 shadow-xl"
  >
    <div className="w-full h-auto overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900">
      {children}
    </div>
  </motion.div>
);
