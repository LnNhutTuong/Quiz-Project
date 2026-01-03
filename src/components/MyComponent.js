import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  //JSX
  render() {
    return (
      <div>
        <UserInfor />
        <br></br>
        <DisplayInfor name="Skibidi" age="99" />
        <hr />
        <DisplayInfor name="snvv nghen" age="22" />
      </div>
    );
  }
}

export default MyComponent;
