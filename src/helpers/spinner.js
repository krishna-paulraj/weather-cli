import ora from "ora";
import cliSpinners from "cli-spinners";

const spinner = ora({
  text: "Feathing Weather..",
  spinner: cliSpinners.weather,
});

export default spinner;
