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

    const base = "inline-block px-0.5 mx-[2px] rounded-md transition-all duration-150 hover:shadow-md ";

  const palette = role === "for"
    ? {
        boldItalic: " border border-emerald-500 text-emerald-800 font-bold italic ",
        bold: "text-emerald-700 font-bold",
        italic: "  text-emerald-600 italic",
        quoted: "bg-emerald-100/5 px-2 text-emerald-500 font-semibold",
      }
    : {
        boldItalic: " border border-rose-500 text-rose-800 font-bold italic shadow-sm",
        bold: " text-rose-700 font-bold",
        italic: "text-rose-600 italic",
        quoted: "bg-rose-200/10 px-2 border border-rose-200/5 text-rose-500 font-semibold",
      };

  if (isBoldItalic) return `${base} ${palette.boldItalic}`;
  if (isBold) return `${base} ${palette.bold}`;
  if (isItalic) return `${base} ${palette.italic}`;
  if (isQuoted) return `${base} ${palette.quoted}`;

  return "px-[2px]";
}

export function tokenizeMarkdownText(text: string): string[] {
  const regex = /(\*{1,3}[^*]+?\*{1,3}[.,!?]?|\n|\S+)/g;
  return text.match(regex) || [];
}