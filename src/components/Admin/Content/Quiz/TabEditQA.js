import { FaPlusCircle } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { toast } from "react-toastify";

import "yet-another-react-lightbox/plugins/captions.css";

import Select from "react-select";
import { useState, useEffect } from "react";
import "../../../../assets/styles/Manage/ManageQuestion.scss";

import { v4 as uuidv4, validate } from "uuid";

import { add, clone, remove } from "lodash";
import _ from "lodash";

import {
  getAllQuiz,
  postNewQuestion,
  postNewAnswer,
} from "../../../../API/services/admin.service";

const TabEditQA = () => {
  const [selectedQuiz, setselectedQuiz] = useState(null);
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

  //tiet kiem
  const [open, setOpen] = useState({ open: false, src: "", title: "" });

  //Khoi tao
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isValid: true, //khi tao luon dung
      isTouched: false, // khi tao chua dung vo
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValid: true,
          isTouched: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValid: true,
          isTouched: false,
        },
      ],
    },
  ];

  const [questions, setQuestions] = useState(initQuestions);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === add) {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        isValid: true, //khi tao luon dung
        isTouched: false, // khi tao chua dung vo
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
            isValid: true, //khi tao luon dung
            isTouched: false, // khi tao chua dung vo
          },
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
            isValid: true, //khi tao luon dung
            isTouched: false, // khi tao chua dung vo
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
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
        isValid: null,
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
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    //validate Question
    let questionErrorIndex = -1;
    const cloneQuestion = _.cloneDeep(questions);
    for (let i = 0; i < cloneQuestion.length; i++) {
      if (cloneQuestion[i].description.trim() === "") {
        cloneQuestion[i].isValid = false;
        cloneQuestion[i].isTouched = true;

        if (questionErrorIndex === -1) {
          questionErrorIndex = i;
        }
      } else {
        cloneQuestion[i].isValid = true;
        cloneQuestion[i].isTouched = true;
      }
    }

    //neu co loi thi set cai thang ques thanh cai thang co loi
    if (questionErrorIndex !== -1) {
      setQuestions(cloneQuestion);
      toast.error(`Question: ${questionErrorIndex + 1} is empty`);
      return;
    }

    //validate Answer
    let answerErrorDescription = null;
    let answerErrorisCorrect = null;
    let indexQ = -1,
      indexA = -1;
    for (let i = 0; i < cloneQuestion.length; i++) {
      let hasCorrect = false; //flag
      for (let j = 0; j < cloneQuestion[i].answers.length; j++) {
        //validate description
        if (!cloneQuestion[i].answers[j].description) {
          answerErrorDescription = true;
          cloneQuestion[i].answers[j].isValid = false;
          cloneQuestion[i].answers[j].isTouched = true;
          indexQ = i;
          indexA = j;
          break;
        } else {
          cloneQuestion[i].answers[j].isValid = true;
          cloneQuestion[i].answers[j].isTouched = true;
        }

        //validate isCorrect
        if (cloneQuestion[i].answers[j].isCorrect) {
          hasCorrect = true;
        }
      }

      if (!hasCorrect) {
        answerErrorisCorrect = true;
        indexQ = i;
        // indexA = -1;
        break;
      }
      if (answerErrorisCorrect || answerErrorDescription) {
        break;
      }
    }

    if (answerErrorDescription) {
      setQuestions(cloneQuestion);
      toast.error(`Answer ${+indexA + 1} of Question ${indexQ + 1} is Empty`);
      return;
    }

    if (answerErrorisCorrect) {
      setQuestions(cloneQuestion);
      toast.error(`Question ${indexQ + 1} isn't have choose correct `);
      return;
    }

    // submit questions
    for (let question of questions) {
      let q = await postNewQuestion(
        +selectedQuiz.value,
        question.description,
        question.imageFile,
      );

      //submit answers
      for (let answer of question.answers) {
        await postNewAnswer(answer.description, answer.isCorrect, q.DT.id);
      }
    }

    toast.success("Create questions and answers success!");
    setQuestions(initQuestions);
  };

  return (
    <>
      <div className="managequestion-container">
        <div className="title">Update QA Quiz</div>

        <div className="content">
          <div className="add-new-quiz">
            <div className="quiz-content row form-group ms-3">
              <div className="col-7">
                <label>Select QUIZ</label>
                <Select
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 1056,
                    }),
                  }}
                  placeholder="Select..."
                  value={selectedQuiz}
                  onChange={(option) => {
                    setselectedQuiz(option);
                  }}
                  options={listQuiz}
                />
              </div>
            </div>

            <div className="mt-2">
              <label> Add questions</label>
              {questions &&
                questions.length > 0 &&
                questions.map((question, index) => {
                  return (
                    <>
                      <div
                        key={question.id}
                        className="qa-content mt-3 ms-5 col-8 "
                      >
                        <div className="question row ">
                          <div className="col-9 form-floating">
                            <input
                              id={`floatingQuestion-${question.id}`}
                              type="text"
                              className={`form-control ${
                                question.isValid === true ? "" : "is-invalid"
                              }`}
                              value={question.description}
                              placeholder=""
                              onChange={(event) =>
                                handleOnChange(
                                  "q",
                                  question.id,
                                  event.target.value,
                                )
                              }
                            />
                            <label htmlFor={`floatingQuestion-${question.id}`}>
                              Question {index + 1}'s description
                            </label>
                          </div>

                          <div className="col-2 upload-img">
                            <label
                              className="form-label label-upload"
                              htmlFor={`upload-${question.id}`}
                            >
                              <input
                                type="file"
                                id={`upload-${question.id}`}
                                hidden
                                onChange={(event) =>
                                  handleOnChangeFileQuestion(question.id, event)
                                }
                              />
                              <FaFileUpload />
                              <span>
                                {question.imageName ? (
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setOpen({
                                        open: true,
                                        src: URL.createObjectURL(
                                          question.imageFile,
                                        ),
                                        title: question.imageName,
                                      });
                                    }}
                                    className="exist-img"
                                  >
                                    {question.imageName}
                                  </span>
                                ) : (
                                  "Upload image"
                                )}
                              </span>
                            </label>
                          </div>

                          <div className="col-1 button ms-2">
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
                                  className="answers row ms-5 align-items-center"
                                >
                                  <div className="col-auto">
                                    <input
                                      className="form-check-input mt-2 p-2"
                                      type="checkbox"
                                      checked={answer.isCorrect}
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

                                  <div className="col-7 form-floating mt-3">
                                    <input
                                      id={`floatingAnswer-${answer.id}`}
                                      type="text"
                                      value={answer.description}
                                      placeholder={`Answer ${index + 1}`}
                                      className={`form-control ${
                                        answer.isValid === false
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      onChange={(event) =>
                                        handleAnswerQuestion(
                                          "input",
                                          answer.id,
                                          question.id,
                                          event.target.value,
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={`floatingAnswer-${answer.id}`}
                                    >
                                      Answer {index + 1}
                                    </label>
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
            </div>

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

export default TabEditQA;
