export function bigintDecode(
  buffer: Uint8Array,
): [bigint, number] {
  let value = 0n;
  let length = 0;
  let i = 0;
  while (true) {
    const currentByte = BigInt(buffer[i]);
    value |= (currentByte & 0x7Fn) << BigInt(length);
    length += 7;
    i++;
    if (i > 10) throw new Error("Max Length Reached");

    if ((currentByte & 0x80n) !== 0x80n) break;
  }

  return [value, i];
}
