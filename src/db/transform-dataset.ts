import * as fs from "node:fs";
import * as readline from "node:readline";

import { PosRecord } from "./pos-record";
import * as parse from "./parsing";
import * as serialize from "./serialize";

export async function transformDataset(
  inputPath: string,
  outputPath: string,
  transform: (r: PosRecord) => PosRecord
): Promise<void> {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  let i = 0;

  for await (const line of rl) {
    if (i++ === 0) {
      // Don't transform header
      output.write(line + "\n");
    } else {
      const parseResult = parse.posRecord.run(line);
      if (parseResult.isError) {
        throw new parse.ParseError(parseResult.error, i);
      }

      const newRecord = serialize.toCsvRecord(transform(parseResult.result));
      output.write(newRecord + "\n");
    }

    if (i % 10000 === 0 && i !== 0) {
      console.log(`Processed ${i} lines...`);
    }
  }

  output.end();
}
