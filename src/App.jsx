import { Button, Display, NumberButton, OperatorButton } from "./components"
import { numbers, operators } from "./constants"

const App = () => {
  return (
    <div>
      <main className="calculator">
        <Display />
        <Button id="equals" text="="/>
        {numbers.map(number => (
          <NumberButton 
            key={number.key}
            id={number.key}
            text={number.text}
          />
        ))}
        {operators.map(operator => (
          <OperatorButton
            key={operator.id}
            id={operator.id}
            text={operator.text} 
          />
        ))}
        <Button id="decimal" text="."/>
        <Button id="clear" text="AC"/>

      </main>
    </div>
  )
}

export default App