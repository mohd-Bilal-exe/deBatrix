import { useEffect, useState } from "react";
import { formatWord, getClassForStyle, tokenizeMarkdownText } from "../helpers/WordStyling";
import { motion } from "framer-motion";
export default function ChatBox({chatMessage, role}:{chatMessage: string, role: string}){
  
   return(
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-indigo-700/50 p-2 rounded-lg max-w-lg text-pretty ${role === "for" ? "self-end" : "self-start"}`}
  >
    <ChatWords message={chatMessage} />
  </motion.div>
   )
    
}

const ChatWords=({message}:{message: string})=>{ 
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
        const styleClass = getClassForStyle(word);
       return <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className={`inline-block line-clamp-2 items-center ${styleClass}`}
              >
                {formatted}
              </motion.span>
    }))
}