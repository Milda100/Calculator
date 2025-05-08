import { useState } from "react";
import Container from 'react-bootstrap/Container'
import Keypad from './Keypad';
import { buttons, isOperator } from './buttons';
import Display from './Display';

function Calculator() {
    const [calculation, setCalculation] = useState("");
    const [result, setResult] = useState("");


    const handleButtonClick = (value) => {
      // Clear everything
      if (value === "C") {
        setCalculation("");
        setResult("");
      }
      // When "=" is pressed, evaluate the expression
      else if (value === "=") {
        try {
          // Evaluate and then update both calculation and result so that the result appears as the new base.
          const evalResult = eval(calculation);
          setCalculation(evalResult.toString());
          setResult(evalResult.toString());
        } catch (error) {
          setCalculation("Error");
          setResult("");
        }
      }
      // When an operator is pressed
      else if (isOperator(value)) {
        // If there's no current calculation but a result exists, start a new expression
        if (calculation === "" && result !== "") {
          setCalculation(result.toString() + value);
          setResult("");
        }
        // Otherwise, if there is a current calculation...
        else if (calculation !== "") {
          // Build the trailing operator chain
          let i = calculation.length - 1;
          let opChain = "";
          while (i >= 0 && isOperator(calculation[i])) {
            opChain = calculation[i] + opChain;
            i--;
          }
          // If there is a trailing operator chain:
          if (opChain.length > 0) {
            // Special case: if the new operator is "-" and the trailing chain is exactly one operator
            // (which is not already "-"), then allow appending to denote a negative number.
            if (value === "-" && opChain.length === 1 && opChain[0] !== "-") {
              setCalculation(calculation + value);
            }
            // Otherwise, replace the entire operator chain with the new operator.
            else {
              setCalculation(calculation.slice(0, i + 1) + value);
            }
          }
          // In case no trailing operator exists (which is unlikely here) simply append
          else {
            setCalculation(calculation + value);
          }
        }
      }
     
      // For digits or the decimal point:
      else {
        // If a result exists and it's equal to the current calculation,
        // start a new calculation (discarding the previous evaluated value).
        if (result !== "" && calculation === result.toString()) {
          setCalculation(value.toString());
          setResult("");
        } else {
          const newChar = value.toString();
          // Split the current calculation by the operators to get the current number segment.
          const segments = calculation.split(/[\+\-\*\/]/);
          const currentSegment = segments[segments.length - 1] || "";
          
          // If the user pressed the decimal point:
          if (newChar === ".") {
            // If the current number already has a decimal, do nothing.
            if (currentSegment.includes(".")) {
              return;
            }
            // If the current segment is empty, you might want to start with "0."
            // For example, if the calculation is empty or ends with an operator.
            if (currentSegment === "") {
              setCalculation(calculation + "0.");
              return;
            }
          }
          
          // Check for multiple leading zeros:
          // If the current segment is exactly "0" and the new input is "0", do nothing.
          if (currentSegment === "0" && newChar === "0") {
            return;
          }
          // If the current segment is exactly "0" and the new input is not a decimal,
          // replace the current "0" with the new character.
          else if (currentSegment === "0" && newChar !== ".") {
            setCalculation(calculation.slice(0, calculation.length - 1) + newChar);
          } else {
            // Otherwise, simply append the new character.
            setCalculation((prev) => prev + newChar);
          }
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
