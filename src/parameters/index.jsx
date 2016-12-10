import React from 'react';

import Color from './color';
import './parameters.css';

function Parameter(props) {
  switch (props.type) {
    case 'color': return (<Color {...props} />);
    case 'time': return (<div className="parameter">Time {props.name}</div>);
    default: return (<div className="parameter">Unknown Type {props.type} {props.name}</div>);
  }
}
Parameter.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Parameter;
