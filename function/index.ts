import { EmojiSection } from "@/constants/data";

type EmojiCell = {
  emoji: string;
  index: number;
};

export type ProcessedEmojiSection = {
  title: string;
  icon: string | string[];
  data: EmojiCell[][];
  index: number;
  sectionOffset: number;
};

export function processEmojiSections(
  sections: EmojiSection[],
  chunkSize = 6
): ProcessedEmojiSection[] {
  let globalIndex = 0;

  return sections.map((section, sectionIndex) => {
    const offset = globalIndex;

    const chunked = chunkArray(section.data, chunkSize).map((row) =>
      row.map((emoji) => ({
        emoji,
        index: globalIndex++,
      }))
    );

    return {
      ...section,
      data: chunked,
      index: sectionIndex,
      sectionOffset: offset,
    };
  });
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
