import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Root from './containers/Root';
import Home from './components/pages/Home';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home}/>
  </Route>
);
