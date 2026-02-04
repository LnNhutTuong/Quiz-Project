import { FaPlusCircle } from "react-icons/fa";
import { FcUpload } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import Select from "react-select";
import { useState, useEffect } from "react";
import "../../../../assets/styles/Manage/ManageQuestion.scss";

import { v4 as uuidv4 } from "uuid";

import { add, remove } from "lodash";
import _ from "lodash";

import {
  getAllQuiz,
  postNewQuestion,
  postNewAnswer,
} from "../../../../API/services/admin.service";

const ManageQuestion = () => {
  const [selectedQuiz, setselectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    const res = await getAllQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const [open, setOpen] = useState({ open: false, src: "", title: "" });

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === add) {
      const newQuestion = {
        id: uuidv4(),
        description: "describe this question",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
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

      cloneQuestions[index].imageFile = file;
      cloneQuestions[index].imageName = file.name;
      // (URL.createObjectURL(file));

      setQuestions(cloneQuestions);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, event) => {
    let cloneQuestions = _.cloneDeep(questions);
    let index = cloneQuestions.findIndex((item) => item.id === questionId);

    if (index > -1) {
      cloneQuestions[index].answers = cloneQuestions[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "checkbox") {
              answer.isCorrect = event;
            }
            if (type === "input") {
              answer.description = event;
            }
          }
          return answer;
        },
      );

      setQuestions(cloneQuestions);
    }
  };

  const hanldeSave = async () => {
    //validate
    for (let question of questions) {
      let q = await postNewQuestion(
        +selectedQuiz.value,
        question.description,
        question.imageFile,
      );

      for (let answer of question.answers) {
        await postNewAnswer(answer.description, answer.isCorrect, q.DT.id);
      }
    }
    console.log(">>>>Check ques: ", listQuiz);
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
                  defaultValue={selectedQuiz}
                  onChange={(option) => {
                    setselectedQuiz(option);
                  }}
                  options={listQuiz}
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

                        <div className="col-2 upload-img">
                          <label
                            className="form-label label-upload"
                            htmlFor={`${question.id}`}
                          >
                            <input
                              type="file"
                              id={`${question.id}`}
                              hidden
                              onChange={(event) =>
                                handleOnChangeFileQuestion(question.id, event)
                              }
                            />
                            <FcUpload />
                          </label>
                          <span>
                            {question.imageName ? (
                              <span
                                onClick={() => {
                                  setOpen({
                                    open: true,
                                    src: URL.createObjectURL(
                                      question.imageFile,
                                    ),
                                    title: question.imageName,
                                  });
                                }}
                              >
                                {question.imageName}
                              </span>
                            ) : (
                              " Upload image"
                            )}
                          </span>
                        </div>
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
                                    onChange={(event) =>
                                      handleAnswerQuestion(
                                        "input",
                                        answer.id,
                                        question.id,
                                        event.target.value,
                                      )
                                    }
                                  />
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    check={answer.isCorrect}
                                    onChange={(event) =>
                                      handleAnswerQuestion(
                                        "checkbox",
                                        answer.id,
                                        question.id,
                                        event.target.checked,
                                      )
                                    }
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
            <div
              className="btn-save btn btn-primary mt-3"
              onClick={() => hanldeSave()}
            >
              Save questions
            </div>
            <Lightbox
              open={open.open}
              close={() => setOpen({ ...open, open: false })}
              plugins={[Captions]}
              slides={[
                {
                  src: open.src,
                  title: open.title,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageQuestion;
