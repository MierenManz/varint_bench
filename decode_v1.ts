export function jsDecodeV1(input: Uint8Array): bigint {
  const ab = new ArrayBuffer(8);
  const u32View = new Uint32Array(ab);
  const u64View = new BigUint64Array(ab);

  let intermediate = 0;
  let position = 0;

  for (let i = 0; i < input.length; i++) {
    if (i === 11) throw new Error("Maximum size reached");

    const byte = input[i];

    // 1. Take the lower 7 bits of the byte.
    // 2. Shift the bits into the correct position.
    // 3. Bitwise OR it with the intermediate value
    // QUIRK: in the 5th (and 10th) iteration of this loop it will overflow on the shift.
    // This causes only the lower 4 bits to be shifted into place and removing the upper 3 bits
    intermediate |= (byte & 0x7F) << position;

    // if the intermediate value is full. Write it to the view
    // Else just add 7 to the position
    if (position === 28) {
      // Write to the view
      u32View[0] = intermediate;
      // set `intermediate` to the remaining 3 bits
      // We only want the remaining three bits because the other 4 have been "consumed" on line 21
      intermediate = (byte >>> 3) & 0x07;
      // set `positon` to 3 because we have written 3 bits
      position = 3;
    } else {
      position += 7;
    }

    // if no continuation bit.
    // then write the intermediate value to the empty "slot"
    if ((byte & 0x80) !== 0x80) {
      // if the first slot is taken. Take the second slot
      u32View[Number(i > 4)] = intermediate;
      break;
    }
  }

  // Cast the two u32's to a u64 bigint
  return u64View[0];
}
