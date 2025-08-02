export function formatWord(word: string): string {
  const match = word.match(/^(\*{1,3})(.+?)(\*{1,3})([.,!?]?)$/);
  if (match) {
    return match[2] + (match[4] || ""); // core word + punctuation
  }
  return word.replace(/^\*{1,3}/, "").replace(/\*{1,3}$/, "");
}

export function getClassForStyle(word: string, role: string): string {
  const cleanWord = word.replace(/[.,!?]$/, ""); // remove punctuation for matching

  const isBoldItalic = /^\*{3}.+\*{3}$/.test(cleanWord);
  const isBold = /^\*{2}.+\*{2}$/.test(cleanWord);
  const isItalic = /^\*{1}.+\*{1}$/.test(cleanWord);
  const isQuoted = /^["'].+["']$/.test(cleanWord);

  let classes = "p-[2px] line-height-2";

  if (isBoldItalic) {
    classes += role === "for" 
      ? " font-bold italic bg-emerald-400/10 border border-emerald-400/30 rounded-md px-2 mx-[2px]"
      : " font-bold italic bg-red-400/10 border border-red-400/30 rounded-md px-2 mx-[2px]";
  } else if (isBold) {
    classes += role === "for"
      ? " font-bold bg-emerald-300/10 border border-emerald-300/30 rounded-md px-2 mx-[2px]"
      : " font-bold bg-red-300/10 border border-red-300/30 rounded-md px-2 mx-[2px]";
  } else if (isItalic) {
    classes += role === "for"
      ? " italic bg-emerald-200/10 border border-emerald-200/30 rounded-md px-2 mx-[2px]"
      : " italic bg-red-200/10 border border-red-200/30 rounded-md px-2 mx-[2px]";
  } else if (isQuoted) {
    classes += role === "for"
      ? " text-emerald-300 italic border-emerald-500"
      : " text-red-300 italic border-red-500";
  }

  return classes;
}

export function tokenizeMarkdownText(text: string): string[] {
  const regex = /(\*{1,3}[^*]+?\*{1,3}[.,!?]?|\n|\S+)/g;
  return text.match(regex) || [];
}
