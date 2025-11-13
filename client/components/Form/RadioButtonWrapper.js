import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  padding: 20px 15px;
  margin: 6px 0;
  width: 100%;
  background: ${({theme, selected}) => selected ? '#FFF' : theme.artz.greyWhite};
  color: ${props => props.theme.artz.darkGrey};  
  border: ${({selected}) => selected ? '3px solid' : '1px solid'};
  border-color: ${({theme, selected}) => selected ? theme.artz.primaryColor : theme.artz.gray};  
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .25s ease;
  
  &:hover{
    border-color: ${props => props.theme.artz.primaryColor};
  }
`;

const RadioButtonWrapper = ({children, selected, ...remainingProps}) => (
  <Wrapper selected={selected} {...remainingProps}>
    {children}
  </Wrapper>
);

export default RadioButtonWrapper;