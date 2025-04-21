const CONTINUE_BIT = 0b10000000;
const VALUE_MASK = 0b01111111;

export function jsDecodeV6(input: Uint8Array): number {
  // Get all continue bits
  const bContinueBit = input[0] & CONTINUE_BIT;
  // Use previous continuebit to nullify if the varint is smaller than the buffer
  // Eg: [0xFF, 0x07, 0x10] (varint is 2 bytes but buffer is 3)
  const cContinueBit = input[1] & CONTINUE_BIT & bContinueBit;
  const dContinueBit = input[2] & CONTINUE_BIT & cContinueBit;
  const eContinueBit = input[3] & CONTINUE_BIT & dContinueBit;

  // no complex mask needed. First value always get processed.
  const aMask = VALUE_MASK;

  // use the `continue mask - 1|0` to create `0b10000000|0b01111111`
  // then AND that with `0b01111111`
  const bMask = VALUE_MASK & CONTINUE_BIT - (bContinueBit >>> 7);
  const cMask = VALUE_MASK & CONTINUE_BIT - (cContinueBit >>> 7);
  const dMask = VALUE_MASK & CONTINUE_BIT - (dContinueBit >>> 7);
  const eMask = VALUE_MASK & CONTINUE_BIT - (eContinueBit >>> 7);

  // Take all value bits
  const a = input[0] & aMask;
  // Shift into place
  const b = (input[1] & bMask) << 7;
  const c = (input[2] & cMask) << 14;
  const d = (input[3] & dMask) << 21;
  const e = (input[4] & eMask) << 28;

  return a | b | c | d | e;
}
