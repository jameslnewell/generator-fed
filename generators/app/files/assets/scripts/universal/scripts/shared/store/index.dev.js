import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistState} from 'redux-devtools';
import reducer from '../reducers';
import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  typeof window === 'undefined' ? (arg) => arg : persistState(window.location.href.match(
    /[?&]debug_session=([^&]+)\b/
  ))
)(createStore);

/**
 * @param   {Object} initialState
 * @returns {{dispatch: function, getState: function}}
 */
export default function(initialState = {}) {
  return finalCreateStore(reducer, initialState);
}
