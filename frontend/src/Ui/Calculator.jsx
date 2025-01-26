import React from 'react'

const Calculator = () => {
  const [expression, setExpression] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');

  const handleInput = (value) => {
    // Only allow numbers, operators, brackets, decimal and comma
    if (/^[0-9+\-*/()\.,\s]*$/.test(value)) {
      setExpression(value);
      setError('');
    }
  };

  const checkParenthesis = (expr) => {
    const stack = [];
    for (let char of expr) {
      if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        if (stack.length === 0) return false;
        stack.pop();
      }
    }
    return stack.length === 0;
  };

  const calculateResult = () => {
    try {
      if (!checkParenthesis(expression)) {
        setError('Mismatched parentheses');
        setResult('');
        return;
      }

      // Replace any commas with dots for decimal calculation
      const sanitizedExpression = expression.replace(/,/g, '.');
      // Use Function constructor to safely evaluate the mathematical expression
      const result = Function('"use strict";return (' + sanitizedExpression + ')')();
      setResult(result.toString());
      setError('');
    } catch (error) {
      setError('Invalid expression');
      setResult('');
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setExpression('');
      setResult('');
      setError('');
    } else {
      setExpression(prev => prev + value);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 p-4 bg-zinc-100 rounded-xl w-80">
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="bg-white w-full py-2 px-4 border-none rounded-xl"
            placeholder="Enter expression..."
          />
          <button 
            onClick={() => handleButtonClick('=')}
            className="bg-teal-500 text-white px-4 rounded-xl"
          >
            =
          </button>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {result && (
          <div className="bg-white p-2 rounded-xl">
            Result: {result}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Calculator
