import { buildMetadataForNames, getNextName, makeName } from "./util/mod.ts";
import { random } from "./deps.ts";

/**
 * Create a random generator from a list of names.
 * @param {string[]} names An array of names to generate from.
 * @param {{unique: boolean}} [options] An options object (currently only uses `unique` key).
 * @param {boolean} options.unique Whether all names must be unique. Defaults to `false`.
 * @throws Will throw an error if names is empty or a unique name can't be generated in `2 * names.length` tries.
 * @return An infinite generator that yields names.
 */
const makeGenerator = (names: string[], options = { unique: false }) => {
  if (names.length === 0) {
    throw new Error("At least one name must be supplied to generate names");
  }

  const metadata = buildMetadataForNames(names);
  const { unique } = options;
  const usedNames: string[] = [];
  const retryCount = names.length * 2;
  const parameters = {
    makeName,
    metadata,
    randomElement: random.element,
    unique,
    usedNames,
    retryCount,
  };

  const nameGenerator = function* () {
    while (true) {
      const name = getNextName(parameters);
      if (name === false) {
        throw new Error(
          `Failed to generate unused name after ${retryCount} times`,
        );
      }

      yield name;
    }
  };

  return nameGenerator();
};

export default makeGenerator;
