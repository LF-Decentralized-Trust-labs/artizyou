import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import styled from 'styled-components';

import WarningIcon from "../images/icons/warning.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  padding: 2rem;
  background: ${props => props.theme.artz.greyWhite};
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Icon = styled(WarningIcon)`
  width: 40px;
  height: 40px;
  * {
    fill: ${props => props.theme.artz.errorColor};
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const Title = styled.p`
  color: ${props => props.theme.artz.errorColor};
  font-size: 1.2rem;
  line-height: 2.25rem;
  margin-bottom: 0.5rem;
`;

class Error extends PureComponent {

  render() {
    const {hasError} = this.props;

    if (hasError) {
      return (
        <Wrapper>
          <Container>
            <Icon/>
            <Content>
              <Title>
                <FormattedMessage id="boundary_error.title"/>
              </Title>
              <FormattedMessage id="boundary_error.text"/>
            </Content>
          </Container>
        </Wrapper>
      )
    }
    return this.props.children;
  }
}

export default Error;