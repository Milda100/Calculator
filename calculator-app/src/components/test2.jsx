// When an operator is pressed.
else if (isOperator(value)) {
    // CHANGED: If no current expression but there’s a previous result, start with that.
    if (!calculation && result) {
      setCalculation(result + value);
      setResult("");
      return;
    }
  
    // CHANGED: Build the chain of consecutive operators at the end.
    let opChain = "";
    let i = calculation.length - 1;
    while (i >= 0 && isOperator(calculation[i])) {
      opChain = calculation[i] + opChain;
      i--;
    }
  
    if (opChain === "") {
      // CHANGED: No trailing operators present.
      try {
        const evalResult = eval(calculation);
        // CHANGED: Immediately update display with evaluated result plus the new operator.
        setCalculation(evalResult.toString() + value);
        setResult("");
      } catch (e) {
        setCalculation("Error");
      }
      return;
    } else {
      // CHANGED: If there is already an operator chain.
      // Special case: if the new operator is "-" and the current chain is exactly one operator (and isn't "-")
      if (value === "-" && opChain.length === 1 && opChain !== "-") {
        setCalculation(calculation + value);
        return;
      } else {
        // CHANGED: Otherwise, replace the entire consecutive operator chain with the new operator.
        // 'i' is currently the index of the last non-operator character.
        const newCalc = calculation.slice(0, i + 1) + value;
        setCalculation(newCalc);
        return;
      }
    }
  }