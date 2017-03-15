import React from 'react';

import './effect.css';

import Parameter from './parameters';
import { selectEffect, changeParameter } from './communication';

function updateEffect(effect, parameterName) {
  return value => changeParameter(parameterName, value, effect.name);
}

function Effect(props) {
  const parameters = Object.keys(props.parameters)
  .map(parameterName => (
    <Parameter
      key={parameterName}
      name={parameterName}
      {...props.parameters[parameterName]}
      currentValue={props.state[parameterName]}
      onChange={updateEffect(props, parameterName)}
    />
  ));

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
  parameters: React.PropTypes.shape({}),
  state: React.PropTypes.shape({})
};

Effect.defaultProps = {
  active: false,
  parameters: {},
  state: {}
};

export default Effect;
