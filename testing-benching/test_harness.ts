import { encode } from "../deps.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.201.0/assert/mod.ts";

const MaxUInt64 = 18446744073709551615n;

function encodeDecode(i: bigint, fn: Fn) {
  const [buff] = encode(i);
  const j = fn(buff);
  assertEquals(i, j, `decode(encode(${i})) !== ${j}`);
}

type Fn = (input: Uint8Array) => bigint;

export function runTests(fn: Fn, exceptions = false) {
  Deno.test(fn.name, async ({ step }) => {
    await step("Manual", () => {
      const data = Uint8Array.of(172, 2);
      assertEquals(fn(data), 300n);
    });

    await step("Max size", () => {
      // deno-fmt-ignore
      const data = Uint8Array.of(
        255, 255, 255,
        255, 255, 255,
        255, 255, 255, 1
      );
      assertEquals(fn(data), MaxUInt64);
    });

    await step("Common Values", () => {
      // deno-fmt-ignore
      const data = [
          0n,   1n,   2n,
         10n,  20n,  63n,
         64n,  65n, 127n,
        128n, 129n, 255n,
        256n, 257n, 300n,
        MaxUInt64,
      ];

      for (const i of data) encodeDecode(i, fn);
      for (let i = 0x7n; i < MaxUInt64; i <<= 1n) encodeDecode(i, fn);
    });
    if (exceptions) {
      await step("Overflow", () => {
        // deno-fmt-ignore
        const data = Uint8Array.of(
          255, 255, 255,
          255, 255, 255,
          255, 255, 255, 2
        );
        assertThrows(() => fn(data), RangeError);
      });

      await step("Empty buffer", () => {
        assertThrows(() => fn(new Uint8Array()), RangeError);
      });
    }
  });
}
