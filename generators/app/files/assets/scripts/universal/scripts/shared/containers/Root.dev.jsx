import React from 'react';
import App from './App';
import DevTools from './DevTools';

/**
 * Return the app with dev tools
 * @param   {object} props
 * @returns {XML}
 */
export default function Root(props) {
  return (
    <div>
      <App {...props}/>
      <DevTools/>
    </div>
  );
}
