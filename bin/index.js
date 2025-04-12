#!/usr/bin/env node
import arg from "arg";
import fs from "fs";
import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { getLocationInfo } from "../src/lib/getLocation.js";
import { getWeatherToday } from "../src/lib/getWeatherToday.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

try {
  const args = arg({
    "--apiKey": String,
    "--setCity": String,
    "--today": Boolean,
    "--key": Boolean,
    "--location": Boolean,
    "--help": Boolean,
  });

  let city = args["--setCity"] || process.env.CITY;

  if (args["--apiKey"]) {
    const existing = fs.existsSync(envPath)
      ? fs.readFileSync(envPath, "utf-8")
      : "";
    const newEnv = existing.replace(/API_KEY=.*/g, "").trim();
    const apiKey = `API_KEY="${args["--apiKey"]}"`;
    fs.writeFileSync(envPath, `${newEnv}\n${apiKey}\n`);
    console.log(chalk.green("✅ API key saved!"));
  }

  if (args["--key"]) {
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

  if (args["--today"]) {
    getWeatherToday(city);
  }

  if (args["--location"]) {
    getLocationInfo(city);
  }

  if (args["--help"]) {
    usage();
  }
} catch (error) {
  usage();
}

function usage() {
  console.log(
    chalk.bold.cyanBright(
      "\n🌤️  windio CLI - Your weather terminal companion\n",
    ) +
      chalk.whiteBright("Usage: ") +
      chalk.green("windio [command]") +
      "\n\n" +
      chalk.whiteBright("Options:\n") +
      `  ${chalk.green("--today")}     Get the weather data of your location\n` +
      `  ${chalk.green("--location")}  Get your location\n` +
      `  ${chalk.green("--setCity")}   Set your location\n` +
      `  ${chalk.green("--apiKey")}    Set the API key      ${chalk.gray("<your-api-key>")}\n` +
      `  ${chalk.green("--key")}       Show the saved API key\n` +
      `  ${chalk.green("--help")}      Show usage/help info\n`,
  );
}
