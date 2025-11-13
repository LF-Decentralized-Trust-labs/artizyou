import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5px 18px;
  margin-top: 0.3rem;
  background-color: ${({theme}) => theme.artz.errorColor};
  color: white;
  font-weight: bold;
`;

const ValidationError = ({children, ...remainingProps}) => {
  return (
    <Wrapper {...remainingProps}>
      {children}
    </Wrapper>
  );
};

export default ValidationError;