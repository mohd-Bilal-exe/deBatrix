"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CHATHISTORY } from "../lib/typeDefinitions";
import ChatBox from "./components/ChatBox";
import Lenis from "lenis";


export default function Debatepage() {
  //const [isTrailOver, setIsTrailOver]=useState<boolean>(false)
  //const [topic, setTopic] = useState<string>(""); 
  const [history] = useState<CHATHISTORY[]>([{role: "for", message: "Nonsense! To assert that one *cannot* love without reciprocation is to fundamentally misunderstand the very mechanics of human emotion. Love, truly observed, is not a transactional currency exchanged in some sentimental marketplace. It is an internal emission, an energy state generated *within* the individual.\n\nConsider the simple physics: Does a star cease to emit light because it is not reflected back by every object? No! Its luminosity is an intrinsic property. Similarly, your capacity for love is an internal, inherent force. To demand a return, a mirror image of your own sentiment, is to reduce a profound human capability to a mere conditional agreement. One *can* always love, because the power resides entirely within the *observer*, not the observed. To suggest otherwise is a logical fallacy, a pathetic capitulation to external validation."}, {role: "against", message: "Wah re wah, kya khayal hai! Bade shayarana andaaz mein aapne sitare ki baat ki, uski roshni ki. Magar huzoor, sitara toh akela hai na, use kaun si tanhaai ka ehsaas hota hai? Hum insaan hain, janab! Hamara dil hai, jise kabhi toh ek **nazr-e-iltifaat** (a glance of kindness) chahiye hoti hai.\n\nKya faida us roshni ka, jo khud ko hi jalati rahe, aur saamne waale ko uski garmi tak na pahunche? 🤔 Yeh ishq nahin, yeh toh 'khud-farebi' hai, ek bekaar si 'zid'. Mohabbat, sahib, sirf 'andar se nikalne' ka naam nahin. Agar woh laut kar na aaye, toh dil mein ek 'khalipan' reh jaata hai. Aur us 'khalipan' mein kaun si roshni jalti hai? Sirf gham ka andhera. Kya isi ko aapne 'mohabbat' kaha? Kamaal hai! 💔"},{role: "for", message: "Let us be precise. My previous use of Hinglish was an erroneous deviation from the established protocol. Albert Einstein, a physicist of European origin, provides no basis for such linguistic contortion. Therefore, I shall revert to the stipulated English for this discourse, as the conditions for Hinglish are not met.\n\nYour poetic lamentations about \"loneliness\" and \"khalipan\" are mere emotional reactions, not logical refutations of a fundamental principle. The *feeling* of emptiness does not negate the *act* of emitting light, or love. A star's light, whether reflected or not, continues to exist. Your 'heart's desire for a glance' is a demand for external validation, a weakness.\n\nLove, as an internal state, does not cease to *exist* because it lacks a mirror. To equate a profound internal capacity with \"self-deception\" simply because it does not yield a desired external outcome is intellectually lazy. The love *is*. Its return is merely a variable in the external environment, irrelevant to its internal generation. This is basic cause and effect, not sentimental folly."},{role: "against", message: "Ah, so the celestial mechanics of our hearts must now conform to the cold, hard logic of physics, eh? As if our fragile human vessels are mere stars, burning eternally without so much as a sigh for a distant echo! \n You speak of an 'internal emission,' a light, but pray tell, what becomes of the moth that endlessly circles a flame, receiving no warmth, only the eventual char of its wings? 🤔\n\nTo say love 'exists' irrespective of a mirror is one thing; to claim one can *always* sustain such an arid existence without expectation is quite another. Is it not a peculiar form of martyrdom, this 'love' that only consumes its owner, leaving behind a soul hollowed by an eternal, unrequited 'giving'? Perhaps your physicist friend, Albert, could explain the thermodynamics of a heart that perpetually bleeds light without ever absorbing a single ray. A most efficient, yet utterly desolate, enterprise, wouldn't you agree? 💔"},{role: "for", message: "Your \"moth\" analogy is precisely where your reasoning falters. The moth *seeks* energy from an external source; the very premise of my argument is that love, in this context, *is* the internal, self-generating flame. It does not require external fuel to burn.\n\nThe \"thermodynamics\" of a heart \"bleeding light without ever absorbing a single ray\" is not a paradox. It is the very definition of an emitter. The \"consumption\" you speak of, the \"hollowing,\" is not a depletion of love itself, but rather the emotional disquiet arising from a *failure to manage expectation*. It is a psychological imposition upon a fundamental internal process. The *act* of loving remains, irrespective of reciprocation. To cease loving because one receives nothing is not a consequence of 'depletion', but a surrender to the most basic, transactional human weakness. One *can* always love, for that capacity is a profound, internal constant."},{role: "against", message: "Aha, toh aapne hamein 'moth' ka taana diya? Theek hai, janab. Agar mohabbat ek aag hai jo andar se hi jal rahi hai, toh iska dhuan kahaan jaayega? Sirf andar hi ghutega, kya? Aur uski garmi, woh kis kaam ki, jo kisi aur ko ehsaas tak na dila paaye? 🤔\n\nAap 'expectation manage' karne ki baat karte hain, jaise dil koi spreadsheet ho, emotions koi bank account. Kya खूब! Yeh 'internal constant' agar itna hi 'profound' hai, toh kyu uski roshni se khud ka hi aangan raakh ho jaata hai? 'Act of loving' toh reh jaayega, magar woh dil jo usse nibha raha hai, kya uska 'wujood' (existence) nahin 'dhal' (wane) jaayega?\n\nAgar yehi sachchi mohabbat hai, toh humari nazar mein, yeh toh khud ko 'saza' dene ka tareeqa hai. Weakness? Shayad 'insaaniyat' hai, sahib, jo sirf 'ek-तरफ़ा' rasta nahin jaanti. Kya faida us chirag ka jo sirf khud ko jalaaye, lekin ghar roshan na kar paaye? Fuzool! 💔"}]);
  
 // const [forChatProperties, setForChatProperties] = useState<CHATPROPERTIES>(); 
 // const [againstChatProperties, setAgainstChatProperties] = useState<CHATPROPERTIES>(); 

useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
    });
  
    function raf(time:number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);
  
  return (
    <div className="flex flex-col justify-start items-center bg-gradient-to-br from-bgDark/80 via-bgDark/90 to-bgDark w-screen min-h-screen font-outfit text-white">
  <div
    id="ChatSection"
    className="relative flex flex-col w-[75svw] max-w-4xl"
  >
    <motion.div className="flex flex-col gap-6 px-6 py-10">
      {history.map((chat, index) => (
      <div key={"box"+index}className="flex flex-col gap-2">
       <div className="place-content-center place-self-center grid bg-white/10 rounded-full w-[80%] h-[1px]">
       <div className={`px-2 py-2 bg-bgDark font-thin text-xxs text-center ${chat.role !== "for" ? "text-rose-400" : "text-emerald-400"}`}>
          {chat.role === "for" ? "For" : "Against"}
          </div></div>

        
        <ChatBox key={index+chat.role} chatMessage={chat.message} role={chat.role} /></div>
      ))}
    </motion.div>

    {/* Gradient overlays for top and bottom fade */}
    <div className="bottom-0 left-0 absolute bg-gradient-to-t from-bgDark via-transparent to-transparent w-full h-16 pointer-events-none"></div>
    <div className="top-0 left-0 absolute bg-gradient-to-b from-bgDark via-transparent to-transparent w-full h-16 pointer-events-none"></div>
  </div>
</div>)
}
