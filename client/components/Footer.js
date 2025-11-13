import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';

import withUser from '../containers/withUser';

const Wrapper = styled.footer`
  text-align: center;  
`;

const FooterLink = styled(Link)`  
  padding: 8px;
  color: #000;
  font-size: 0.875em;
  transition: all .25s ease;
  
  &:hover {
    color: ${props => props.theme.artz.primaryColor};
  }
`;

const ExternalFooterLink = styled.a`  
  padding: 8px;
  color: #000;
  font-size: 0.875em;
  transition: all .25s ease;
  
  &:hover {
    color: ${props => props.theme.artz.primaryColor};
  }
`;

class Footer extends PureComponent {
  handleFaqUrl = () => {
    const {user} = this.props;
    const {language} = user;

    if (language === 'en') {
      return 'https://artizyou.com/faq.html'
    }
    return 'https://artizyou.com/faq.html'
  }

  render() {
    const url = this.handleFaqUrl();

    return (
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <FooterLink to="/terms_of_use">
                <FormattedMessage id="footer.terms"/>
              </FooterLink>
              |
              <FooterLink to="/privacy_policy">
                <FormattedMessage id="footer.legal"/>
              </FooterLink>
              |
              <ExternalFooterLink href={url} target="_blank">
                FAQ
              </ExternalFooterLink>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default withUser(Footer);