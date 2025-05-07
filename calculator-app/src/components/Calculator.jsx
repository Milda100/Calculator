import { useState } from "react";
import Container from 'react-bootstrap/Container'
import Keypad from './Keypad';
import { buttons, isOperator } from './buttons';
import Display from './Display';

function Calculator() {
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
      <Container id="calculator">
        <Display calculation={calculation} result={result} />
        <Keypad buttons={buttons} handleButtonClick={handleButtonClick} />
      </Container>
    </>
  )
}

export default Calculator;
