import React, {PureComponent, Fragment} from 'react';
import ValidationError from './ValidationError';
import {FormattedMessage} from 'react-intl';

class Required extends PureComponent {
  renderError = () => {
    const {hasError, message, errorName} = this.props;

    const messageTextId = message || 'error.mandatory';

    if (!hasError) {
      return null;
    }

    return (
      <ValidationError className={`error-${errorName}`}>
        <FormattedMessage id={messageTextId} />
      </ValidationError>
    );
  };

  render() {
    const {children} = this.props;

    return (
      <Fragment>
        {children}
        {this.renderError()}
      </Fragment>
    );
  }
}

export default Required;