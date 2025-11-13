import React from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: inline-block;
  position: relative;
  padding-left: 20px;
  vertical-align: middle;
  line-height: 30px;      
  cursor: pointer;
  user-select: none;
  
  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 12px;
    height: 12px;
    border: none;    
    border-radius: 50%;
    background-clip: padding-box;
    background-color: ${props => props.theme.artz.primaryColor};
    opacity: ${({selected}) => selected ? 1 : 0};
    z-index: 1;    
    transition: all 0.15s ease-in-out;    
  }
  
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;    
    width: 22px;
    height: 22px;    
    background-color: white;
    border: 4px solid ${({theme, selected}) => selected ? theme.artz.primaryColor : theme.artz.gray};            
    border-radius: 50%;
    background-clip: padding-box;
    cursor: pointer;
  }
`;

const TextWrapper = styled.div`
  display: inline-block;
  margin-left: 25px;
  position: relative;  
`;

const FormRadioButton = ({children, selected, ...remainingProps}) => (
  <RadioWrapper selected={selected} {...remainingProps}>
    <TextWrapper>
      {children}
    </TextWrapper>
  </RadioWrapper>
);

export default FormRadioButton;