import React, { Component } from "react";
import "./Calculator.css";
import Display from "../components/Display";
import Button from "../components/Button";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentIndex: 0,
};
export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.currentIndex === 0) {
      this.setState({ operation, currentIndex: 1, clearDisplay: true });
    } else {
      const typedEquals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      const operationsFunctions = {
        "+": (left, right) => left + right,
        "-": (left, right) => left - right,
        "/": (left, right) => left / right,
        "*": (left, right) => left * right,
      };

      let result = "";

      try {
        result = operationsFunctions[currentOperation](values[0], values[1]);
      } catch (error) {
        result = this.state.values[0];
      }

      values[0] = isNaN(result) ? "0" : result;
      values[1] = 0;
      this.setState({
        displayValue: values[0].toString().includes(".")
          ? values[0].toFixed(2)
          : values[0].toString(),
        operation: typedEquals ? null : operation,
        currentIndex: typedEquals ? 0 : 1,
        clearDisplay: !typedEquals,
        values,
      });
    }
  }

  addDigit(num) {
    if (num === "." && this.state.displayValue.indexOf(num) !== -1) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + num;

    this.setState({ displayValue, clearDisplay: false });

    if (num !== ".") {
      const i = this.state.currentIndex;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} double result />
      </div>
    );
  }
}
