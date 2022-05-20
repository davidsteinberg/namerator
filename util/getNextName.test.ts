import getNextName from "./getNextName.ts";
import { assertEquals, assertStrictEquals } from "../test_deps.ts";
import { NamesMetadata } from "./buildMetadataForNames.ts";
import { RandomElement } from "./makeName.ts";

Deno.test("getNextName returns result of makeName called with metadata and randomElement if not unique", () => {
  let passedMetadata!: NamesMetadata;
  let passedRandomElement!: RandomElement;

  const makeName = (
    metadata: NamesMetadata,
    randomElement: RandomElement,
  ): string => {
    passedMetadata = metadata;
    passedRandomElement = randomElement;
    return "foo";
  };

  const metadata = {
    maxLength: { name: 0, word: 0 },
    chars: { start: [], map: {} },
  };
  const randomElement = <T>(array: T[]): T => array[0];
  const unique = false;
  const usedNames: string[] = [];
  const retryCount = 0;
  const name = getNextName({
    makeName,
    metadata,
    randomElement,
    unique,
    usedNames,
    retryCount,
  });
  const expectedName = "foo";

  assertStrictEquals(passedMetadata, metadata);
  assertStrictEquals(passedRandomElement, randomElement);
  assertStrictEquals(name, expectedName);
});

Deno.test("getNextName returns first result of makeName called with metadata and randomElement if unique is true and unused names is empty", () => {
  let passedMetadata!: NamesMetadata;
  let passedRandomElement!: RandomElement;

  const makeName = (
    metadata: NamesMetadata,
    randomElement: RandomElement,
  ): string => {
    passedMetadata = metadata;
    passedRandomElement = randomElement;
    return "foo";
  };

  const metadata = {
    maxLength: { name: 0, word: 0 },
    chars: { start: [], map: {} },
  };
  const randomElement = <T>(array: T[]): T => array[0];
  const unique = true;
  const usedNames: string[] = [];
  const retryCount = 1;
  const name = getNextName({
    makeName,
    metadata,
    randomElement,
    unique,
    usedNames,
    retryCount,
  });
  const expectedName = "foo";

  assertStrictEquals(passedMetadata, metadata);
  assertStrictEquals(passedRandomElement, randomElement);
  assertStrictEquals(name, expectedName);
});

Deno.test("getNextName caches and returns first unused name if unique is true", () => {
  let count = 0;
  const makeName = (): string => {
    if (count === 0) {
      count += 1;
      return "foo";
    }

    return "bar";
  };

  const metadata = {
    maxLength: { name: 0, word: 0 },
    chars: { start: [], map: {} },
  };
  const randomElement = <T>(array: T[]): T => array[0];
  const unique = true;
  const usedNames = ["foo"];
  const retryCount = 2;

  const name = getNextName({
    makeName,
    metadata,
    randomElement,
    unique,
    usedNames,
    retryCount,
  });
  const expectedName = "bar";
  const expectedUnusedNames = ["foo", "bar"];

  assertStrictEquals(name, expectedName);
  assertEquals(usedNames, expectedUnusedNames);
});

Deno.test("getNextName returns false if an unusued name was not generated within retry count", () => {
  const makeName = (): string => {
    return "foo";
  };

  const metadata = {
    maxLength: { name: 0, word: 0 },
    chars: { start: [], map: {} },
  };
  const randomElement = <T>(array: T[]): T => array[0];
  const unique = true;
  const usedNames: string[] = [];
  const retryCount = 0;

  const name = getNextName({
    makeName,
    metadata,
    randomElement,
    unique,
    usedNames,
    retryCount,
  });
  const expectedName = false;

  assertStrictEquals(name, expectedName);
});
