const benchAll = !!Deno.args.find((x) => x === "--all");
const benchWasm = !!Deno.args.find((x) => x === "--wasm");
const benchOld = !!Deno.args.find((x) => x === "--old");

const VARINT_ONE = (() => Uint8Array.of(0x01))();
const TWO_BYTES = (() => Uint8Array.of(0xFF, 0x01))();
const THREE_BYTES = (() => Uint8Array.of(0xDD, 0xC7, 0x01))();
const FIVE_BYTES = (() => Uint8Array.of(0xFF, 0xFF, 0xFF, 0xFF, 0x07))();
const MINUS_ONE = (() => Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x0f))();
const MINUS_FIVE_BYTES = (() => Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x08))();

import { stdDecode32, wasmDecode } from "../deps.ts";
import { jsDecodeV1 } from "../decode_v1.ts";
import { jsDecodeV2 } from "../decode_v2.ts";
import { jsDecodeV3 } from "../decode_v3.ts";
import { jsDecodeV4 } from "../decode_v4.ts";
import { jsDecodeV5, jsDecodeV5Std } from "../decode_v5.ts";
import { jsDecodeV6 } from "../decode_v6.ts";

Deno.bench("nop", () => {});

Deno.bench({
  name: "STD Decode",
  group: "",
  baseline: true,
  fn: () => {
    const varintOne = VARINT_ONE;
    const twoBytes = TWO_BYTES;
    const threeBytes = THREE_BYTES;
    const fiveBytes = FIVE_BYTES;
    const minusOne = MINUS_ONE;
    const minusFiveBytes = MINUS_FIVE_BYTES;

    stdDecode32(varintOne);
    stdDecode32(twoBytes);
    stdDecode32(threeBytes);
    stdDecode32(fiveBytes);
    stdDecode32(minusOne);
    stdDecode32(minusFiveBytes);
  },
});

if (benchAll || benchWasm) {
  Deno.bench({
    name: "WASM Decode",
    group: "",

    fn: () => {
      const varintOne = VARINT_ONE;
      const twoBytes = TWO_BYTES;
      const threeBytes = THREE_BYTES;
      const fiveBytes = FIVE_BYTES;
      const minusOne = MINUS_ONE;
      const minusFiveBytes = MINUS_FIVE_BYTES;

      wasmDecode(varintOne);
      wasmDecode(twoBytes);
      wasmDecode(threeBytes);
      wasmDecode(fiveBytes);
      wasmDecode(minusOne);
      wasmDecode(minusFiveBytes);
    },
  });
}

if (benchAll || benchOld) {
  Deno.bench({
    name: "JS Decode V1",
    group: "",

    fn: () => {
      const varintOne = VARINT_ONE;
      const twoBytes = TWO_BYTES;
      const threeBytes = THREE_BYTES;
      const fiveBytes = FIVE_BYTES;
      const minusOne = MINUS_ONE;
      const minusFiveBytes = MINUS_FIVE_BYTES;

      jsDecodeV1(varintOne);
      jsDecodeV1(twoBytes);
      jsDecodeV1(threeBytes);
      jsDecodeV1(fiveBytes);
      jsDecodeV1(minusOne);
      jsDecodeV1(minusFiveBytes);
    },
  });

  Deno.bench({
    name: "JS Decode V2",
    group: "",

    fn: () => {
      const varintOne = VARINT_ONE;
      const twoBytes = TWO_BYTES;
      const threeBytes = THREE_BYTES;
      const fiveBytes = FIVE_BYTES;
      const minusOne = MINUS_ONE;
      const minusFiveBytes = MINUS_FIVE_BYTES;

      jsDecodeV2(varintOne);
      jsDecodeV2(twoBytes);
      jsDecodeV2(threeBytes);
      jsDecodeV2(fiveBytes);
      jsDecodeV2(minusOne);
      jsDecodeV2(minusFiveBytes);
    },
  });

  Deno.bench({
    name: "JS Decode V3",
    group: "",

    fn: () => {
      const varintOne = VARINT_ONE;
      const twoBytes = TWO_BYTES;
      const threeBytes = THREE_BYTES;
      const fiveBytes = FIVE_BYTES;
      const minusOne = MINUS_ONE;
      const minusFiveBytes = MINUS_FIVE_BYTES;

      jsDecodeV3(varintOne);
      jsDecodeV3(twoBytes);
      jsDecodeV3(threeBytes);
      jsDecodeV3(fiveBytes);
      jsDecodeV3(minusOne);
      jsDecodeV3(minusFiveBytes);
    },
  });

  Deno.bench({
    name: "JS Decode V4",
    group: "",

    fn: () => {
      const varintOne = VARINT_ONE;
      const twoBytes = TWO_BYTES;
      const threeBytes = THREE_BYTES;
      const fiveBytes = FIVE_BYTES;
      const minusOne = MINUS_ONE;
      const minusFiveBytes = MINUS_FIVE_BYTES;

      jsDecodeV4(varintOne);
      jsDecodeV4(twoBytes);
      jsDecodeV4(threeBytes);
      jsDecodeV4(fiveBytes);
      jsDecodeV4(minusOne);
      jsDecodeV4(minusFiveBytes);
    },
  });
}

