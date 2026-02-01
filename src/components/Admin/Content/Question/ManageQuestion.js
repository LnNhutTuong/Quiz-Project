import { FaPlusCircle } from "react-icons/fa";
import { FcUpload } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";

import Select from "react-select";
import { useState } from "react";
import "../../../../assets/styles/Manage/ManageQuestion.scss";

const ManageQuestion = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

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
            <div className="qa-content mt-3 ms-5 col-8 ">
              <div className="question row">
                <div className="col-9">
                  <label class="form-label"> Question index: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the question here"
                  />
                </div>
                <div className="col-2 upload-img">
                  <label
                    className="form-label label-upload"
                    htmlFor="labelUpload"
                  >
                    Upload image
                    <br />
                    <FcUpload />
                  </label>
                  <input type="file" id="labelUpload" hidden />
                </div>
                <div className="col-1 button">
                  <div className="btn-add">
                    <FaPlusCircle />
                  </div>
                  <div className="btn-delete">
                    <FaTimesCircle />
                  </div>
                </div>
              </div>

              <div className="answers row ms-5 mt-2">
                <div className="col-7">
                  <label class="form-label"> Answer index: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the answer content"
                  />
                </div>
                <div className="col-1 button">
                  <div className="btn-add">
                    <FaPlusCircle />
                  </div>
                  <div className="btn-delete">
                    <FaTimesCircle />
                  </div>
                </div>
              </div>
              <div className="btn-save btn btn-primary mt-3">
                Save questions
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageQuestion;
