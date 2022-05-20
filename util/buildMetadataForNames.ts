type StringOrNull = string | null;
type CharacterMap = Record<string, StringOrNull[]>;
type NamesMetadata = {
  maxLength: {
    name: number;
    word: number;
  };
  chars: {
    start: string[];
    map: CharacterMap;
  };
};

const buildMetadataForNames = (names: string[]): NamesMetadata => {
  const startChars: string[] = [];
  const charMap: CharacterMap = {};
  let maxNameLength = 0;
  let maxWordLength = 0;

  for (const name of names) {
    const { length } = name;

    // See if maxes need to be updated based on this name
    maxNameLength = Math.max(maxNameLength, length);
    maxWordLength = Math.max(
      maxWordLength,
      ...name.split(" ").map((word) => word.length),
    );

    // Add start character to list
    let previousChar = name[0];
    startChars.push(previousChar);

    // Add character transitions to map
    for (let i = 1; i < length; i += 1) {
      const char = name[i];
      if (!(previousChar in charMap)) {
        charMap[previousChar] = [];
      }
      charMap[previousChar].push(char);
      previousChar = char;
    }

    // Add final character to end transition
    if (!(previousChar in charMap)) {
      charMap[previousChar] = [];
    }

    charMap[previousChar].push(null);
  }

  return {
    maxLength: { name: maxNameLength, word: maxWordLength },
    chars: { start: startChars, map: charMap },
  };
};

export type { NamesMetadata, StringOrNull };
export default buildMetadataForNames;
