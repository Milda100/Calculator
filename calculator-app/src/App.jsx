import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


  const buttons = [
    { value: "C", id: "clear" },
    { value: "<3", id: "heart"},
    { value: "/", id: "divide" },
    { value: 7, id: "seven" },
    { value: 8, id: "eight" },
    { value: 9, id: "nine" },
    { value: "*", id: "multiply" },
    { value: 4, id: "four" },
    { value: 5, id: "five" },
    { value: 6, id: "six" },
    { value: "-", id: "subtract" },
    { value: 1, id: "one" },
    { value: 2, id: "two" },
    { value: 3, id: "three" },
    { value: "+", id: "add" },
    { value: 0, id: "zero" },
    { value: ".", id: "decimal" },
    { value: "=", id: "equals" },
  ];

  const isOperator = (char) => ["/", "*", "-", "+"].includes(char);

function App() {

  const [calculation, setCalculation] = useState("");
  const [result, setResult] = useState("");


  const handleButtonClick = (value) => {

    if (value === "C") {
      setCalculation("");
      setResult("");
    }
    // Evaluate the entire expression when "=" is pressed.
    else if (value === "=") {
      try {
        const evalResult = eval(calculation);
        setResult(evalResult.toString());
      } catch (error) {
        setResult("Error");
      }
    }
    // When an operator is pressed:
    else if (isOperator(value)) {
      if (calculation === "" && result !== "") {
        setCalculation(result.toString() + value);
        setResult("");
      } else if (calculation !== "") {
        const lastChar = calculation.slice(-1);
        if (isOperator(lastChar)) {
          // Replace the last operator with the new one.
          setCalculation(calculation.slice(0, -1) + value);
        } else {
          try {
            const evalResult = eval(calculation);
            // Immediately update the display with the evaluated result and the new operator.
            setCalculation(evalResult.toString() + value);
            setResult("");
          } catch (error) {
            setCalculation("Error");
          }
        }
      }
    }
    // For digits or the decimal point:
    else {
      if (result !== "" && calculation === "") {
        setCalculation(value.toString());
        setResult("");
      } else {
        setCalculation((prev) => prev + value.toString());
      }
    }
  };

  return (
    <>
      <h1>Welcome to the Calculator App</h1>
      <Container id="calculator">
      <div id="display">{calculation || "0"}</div>
        {result !== "" && <div>{result}</div>}
          <div id="keypad">
          {buttons.map(({ id, value }) => {
            // buttons span 2 columns
            const gridColumn = (id === 'clear' || id === 'equals')
              ? 'span 2'
              : 'span 1';
            return (
              <Button
                key={id}
                id={id}
                onClick={() => handleButtonClick(value)}
                variant="secondary"
                style={{ gridColumn }}
              >
                {value}
              </Button>
            );
          })}
          </div>
          <p>Made with ❤️ by Milda</p>
      </Container>
    </>
  )
}

export default App

