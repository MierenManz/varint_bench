const AB = new ArrayBuffer(8);
const U32_VIEW = new Uint32Array(AB);
const U64_VIEW = new BigUint64Array(AB);

export function jsDecodeV5(input: Uint8Array): bigint {
  U64_VIEW[0] = 0n;
  let intermediate = 0;
  let position = 0;
  let i = 0;

  if (input.length === 0) throw new RangeError("Cannot read empty buffer");

  let byte = input[i];
  do {
    byte = input[i];

    // 1. Take the lower 7 bits of the byte.
    // 2. Shift the bits into the correct position.
    // 3. Bitwise OR it with the intermediate value
    // QUIRK: in the 5th (and 10th) iteration of this loop it will overflow on the shift.
    // This causes only the lower 4 bits to be shifted into place and removing the upper 3 bits
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

  if ((i === 10 && intermediate > -1) || i === 11 || i > input.length) {
    throw new RangeError("Maximum size reached");
  }

  // Write the intermediate value to the "empty" slot
  // if the first slot is taken. Take the second slot
  U32_VIEW[Number(i > 4)] = intermediate;

  return U64_VIEW[0];
}
