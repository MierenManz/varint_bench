const AB = new ArrayBuffer(8);
const U32_VIEW = new Uint32Array(AB);
const U64_VIEW = new BigUint64Array(AB);

export function jsDecodeV5(input: Uint8Array): bigint {
  U64_VIEW[0] = 0n;
  let intermediate = 0;
  let position = 0;
  let i = 0;

  let byte = 0;
  do {
    byte = input[i];
    if (i === 11) throw new Error("Maximum size reached");

    intermediate |= (byte & 0b01111111) << position;

    if (position === 28) {
      // Write to the view
      U32_VIEW[0] = intermediate;
      // set `intermediate` to the remaining 3 bits
      // We only want the remaining three bits because the other 4 have been "consumed" on line 21
      intermediate = (byte & 0b01110000) >>> 4;
      // set `position` to -4 because later 7 will be added, making it 3
      position = -4;
    }

    position += 7;
    i++;
    // Keep going while there is a continuation bit
  } while ((byte & 0b10000000) === 0b10000000);

  // Write the intermediate value to the "empty" slot
  // if the first slot is taken. Take the second slot
  U32_VIEW[Number(i > 3)] = intermediate;

  return U64_VIEW[0];
}
