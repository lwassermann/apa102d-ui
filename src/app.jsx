import React from 'react';

import './app.css';
import Effect from './effect';
import effects from './effects.json';

function App() {
  const effectNodes = effects.map(effect => (<Effect {...effect} />));

  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">Lorem ipsum dolor sit amet</p>
      {effectNodes}
    </div>
  );
}

export default App;
