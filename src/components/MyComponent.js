import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

const MyComponent = (props) => {
  const [listUsers, setListUser] = useState([
    { id: 1, name: "Ximen", age: "10" },
    { id: 2, name: "Nhut Tuong", age: "20" },
    { id: 3, name: "Lemon", age: "30" },
  ]);

  const handleAddNewUser = (userObj) => {
    setListUser([userObj, ...listUsers]);
  };

  const handleDeleteUser = (userid) => {
    let listClone = listUsers;
    listClone = listClone.filter((item) => item.id !== userid);
    setListUser(listClone);
  };

  return (
    <>
      <div className="a">
        {/* cha sang con ko can () */}
        <AddUserInfor AddNewUser={handleAddNewUser} />
      </div>
      <div className="b">
        <DisplayInfor listUsers={listUsers} DeleteUser={handleDeleteUser} />
      </div>
    </>
  );
};
export default MyComponent;
