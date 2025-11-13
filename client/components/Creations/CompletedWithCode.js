import React, { PureComponent } from "react";
import Page from "../Page";
import { FormattedMessage, injectIntl } from "react-intl";
import Button from "../Button";
import withNewCreation from "../../containers/withNewCreation";
import withUser from "../../containers/withUser";
import { withRouter } from "react-router-dom";

class CompletedWithCode extends PureComponent {
  handleToCreations = () => {
    const { history, resetCreation } = this.props;
    resetCreation();
    return window.location.href = "/creations";
  };

  render() {
    return (
      <Page>
        <div className="success-message-container">
          <FormattedMessage id="creations.new.registration.creation_completed_with_code_first_message" />
          <FormattedMessage id="creations.new.registration.creation_completed_with_code_second_message" />
          <a
            href="https://www.zeffy.com/en-CA/donation-form/935bbed5-f464-40b3-8813-1b016baff8d4"
            target="_blank"
          >
            <FormattedMessage id="creations.new.registration.donate" />
          </a>
          <Button
            type="secondary"
            id="to-creations"
            onClick={this.handleToCreations}
          >
            <FormattedMessage id="creations.new.registration.payment_section.button.your_creations" />
          </Button>
        </div>
      </Page>
    );
  }
}

export default withUser(
  withNewCreation(withRouter(injectIntl(CompletedWithCode)))
);
