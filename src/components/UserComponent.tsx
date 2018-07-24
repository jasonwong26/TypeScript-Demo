import * as React from "react";
import IUser from "../models/tutorial_1";

class UserComponent extends React.Component<IUser, {}> {
  constructor(props: IUser) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>User Component</h1>
        Hello, {this.props.name}
        <br/>
        You are {this.props.age} years old,
        <br/>
        You live at: {this.props.address}
        <br/>
        you were born: {this.props.dob.toDateString()}
      </div>
    );
  }
}

export default UserComponent;
