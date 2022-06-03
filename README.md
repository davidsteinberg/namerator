# Namerator

The `namerator` module provides a function that takes an array of names and
returns an infinite generator that yields random names based on its input:

```ts
import namerator from "https://davidsteinberg.github.io/namerator/mod.ts";

const names = ["Alice", "Alison", "Billy", "Bob", "Carol", "Cassie"];
const generator = namerator(names);
const makeName = () => generator.next().value;

for (let i = 1; i <= 10; i += 1) {
  const name = makeName();
  console.log(`${i}. ${name}`);
}
```

_Note: Namerator will throw if the `names` array is empty._

### Unique names

You can pass a `unique` flag in an options object to guarantee names are not
repeated:

```ts
import namerator from "https://davidsteinberg.github.io/namerator/mod.ts";

const names = ["Alice", "Bob"];
const generator = namerator(names, { unique: true });
const makeName = () => generator.next().value;

const aliceOrBob = makeName();
const bobOrAlice = makeName();

console.log(aliceOrBob);
console.log(bobOrAlice);
```

_Note: Namerator will throw if it fails to generate a `unique` name within
`2 * names.length` tries. Be mindful of this when using `unique` with a small
input size, as you can quickly generate all possible names._

### Implementation

Namerator is implemented using [Markov chains][1]; each character that is chosen
is based solely on the previous character. Input names are split into characters
and added to a lookup table, with each character mapping to a list of possible
subsequent characters (or the end of the name). This lookup table, along with a
set of starting characters, is used to generate names.

Namerator adheres to these constraints:

1. Names will not be longer than the longest name in the input list.
2. Words (separated by spaces in a name) will not be longer than the longest
   word in the input list.

[1]: https://en.wikipedia.org/wiki/Markov_chain
