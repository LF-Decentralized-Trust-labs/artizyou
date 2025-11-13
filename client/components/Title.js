import styled from 'styled-components';

const Title = styled.h1`
  width: 100%;
  margin-bottom: 45px;
  font-family: ${props => props.theme.artz.secondaryFont};  
  font-size: 1.375em;
  color: ${props => props.theme.artz.black};
  letter-spacing: 0;
  font-weight: 700;  
  text-align: center;      
  
  ${props => props.theme.artz.breakpoint.lg} {
    width: initial;
    font-size: 2.563em;
    text-align: left;    
  }
`;

export default Title;