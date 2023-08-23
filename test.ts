import { assertEquals } from "https://deno.land/std@0.199.0/assert/mod.ts";
import { jsDecodeV1 } from "./decode_v1.ts";
import { jsDecodeV2 } from "./decode_v2.ts";
import { jsDecodeV3 } from "./decode_v3.ts";
import { jsDecodeV4 } from "./decode_v4.ts";
import { stdDecode } from "./deps.ts";

const SINGLE = Uint8Array.of(0x01);
const ONE_BYTE = Uint8Array.of(0xFF, 0x01);
const TWO_COMPLEMENTS = Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x07);
const MAX_VAL = Uint8Array.of(
  0xff,
  0xff,
  0xff,
  0xff,
  0xff,
  0xff,
  0xff,
  0xff,
  0x7f,
);
const MAX_32 = Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x0f);

const STD_RESULTS = [
  SINGLE,
  ONE_BYTE,
  TWO_COMPLEMENTS,
  MAX_VAL,
  MAX_32
].map((x) => stdDecode(x)[0]);

Deno.test({
  name: "V1",
  fn: () => {
    assertEquals(jsDecodeV1(SINGLE), STD_RESULTS[0]);
    assertEquals(jsDecodeV1(ONE_BYTE), STD_RESULTS[1]);
    assertEquals(jsDecodeV1(TWO_COMPLEMENTS), STD_RESULTS[2]);
    assertEquals(jsDecodeV1(MAX_VAL), STD_RESULTS[3]);
    assertEquals(jsDecodeV1(MAX_32), STD_RESULTS[4]);
  },
});

Deno.test({
  name: "V2",
  fn: () => {
    assertEquals(jsDecodeV2(SINGLE), STD_RESULTS[0]);
    assertEquals(jsDecodeV2(ONE_BYTE), STD_RESULTS[1]);
    assertEquals(jsDecodeV2(TWO_COMPLEMENTS), STD_RESULTS[2]);
    assertEquals(jsDecodeV2(MAX_VAL), STD_RESULTS[3]);
    assertEquals(jsDecodeV2(MAX_32), STD_RESULTS[4]);
  },
});

Deno.test({
  name: "V3",
  fn: () => {
    assertEquals(jsDecodeV3(SINGLE), STD_RESULTS[0]);
    assertEquals(jsDecodeV3(ONE_BYTE), STD_RESULTS[1]);
    assertEquals(jsDecodeV3(TWO_COMPLEMENTS), STD_RESULTS[2]);
    assertEquals(jsDecodeV3(MAX_VAL), STD_RESULTS[3]);
    assertEquals(jsDecodeV3(MAX_32), STD_RESULTS[4]);
  },
});

Deno.test({
  name: "V4",
  fn: () => {
    assertEquals(jsDecodeV4(SINGLE), STD_RESULTS[0]);
    assertEquals(jsDecodeV4(ONE_BYTE), STD_RESULTS[1]);
    assertEquals(jsDecodeV4(TWO_COMPLEMENTS), STD_RESULTS[2]);
    assertEquals(jsDecodeV4(MAX_VAL), STD_RESULTS[3]);
    assertEquals(jsDecodeV4(MAX_32), STD_RESULTS[4]);
  },
});
