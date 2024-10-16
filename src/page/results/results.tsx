import classNames from "classnames";
import { useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Answsers, QuestionWithShuffledAnswder } from "../../types";

type LocationState = {
  questions: QuestionWithShuffledAnswder[];
  answers: Answsers;
};

export const Results = () => {
  const location = useLocation();

  const { questions, answers } = location.state as LocationState;
  const score: number = useMemo(() => {
    return Object.entries(answers).filter(
      ([index, answer]) => answer === questions[+index]?.correct_answer
    ).length;
  }, [answers, questions]);

  return (
    <>
      <h1>Results</h1>
      <div>
        {questions?.map(
          ({ question, shuffledAnswers, correct_answer }, index) => {
            return (
              <div key={question}>
                {/* TODO find a more secure way */}
                <p dangerouslySetInnerHTML={{ __html: question }}></p>
                <div>
                  {shuffledAnswers.map((answer) => (
                    <button
                      key={question + answer}
                      className={classNames("answser", {
                        correct: correct_answer === answer,
                        incorrect:
                          answers[index] === answer &&
                          correct_answer !== answer,
                      })}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
      <p
        className={classNames({
          red: score < 2,
          yellow: score < 4,
          green: score >= 4,
        })}
      >
        You scored {score} out of {questions.length}
      </p>
      <Link className="button" to={"/"}>
        Create a new quizz
      </Link>
    </>
  );
};
