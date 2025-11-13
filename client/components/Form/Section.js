import React, {PureComponent} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-bottom: 33px;
    
  ${props => props.theme.artz.breakpoint.lg} {
    padding-top: 33px;
  }
`;

class FormSection extends PureComponent {
  renderDescription = () => {
    const {description} = this.props;

    if (!description) {
      return null;
    }

    return <p>{description}</p>;
  };

  renderTitle = () => {
    const {title} = this.props;

    if (!title) {
      return null;
    }

    return <h2>{title}</h2>;
  };

  render() {
    const {children} = this.props;

    return (
      <Wrapper>
        {this.renderTitle()}
        {this.renderDescription()}
        {children}
      </Wrapper>
    );
  };
}

export default FormSection;