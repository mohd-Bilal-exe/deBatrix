"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CHATHISTORY, CHATPROPERTIES } from "../lib/typeDefinitions";
import { formatWord, getClassForStyle, tokenizeMarkdownText } from "./helpers/WordStyling";
import ChatBox from "./components/ChatBox";

const dummyMessage =
"Ach, this poetic lamentation merely reveals a fundamental misunderstanding of energy conservation! The 'heart' is not a well that dries up merely because another fails to sip from it. Such an analogy is profoundly flawed. Love, as I articulated, is an *internal generation*. The \"thirst\" you speak of, the \"banjar\" state, arises not from loving without return, but from the *irrational expectation* of it. It is your own clinging to a desired outcome that causes the suffering, not the pure, unadulterated act of loving itself. To cease loving because of another's deficiency is to cripple your own capacity. It is a ***logical fallacy.***"

export default function Debatepage() {
  const [topic, setTopic] = useState<string>(""); 
  const [history, setHistory] = useState<CHATHISTORY>(); 
  const [forChatProperties, setForChatProperties] = useState<CHATPROPERTIES>(); 
  const [againstChatProperties, setAgainstChatProperties] = useState<CHATPROPERTIES>(); 

  return (
    <div className="flex flex-col gap-[2px] bg-white p-4 w-screen">
      <ChatBox chatMessage={dummyMessage} role="for"/>
    </div>
  );
}
