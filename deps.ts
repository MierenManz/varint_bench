export {
  decode as stdDecode,
  encode,
} from "https://deno.land/std@0.201.0/encoding/varint.ts";
export { read as wasmDecode } from "https://raw.githubusercontent.com/denosaurs/byte_type/main/types/leb128/_i64leb128.ts";
