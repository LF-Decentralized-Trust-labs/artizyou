import React from 'react';
import styled from 'styled-components';

import CheckIcon from "../../images/icons/check.svg";

const Wrapper = styled.div`
  position: relative;
  
  &:hover{
    .checkbox{
      border: solid 3px ${({theme}) => theme.artz.primaryColor};
    }
  }
`;

const Checkbox = styled.div`
  position: absolute;
  top: -4px;
  left: 0;
  display: flex;
  height: 30px;
  width: 30px;
  align-items: center;
  justify-content: center;
  background-color: #fff; 
  border: solid 3px ${({theme, checked}) => checked ? theme.artz.primaryColor : theme.artz.gray};
  border-radius: 8px; 
  cursor: pointer;
  transition: all .25s ease;
  
  svg {
    g {
      path {
        fill: ${props => props.theme.artz.primaryColor} !important;
      }
    }
  }
`;

const Icon = styled(CheckIcon)`
  position: relative;
  width: 18px;
  height: 18px;
  color: white;
  font-size: 2em;
  opacity: ${({checked}) => checked ? 1 : 0};
  transition: all 0.3s ease-out;    
`;

const Label = styled.label` 
  padding-left: 40px;
  line-height: 1.25rem;
  cursor: pointer;
  
  a {
    transition: all .25s ease;
    color: ${props => props.theme.artz.primaryColor};
    text-decoration: underline;
    
    &:hover {
      color: #ff894c;
    }
  }  
`;

const FormCheckbox = ({checked, children, ...remainingProps}) => {
  return (
    <Wrapper checked={checked} {...remainingProps}>
      <Checkbox className="checkbox" checked={checked}>
        <Icon checked={checked}/>
      </Checkbox>

      <Label>{children}</Label>
    </Wrapper>
  );
};

export default FormCheckbox;