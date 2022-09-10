import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button} from './components/button/Button.tsx';
import { Keypad } from './containers/keypad/KeyPad.tsx';
import { Display } from './containers/display/Display.tsx';
import Box from '@mui/material/Box';
import { evaluate } from 'mathjs';

function App() {
  const [displayValue, setDisplayValue] = React.useState("");
  const [accValue, setAccValue] = React.useState("");
  const [lastValueType, setLastValueType] = React.useState();
  console.log({ accValue, displayValue, lastValueType});
  console.log(evaluate('3.3*6'));

  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

  const handleClickFunctionKey = (newValue) => {
    switch(newValue) {
      case "%": {
        if(lastValueType === "numeric") {
          const finalVal = evaluate(accValue)/100
          setAccValue(finalVal);
          setDisplayValue(finalVal);
        }
        else if(lastValueType === "operator") {
          const finalVal =  evaluate(accValue.slice(0, -1)/100);
          setAccValue(finalVal);
          setDisplayValue(finalVal);
        }
        setLastValueType("numeric");
        break;
      }
      case "+/-":{
        if(lastValueType === "numeric") {
          const finalVal = -evaluate(accValue)
          setAccValue(finalVal);
          setDisplayValue(finalVal);
        }
        else if(lastValueType === "operator") {
          const finalVal =  -evaluate(accValue.slice(0, -1));
          setAccValue(finalVal);
          setDisplayValue(finalVal);
        }
        setLastValueType("numeric");
        break;
      }
      case "AC": {
        setDisplayValue("");
        setAccValue("");
        setLastValueType("");
        break;
      }
      case ".": {
        
        if(String(displayValue).indexOf(".") === -1) {
          if(lastValueType === "numeric") {
            setDisplayValue(displayVal => displayVal + ".")
            setAccValue(accValue => accValue + ".")
          }
          else {
            setDisplayValue("0.");
            setAccValue(accValue => accValue+ "0.")
          }
        }
        else {
          //handleerror
        }
        setLastValueType("numeric");
        break;
      }
    }
  }
  const handleClickNumericKey = (newValue) => {
    setAccValue(accVal => accVal + newValue);
    setLastValueType("numeric");
    if(lastValueType === "numeric") {
      setDisplayValue(dv => dv + String(newValue));
    }
    else {
      setDisplayValue(String(newValue))
    }
  }

  const handleClickOperator = (newValue) => {
    if(newValue === "="){
      const updatedAccVal = lastValueType === "operator" ? accValue.slice(0, -1): accValue;
      //log removing operator
      const evaluatedVal = evaluate(updatedAccVal);
      setDisplayValue(evaluatedVal)
      setLastValueType("numeric");
      setAccValue(evaluatedVal)
      return;
    }
    if(lastValueType === "numeric") {
      setAccValue(accValue => accValue+String(newValue))
      setLastValueType("operator")
    }
    else if(lastValueType === "operator") {
      setAccValue(accValue => accValue.slice(0, -1) + String(newValue));
      setLastValueType("operator")
    }
  }

  const onKeyClick = (newValue, keyType) => {
    switch (keyType) {
       case "fx": handleClickFunctionKey(newValue); break;
       case "numeric": handleClickNumericKey(newValue); break;
       case "operator": handleClickOperator(newValue); break;
    }
 }
  return (
    <Box>
      <Box p={1} m={10} backgroundColor="black" width="fit-content">
        <Display value={displayValue} setValue={() => {}}/>
        <Keypad onKeyClick={onKeyClick} />
      </Box>
    </Box>
  );
}

export default App;
