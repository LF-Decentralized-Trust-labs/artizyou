import React from 'react';
import styled, {keyframes} from 'styled-components';

const spinnerBorder = '10px';

const Wrapper = styled.div` 
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  z-index: 9999;
`;

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.div` 
  position: relative;
  height: 100px;
  width: 100px;
  border: ${spinnerBorder} solid transparent;
  border-top-color: ${({theme}) => theme.artz.primaryColor};
  border-radius: 50%;
  animation: 1s ${rotate360} linear infinite;
  &:before {
    content: '';
    display: block;
    width: inherit;
    height: inherit;
    position: absolute;
    top: -${spinnerBorder};
    left: -${spinnerBorder};
    border: ${spinnerBorder} solid ${({theme}) => theme.artz.primaryColor};
    border-radius: 50%;
    opacity: .5; 
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <Spinner/>
    </Wrapper>
  );
};

export default Loading;