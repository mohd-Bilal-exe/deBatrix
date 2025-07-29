"use client";
import { motion } from "motion/react"

export default function MainText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col justify-center items-start px-4 py-12 pl-12 w-screen h-full"
    >
      <h2 className="font-light text-white text-4xl md:text-5xl text-start tracking-tight">
        One Arena.
      </h2>
      <p className="mt-4 max-w-[25%] font-thin text-gray-300 text-normal text-lg text-start">
        Two Minds. Many Moods. Endless Arguments.
      </p>
    </motion.div>
  );
}
