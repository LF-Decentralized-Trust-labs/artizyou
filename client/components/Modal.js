import React from 'react';
import {FormattedMessage} from 'react-intl';
import ReactModal from 'react-modal';
import styled, {injectGlobal} from 'styled-components';

import IconClose from '../images/icons/close.svg';

const IconCloseModal = styled(IconClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  *{
    fill: ${({theme}) => theme.artz.darkGrey};
  }
`;

const CloseModalBottom = styled.p`
  color:  ${props => props.theme.artz.primaryColor};
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const CloseModalBottomDesc = styled.span`
  padding: 1rem;
  cursor: pointer;
`;

const IconCloseModalBottom = styled(IconClose)`
  position: relative;
  height: 13px;
  width: 13px;
  margin-right: 10px;
  bottom: -1px;
  * {
    fill: ${props => props.theme.artz.primaryColor};
  }
`;

const Modal = ({children, cancelModal, closeModal, opened, closeLabel}) => {

  const closeLocalLabel = closeLabel || 'close';

  return (
    <div>
      <ReactModal
        ariaHideApp={false}
        className={{
          base: 'ReactModal__Content',
          afterOpen: 'ReactModal__Content--after-open',
          beforeClose: 'ReactModal__Content--before-close'
        }}
        isOpen={opened}>
        <IconCloseModal onClick={closeModal}/>
        {children}
        <CloseModalBottom onClick={cancelModal || closeModal}>
          <CloseModalBottomDesc>
            <IconCloseModalBottom/>
            <FormattedMessage id={closeLocalLabel}/>
          </CloseModalBottomDesc>
        </CloseModalBottom>
      </ReactModal>
    </div>
  )
};

injectGlobal`
 .ReactModal__Body--open{
    overflow: hidden;
  }
  .ReactModalPortal {
    z-index: 100;
    position: relative;
    
    .ReactModal__Overlay {
      background-color: rgba(0, 0, 0, 0.55) !important; 
      opacity: 0;
      transition: opacity 0.3s;
      
      &.ReactModal__Overlay--after-open{
        opacity: 1;
      }
      
    .ReactModal__Content {    
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      bottom: auto !important; 
      right: auto !important;
      width: 100%;
      height: 100%;
      max-width: 100%; 
      padding: 60px 20px !important;
      background: white;
      overflow: scroll;
      transform: scale(0.1) translate(-50%,-50%);
      transition: transform 0.3s cubic-bezier(0.000, 0.275, 0.000, 1.000);
      @media (min-width: 576px) {
        width: auto;
        height: auto;
        max-height: 94vh;
        padding: 60px !important;
      }
      &.ReactModal__Content--after-open{
        transform: scale(1) translate(-50%,-50%);
      }
    }
 } 
`;

export default Modal;