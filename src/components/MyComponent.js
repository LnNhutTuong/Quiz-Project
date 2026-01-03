import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Ximen",
    age: 20,
    sex: "Mail",
  };

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name}, I'm {this.state.age} and sex is
        {this.state.sex};
      </div>
    );
  }
}

export default MyComponent;
