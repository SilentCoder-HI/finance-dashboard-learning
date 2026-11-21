import { Day1LearningPage } from "./day1";
import { Day2LearningPage } from "./day2";
import { Day3LearningPage } from "./day3";
import { Day4LearningPage } from "./day4";
import { Day5LearningPage } from "./day5";
import { Day6LearningPage } from "./day6";
import { Day7LearningPage } from "./day7";
import { Day9LearningPage } from "./day9";
import { Day10LearningPage } from "./day10";
import { Day11LearningPage } from "./day11";

export default function LearningPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
      <Day1LearningPage />
      <Day2LearningPage />
      <Day3LearningPage />
      <Day4LearningPage />
      <Day5LearningPage />
      <Day6LearningPage />
      <Day7LearningPage />
      <Day9LearningPage />
      <Day10LearningPage />
      <Day11LearningPage />
    </div>
  );
}