import React, {PureComponent} from 'react';
import {createPortal} from 'react-dom';
import styled, {keyframes} from 'styled-components';
import {FormattedMessage} from 'react-intl'

import IconClose from './../images/icons/close.svg';

const slide = keyframes`
  from {
    transform: translate(1000px, 0);
  }
  1% {
    transform: translate(0, 0);
  }  
  99% {
    transform: translate(0, 0); 
  }
  to {
    transform: translate(1000px, 0);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 0;
  padding: 27px;
  width: 100%;
  background: ${({error, theme}) =>  error ? theme.artz.errorColor : theme.artz.successColor};
  box-shadow: 0 0 25px 0 rgba(0,0,0,0.2);
  color: white;
  z-index: 9999;
    
	animation: ${slide} 30s linear 1 forwards;
	
	${props => props.theme.artz.breakpoint.md} {
	  width: 400px;
    margin: 20px;
  }
`;

const Title = styled.p`
  margin-bottom: 5px;
  font-size: 1.5rem;
`;

const IconCloseNotification = styled(IconClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

class Notification extends PureComponent {
  static count = 0;

  componentWillMount() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  renderTitle = () => {
    const {error} = this.props;

    if (error) {
      return <Title><FormattedMessage id="error_title"/></Title>;
    }
    return <Title><FormattedMessage id="success_title"/></Title>;
  };

  render() {
    const {children, error, key, onClose, ...remainingProps} = this.props;

    const className = error ? 'error' : 'success';

    return createPortal(
      <Wrapper key={key} className={`${className}-notification`} error={error} {...remainingProps}>
        <IconCloseNotification onClick={onClose} />
        {this.renderTitle()}
        {children}
      </Wrapper>
      , this.element);
  }
}

export default Notification;