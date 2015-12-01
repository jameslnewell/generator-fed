import React from 'react';
import $ from 'react-testutils-query';
import render from 'react-testutils-render';

import App from '../../../shared/containers/App.jsx';

describe('App', () => {

  describe('.constructor()', () => {

    it('should...', () => {
      const component = render(<App/>).component;
      expect(component.props).to.exist;
    });

  });

  describe('.render()', () => {

    it('should render the message', () => {
      const element = render(<App/>).element;
      expect($('div', element)).to.deep.equal(
        <div>Page not found. ☹</div>
      );
    });

  });

});
