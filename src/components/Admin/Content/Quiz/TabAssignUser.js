import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuiz, getAllUser } from "../../../../API/services/admin.service";

const TabAssignUser = (props) => {
  const [selectedQuiz, setselectedQuiz] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
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

  const fetchAllUser = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  return (
    <div className="tab-assign-user-containerClasses row">
      <div className="col-6 form-group">
        <label>Select QUIZ</label>
        <Select
          isSearchable={false}
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
      <div className="col-6 form-group">
        <label>Select User</label>
        <Select
          isSearchable={false}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 1056,
            }),
          }}
          placeholder="Select..."
          value={selectedUser}
          onChange={(option) => {
            setSelectedUser(option);
          }}
          options={listUser}
        />
      </div>
      <div className="mt-2">
        <button className="btn btn-primary">Assign user</button>
      </div>
    </div>
  );
};
export default TabAssignUser;
