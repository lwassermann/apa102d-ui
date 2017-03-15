const state = {
  listeners: [],
  current: null
};

const ENDPOINT = '/api/effects';

// Communication ***********************************************************************************

function updateState(serverState) {
  state.current = serverState;
  state.listeners.forEach(fn => fn && fn(serverState));
  return state.current;
}

function send(message) {
  const body = Object.keys(message).map(key => `${key}=${message[key]}`).join('&');
  const shouldSwitchOff = message.hasOwnProperty('effect');
  return (shouldSwitchOff
    ? fetch(ENDPOINT, { method: 'POST', body: 'effect=off' })
      .then(() => fetch(ENDPOINT, { method: 'POST', body }))
    : fetch(ENDPOINT, { method: 'POST', body }))
  .then(response => response.text())
  .then((answer) => {
    const result = {};
    answer.trim()
      .split(' ')
      .map(ea => ea.split('='))
      .forEach(([key, value]) => {
        if (key) { result[key] = value; }
      });
    return result;
  })
  .then(updateState);
}

// State Transitions *******************************************************************************

function selectEffect(effectName) {
  return function() {
    send({ effect: effectName });
  };
}

function changeParameter(paramName, effectName) {
  return function(value) {
    if (state.current.effect === effectName) {
      send(Object.assign({}, state.current, { [paramName]: value }));
    } else {
      send({ effect: effectName, [paramName]: value });
    }
  };
}

function subscribe(fn) {
  if (state.listeners.length === 0) {
    send({});
  }
  return state.listeners.push(fn);
}

function unsubscribe(id) {
  state.listeners[id - 1] = null;
}

export { send, subscribe, unsubscribe, selectEffect, changeParameter };
