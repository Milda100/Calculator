import { useState } from "react";
import Container from 'react-bootstrap/Container'
import Keypad from './Keypad';
import { buttons, isOperator } from './buttons';
import Display from './Display';

// Helper function to get the trailing operator chain and its start index.
const getTrailingOperatorChain = (calculation) => {
  let i = calculation.length - 1;
  let opChain = "";
  while (i >= 0 && isOperator(calculation[i])) {
    opChain = calculation[i] + opChain;
    i--;
  }
  // Return the chain and the index where operators begin
  return { opChain, startIndex: i + 1 };
};
// Helper function to get the current number segment (after the last operator).
const getCurrentNumberSegment = (calculation) => {
  const segments = calculation.split(/[\+\-\*\/]/);
  return segments[segments.length - 1] || "";
};

const Calculator = () => {
  const [calculation, setCalculation] = useState("");
  const [result, setResult] = useState("");

  const handleClear = () => {
    setCalculation("");
    setResult("");
  };

  const handleEqual = () => {
    try {
      const evalResult = eval(calculation); // NOTE: For production, consider using a proper math parser.
      // Set both as the new base for subsequent operations.
      setCalculation(evalResult.toString());
      setResult(evalResult.toString());
    } catch (error) {
      setCalculation("Error");
      setResult("");
    }
  };

  const handleOperator = (value) => {
    // When there is no calculation but a previous result exists, start with the result:
    if (calculation === "" && result !== "") {
      setCalculation(result.toString() + value);
      setResult("");
      return;
    }

    if (calculation !== "") {
      const { opChain, startIndex } = getTrailingOperatorChain(calculation);
      if (opChain.length > 0) {
        // Special case: allow negative sign concatenation if valid.
        if (value === "-" && opChain.length === 1 && opChain[0] !== "-") {
          setCalculation(calculation + value);
        } else {
          // Otherwise, replace the entire operator chain.
          setCalculation(calculation.slice(0, startIndex) + value);
        }
      } else {
        // No trailing operator: simply append.
        setCalculation(calculation + value);
      }
    }
  };

  const handleDigitOrDecimal = (value) => {
    // If the current displayed calculation is the evaluated result,
    // start a new expression.
    if (result !== "" && calculation === result.toString()) {
      setCalculation(value.toString());
      setResult("");
      return;
    }

    const newChar = value.toString();
    const currentSegment = getCurrentNumberSegment(calculation);
  
    // If the value is a decimal point, ensure one per number segment.
    if (newChar === ".") {
      if (currentSegment.includes(".")) {
        return;
      }
      // If the current segment is empty (e.g. starting a new number), prepend a "0"
      if (currentSegment === "") {
        setCalculation(calculation + "0.");
        return;
      }
    }

    // Prevent multiple leading zeros.
    if (currentSegment === "0" && newChar === "0") {
      return;
    } else if (currentSegment === "0" && newChar !== ".") {
      setCalculation(calculation.slice(0, calculation.length - 1) + newChar);
    } else {
      setCalculation((prev) => prev + newChar);
    }
  };

  const handleButtonClick = (value) => {
    if (value === "C") {
      handleClear();
    } else if (value === "=") {
      handleEqual();
    } else if (isOperator(value)) {
      handleOperator(value);
    } else {
      handleDigitOrDecimal(value);
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
