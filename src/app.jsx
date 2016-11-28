import React from 'react';

import './app.css';
import Effect from './effect';
import effects from './effects.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      effect: 'off'
    };
  }

  render() {
    const effectNodes = effects.map((effect) => {
      if (effect.name === this.state.effect) {
        return (<Effect key={effect.name} {...effect} active {...this.state} />);
      }
      return (<Effect key={effect.name} {...effect} />);
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>APA102 Daemon control</h2>
        </div>
        <p className="App-intro">Lorem ipsum dolor sit amet</p>
        <div>
          {effectNodes}
        </div>
      </div>
    );
  }
}

export default App;
