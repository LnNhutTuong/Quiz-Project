import React from "react";

class DisplayInfor extends React.Component {
  render() {
    // sandwich fucking sandwich
    const { listUsers } = this.props;
    // sandwich fucking sandwich

    return (
      <div>
        {listUsers.map((user) => {
          return (
            <div key={user.id}>
              <div>My name's {user.name} </div>
              <div>My age' {user.age}</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayInfor;
