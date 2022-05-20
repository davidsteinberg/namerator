import makeName from "./makeName.ts";
import { assertStrictEquals } from "../test_deps.ts";

Deno.test("makeName adds chars up to max name length", () => {
  const randomElement = <T>(array: T[]): T => array[0];
  const metadata = {
    maxLength: { name: 3, word: 3 },
    chars: {
      start: ["a"],
      map: {
        a: ["b"],
        b: ["c"],
        c: [null],
      },
    },
  };

  const name = makeName(metadata, randomElement);
  const expectedName = "abc";

  assertStrictEquals(name, expectedName);
});

Deno.test("makeName adds a space when words are too long", () => {
  const randomElement = <T>(array: T[]): T => array[0];
  const metadata = {
    maxLength: { name: 4, word: 2 },
    chars: {
      start: ["a"],
      map: {
        a: ["b"],
        b: ["c"],
        c: [null],
        " ": ["c"],
      },
    },
  };

  const name = makeName(metadata, randomElement);
  const expectedName = "ab c";

  assertStrictEquals(name, expectedName);
});

Deno.test("makeName adds chars until null is found", () => {
  const randomElement = <T>(array: T[]): T => array[0];
  const metadata = {
    maxLength: { name: 10, word: 3 },
    chars: {
      start: ["a"],
      map: {
        a: ["b"],
        b: [null],
      },
    },
  };

  const name = makeName(metadata, randomElement);
  const expectedName = "ab";

  assertStrictEquals(name, expectedName);
});

Deno.test("makeName internally starts a new word when a space is found", () => {
  const randomElement = <T>(array: T[]): T => array[0];
  const metadata = {
    maxLength: { name: 10, word: 3 },
    chars: {
      start: ["a"],
      map: {
        a: [" "],
        " ": ["b"],
        b: [null],
      },
    },
  };

  const name = makeName(metadata, randomElement);
  const expectedName = "a b";

  assertStrictEquals(name, expectedName);
});
