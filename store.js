import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import fetch from 'isomorphic-unfetch'

const _initialState = {
  wallet: undefined,
  traqnsaction: undefined
}

export const actionTypes = {
  NO_WALLET: 'NO_WALLET',
  CREATE_WALLET: 'CREATE_WALLET',
  OPEN_WALLET: 'OPEN_WALLET',
  GET_BALANCE: 'GET_BALANCE',
  SEND_TRANSACTION: 'SEND_TRANSACTION',
  SIGN_TRANSACTION: 'SIGN_TRANSACTION',
  SIGNATURE_CHANGE: 'SIGNATURE_CHANGE'
}

// REDUCERS
export const reducer = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNATURE_CHANGE:
    case actionTypes.SIGN_TRANSACTION:
      return Object.assign({}, state, { transaction: { signature: action.signature } })
    case actionTypes.SEND_TRANSACTION:
      return Object.assign({}, state, { transaction: { ...state.transaction, hash: action.hash } })
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
    if (!responseJson.wallet) {
      return console.log(new Error('Create wallet has failed!'))
    }
    dispatch({ type: actionTypes.CREATE_WALLET, wallet: responseJson.wallet })
  })
  .catch(console.log)
}

export const openWallet = (password, privateKey) => dispatch => {
  dispatch({ type: actionTypes.NO_WALLET })
  return fetch(`${process.env.API_URL}/wallet/open`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({privateKey, password})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.wallet) {
      return console.log(new Error('Open wallet has failed!'))
    }
    dispatch({ type: actionTypes.OPEN_WALLET, wallet: responseJson.wallet })
  })
  .catch(console.log)
}

export const noWallet = () => dispatch => {
  dispatch({ type: actionTypes.NO_WALLET })
}

export const getBalance = () => dispatch => {
  dispatch({ type: actionTypes.GET_BALANCE })
}

export const signTransaction = (privateKey, password, recipient, transactionValue) => dispatch => {
  return fetch(`${process.env.API_URL}/transaction/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({privateKey, password, recipient, transactionValue})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.signature) {
      return console.log(new Error('Sign transaction has failed!'))
    }
    dispatch({ type: actionTypes.SIGN_TRANSACTION, signature: responseJson.signature })
  })
  .catch(console.log)
}

export const sendTransaction = (signature) => dispatch => {
  return fetch(`${process.env.NODE_URL}/transaction/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signature)
  })
  .then((response) => ({data: response.json(), status: response.status}))
  .then((result) => {
    if (result.status !== 201 || !result.data.transactionHash) {
      return console.log(new Error('Sign transaction has failed!'))
    }
    dispatch({ type: actionTypes.SEND_TRANSACTION, hash: result.data.transactionHash })
  })
  .catch(console.log)
}

export const signatureChange = (signature) => dispatch => {
  dispatch({ type: actionTypes.SIGNATURE_CHANGE, signature })
}

export const initStore = (initialState = _initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
