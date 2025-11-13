import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {flushChunkNames} from 'react-universal-component/server'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import flushChunks from 'webpack-flush-chunks'

import App from './components/App';
import stats from './dist/stats';
import store from "./store";

const context = {};
const sheet = new ServerStyleSheet();
const {__PRELOADED_STATE__} = global;
const {redux, ...remainingState} = __PRELOADED_STATE__;

const Artizyou = (
  <Provider store={store}>
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter context={context} location={remainingState.location}>
        <App {...remainingState}/>
      </StaticRouter>
    </StyleSheetManager>
  </Provider>

);

const html = renderToString(Artizyou);

const {scripts} = flushChunks(stats, {
  before: ['manifest', 'vendor'],
  chunkNames: flushChunkNames(),
});

global.exports = {
  styles: sheet.getStyleTags(),
  html,
  scripts,
};