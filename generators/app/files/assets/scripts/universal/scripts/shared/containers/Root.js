/* eslint-disable global-require, import/no-require */
let Root = null;

if (process.env.NODE_ENV === 'production') {
  Root = require('./Root.prod').default;
} else {
  Root = require('./Root.dev').default;
}

export default Root;
