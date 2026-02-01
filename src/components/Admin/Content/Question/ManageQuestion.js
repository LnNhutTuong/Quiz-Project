import { FcPlus } from "react-icons/fc";
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

  const [isAdd, setIsAdd] = useState(true);

  // if isAdd show button add
  // else !isAdd show button view or delete

  return (
    <>
      <div className="managequestion-container">
        <div className="title">Manage Question</div>

        <div className="content">
          <div className="add-new-quiz">
            <div className="quiz-content col-9 ms-3 form-group">
              <label>Create new Quiz:</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <div className="qa-content mt-3 ms-5 col-8 ">
              <div className="question row">
                <div className="col-7">
                  <label class="form-label"> Question 1: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="col-3">
                  <label
                    className="form-label label-upload"
                    htmlFor="labelUpload"
                  >
                    <FcPlus /> Upload your image
                  </label>
                  <input type="file" id="labelUpload" hidden />
                </div>
                <div className=" btn-feature col-2">
                  <button>Ok</button>
                  <button>No</button>
                </div>
              </div>

              <div className="answers row ms-5">
                <div className="col-9">
                  <label class="form-label"> Answer 1: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className=" btn-feature col-3 ">
                  <button>Ok</button>
                  <button>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageQuestion;
