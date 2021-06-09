import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      warning: false,
    };
  }

  decrement = () => {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({ counter: counter - 1, warning: false });
    } else {
      this.setState({ warning: true });
    }
  }

  render() {
    const { counter, warning } = this.state;
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is {counter}</h1>
        <button
          data-test="increment-button"
          onClick={() => this.setState({ counter: counter + 1 })}
        >
          Increment
        </button>
        <button
          data-test="decrement-button"
          onClick={this.decrement}
        >
          Decrement
        </button>
        {warning && <p data-test="warning-display">It can not be negative</p>}
      </div>
    );
  }
}

export default App;
