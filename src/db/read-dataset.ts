import * as fs from "node:fs";
import * as readline from "node:readline";

import { PosRecord } from "./pos-record";
import * as parse from "./parsing";

export async function readDataset(
  path: string,
  callback: (r: PosRecord) => Promise<void>
): Promise<void> {
  const input = fs.createReadStream(path);
  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  let i = 0;

  for await (const line of rl) {
    if (i++ === 0) {
      continue;
    } else {
      const parseResult = parse.posRecord.run(line);
      if (parseResult.isError) {
        throw new parse.ParseError(parseResult.error, i);
      }

      await callback(parseResult.result);
    }

    if (i % 10000 === 0 && i !== 0) {
      console.log(`Processed ${i} lines...`);
    }
  }
}
