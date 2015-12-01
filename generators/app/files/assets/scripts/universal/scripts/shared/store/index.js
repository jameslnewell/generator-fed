/* eslint-disable global-require, import/no-require */
let createStore = null;

if (process.env.NODE_ENV === 'production') {
  createStore = require('./index.prod').default;
} else {
  createStore = require('./index.dev').default;
}

export default createStore;
