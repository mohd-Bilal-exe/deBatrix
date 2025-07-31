"use client";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function Header() {
  const colorBand=["bg-pink-400", "bg-green-400", "bg-yellow-400","bg-blue-400",];
  return (
    <header className="top-0 left-0 fixed flex justify-between items-center p-4 w-full h-[10%] text-white">
      <div className="font-thin text-lg tracking-wider">Debatrix</div>
      <div className="group overflow-hidden font-clash-grotesk text-2xl tracking-wider">
        <div className="group px-3 py-2 text-xs tracking-wide">
          <Link href="/debate">Wanna try? <ArrowRightIcon size={16} className="inline transition-transform group-hover:translate-x-1 duration-200 ease-in-out" /></Link></div>
      <div className="flex justify-between items-center w-[200%] h-0.5 transition-all -translate-x-1/2 group-hover:translate-x-[0%] duration-500 ease-in-out">
        <div className="flex w-1/2 h-0.5">
        {colorBand.map((color, index) => (
          <div key={index} className={`w-1/4 h-full ${color}`}></div>
        ))}
        </div>
        <div className="bg-offWhite w-1/2 h-0.5"/>
      </div> 
      </div>
      
    </header>
  );
}