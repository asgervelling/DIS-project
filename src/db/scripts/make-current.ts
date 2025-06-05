/**
 * This script should be run prior to seeding the database.
 *
 * Our dataset is from around 2010. In order to make it a little
 * easier to work with, we have this script, which will take
 * as input a CSV file used to seed the database, and output another
 * CSV file where the dates are more current.
 * The last day in the dataset will be used to measure a time delta
 * to add to each day in that dataset.
 * The resulting dataset will be written to a new location.
 *
 * This will be beneficial for seeing INSERT statements reflected in the dashboard.
 *
 * Usage: node make-current.js <inputPath> <outputPath>
 */
import * as fs from "node:fs";
import * as readline from "node:readline";

import { PosRecord } from "../pos-record";
import * as parse from "../parsing";
import { transformDataset } from "../transform-dataset";

const NOW = new Date();

// Save current time for use in application
const CUTOFF_PATH = "data/cutoff.json";

async function makeCurrent() {
  const latestDate = await getLatestDate(INPUT_DATASET);
  const offsetDays = dayOffset(latestDate, NOW);

  const syntheticLatest = new Date(latestDate);
  syntheticLatest.setDate(syntheticLatest.getDate() + offsetDays);

  try {
    await transformDataset(
    INPUT_DATASET,
    OUTPUT_DATASET,
    (r: PosRecord): PosRecord => {
      const { date, ...rest } = r;
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + offsetDays);
      return { date: newDate, ...rest };
    }
  );
  } catch (error) {
    console.error(error);
  }

  fs.writeFileSync(
    CUTOFF_PATH,
    JSON.stringify({ cutoff: syntheticLatest.toISOString() })
  );
}

async function getLatestDate(datasetPath: string): Promise<Date> {
  const input = fs.createReadStream(datasetPath);
  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  let latest = new Date(0);
  let i = 0;

  for await (const line of rl) {
    if (i++ === 0) continue;

    const parseResult = parse.posRecord.run(line);
    if (parseResult.isError) {
      throw new parse.ParseError(parseResult.error, i);
    }

    const date = parseResult.result.date;
    if (date > latest) {
      latest = date;
    }
  }

  return latest;
}

/**
 * Find the date offset to add to a date to make it more current.
 */
function dayOffset(td_latest: Date, tc: Date): number {
  const latest = new Date(
    td_latest.getFullYear(),
    td_latest.getMonth(),
    td_latest.getDate()
  );
  const current = new Date(tc.getFullYear(), tc.getMonth(), tc.getDate());
  const msPerDay = 86400000;
  return Math.round((current.getTime() - latest.getTime()) / msPerDay);
}

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("Usage: node make-current.js <inputPath> <outputPath>");
  process.exit(-1);
}
const [INPUT_DATASET, OUTPUT_DATASET] = args;

makeCurrent();
