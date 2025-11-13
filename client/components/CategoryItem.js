import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  background: ${props => props.theme.artz.lightGreen};
  border-radius: 100px;
  text-transform: uppercase;
  font-size: ${({size}) => size === 'sm' ? '0.60rem' : '0.75rem'};
  color: ${props => props.theme.artz.secondaryColor};
  text-align: center;
  padding: 5px 15px;
  margin: 0 8px 8px 0;
  
  &:last-child {
    margin: 0;
  }
`;

const CategoryItem = ({children, size, ...remainingProps}) => (
  <Wrapper size={size} {...remainingProps}>
    {children}
  </Wrapper>
);

CategoryItem.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
};

export default CategoryItem;