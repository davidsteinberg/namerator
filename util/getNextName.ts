import { NamesMetadata } from "./buildMetadataForNames.ts";
import { RandomElement } from "./makeName.ts";

type Parameters = {
  makeName(metadata: NamesMetadata, randomElement: RandomElement): string;
  metadata: NamesMetadata;
  randomElement: RandomElement;
  unique: boolean;
  usedNames: string[];
  retryCount: number;
};

const getNextName = (p: Parameters): string | false => {
  const {
    makeName,
    metadata,
    randomElement,
    unique,
    usedNames,
    retryCount,
  } = p;

  // Just return a name if they don't have to be unique
  if (!unique) {
    return makeName(metadata, randomElement);
  }

  // Try up to retry count to generate an unused name
  for (let i = 0; i < retryCount; i += 1) {
    const name = makeName(metadata, randomElement);
    if (!usedNames.includes(name)) {
      usedNames.push(name);
      return name;
    }
  }

  // Fail if we couldn't generate an unused name
  return false;
};

export default getNextName;
