import { jsDecodeV1 } from "../decode_v1.ts";
import { jsDecodeV2 } from "../decode_v2.ts";
import { jsDecodeV3 } from "../decode_v3.ts";
import { jsDecodeV4 } from "../decode_v4.ts";
import { jsDecodeV5 } from "../decode_v5.ts";
import { runTests } from "./test_harness.ts";

runTests(jsDecodeV1);
runTests(jsDecodeV2);
runTests(jsDecodeV3);
runTests(jsDecodeV4);
runTests(jsDecodeV5, true);
