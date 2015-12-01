import React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import rev from 'rev-manifest-path';

const assetPath = rev({manifest: './dist/rev-manifest.json'});

/**
 * Wrap the app in the necessary HTML for rendering on the server
 * @returns {object}
 */
function html({state, children}) {

  const head = Helmet.rewind();
  const content = children && renderToString(children);

  return (
    <html>
      <head>
        {head && head.title && head.title.toComponent()}
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href={assetPath('bundled.css')}/>
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        <script dangerouslySetInnerHTML={{__html: `window.__state__=${JSON.stringify(state)}`}}/>
        <script src={assetPath('bundled.js')}></script>
      </body>
    </html>
  );

}

html.propTypes = {
  state: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired
};

export default html;