if (benchAll) {
  Deno.bench({
    name: "JS Decode V5 STD",
    group: "",

    fn: () => {
      const varintOne = VARINT_ONE;
      const twoBytes = TWO_BYTES;
      const threeBytes = THREE_BYTES;
      const fiveBytes = FIVE_BYTES;
      const minusOne = MINUS_ONE;
      const minusFiveBytes = MINUS_FIVE_BYTES;

      jsDecodeV5Std(varintOne);
      jsDecodeV5Std(twoBytes);
      jsDecodeV5Std(threeBytes);
      jsDecodeV5Std(fiveBytes);
      jsDecodeV5Std(minusOne);
      jsDecodeV5Std(minusFiveBytes);
    },
  });

  // Deno.bench({
  //   name: "JS Decode V6 STD",
  //   group: "",

  //   fn: () => {
  //     const varintOne = VARINT_ONE;
  //     const twoBytes = TWO_BYTES;
  //     const threeBytes = THREE_BYTES;
  //     const fiveBytes = FIVE_BYTES;
  //     const minusOne = MINUS_ONE;
  //     const minusFiveBytes = MINUS_FIVE_BYTES;

  //     jsDecodeV6Std(varintOne);
  //     jsDecodeV6Std(twoBytes);
  //     jsDecodeV6Std(threeBytes);
  //     jsDecodeV6Std(fiveBytes);
  //     jsDecodeV6Std(minusOne);
  //     jsDecodeV6Std(minusFiveBytes);
  //   },
  // });
}

Deno.bench({
  name: "JS Decode V5",
  group: "",

  fn: () => {
    const varintOne = VARINT_ONE;
    const twoBytes = TWO_BYTES;
    const threeBytes = THREE_BYTES;
    const fiveBytes = FIVE_BYTES;
    const minusOne = MINUS_ONE;
    const minusFiveBytes = MINUS_FIVE_BYTES;

    jsDecodeV5(varintOne);
    // jsDecodeV5(twoBytes);
    // jsDecodeV5(threeBytes);
    jsDecodeV5(fiveBytes);
    jsDecodeV5(minusOne);
    jsDecodeV5(minusFiveBytes);
  },
});

Deno.bench({
  name: "JS Decode V6",
  group: "",

  fn: () => {
    const varintOne = VARINT_ONE;
    const twoBytes = TWO_BYTES;
    const threeBytes = THREE_BYTES;
    const fiveBytes = FIVE_BYTES;
    const minusOne = MINUS_ONE;
    const minusFiveBytes = MINUS_FIVE_BYTES;

    jsDecodeV6(varintOne);
    jsDecodeV6(twoBytes);
    jsDecodeV6(threeBytes);
    jsDecodeV6(fiveBytes);
    jsDecodeV6(minusOne);
    jsDecodeV6(minusFiveBytes);
  },
});
