import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimalClick = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperationClick = (op: string) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const performCalculation = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return current !== 0 ? prev / current : 0
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display)
      const result = performCalculation(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div className="calculator-body">
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={handleClear} className="button function">C</button>
          <button onClick={handleBackspace} className="button function">←</button>
          <button onClick={() => handleOperationClick('÷')} className="button operator">÷</button>
          <button onClick={() => handleOperationClick('×')} className="button operator">×</button>

          <button onClick={() => handleNumberClick('7')} className="button">7</button>
          <button onClick={() => handleNumberClick('8')} className="button">8</button>
          <button onClick={() => handleNumberClick('9')} className="button">9</button>
          <button onClick={() => handleOperationClick('-')} className="button operator">-</button>

          <button onClick={() => handleNumberClick('4')} className="button">4</button>
          <button onClick={() => handleNumberClick('5')} className="button">5</button>
          <button onClick={() => handleNumberClick('6')} className="button">6</button>
          <button onClick={() => handleOperationClick('+')} className="button operator">+</button>

          <button onClick={() => handleNumberClick('1')} className="button">1</button>
          <button onClick={() => handleNumberClick('2')} className="button">2</button>
          <button onClick={() => handleNumberClick('3')} className="button">3</button>
          <button onClick={handleEquals} className="button equals" style={{ gridRow: 'span 2' }}>=</button>

          <button onClick={() => handleNumberClick('0')} className="button" style={{ gridColumn: 'span 2' }}>0</button>
          <button onClick={handleDecimalClick} className="button">.</button>
        </div>
      </div>
    </div>
  )
}

export default App
