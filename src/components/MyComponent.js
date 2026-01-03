import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  //JSX
  render() {
    const myAge = 19;
    const myInfor = [`a`, `b`, `c`];
    return (
      <div>
        <UserInfor />
        <br></br>
        <DisplayInfor name="Skibidi" age="99" />
        <hr />
        {/* hard code like below */}
        <DisplayInfor name="snvv nghen" age={myAge} />
        <hr />
        <DisplayInfor name="snvv nghen" age={22} />
        {/* hard code like above */}
        <hr />
        <DisplayInfor name="snvv nghen" age={myAge} myInfor={myInfor} />
      </div>
    );
  }
}

export default MyComponent;
