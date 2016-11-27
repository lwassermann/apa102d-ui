import React from 'react';

import './effect.css';

function Effect(props) {
  const parameters = Object.keys(props.parameters)
  .map(parameterName => (<Parameter
    key={parameterName}
    name={parameterName}
    {...props.parameters[parameterName]}
  />));

  return (
    <div className={props.active ? 'effect active' : 'effect'}>
      <div className="effect-header">
        {props.name}
      </div>
      {parameters}
    </div>
  );
}

Effect.propTypes = {
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.boolean,
  parameters: React.PropTypes.object
};

Effect.defaultProps = {
  parameters: {}
};

function Parameter(props) {
  switch (props.type) {
    case 'color': return (<div>Color {props.name}</div>);
    case 'time': return (<div>Time {props.name}</div>);
    default: return (<div>Unknown Type {props.type} {props.name}</div>);
  }
}
Parameter.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Effect;
