import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

/**
 * @param   {Object} initialState
 * @returns {{dispatch: function, getState: function}}
 */
export default function(initialState = {}) {
  return applyMiddleware(thunk)(createStore)(reducer, initialState);
}
