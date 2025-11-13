import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  line-height: 1.5;
  font-weight: 600;
  color: ${props => props.theme.artz.darkGrey};
  border: 1px solid ${props => props.theme.artz.inputBorderColor};
  border-radius: 3px;
  padding: 1.065em;   
  outline: 0;
  transition: all .25s ease;
  background: ${props => props.readonly ? '#ececec' : '' };
  
  &:focus{
    box-shadow: 0 0 5px rgba(243, 111, 43, 1) !important;
    border-color: rgba(243, 111, 43, 1) !important;      
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${props => props.theme.artz.inputPlaceholderColor};
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: ${props => props.theme.artz.inputPlaceholderColor};
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: ${props => props.theme.artz.inputPlaceholderColor};
  }
  :-moz-placeholder { /* Firefox 18- */
    color: ${props => props.theme.artz.inputPlaceholderColor};
  }
`;

const FormInput = (props) => (
  <Input type="text" readOnly={props.readonly} {...props}/>
);

export default FormInput;
