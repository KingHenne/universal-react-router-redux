import React from 'react';

export default function Counter({count, increment, decrement}) {
  return (
    <div>
      <span>Clicked: {count} times</span>
      <div>
        <button onClick={increment.bind(null, 1)}>+</button>
      </div>
      <div>
        <button onClick={decrement.bind(null, 1)}>-</button>
      </div>
    </div>
  );
}
