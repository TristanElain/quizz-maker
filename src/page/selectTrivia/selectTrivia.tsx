import { ChangeEvent, useEffect, useState } from "react";
import { DIFFICULTY } from "../../enumeration/difficulty.enum";
import { Category, CategoryApiResponse } from "../../types";

type SelectTriviaProps = {
  onSelect: (category: Category, difficulty: DIFFICULTY) => void;
};

export const SelectTrivia = ({ onSelect }: SelectTriviaProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DIFFICULTY>();

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then(({ trivia_categories }: CategoryApiResponse) =>
        setCategories(trivia_categories)
      );
  }, [setCategories]);

  const onSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      setSelectedCategory(
        categories.find(({ id }) => String(id) === event.target.value)
      );
    }
  };

  const onSelectDiffiulty = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      setSelectedDifficulty(event.target.value as DIFFICULTY);
    }
  };

  const onSubmit = () => {
    if (selectedCategory && selectedDifficulty) {
      onSelect(selectedCategory, selectedDifficulty);
    }
  };

  return (
    <div>
      <select name="category" id="categorySelect" onChange={onSelectCategory}>
        <option value={undefined}>Select category</option>
        {categories?.map(({ id, name }) => (
          <option key={id + name} value={id}>
            {name}
          </option>
        ))}
      </select>
      <select
        name="difficulty"
        id="difficultySelect"
        onChange={onSelectDiffiulty}
      >
        <option value={undefined}>Select difficulty</option>
        <option value={DIFFICULTY.EASY}>{DIFFICULTY.EASY}</option>
        <option value={DIFFICULTY.MEDIUM}>{DIFFICULTY.MEDIUM}</option>
        <option value={DIFFICULTY.HARD}>{DIFFICULTY.HARD}</option>
      </select>
      <button
        id="createBtn"
        onClick={onSubmit}
        disabled={!selectedCategory || !selectedDifficulty}
      >
        Create
      </button>
    </div>
  );
};
