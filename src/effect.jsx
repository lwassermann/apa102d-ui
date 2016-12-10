import React from 'react';

import './effect.css';

import Color from './parameters/color';
import { send } from './communication';

function selectEffect(name) {
  return () => {
    send({ effect: name });
  };
}

function updateEffect(name, props) {
  return (arg) => {
    console.log(name, props, arg);
  };
}

function Effect(props) {
  const parameters = Object.keys(props.parameters)
  .map(parameterName => (<Parameter
    key={parameterName}
    name={parameterName}
    {...props.parameters[parameterName]}
    onChange={updateEffect(name, props)}
  />));

  return (
    <div className={props.active ? 'effect active' : 'effect'}>
      <div className="effect-header" onClick={selectEffect(props.name)}>
        {props.name}
      </div>
      <div className="effect-parameters">
        {parameters}
      </div>
    </div>
  );
}

Effect.propTypes = {
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  parameters: React.PropTypes.shape({})
};

Effect.defaultProps = {
  parameters: {}
};

function Parameter(props) {
  switch (props.type) {
    case 'color': return (<Color {...props} />);
    case 'time': return (<div>Time {props.name}</div>);
    default: return (<div>Unknown Type {props.type} {props.name}</div>);
  }
}
Parameter.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Effect;
