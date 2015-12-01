import React from 'react';
import App from './App';

/**
 * Return the app
 * @param   {object} props
 * @returns {XML}
 */
export default function Root(props) {
  return (
    <App {...props}/>
  );
}
