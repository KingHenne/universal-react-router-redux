import React from 'react';

export default function Greeting({className, visitor = 'World'}) {
  return <h1 className={className}>Hello {visitor}!</h1>;
}
