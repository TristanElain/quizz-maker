import { DIFFICULTY } from "../enumeration";

export type Question = {
  type: string;
  difficulty: DIFFICULTY;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionApiResponse = {
  response_code: number;
  results: Question[];
};
