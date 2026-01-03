import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Ximen", age: "10" },
      { id: 2, name: "Nhut Tuong", age: "20" },
      { id: 3, name: "Lemon", age: "30" },
    ],
  };

  //JSX
  render() {
    const myAge = 19;
    const myInfor = [`a`, `b`, `c`];

    //DRY: Don't repeat yourself

    return (
      <div>
        <UserInfor />
        <br></br>
        <DisplayInfor listUsers={this.state.listUsers} />
        <hr />
      </div>
    );
  }
}

export default MyComponent;
