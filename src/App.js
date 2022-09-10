import React from 'react';
import { Typography, Box } from '@mui/material';

import { Keypad } from './containers/KeyPad.tsx';
import { Display } from './containers/Display.tsx';
import NumberUtils from './utils/NumberUtils';

function App() {
  const [displayValue, setDisplayValue] = React.useState("");
  const [accValue, setAccValue] = React.useState("");
  const [isLastCharOperator, setIsLastCharOperator] = React.useState(false);

  const cleanAccValue = () => {
    return isLastCharOperator ? accValue.slice(0, -1): accValue;
  }

  const reset = () => {
    setDisplayValue("");
    setAccValue("");
    setIsLastCharOperator(false);
  }

  const handlePercentageClick = () => {
    const updatedDisplayValue = NumberUtils.trimDecimals(displayValue/100);
    const cleanedAccValue =  cleanAccValue();
    const updatedAccVal = NumberUtils.removeLastNChar(cleanedAccValue, String(displayValue).length) + updatedDisplayValue;
    setAccValue(updatedAccVal);
    setDisplayValue(updatedDisplayValue);
  }

  const handleSignChange = () => {
    const updatedDisplayValue = -displayValue;
    const cleanedAccValue =  cleanAccValue();
    const updatedAccVal = NumberUtils.removeLastNChar(cleanedAccValue, String(displayValue).length) + updatedDisplayValue;
    setDisplayValue(updatedDisplayValue); 
    setAccValue(updatedAccVal);
  }

  const handleDecimalFunction = () => {
    if(!isLastCharOperator && String(displayValue).indexOf(".") !== -1) {
      return
    };
    const updatedChar = isLastCharOperator ? "0." : ".";
    const updatedDisplayValue = isLastCharOperator ? "0." : (displayValue + ".");
    setDisplayValue(updatedDisplayValue);
    setAccValue(accValue => accValue + updatedChar);
  }

  const onFunctionKeyClick = (newValue) => {
    switch(newValue) {
      case "%": handlePercentageClick(); break;
      case "+/-": handleSignChange(); break;
      case "AC": reset(); break;
      case ".": handleDecimalFunction(); break;
    }
    setIsLastCharOperator(false);
  }

  const onNumericKeyClick = (newValue) => {
    setAccValue(accVal => accVal + String(newValue));
    setIsLastCharOperator(false);
    if(isLastCharOperator) {
      setDisplayValue(String(newValue))
    }
    else {
      setDisplayValue(displayVal => displayVal + String(newValue));
    }
  }

  const onEvaluate = () => {
    const evaluatedVal = NumberUtils.evaluateExpression(cleanAccValue());
    const trimmedVal = NumberUtils.trimDecimals(evaluatedVal, 4);
    setDisplayValue(String(trimmedVal));
    setAccValue(String(trimmedVal));
    setIsLastCharOperator(false);
  }

  const onOperatorClick = (newValue) => {
    if(newValue === "="){
      onEvaluate();
      return;
    }
    const updatedAccVal = cleanAccValue() + newValue;
    setAccValue(updatedAccVal);
    setIsLastCharOperator(true);
  }

  const onKeyClick = (newValue, keyType) => {
    switch (keyType) {
       case "fx": onFunctionKeyClick(newValue); break;
       case "numeric": onNumericKeyClick(newValue); break;
       case "operator": onOperatorClick(newValue); break;
    }
 }
 
 const onDisplayInputChange = (updatedDisplayValue) => {
  const updatedAccVal = NumberUtils.removeLastNChar(accValue, displayValue.length) + updatedDisplayValue;
  setDisplayValue(updatedDisplayValue);
  setAccValue(updatedAccVal);
 }

  return (
      <Box>
        <Box p={1} m={10} backgroundColor="black" width="fit-content">
          <Display value={displayValue} onInputChange={onDisplayInputChange}/>
          <Keypad onKeyClick={onKeyClick} />
        </Box>
        <Box m={10} p={2} border="1px solid black">
          <Typography> Current Expression: {accValue} </Typography>
        </Box>
      </Box>
  );
}

export default App;
