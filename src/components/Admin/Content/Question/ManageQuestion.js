import { FaPlusCircle } from "react-icons/fa";
import { FcUpload } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";

import Select from "react-select";
import { useState } from "react";
import "../../../../assets/styles/Manage/ManageQuestion.scss";

import { v4 as uuidv4 } from "uuid";
import { add, filter, remove } from "lodash";

import _ from "lodash";
const ManageQuestion = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOption, setSelectedOption] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1 of 1",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "answer 2 of 1",
          isCorrect: false,
        },
      ],
    },
    {
      id: uuidv4(),
      description: "question 2",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1 of 2",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "answer 2 of 2",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === add) {
      const newQuestion = {
        id: uuidv4(),
        description: "question 1",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "answer 1 of 1",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
      console.log(">>>Check question after add: ", questions);
    }
    if (type === remove) {
      let cloneQuestions = _.cloneDeep(questions);
      cloneQuestions = cloneQuestions.filter((item) => item.id !== id);
      setQuestions(cloneQuestions);
    }
  };

  const handleAddRemoveAnswer = (type, questionID, answerId) => {
    let cloneQuestions = _.cloneDeep(questions);

    if (type === add) {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = cloneQuestions.findIndex((item) => item.id === questionID);
      cloneQuestions[index].answers.push(newAnswer);
      setQuestions(cloneQuestions);
    }

    if (type === remove) {
      let index = cloneQuestions.findIndex((item) => item.id === questionID);

      cloneQuestions[index].answers = cloneQuestions[index].answers.filter(
        (item) => item.id !== answerId,
      );

      setQuestions(cloneQuestions);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "q") {
      let cloneQuestions = _.cloneDeep(questions);

      let index = cloneQuestions.findIndex((item) => item.id === questionId);
      if (index > -1) {
        cloneQuestions[index].description = value;
        setQuestions(cloneQuestions);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let cloneQuestions = _.cloneDeep(questions);

    let index = cloneQuestions.findIndex((item) => item.id === questionId);

    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      let file = event.target.files[0];
      console.log(">>>>check file", file);

      // cloneQuestions[index].imageFile = file;
      setQuestions(cloneQuestions);
    }
  };

  return (
    <>
      <div className="managequestion-container">
        <div className="title">Manage Question</div>

        <div className="content">
          <div className="add-new-quiz">
            <div className="quiz-content row form-group ms-3">
              <div className="col-7">
                <label>Create new Quiz:</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>

            {questions &&
              questions.length > 0 &&
              questions.map((question, index) => {
                return (
                  <>
                    <div
                      key={question.id}
                      className="qa-content mt-3 ms-5 col-8 "
                    >
                      <div className="question row">
                        <div className="col-9">
                          <label class="form-label">
                            Question {index + 1}:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={question.description}
                            onChange={(event) =>
                              handleOnChange(
                                "q",
                                question.id,
                                event.target.value,
                              )
                            }
                          />
                        </div>
                        {!question.imageFile && (
                          <div className="col-2 upload-img">
                            <label
                              className="form-label label-upload"
                              htmlFor="labelUpload"
                            >
                              Upload image
                              <br />
                              <FcUpload />
                            </label>
                            <input
                              type="file"
                              id="labelUpload"
                              hidden
                              onChange={(event) =>
                                handleOnChangeFileQuestion(question.id, event)
                              }
                            />
                          </div>
                        )}

                        <div className="col-1 button">
                          <div
                            className="btn-add"
                            onClick={() => handleAddRemoveQuestion(add, "")}
                          >
                            <FaPlusCircle />
                          </div>
                          {questions.length > 1 && (
                            <div
                              className="btn-delete"
                              onClick={() =>
                                handleAddRemoveQuestion(remove, question.id)
                              }
                            >
                              <FaTimesCircle />
                            </div>
                          )}
                        </div>
                      </div>

                      {question.answers &&
                        question.answers.length > 0 &&
                        question.answers.map((answer, index) => {
                          return (
                            <>
                              <div
                                key={answer.id}
                                className="answers row ms-5 "
                              >
                                <div className="col-7 form-check">
                                  <label class="form-label">
                                    Answer {index + 1}:
                                  </label>
                                  <input
                                    value={answer.description}
                                    type="text"
                                    className="form-control"
                                    placeholder="describe this answer"
                                  />
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                  />
                                </div>

                                <div className="col-1 button">
                                  <div
                                    className="btn-add"
                                    onClick={() =>
                                      handleAddRemoveAnswer(
                                        add,
                                        question.id,
                                        "",
                                      )
                                    }
                                  >
                                    <FaPlusCircle />
                                  </div>
                                  {question.answers.length > 1 && (
                                    <div
                                      className="btn-delete"
                                      onClick={() =>
                                        handleAddRemoveAnswer(
                                          remove,
                                          question.id,
                                          answer.id,
                                        )
                                      }
                                    >
                                      <FaTimesCircle />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </>
                );
              })}
            <div className="btn-save btn btn-primary mt-3">Save questions</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageQuestion;
