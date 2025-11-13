import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  width: 100%;
  padding: ${({size, theme}) => size !== 'small' ? '14px 80px' : '10px 45px'};
  border: solid 2px ${props => props.theme.artz.primaryColor}; 
  border-radius: 100px;
  background: ${({type, theme}) => type === 'primary' ? theme.artz.primaryColor : '#FFFFFF'};
  font-family: ${props => props.theme.artz.secondaryFont};
  font-size: ${({size, theme}) => size !== 'small' ? ' 0.95em' : '0.75em'};
  color: ${({type, theme}) => type === 'primary' ? theme.artz.secondaryColor : theme.artz.primaryColor};
  font-weight: ${({type, theme}) => type === 'primary' ? 600 : 'normal'};
  text-transform: uppercase;    
  cursor: pointer;
  transition: all .25s ease;  
  
  &:hover{
    opacity: 0.75;
  }
  
  &:focus{
    outline: 0;
  }
  
  &.buttonBlock {
    width: 100%;
  }
  
  ${props => props.theme.artz.breakpoint.md} {
    width: auto;    
    width: initial;
    padding: 11px 45px;
    font-size: ${({size, theme}) => size !== 'small' ? '1.125em' : '0.85em'};
  }
`;

const Button = ({children, onClick, ...remainingProps}) => (
  <Wrapper onClick={onClick} {...remainingProps}>
    {children}
  </Wrapper>
);

Button.defaultProps = {
  size: 'medium',
  type: 'primary',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;