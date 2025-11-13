import React from "react";
import styled from "styled-components";

const Heading = styled.div`
  margin: 0 0 1rem 0;
  // text-align: left;
  font-size: 1em;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 0;
  text-align: center;

  p {
    text-align: center;
    color: #000000;
  }
`;
const SubHeading = styled.p`
  max-width: 335px;
`;

const HeadingWithText = (props) => (
  <div>
    <Heading>
      <div className="titled">{props.subtitle}</div>
      <SubHeading>{props.text}</SubHeading>
    </Heading>
  </div>
);

export default HeadingWithText;