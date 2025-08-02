import { useEffect, useState } from "react";
import { formatWord, getClassForStyle, tokenizeMarkdownText } from "../helpers/WordStyling";
import { motion } from "framer-motion";
export default function ChatBox({chatMessage, role}:{chatMessage: string, role: string}){
  const isPro = role === "against";
  const isCon = role === "for";

  const baseStyles = "text-white max-w-[90%] px-4 py-3 rounded-xl shadow-md whitespace-pre-wrap leading-relaxed tracking-wider text-sm font-light";

  const roleStyles = isPro
    ? " text-emerald-100 self-start"
    : isCon
    ? " text-rose-100 self-end"
    : "bg-neutral-700 text-white self-center";


   return(
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${baseStyles} ${roleStyles}`}
  >
    <ChatWords message={chatMessage} role={role} />
  </motion.div>
   )
    
}

const ChatWords=({message, role}:{message: string, role:string})=>{ 
const [visibleWords, setVisibleWords] = useState<string[]>([]);  
    const words = tokenizeMarkdownText(message);
    
      useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length-1) {
        setVisibleWords((prev) => [...prev, words[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 120); // Adjust speed here
    return () => clearInterval(interval);
  }, []);
  
    return (visibleWords.map((word, index) => {
        const formatted = formatWord(word);
        const styleClass = getClassForStyle(word, role);
       return word === "\n" ? (
              <br key={index+word} />
            ) : (
              <motion.span
                key={index+word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className={`inline-block line-clamp-2 items-center whitespace-pre-wrap ${styleClass}`}
              >
                {formatted}
              </motion.span>)
    }))
}