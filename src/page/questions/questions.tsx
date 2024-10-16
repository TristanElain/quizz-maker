import classnames from "classnames";
import { useEffect, useState } from "react";
import { DIFFICULTY } from "../../enumeration";
import { Category, Question, QuestionApiResponse } from "../../types";
import { shuffleArray } from "../../utils";
import "./questions.css";

type QuestionsProps = {
  category: Category;
  difficulty: DIFFICULTY;
};

type ShuffledAnswers = {
  shuffledAnswers: string[];
};

export const Questions = ({ category, difficulty }: QuestionsProps) => {
  const [questions, setQuestions] = useState<(Question & ShuffledAnswers)[]>(
    []
  );
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showSubmit, setShowSubmit] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${category.id}&difficulty=${difficulty}&type=multiple`
    )
      .then((res): Promise<QuestionApiResponse> => res.json())
      .then(({ results }) => {
        setQuestions(
          results.map((question) => ({
            ...question,
            shuffledAnswers: shuffleArray([
              question.correct_answer,
              ...question.incorrect_answers,
            ]),
          }))
        );
      });
  }, [setQuestions, category, difficulty]);

  useEffect(() => {
    setShowSubmit(
      () =>
        questions && answers && questions.length === Object.keys(answers).length
    );
  }, [setShowSubmit, answers, questions]);

  const onAnswer = (index: number, answer: string) => {
    setAnswers((ans) => ({ ...ans, [index]: answer }));
  };

  return (
    <div>
      {questions?.map(({ question, shuffledAnswers }, index) => {
        return (
          <div>
            <p>{question}</p>
            <div>
              {shuffledAnswers.map((answer) => (
                <button
                  key={question + answer}
                  className={classnames("answser", {
                    selected: answers[index] === answer,
                  })}
                  onClick={() => onAnswer(index, answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <br />
      {showSubmit && <button className="submit">Sumbit</button>}
    </div>
  );
};
