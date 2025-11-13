import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  h1{
    text-align: center;
    font-weight: 600;
    padding-bottom: 25px;
  }
  
  p{
    text-align: left;
  }
  
  button{
    margin-top: 25px;
  }
  
  .remove-margin{
    button{
      margin-top: 0px;
    }
  }
`;

const ModalContentWrapper = ({children, ...remainingProps}) => (
  <Wrapper {...remainingProps}>
    {children}
  </Wrapper>
);

export default ModalContentWrapper;