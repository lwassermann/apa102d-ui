import React from 'react';

import './effect.css';

import Parameter from './parameters';
import { selectEffect } from './communication';

function updateEffect(props) {
  return (paramName, value) => {
    console.log(props, paramName, value);
    // const parameters = Object.assign({}, { [paramName]: value })
    // send({ effect: name, ...parameters });
  };
}

function Effect(props) {
  const parameters = Object.keys(props.parameters)
  .map(parameterName => (<Parameter
    key={parameterName}
    name={parameterName}
    {...props.parameters[parameterName]}
    onChange={updateEffect(props)}
  />));

  return (
    <div className={props.active ? 'effect active' : 'effect'}>
      <button className="effect-header" onClick={selectEffect(props.name)}>
        {props.name}
      </button>
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
  active: false,
  parameters: {}
};

export default Effect;
