import React from "react";

class DisplayInfor extends React.Component {
  render() {
    // sandwich fucking this sandwich
    const { name, age } = this.props;
    // sandwich fucking this sandwich

    return (
      <div>
        <div>My name is {name}</div>
        <div>My age {age}</div>
      </div>
    );
  }
}

export default DisplayInfor;
