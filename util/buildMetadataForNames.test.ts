import buildMetadataForNames from "./buildMetadataForNames.ts";
import { assertEquals, assertStrictEquals } from "../test_deps.ts";

Deno.test("buildMetadataForNames outputs max name length", () => {
  const names = ["foo"];
  const { maxLength } = buildMetadataForNames(names);
  const expectedMaxNameLength = 3;

  assertStrictEquals(maxLength.name, expectedMaxNameLength);
});

Deno.test("buildMetadataForNames outputs max word length", () => {
  const names = ["foo", "ba rbaz"];
  const { maxLength } = buildMetadataForNames(names);
  const expectedMaxWordLength = 4;

  assertStrictEquals(maxLength.word, expectedMaxWordLength);
});

Deno.test("buildMetadataForNames outputs start chars", () => {
  const names = ["foo", "bar", "baz"];
  const { chars } = buildMetadataForNames(names);
  const expectedStartChars = ["f", "b", "b"];

  assertEquals(chars.start, expectedStartChars);
});

Deno.test("buildMetadataForNames outputs char map", () => {
  const names = ["foo", "bar", "baz"];
  const { chars } = buildMetadataForNames(names);
  const expectedCharMap = {
    f: ["o"],
    o: ["o", null],
    b: ["a", "a"],
    a: ["r", "z"],
    r: [null],
    z: [null],
  };

  assertEquals(chars.map, expectedCharMap);
});
