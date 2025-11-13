import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-bottom: 25px;
    
  input, select, textarea{
    &:focus{
      box-shadow: 0 0 5px rgba(162, 162, 162, 1);
      border-color: rgba(162, 162, 162, 1);      
    }
    
    &.has-error{
      background: #FFF4F4;
      border: 4px solid #F32B2B;
    }
  }
`;

const FormInputGroup = ({children, ...remainingProps}) => (
  <Wrapper {...remainingProps}>
    {children}
  </Wrapper>
);

FormInputGroup.propTypes = {
  children:  PropTypes.node.isRequired,
};

export default FormInputGroup;