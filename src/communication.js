// Communication ***********************************************************************************

function send(message) {
  const body = Object.keys(message).map(key => `${key}=${message[key]}`).join('&');
  return fetch('/effects', { method: 'POST', body: 'effect=off' })
    .then(() => fetch('/effects', { method: 'POST', body }))
    .then(response => response.text())
    .then((answer) => {
      const result = {};
      answer.trim()
        .split(' ')
        .map(ea => ea.split('='))
        .forEach(([key, value]) => {
          result[key] = value;
        });
      return result;
    });
}

// State Transitions *******************************************************************************

function select(effect, next) {
  return function() {
    send({ effect: effect.name }).then(newState => next(newState));
  };
}

function changeParameter(state, paramName, effectName, next) {
  return function(value) {
    if (state.effect === effectName) {
      send(Object.assign({}, state, { [paramName]: value })).then(newState => next(newState));
    } else {
      send({ effect: effectName, [paramName]: value }).then(newState => next(newState));
    }
  };
}

export { select, send, changeParameter };
