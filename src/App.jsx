import { useState } from "react"
import { numbers, operators } from "./constants"
import $ from 'jquery';

const App = () => {
  const [input, setInput] = useState('0');
  const [formula, setFormula] = useState('');

  const handleNumber = (number) => {
    if (!$('#formula').text() || $('#formula').text() === '0') {
      setInput(`${number}`);
      setFormula(`${number}`);
    } else if ( /[-+*/]$/.test(formula) ) {
      setInput(`${number}`);
      setFormula(`${formula}${number}`);
    } else if ( /[-+*/]0$/.test(formula) ) {
      setInput(`${number}`);
      setFormula(`${formula.slice(0, formula.length - 1)}${number}`);
    } else {
      setInput(`${input}${number}`);
      setFormula(`${formula}${number}`);
    }
  };

  const handleDecimal = () => {
    if (input.indexOf('.') === -1 && /\d/.test(input)) {
      setInput(`${input}.`);
      !$('#formula').text() 
        ? setFormula('0.') 
        : setFormula(`${formula}.`);
    } 
    if ( /[-+*/]/.test(input) ) {
      setInput('0.');
      setFormula(`${formula}0.`);
    }
  }

  const handleOperator = (operator) => {
    if (operator === 'x') {
      operator = '*';
    }

    if (!$('#formula').text()) {
      setInput(`${operator}`);
      operator === '-' 
        ? setFormula(`${operator}`) // negative number
        : setFormula(`${input}${operator}`); // 0 followed by operator
    }
    
    if ( /[^-+*/]$/.test(formula) ) { // last char is number/decimal
      setInput(`${operator}`);
      /[.]$/.test(formula) 
        ? setFormula(`${formula}0${operator}`) 
        : setFormula(`${formula}${operator}`);
    } else { // last char is operator
      setInput(`${operator}`);
      if ( /\d[-+*/]$/.test(formula) ) {
          operator !== '-' 
            ? setFormula(`${formula.slice(0, formula.length - 1)}${operator}`)
            : setFormula(`${formula}${operator}`);
      }
      if ( /[-+*/][-+*/]$/.test(formula) && operator !== '-' ) {
          setFormula(`${formula.slice(0, formula.length - 2)}${operator}`); 
      }
    }
  }

  // TODO: handleEquals function

  const handleClear = () => {
    setInput('0');
    setFormula('');
  }

  return (
    <div>
      <div id="formula" style={{ height: '18px', }}>{formula}</div>
      <div id="display" style={{ height: '18px', }}>{input}</div>
      <button id="equals" type="button">=</button>
      
      {numbers.map((number) => (
        <button 
          key={number.id} 
          id={number.id} 
          type="button"
          onClick={() => handleNumber(number.text)}
        >{number.text}</button>
      ))}

      {operators.map((operator) => (
        <button 
          key={operator.id}
          id={operator.id} 
          className='operator'
          type="button"
          onClick={() => handleOperator(operator.text)}
        >{operator.text}</button>
      ))}

      <button id="decimal" type="button" onClick={handleDecimal}>.</button>
      <button id="clear" type="button" onClick={handleClear}>AC</button>
    </div>
  )
}

export default App