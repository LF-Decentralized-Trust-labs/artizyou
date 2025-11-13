import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {FormattedMessage, injectIntl} from 'react-intl';

const Wrapper = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
  font-weight: bold;
  color: ${({theme}) => theme.artz.primaryColor};
  cursor: pointer;
  &:hover{
    text-decoration: underline;
    color: #1b88b3;
    .tooltiptext{
      visibility: visible;
      opacity:1;
      transition-delay:0s;1
    }
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  min-width: 300px;
  max-width: 300px;
  opacity: 0;
  background-color: #1b88b3;
  color: #fff ;
  box-shadow: 0 2px 5px 2px #828282;
  border-radius: 6px;
  padding: 9px 15px 5px;
  position: absolute;
  z-index: 1;
  bottom: 95%;
  margin-bottom: 5px;
  transition:visibility 0.1s ease 0.1s, opacity 0.1s ease;
  
  a {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
  }
  
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

class PlagiarismHighlighter extends PureComponent {
  renderText = () => {
    const {textId, text} = this.props;
    if (textId) {
      return <FormattedMessage id={textId}/>;
    } else {
      return <span dangerouslySetInnerHTML={{__html: text}}/>;
    }
  };

  renderToolTipText = () => {
    const {toolTipText, tooltipTextId} = this.props;
    const urls = [].concat.apply([], toolTipText);
    if (tooltipTextId) {
      return <FormattedMessage id={tooltipTextId}/>;
    } else {
      return urls.map((url, index) => {
        return <div><a href={url} target="_blank">
          <small>{url}</small>
        </a><br/></div>;
      });
    }
  };

  render() {
    return (
      <Wrapper {...this.props}>
        {this.renderText()}
        <TooltipText className={'tooltiptext'}>
          {this.renderToolTipText()}
        </TooltipText>
      </Wrapper>
    );
  };
}

export default PlagiarismHighlighter;
