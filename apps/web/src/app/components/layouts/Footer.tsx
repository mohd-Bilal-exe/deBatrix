import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 fixed flex justify-between items-end p-2 pl-9 w-screen text-white">
      <div className="bg-clip-text pb-0 pl-4 w-[35%] overflow-hidden font-clash-grotesk font-thin text-xl text-pretty tracking-wider">You Ask - They Argue - You Watch </div>
      <div className="bg-clip-text pb-5 w-[30%] overflow-hidden font-dm-serif-display text-4xl text-pretty tracking-wider"></div>
      <div className="bg-clip-text pr-12 pb-0 w-[35%] overflow-hidden font-outfit font-thin text-lg text-end text-pretty tracking-wider">Let&lsquo;em - Freak&lsquo;in - Fight</div>
    </footer>
  );
}