export function formatWord(word: string): string {
  const match = word.match(/^(\*{1,3}|~~|__)(.+?)(\*{1,3}|~~|__)([.,!?]?)$/);
  if (match) {
    return match[2] + (match[4] || ""); // core word + punctuation
  }

  return word
    .replace(/^(\*{1,3}|~~|__)/, "")   // remove opening marker
    .replace(/(\*{1,3}|~~|__)$/, "");  // remove closing marker
}

export function getClassForStyle(word: string, role: string): string {
  const cleanWord = word.replace(/[.,!?]$/, "");

  const isBoldItalic = /^\*{3}.+\*{3}$/.test(cleanWord);
  const isBold = /^\*{2}.+\*{2}$/.test(cleanWord);
  const isItalic = /^\*{1}.+\*{1}$/.test(cleanWord);
  const isStrikethrough = /^~~.+~~$/.test(cleanWord);
  const isUnderline = /^__.+__$/.test(cleanWord);
  const isQuoted = /^["'].+["']$/.test(cleanWord);

  const base = "inline-block tracking-wide px-0.5 mx-[2px] rounded-md transition-all duration-150 hover:shadow-md ";

  const palette = role === "for"
    ? {
        boldItalic: "border border-emerald-500 text-emerald-800 font-bold italic font-dm-serif-display",
        bold: "text-emerald-700 font-bold font-space-grotesk",
        italic: "text-emerald-600 italic font-outfit",
        strikethrough: "line-through text-emerald-400 font-medium",
        underline: "underline decoration-emerald-500 text-emerald-700 font-semibold",
        quoted: "bg-emerald-100/5 px-2 text-emerald-500 font-semibold tracking-widest font-dm-serif-display",
      }
    : {
        boldItalic: "border border-rose-500 text-rose-800 font-bold italic shadow-sm font-dm-serif-display",
        bold: "text-rose-700 font-bold font-space-grotesk",
        italic: "text-rose-600 italic font-outfit",
        strikethrough: "line-through text-rose-400 font-medium",
        underline: "underline decoration-rose-500 text-rose-700 font-semibold",
        quoted: "bg-rose-200/10 px-2 border border-rose-200/5 text-rose-500 font-semibold tracking-widest font-dm-serif-display",
      };

  if (isBoldItalic) return `${base} ${palette.boldItalic}`;
  if (isBold) return `${base} ${palette.bold}`;
  if (isItalic) return `${base} ${palette.italic}`;
  if (isStrikethrough) return `${base} ${palette.strikethrough}`;
  if (isUnderline) return `${base} ${palette.underline}`;
  if (isQuoted) return `${base} ${palette.quoted}`;

  return "px-[2px]";
}
export function tokenizeMarkdownText(text: string): string[] {
  const regex = /(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|\*[^*]+?\*|~~[^~]+?~~|__[^_]+?__|["'][^"']+["']|\n|\S+)/g;
  return text.match(regex) || [];
}