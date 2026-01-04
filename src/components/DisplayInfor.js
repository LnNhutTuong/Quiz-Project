import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";

const DisplayInfor = (props) => {
  const [isShow, setisShow] = useState({ isShow: true });

  const handleOnClick = (event) => {
    setisShow(!isShow);
  };

  // sandwich fucking sandwich
  const { listUsers } = props;
  // sandwich fucking sandwich

  useEffect(() => {
    if (listUsers.length === 0) {
      alert(`ok`);
    }
  }, [listUsers]);

  return (
    <div className="display-infor-container">
      <>
        <div>
          {/* su dung nen () */}
          <span onClick={() => handleOnClick()}>
            {isShow === true ? "Hide list users" : "Show list users"}
          </span>
        </div>
      </>

      {isShow && (
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age >= 18 ? "green" : "red"}>
                <hr />
                <div>
                  <div>My name's {user.name} </div>
                  <div>My age' {user.age}</div>
                </div>
                <div>
                  <button onClick={() => props.DeleteUser(user.id)}>X</button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfor;
