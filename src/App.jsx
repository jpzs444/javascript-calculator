import { useState } from "react"
import { numbers, operators } from "./constants"
import $ from 'jquery';

const App = () => {
  const [input, setInput] = useState('0');
  const [formula, setFormula] = useState('');

  const handleNumber = (number) => {
    if (!$('#formula').text()) {
      setInput(`${number}`);
      setFormula(`${number}`);
    } else {
      setInput(`${input}${number}`);
      setFormula(`${input}${number}`);
    }
  };

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
        >{operator.text}</button>
      ))}

      <button id="decimal" type="button">.</button>
      <button id="clear" type="button" onClick={handleClear}>AC</button>
    </div>
  )
}

export default App