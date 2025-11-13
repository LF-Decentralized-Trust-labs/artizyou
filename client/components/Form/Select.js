import React from 'react';
import {injectIntl} from 'react-intl';
import Dropdown from 'react-dropdown';
import styled from 'styled-components';

const Wrapper = styled.div`
  .Dropdown-root{
    position: relative;
    
    &.is-open{
      .Dropdown-control{
        box-shadow: 0 0 5px rgba(243, 111, 43, 1) !important;
        border-color: rgba(243, 111, 43, 1) !important;
      }
    }
  }
   
  .Dropdown-control{
    position: relative;
    min-width: 180px;
    width: 100%;
    padding: 1.065em;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.theme.artz.darkGrey};
    outline: 0;
    transition: all .25s ease;
  }
  
  .Dropdown-arrow{
    &:before, &:after {
      border: 5px solid transparent;
      content: "";
      display: block;
      height: 0;
      right: 15px;
      top: 50%;
      position: absolute;
      width: 0;
    }
    
    &:before {
      border-bottom-color: #a5a5a5;
      margin-top: -12px;
    }
    
    &:after {
      border-top-color: #a5a5a5;
      margin-top: 1px;
    }
  }
  
  .Dropdown-menu{    
    position: absolute;
    width: 100%;
    max-height: 200px;
    background: #fff;
    border: solid 1px ${props => props.theme.artz.inputBorderColor};    
    z-index: 2;
    overflow: auto;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0,0,0,.5);
      -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
    }
  }
  
  .Dropdown-option{
    padding: 0.6rem 1rem;
    cursor: pointer;
    font-size: 1.1rem;
    
    &:hover{
      background: #ececec;
    }
  }
  
`;

const FormSelect = (props) => (
  <Wrapper {...props}>
    <Dropdown {...props} placeholder={props.intl.formatMessage({id: 'action.select'})}/>
  </Wrapper>
);

export default injectIntl(FormSelect);