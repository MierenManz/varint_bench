const AB = new ArrayBuffer(8);
const U32_VIEW = new Uint32Array(AB);
const U64_VIEW = new BigUint64Array(AB);

export function jsDecodeV3(input: Uint8Array): bigint {
  U64_VIEW[0] = 0n;
  let intermediate = 0;
  let position = 0;
  const length = input.length;

  for (let i = 0; i < length; i++) {
    if (i === 11) throw new Error("Maximum size reached");

    const byte = input[i];

    // 1. Take the lower 7 bits of the byte.
    // 2. Shift the bits into the correct position.
    // 3. Bitwise OR it with the intermediate value
    // QUIRK: in the 5th (and 10th) iteration of this loop it will overflow on the shift.
    // This causes only the lower 4 bits to be shifted into place and removing the upper 3 bits

    intermediate |= (byte & 0b01111111) << position;

    // if the intermediate value is full. Write it to the view
    // Else just add 7 to the position
    if (position === 28) {
      // Write to the view
      U32_VIEW[0] = intermediate;
      // set `intermediate` to the remaining 3 bits
      // We only want the remaining three bits because the other 4 have been "consumed" on line 21
      intermediate = (byte & 0b01110000) >>> 4;
      // set `positon` to 3 because we have written 3 bits
      position = 3;
    } else {
      position += 7;
    }

    // if no continuation bit.
    // then write the intermediate value to the empty "slot"
    if ((byte & 0b10000000) !== 0b10000000) {
      // if the first slot is taken. Take the second slot
      U32_VIEW[Number(i > 3)] = intermediate;
      break;
    }
  }

  // Cast the two u32's to a u64 bigint
  return U64_VIEW[0];
}
