import React from 'react';
import {injectIntl} from 'react-intl';
import Select from 'react-select';
import styled from 'styled-components';

const Wrapper = styled.div`
  .Select > .Select-control {
    height: 60.06px;
    transition: all .25s ease;       
  }
  
  .Select.is-focused:not(.is-open) > .Select-control {
	  border-color: ${props => props.theme.artz.primaryColor} !important;
  }
  
  .Select.is-open > .Select-control {
    border-color: ${props => props.theme.artz.primaryColor} !important;
  }
  
  .Select--single > .Select-control .Select-value {
    line-height: 55px;
  }
  
  .Select--single > .Select-control .Select-placeholder
  {
    color: #626262 !important;
    line-height: 60px;
    font-weight: 600;
  }
  
  .Select--single > .Select-control .Select-value .Select-value-label {
    font-weight: 600;
    color: #626262 !important;
    font-family: helvetica;
  }
  
  .Select--single > .Select-control .Select-multi-value-wrapper .Select-input {
    height: 58px;
    
    &:focus {
      outline: 0 !important;
    }
    
    input {
      height: 39px;
      outline: 0 !important;
      
      &:focus {
        box-shadow: none !important;
        border-color: none !important;
      }
    }
  }
  
  .Select .Select-menu-outer {
    margin-top: 1px;
  }
`;

const FormSelectSearchable = (props) => (
  <Wrapper>
    <Select {...props}
            clearable={false}
            multi={false}
            backspaceToRemoveMessage={''}
            isValidNewOption={({label}) => {
              return !!label && label.length > 3
            }}
            joinValues={true}
            delimiter={';'}
    />
  </Wrapper>
);

export default injectIntl(FormSelectSearchable);