import { stdDecode } from "./deps.ts";
import { bigintDecode } from "./bigint.ts";
import { jsDecodeV1 } from "./decode_v1.ts";
import { jsDecodeV2 } from "./decode_v2.ts";
import { jsDecodeV3 } from "./decode_v3.ts";
import { jsDecodeV4 } from "./decode_v4.ts";
import { jsDecodeV5 } from "./decode_v5.ts";
import { jsDecodeV6, jsDecodeV6Opt } from "./decode_v6.ts";

const SINGLE = Uint8Array.of(0x01);
const ONE_BYTE = Uint8Array.of(0xFF, 0x01);
const TWO_COMPLEMENTS = Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x07);
// deno-fmt-ignore
// const MAX_VAL = Uint8Array.of(
//   0xff, 0xff, 0xff,
//   0xff, 0xff, 0xff,
//   0xff, 0xff, 0x7f,
// );

Deno.bench({
  name: "STD Decode",
  baseline: true,
  group: "a",
  fn: () => {
    stdDecode(SINGLE);
    stdDecode(ONE_BYTE);
    stdDecode(TWO_COMPLEMENTS);
    // stdDecode(MAX_VAL);
  },
});

// Deno.bench({
//   name: "Js BigInt Decode",
//   group: "a",
//   fn: () => {
//     bigintDecode(SINGLE);
//     bigintDecode(ONE_BYTE);
//     bigintDecode(TWO_COMPLEMENTS);
//     bigintDecode(MAX_VAL);
//   },
// });

// Deno.bench({
//   name: "WASM Decode",
//   group: "a",
//   fn: () => {
//     wasmDecode(SINGLE);
//     wasmDecode(ONE_BYTE);
//     wasmDecode(TWO_COMPLEMENTS);
//     wasmDecode(MAX_VAL);
//   },
// });

// Deno.bench({
//   name: "js Decode V1",
//   group: "a",
//   fn: () => {
//     jsDecodeV1(SINGLE);
//     jsDecodeV1(ONE_BYTE);
//     jsDecodeV1(TWO_COMPLEMENTS);
//     jsDecodeV1(MAX_VAL);
//   },
// });

// Deno.bench({
//   name: "js Decode V2",
//   group: "a",
//   fn: () => {
//     jsDecodeV2(SINGLE);
//     jsDecodeV2(ONE_BYTE);
//     jsDecodeV2(TWO_COMPLEMENTS);
//     jsDecodeV2(MAX_VAL);
//   },
// });

// Deno.bench({
//   name: "js Decode V3",
//   group: "a",
//   fn: () => {
//     jsDecodeV3(SINGLE);
//     jsDecodeV3(ONE_BYTE);
//     jsDecodeV3(TWO_COMPLEMENTS);
//     jsDecodeV3(MAX_VAL);
//   },
// });

// Deno.bench({
//   name: "js Decode V4",
//   group: "a",
//   fn: () => {
//     jsDecodeV4(SINGLE);
//     jsDecodeV4(ONE_BYTE);
//     jsDecodeV4(TWO_COMPLEMENTS);
//     jsDecodeV4(MAX_VAL);
//   },
// });

Deno.bench({
  name: "js Decode V5",
  group: "a",
  fn: () => {
    jsDecodeV5(SINGLE);
    jsDecodeV5(ONE_BYTE);
    jsDecodeV5(TWO_COMPLEMENTS);
    // jsDecodeV5(MAX_VAL);
  },
});


Deno.bench({
  name: "js Decode V6",
  group: "a",
  fn: () => {
    jsDecodeV6(SINGLE);
    jsDecodeV6(ONE_BYTE);
    jsDecodeV6(TWO_COMPLEMENTS);
    // jsDecodeV5(MAX_VAL);
  },
});


Deno.bench({
  name: "js Decode V6 Opt",
  group: "a",
  fn: () => {
    jsDecodeV6Opt(SINGLE);
    jsDecodeV6Opt(ONE_BYTE);
    jsDecodeV6Opt(TWO_COMPLEMENTS);
    // jsDecodeV5(MAX_VAL);
  },
});
