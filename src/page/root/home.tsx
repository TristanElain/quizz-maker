import { useState } from "react";
import { DIFFICULTY } from "../../enumeration";
import { Category } from "../../types";
import { Questions } from "./components/questions/questions";
import { SelectTrivia } from "./components/selectTrivia";

export const Home = () => {
  const [triviaSelection, setTriviaSelection] = useState<{
    category: Category;
    difficulty: DIFFICULTY;
  }>();

  return (
    <>
      <h1>Quizz Maker</h1>
      <div>
        <SelectTrivia
          onSelect={(category, difficulty) =>
            setTriviaSelection({ category, difficulty })
          }
        />
        {triviaSelection && (
          <Questions
            category={triviaSelection.category}
            difficulty={triviaSelection.difficulty}
          />
        )}
      </div>
    </>
  );
};
