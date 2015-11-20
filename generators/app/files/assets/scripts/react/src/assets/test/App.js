import React from 'react';
import $ from 'react-testutils-query';
import render from 'react-testutils-render';

import chai, {expect} from 'chai';
import jsxChai from 'jsx-chai';

import App from '../App';

chai.use(jsxChai);

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
      expect($('h1', element)).to.deep.equal(
        <h1>Hello World</h1>
      );
    });

  });

});
