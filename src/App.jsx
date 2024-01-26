import { useState } from "react";
import { numbers, operators } from "./constants";
import $ from "jquery";
import { evaluate } from "mathjs";

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
    } else if ( /=/.test(formula) ) {
      setInput(`${number}`);
      setFormula(`${number}`);
    } else {
      setInput(`${input}${number}`);
      setFormula(`${formula}${number}`);
    }
  };

  const handleDecimal = () => {
    if ( /=/.test(formula) ) {
      setInput('0.');
      setFormula('0.');
    }
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

    if ( /=/.test(formula) ) {
      setInput(`${operator}`);
      setFormula(`${input}${operator}`);
    }
  }

  const handleEquals = () => {
    let result = evaluate(formula);
    if (result === undefined) { result = 'NaN' }

    setInput(result);
    setFormula(`${formula}=${result}`)
  }

  const handleClear = () => {
    setInput('0');
    setFormula('');
  }

  return (
    <main className="container">
      <div className="calculator">
        <div className="output">
          <div id="formula">{formula}</div>
          <div id="display">{input}</div>
        </div>
        
        <div className="input">
          <button id="clear" type="button" onClick={handleClear}>AC</button>
          
          {numbers.map((number) => (
            <button 
              key={number.id} 
              id={number.id} 
              className="number"
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
          <button id="equals" type="button" onClick={handleEquals}>=</button>
        </div>
      </div>
    </main>
  )
}

export default App