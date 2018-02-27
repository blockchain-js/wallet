import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import fetch from 'isomorphic-unfetch'

const _initialState = {
  wallet: undefined
}

export const actionTypes = {
  NO_WALLET: 'NO_WALLET',
  CREATE_WALLET: 'CREATE_WALLET',
  OPEN_WALLET: 'OPEN_WALLET'
}

// REDUCERS
export const reducer = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.NO_WALLET:
      return Object.assign({}, state, { wallet: undefined })
    case actionTypes.OPEN_WALLET:
      return Object.assign({}, state, { wallet: action.wallet })
    case actionTypes.CREATE_WALLET:
      return Object.assign({}, state, { wallet: Object.assign({}, action.wallet, {isNew: true}) })
    default: return state
  }
}

// ACTIONS
export const createWallet = (password) => dispatch => {
  dispatch({ type: actionTypes.NO_WALLET })
  return fetch(`${process.env.API_URL}/wallet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.wallet || !responseJson.ok) {
      return console.log(new Error('Create wallet has failed!'))
    }
    dispatch({ type: actionTypes.CREATE_WALLET, wallet: responseJson.wallet })
  })
  .catch(console.log)
}

export const openWallet = (password, privateKey) => dispatch => {
  dispatch({ type: actionTypes.NO_WALLET })
  return fetch(`${process.env.API_URL}/wallet`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({privateKey, password})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.wallet || !responseJson.ok) {
      return console.log(new Error('Open wallet has failed!'))
    }
    dispatch({ type: actionTypes.OPEN_WALLET, wallet: responseJson.wallet })
  })
  .catch(console.log)
}

export const noWallet = () => dispatch => {
  dispatch({ type: actionTypes.NO_WALLET })
}

export const initStore = (initialState = _initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
