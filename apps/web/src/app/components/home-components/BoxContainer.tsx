"use client";
import { motion } from "framer-motion";
import { BoxingGloveIcon, Brain, GraduationCapIcon, MaskHappyIcon } from "@phosphor-icons/react";
export default function BoxContainer() {
  const boxes = [
  {
    id: 1,
    icon: <Brain size={32} className="text-pink-300" />,
    title: "What Is Debatrix?",
    subtitle: "The Arena",
    content1: "Two AI minds. One topic. You choose the mood.",
    subContent: "Debatrix lets you generate real-time AI debates with custom tone, depth, and chaos level.",
    pos: "top-20 left-1/4 z-50",
    bgColor: "bg-bgDark",
    shadowColor: "bg-pink-300",
    shadowColor2: "bg-pink-500",
    shadowColor3: "bg-pink-700",
    boxSize: "w-[26rem]  h-auto",
    titleSize: "text-xl",
    subtitleSize: "text-base",
    contentSize: "text-sm",
    subContentSize: "text-xs",
  },
  {
    id: 2,
    icon:<MaskHappyIcon size={32} className="text-yellow-300" />,
    title: "Set the Mood",
    subtitle: "Control the chaos.",
    content1: "Tune tone sliders, word aggression, and logic depth.",
    subContent: "From chill to unhinged, pick how wild you want it.",
    pos: "bottom-36 left-24",
    bgColor: "bg-bgDark",
    shadowColor: "bg-yellow-300",
    shadowColor2: "bg-yellow-500",
    shadowColor3: "bg-yellow-700",
    boxSize: "w-80 h-auto",
    titleSize: "text-lg",
    subtitleSize: "text-sm",
    contentSize: "text-xs",
    subContentSize: "text-xs",
  },
  {
    id: 3,
    title: "Why Use It?",
    icon:<GraduationCapIcon size={32} className="text-green-300" />,
    subtitle: "Fun, research, chaos.",
    content1: "It’s educational, entertaining, and a little wild.",
    subContent: "Use it to study, play, or meme your way through debates.",
    pos: "top-52 right-24",
    bgColor: "bg-bgDark",
    shadowColor: "bg-green-300",
    shadowColor2: "bg-green-500",
    shadowColor3: "bg-green-700",
    boxSize: "w-80 h-auto",
    titleSize: "text-xl ",
    subtitleSize: "text-xs font-outfit",
    contentSize: "text-xxs font-outfit",
    subContentSize: "text-xxs font-outfit",
  },
  {
    id: 4,
    title: "Let 'Em Fight",
    icon:<BoxingGloveIcon size={32} className="text-blue-300" />,
    subtitle: "Live Debate Mode",
    content1: "Watch it unfold in real-time.",
    subContent: "Your screen becomes a chaotic battlefield of words.",
    pos: "bottom-18 right-1/4",
    bgColor: "bg-bgDark",
    shadowColor: "bg-blue-300",
    shadowColor2: "bg-blue-500",
    shadowColor3: "bg-blue-700",
    boxSize: "w-80 h-auto",
    titleSize: "text-xl",
    subtitleSize: "text-sm",
    contentSize: "text-sm",
    subContentSize: "text-xs",
  },
];


  return (
    <div className="top-0 right-0 z-40 fixed w-full lg:w-4/5 xl:w-3/4 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {boxes.map((box) => (
          <FloatingBox
            key={box.id}
            title={box.title}
            subtitle={box.subtitle}
            content={box.content1}
            subContent={box.subContent}
            pos={box.pos}
            bgColor={box.bgColor}
            shadowColor={box.shadowColor}
            shadowColor2={box.shadowColor2}
            shadowColor3={box.shadowColor3}
            boxSize={box.boxSize}
            titleSize={box.titleSize}
            subtitleSize={box.subtitleSize}
            contentSize={box.contentSize}
            subContentSize={box.subContentSize}
          icon={box.icon} // Pass the icon prop if needed
          />
        ))}
      </div>
    </div>
  );
}

type BoxProps = {
  title: string;
  subtitle?: string;
  content?: string;
  subContent?: string;
  pos: string;
  bgColor: string;
  shadowColor: string;
  shadowColor2: string;
  shadowColor3: string;
  boxSize: string;
  titleSize: string;
  subtitleSize: string;
  contentSize: string;
  subContentSize: string;
  icon?: React.ReactNode; // Optional icon prop
};

function FloatingBox({
  title,
  subtitle,
  content,
  subContent,
  pos,
  bgColor,
  shadowColor,shadowColor2,shadowColor3,
  boxSize,
  titleSize,
  subtitleSize,
  contentSize,
  subContentSize,
  icon = null, // Optional icon prop
}: BoxProps) {
  return (
    <div className={`absolute ${pos} z-10 group pointer-events-auto hover:z-50`}>
      {/* Shadow Layer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        className={`absolute inset-0 translate-x-5 translate-y-5 rounded-md group-hover:translate-x-0 group-hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${shadowColor3} -z-10 `}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.1
        }}
        className={`absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-md group-hover:translate-x-0 group-hover:translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${shadowColor2} -z-10`}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.2
        }}
        className={`absolute inset-0 translate-x-2 translate-y-2 rounded-md group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${shadowColor} -z-10`}
      />
    
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.3
        }}
        className={`p-6 ${boxSize} ${bgColor} rounded-md text-white border border-white/10 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:translate-y-0 group-hover:translate-x-0 translate-x-1 translate-y-1 hover:shadow-lg relative z-20`}
      >
        <h2 className={`font-medium tracking-tight flex items-center gap-2 font-dm-serif-display ${titleSize}`}>{icon&&icon} {title}</h2>
        {subtitle && <p className={`mt-1 opacity-70 font-outfit ${subtitleSize}`}>{subtitle}</p>}
        {content && <p className={`mt-3 opacity-80 font-outfit ${contentSize}`}>{content}</p>}
        {subContent && <p className={`mt-1 opacity-50 font-outfit ${subContentSize}`}>{subContent}</p>}
      </motion.div>
    </div>
  );
}

