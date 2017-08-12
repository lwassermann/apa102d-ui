const state = {
  listeners: [],
  current: null
}

global.getState = () => state

const ENDPOINT = '/api/effects'

// Communication ***********************************************************************************

function updateState(serverState) {
  state.current = serverState
  state.listeners.forEach(fn => fn && fn(serverState))
  return state.current
}

function send(message) {
  const body = Object.keys(message).map(key => `${key}=${message[key]}`).join('&')
  const shouldSwitchOff = message.hasOwnProperty('effect')
  return (shouldSwitchOff
    ? fetch(ENDPOINT, { method: 'POST', body: 'effect=off' }).then(() =>
        fetch(ENDPOINT, { method: 'POST', body })
      )
    : fetch(ENDPOINT, { method: 'POST', body }))
    .then(response => response.text())
    .then(answer => {
      const result = {}
      answer //
        .trim()
        .split(' ')
        .map(ea => ea.split('='))
        .forEach(([key, value]) => {
          if (key) {
            result[key] = value
          }
        })
      return result
    })
    .then(updateState)
}

// State Transitions *******************************************************************************

function changeParameter(paramName, value, effectName) {
  if (state.current.effect === effectName) {
    return send(Object.assign({}, state.current, { [paramName]: value }))
  }

  return send({ effect: effectName, [paramName]: value })
}

function subscribe(fn) {
  if (state.listeners.length === 0) {
    send({})
  }
  return state.listeners.push(fn)
}

function unsubscribe(id) {
  state.listeners[id - 1] = null
}

export { send, subscribe, unsubscribe, changeParameter }
