import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {StripeProvider} from 'react-stripe-elements';

import App from './components/App';
import store from "./store";

const {__PRELOADED_STATE__} = global;
const {redux, ...remainingState} = __PRELOADED_STATE__;

const Artizyou = (
  <Provider store={store}>
    <StripeProvider apiKey={process.env.STRIPE_KEY} >
      <BrowserRouter>
        <App {...remainingState}/>
      </BrowserRouter>
    </StripeProvider>
  </Provider>
);

hydrate(
  Artizyou,
  document.getElementById('app'),
);
