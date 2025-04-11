#!/usr/bin/env node
import arg from "arg";
import fs from "fs";
import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { getLocationInfo } from "../src/lib/getLocation.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

try {
  const args = arg({
    "--setApi": String,
    "--showapi": Boolean,
    "--setCity": String,
    "--location": Boolean,
    "--help": Boolean,
  });

  let city = args["--setCity"] || process.env.CITY;

  if (args["--setApi"]) {
    const existing = fs.existsSync(envPath)
      ? fs.readFileSync(envPath, "utf-8")
      : "";
    const newEnv = existing.replace(/API_KEY=.*/g, "").trim();
    const apiKey = `API_KEY="${args["--setApi"]}"`;
    fs.writeFileSync(envPath, `${newEnv}\n${apiKey}\n`);
    console.log(chalk.green("✅ API key saved!"));
  }

  if (args["--showapi"]) {
    console.log("🔑 API_KEY:", process.env.API_KEY || "Not set in .env");
  }

  if (args["--setCity"]) {
    const existing = fs.existsSync(envPath)
      ? fs.readFileSync(envPath, "utf-8")
      : "";
    const newEnv = existing.replace(/CITY=.*/g, "").trim();
    const cityKey = `CITY="${args["--setCity"]}"`;
    fs.writeFileSync(envPath, `${newEnv}\n${cityKey}\n`);
    console.log(chalk.green(`📍 City saved as "${args["--setCity"]}"`));
  }

  if (args["--location"]) {
    getLocationInfo(city);
  }

  if (args["--help"]) {
    usage();
  }
} catch (error) {
  console.log(error);
  usage();
}

function usage() {
  console.log(
    chalk.bold.cyanBright(
      "\n🌤️  windy CLI - Your weather terminal companion\n",
    ) +
      chalk.whiteBright("Usage: ") +
      chalk.green("windy [command]") +
      "\n\n" +
      chalk.whiteBright("Options:\n") +
      `  ${chalk.green("--setApi")}    Set the API key      ${chalk.gray("<your-api-key>")}\n` +
      `  ${chalk.green("--showapi")}   Show the saved API key\n` +
      `  ${chalk.green("--help")}      Show usage/help info\n`,
  );
}
