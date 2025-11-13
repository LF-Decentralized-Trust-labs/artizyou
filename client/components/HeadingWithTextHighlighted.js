import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
  margin: 0 0 1rem 0;
  text-align: left;
  color: ${props => props.theme.artz.primaryColor};
`;

const HeadingWithTextHighlighted = (props) => (

  <div>

    <Heading>
      {props.subtitle}
    </Heading>
    <p>
      {props.text}
    </p>
  </div>
);

export default HeadingWithTextHighlighted;