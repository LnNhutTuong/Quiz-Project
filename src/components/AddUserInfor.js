import React from "react";

class AddUserInfor extends React.Component {
  state = {
    name: "",
    age: "",
  };

  handleClick(event) {
    console.log("Clicked");

    this.setState({
      name: "Nhut tuong dep trai",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnChangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    this.props.AddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + `-random`,
      name: this.state.name,
      age: this.state.age,
    });
  };

  render() {
    return (
      <div>
        My name is {this.state.name}, I'm {this.state.age} and sex is {""}
        {this.state.sex}
        <br></br>
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <label>Your name:</label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => {
              this.handleOnChangeName(event);
            }}
          ></input>
          <button>submit</button>

          <br></br>

          <label>Your age:</label>
          <input
            value={this.state.age}
            type="text"
            onChange={(event) => {
              this.handleOnChangeAge(event);
            }}
          ></input>
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfor;
