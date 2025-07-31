export function formatWord(word: string): string {
  const match = word.match(/^(\*{1,3})(.+?)(\*{1,3})([.,!?]?)$/);
  if (match) {
    return match[2] + (match[4] || ""); // core word + punctuation
  }
  return word.replace(/^\*{1,3}/, "").replace(/\*{1,3}$/, "");
}

export function getClassForStyle(word: string): string {
  const cleanWord = word.replace(/[.,!?]$/, ""); // remove punctuation for matching

  const isBoldItalic = /^\*{3}.+\*{3}$/.test(cleanWord);
  const isBold = /^\*{2}.+\*{2}$/.test(cleanWord);
  const isItalic = /^\*{1}.+\*{1}$/.test(cleanWord);
  const isQuoted = /^["'].+["']$/.test(cleanWord);

  let classes = "p-[2px] line-height-2";

  if (isBoldItalic) classes += " font-bold italic bg-amber-50/5 border border-amber-100/30 rounded-md px-1.5 pb-1 mx-[2px]";
  else if (isBold) classes += " font-bold bg-amber-50/5 border border-amber-100/30  rounded-md px-1.5 pb-1 mx-[2px]";
  else if (isItalic) classes += " italic bg-amber-50/5 border border-amber-100/30 rounded-md px-1.5 pb-1 mx-[2px]";
  else if (isQuoted)
    classes += " text-purple-300 italic  border-purple-500";

  return classes;
}
export function tokenizeMarkdownText(text: string): string[] {
  const regex = /(\*{1,3}[^*]+?\*{1,3}[.,!?]?|\S+)/g;
  return text.match(regex) || [];
}
