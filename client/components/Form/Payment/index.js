import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import {Elements} from 'react-stripe-elements';

import FormPaymentElements from './Elements';
import FormPaymentInitializing from './Initializing';
import withNewCreation from "../../../containers/withNewCreation";
import withUser from "../../../containers/withUser";

class FormPayment extends PureComponent {
  render () {
    if (!BROWSER) {
      return <FormPaymentInitializing/>;
    }

    return (
      <Elements>
        <FormPaymentElements {...this.props}/>
      </Elements>
    );
  }
};

export default withUser(withNewCreation(FormPayment));