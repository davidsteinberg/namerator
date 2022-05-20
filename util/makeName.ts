import { NamesMetadata, StringOrNull } from "./buildMetadataForNames.ts";

type RandomElement = <T>(array: T[]) => T;

const makeName = (
  metadata: NamesMetadata,
  randomElement: RandomElement,
): string => {
  const { maxLength, chars } = metadata;
  const { name: maxNameLength, word: maxWordLength } = maxLength;
  const { start, map } = chars;

  // Pick a starting character
  let char: StringOrNull = randomElement(start);
  let name = char;
  let lastWord = char;

  // Randomly transition for each subsequent character
  for (let i = 0; i < maxNameLength; i += 1) {
    char = randomElement(map[char]);
    // Stop if we reached an end transition
    if (char === null) {
      break;
    }

    name += char;

    // Stop if the name is at max length
    if (name.length === maxNameLength) {
      break;
    }

    // When reaching a space, start building a new word
    if (char === " ") {
      lastWord = "";
    } else {
      lastWord += char;

      // If the current word is at max length, start building a new one
      if (lastWord.length >= maxWordLength) {
        name += " ";
        char = " ";
        lastWord = "";
      }
    }
  }

  return name;
};

export type { RandomElement };
export default makeName;
