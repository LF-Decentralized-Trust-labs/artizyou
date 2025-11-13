import React, {PureComponent} from 'react';
import Page from "../Page";
import {FormattedMessage, injectIntl} from "react-intl";
import Button from "../Button";
import {withRouter} from "react-router-dom";

class CompletedNoBc extends PureComponent {

  handleToCreations = () => {
    const {history} = this.props;
    return history.push(`/creations`);
  }

  render() {
    return (
      <Page>
        <FormattedMessage id="creations.new.registration.creation_completed_no_bc"/>
        <br/>
        <br/>
        <Button type="secondary" id="to-creations" onClick={this.handleToCreations}>
          <FormattedMessage id="creations.new.registration.payment_section.button.your_creations"/>
        </Button>
      </Page>
    )
  }
}

export default withRouter(injectIntl(CompletedNoBc));