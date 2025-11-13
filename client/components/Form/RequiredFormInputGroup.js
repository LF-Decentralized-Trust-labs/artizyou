import React, {PureComponent} from 'react';
import ValidationError from './ValidationError';
import Label from './Label';
import InputGroup from './InputGroup';
import {FormattedMessage} from 'react-intl';
import theme from "../../styles/theme";


class RequiredFormInputGroup extends PureComponent {
  renderError = () => {
    const {hasError, message, name} = this.props;

    let messageTextId = message || 'error.mandatory';

    if (message === 'username exists' && name === 'username') {
      messageTextId = 'error.usernameExists';
    }

    if (message === 'first market year error' && name === 'firstMarketUse') {
      messageTextId = 'error.firstMarketUseYearError';
    }

    if (!hasError) {
      return null;
    }

    return (
      <ValidationError className={`error-${name}`}>
        <FormattedMessage id={messageTextId}/>
      </ValidationError>
    );
  };

  render() {
    const {labelId, children, ...remainingProps} = this.props;

    return (
      <InputGroup {...remainingProps}>
        <Label><FormattedMessage id={labelId}/> <span
          style={{color: theme.artz.primaryColor}}>*</span> </Label>
        {children}
        {this.renderError()}
      </InputGroup>
    );
  }
}

export default RequiredFormInputGroup;
