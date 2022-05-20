import makeGenerator from "./mod.ts";
import { assertEquals, assertThrows } from "./test_deps.ts";

Deno.test("makeGenerator throws if names is empty", () => {
  const names: string[] = [];
  const func = () => makeGenerator(names);

  assertThrows(func);
});

Deno.test("makeGenerator makes a generator", () => {
  const generator = makeGenerator(["bar"]);
  const names = [
    generator.next().value,
    generator.next().value,
  ];
  const expectedNames = ["bar", "bar"];

  assertEquals(names, expectedNames);
});

Deno.test("makeGenerator throws if it can't generate an unused name after a number of tries", () => {
  const generator = makeGenerator(["bar"], { unique: true });
  const _ = generator.next().value;
  const func = () => generator.next().value;

  assertThrows(func);
});
