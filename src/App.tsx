import { useState } from "react";
import "./App.css";
import { DIFFICULTY } from "./enumeration";
import { Questions } from "./page/questions/questions";
import { SelectTrivia } from "./page/selectTrivia";
import { Category } from "./types";

function App() {
  const [triviaSelection, setTriviaSelection] = useState<{
    category: Category;
    difficulty: DIFFICULTY;
  }>();

  return (
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
  );
}

export default App;
