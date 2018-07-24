import * as React from "react";

const Logo = "https://logrocket.com/img/logo.png";

class FirstComponent extends React.Component <{}> {
  render() {
    return (
      <div>
        <h1>A Simple React Component Example with Typescript</h1>
        <div>
          <img src={Logo} />
        </div>
        <p>I am a component which shows the logrocket logo. For more info on Logrocket, please visit Https://logrocket.com</p>
      </div>
    );
  }
}

export default FirstComponent;
