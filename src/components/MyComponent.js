import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Ximen",
    age: 20,
    sex: "Mail",
  };

  handleClick(event) {
    console.log("Clicked");

    this.setState({
      name: "Nhut tuong dep trai",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  handleOnChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name}, I'm {this.state.age} and sex is
        {this.state.sex}
        <br></br>
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            onChange={(event) => {
              this.handleOnChange(event);
            }}
          ></input>
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
