export {
  decode as stdDecode,
  decode32 as stdDecode32,
  encode,
} from "https://deno.land/std@0.201.0/encoding/varint.ts";
export { read as wasmDecode } from "https://raw.githubusercontent.com/denosaurs/byte_type/80802e1bb0e75be5ccb00687306d21ed86d05a12/types/leb128/_i64leb128.ts";
