const state = {
  listeners: []
};

// Communication ***********************************************************************************

function send(message) {
  const body = Object.keys(message).map(key => `${key}=${message[key]}`).join('&');
  const shouldSwitchOff = message.hasOwnProperty('effect');
  return (shouldSwitchOff ? fetch('/effects', { method: 'POST', body: 'effect=off' })
                              .then(() => fetch('/effects', { method: 'POST', body })) :
                            fetch('/effects', { method: 'POST', body }))
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
    })
    .then(serverState => state.listeners.forEach(fn => fn && fn(serverState)));
}

// State Transitions *******************************************************************************

// function select(effect) {
//   return function() {
//     send({ effect: effect.name });
//   };
// }

// function changeParameter(state, paramName, effectName) {
//   return function(value) {
//     if (state.effect === effectName) {
//       send(Object.assign({}, state, { [paramName]: value }));
//     } else {
//       send({ effect: effectName, [paramName]: value });
//     }
//   };
// }

function subscribe(fn) {
  if (state.listeners.length === 0) {
    send({});
  }
  return state.listeners.push(fn);
}

function unsubscribe(id) {
  state.listeners[id - 1] = null;
}

export { send, subscribe, unsubscribe };
