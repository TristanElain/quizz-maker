import classnames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DIFFICULTY } from "../../../../enumeration";
import {
  Answsers,
  Category,
  QuestionApiResponse,
  QuestionWithShuffledAnswder,
} from "../../../../types";
import { shuffleArray } from "../../../../utils";

type QuestionsProps = {
  category: Category;
  difficulty: DIFFICULTY;
};

export const Questions = ({ category, difficulty }: QuestionsProps) => {
  const [questions, setQuestions] = useState<QuestionWithShuffledAnswder[]>([]);
  const [answers, setAnswers] = useState<Answsers>({});
  const [showSubmit, setShowSubmit] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${category.id}&difficulty=${difficulty}&type=multiple`
    )
      .then((res): Promise<QuestionApiResponse> => res.json())
      // TODO HANDLE RESPONSE CODE
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
        (questions ?? []).length > 0 &&
        questions.length === Object.keys(answers).length
    );
  }, [setShowSubmit, answers, questions]);

  const onAnswer = (index: number, answer: string) => {
    setAnswers((ans) => ({ ...ans, [index]: answer }));
  };

  return (
    <div>
      {questions?.map(({ question, shuffledAnswers }, index) => {
        return (
          <div key={question}>
            {/* TODO find a more secure way */}
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
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
      {showSubmit && (
        <Link className="button" to={"results"} state={{ questions, answers }}>
          Sumbit
        </Link>
      )}
    </div>
  );
};
