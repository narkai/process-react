import React from 'react';
import { render } from 'react-dom';

import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import { performRequest } from './api.js'

import './index.css'
import App from './App.js';

//

const productsInitial = {
  fetching: false,
  products: [],
}

function products(state = productsInitial, action)
{
  switch (action.type) {
    case 'PRODUCTS_REQUEST':
      return {
        ...state,
        fetching: true
      }
    case 'PRODUCTS_FETCH_SUCCESS':
      return {
        ...state,
        fetching: false,
        products: action.products
      }
    case 'PRODUCTS_FETCH_FAILURE':
      return state
    default:
      return state
  }
}

const appReducer = combineReducers({
  products
})

const state = (state, action) => {
  return appReducer(state, action)
}

function productsRequest()
{
  return { type: 'PRODUCTS_REQUEST' }
}
function productsSuccess(products)
{
  return { type: 'PRODUCTS_FETCH_SUCCESS', products: products }
}
function productsFailure()
{
  return { type: 'PRODUCTS_FETCH_FAILURE' }
}

export function productsFetch()
{
  return (dispatch) => {
    dispatch(productsRequest())
    performRequest('get', 'pages/products?children=true', false)
    .then(response => {
      return dispatch(productsSuccess(response.data.children))
    })
    .catch(() => {
      return dispatch(productsFailure())
    })
  }
}

let middlewares = [thunkMiddleware]
export const store = createStore(state, applyMiddleware(...middlewares))

//

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

export default App;
