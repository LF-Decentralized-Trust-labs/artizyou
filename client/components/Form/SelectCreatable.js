import React from 'react';
import {injectIntl} from 'react-intl';
import Select from 'react-select';
import styled from 'styled-components';

const Wrapper = styled.div`
  .Select-root{
    position: relative;
    
    &.is-open{
      .Select-control{
        box-shadow: 0 0 5px rgba(243, 111, 43, 1) !important;
        border-color: rgba(243, 111, 43, 1) !important;
      }
    }
  }
  
  .Select-multi-value-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

		.Select-value {
		  display: inline-block;
		  margin-right: 5px;
		  margin-bottom: 5px;
	    overflow: hidden;
	    border: none;
	    font-size: 13pt;

	    .Select-value-icon {
	      display: inline-block;
				padding: 3px 8px 3px 0px;
		    border: none;
		    border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
		    background: ${props => props.theme.artz.primaryColor};
		    color: white;
	    }

	    .Select-value-label {
	    	background-color: ${props => props.theme.artz.primaryColor};
		    color: white;
		    border-bottom-left-radius: 15px;
        border-top-left-radius: 15px;
		    padding: 3px 10px;
		    float: left;
	    }
		}
	}
   
  .Select-control{
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
  
  .Select-arrow{
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
  
  .Select-menu{    
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
  
  .Select-option{
    padding: 0.6rem 1rem;
    cursor: pointer;
    font-size: 1.1rem;
    
    &:hover{
      background: #ececec;
    }
  }
  
  .Select-input {
    outline: 0 !important;
    height: 100%;
    
    &:focus{
      outline: 0;
    }
    
    input {
      position: relative;
      top: -2px;    
      border: none;
      outline: 0;
      box-shadow: none;
      
      &:focus {
        outline: 0;
      }      
    }
  }
  
  .Select-arrow-zone, .Select-placeholder{
    display: none;
  }
`;

const FormSelectCreatable = (props) => (
  <Wrapper>
    <Select.Creatable {...props}
                      clearable={false}
                      multi={true}
                      backspaceToRemoveMessage={''}
                      isValidNewOption={({label}) => { return !!label && label.length > 3 }}
                      joinValues={true}
                      delimiter={';'}
    />
  </Wrapper>
);

export default injectIntl(FormSelectCreatable);