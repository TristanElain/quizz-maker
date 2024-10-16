import { DIFFICULTY } from "../enumeration";

type ShuffledAnswers = {
  shuffledAnswers: string[];
};

export type Question = {
  type: string;
  difficulty: DIFFICULTY;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionWithShuffledAnswder = Question & ShuffledAnswers;

export type QuestionApiResponse = {
  response_code: number;
  results: Question[];
};

export type Answsers = { [key: number]: string };
