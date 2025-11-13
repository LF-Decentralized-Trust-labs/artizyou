import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  margin-bottom: .25rem;
  color: ${props => props.theme.artz.darkGrey};
  font-weight: 400;
`;

const FormLabel = ({children, ...remainingProps}) => (
  <Label {...remainingProps}>{children}</Label>
);

FormLabel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired
};

export default FormLabel;