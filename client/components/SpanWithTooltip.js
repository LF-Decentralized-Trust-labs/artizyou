import React from 'react';
import styled from 'styled-components';
import {FormattedMessage, injectIntl} from 'react-intl';

const Wrapper = styled.div`
  position: relative;
  border: dotted 3px ${({theme}) => theme.artz.primaryColor};
  margin-bottom: 25px;
  padding: 8px 15px;
  cursor: pointer;
  
  &:hover{
    .tooltiptext{
      visibility: visible;
      opacity:1;
      transition-delay:0s;1
    }
  }
`;

const TooltipText = styled.span`
  width: 100%;
  visibility: hidden;
  opacity: 0;
  background-color: #1b88b3;
  color: #fff;
  box-shadow: 0 2px 5px 2px #828282;
  text-align: center;
  border-radius: 6px;
  padding: 15px;
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  margin-bottom: 15px;
  transition:visibility 0.1s ease 0.1s, opacity 0.1s ease;
  
  &::after{
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    margin-top: -20px;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #1b88b3 transparent transparent transparent;
  }
`;

const SpanWithTooltip = (props) => {
  return (
    <Wrapper {...props}>
      <FormattedMessage id={props.textId}/>
      <TooltipText className={'tooltiptext'}>
        <FormattedMessage id={props.tooltipTextId}/>
      </TooltipText>
    </Wrapper>
  );
};

export default SpanWithTooltip;
