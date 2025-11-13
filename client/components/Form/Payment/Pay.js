import React, { PureComponent } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Elements } from "react-stripe-elements";
import styled from "styled-components";

import FormPaymentElements from "./Elements";
import FormPaymentInitializing from "./Initializing";

import withUser from "../../../containers/withUser";
import Title from "../../Title";

const KindWrapper = styled.div`
  max-width: 660px;
  margin: 0 auto;
`;

const SmallTextWrapper = styled.div`
  display: block;

  span {
    color: ${(props) => props.theme.artz.black};
    font-size: 1rem;
    font-weight: 400;
  }
`;

class Pay extends PureComponent {
  paymentDone = () => {
    const { history, user } = this.props;
    const { completedProfile } = user;

    if (completedProfile) {
      history.push("/creations");
    } else {
      history.push("/profile/new");
    }
  };

  renderPlanInfo = () => {
    const { user } = this.props;
    const { plan } = user;
    const paidState = plan.limited && plan.chargeId ? "PAID" : "UNPAID";

    return (
      <SmallTextWrapper>
        <FormattedMessage
          id="creations.new.registration.payment_section.plan_info"
          values={{ limit: plan.creationLimit, name: plan.code }}
        />
      </SmallTextWrapper>
    );
  };

  render() {
    if (!BROWSER) {
      return <FormPaymentInitializing />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Title>
              <FormattedMessage id="creations.new.registration.payment_section.promo" />
            </Title>
            <h2>{this.renderPlanInfo()}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <KindWrapper>
              <Elements>
                <FormPaymentElements
                  {...this.props}
                  registerCallback={this.paymentDone}
                  totalAmount={this.props.user.plan.amount}
                  currency={this.props.user.plan.currency}
                />
              </Elements>
            </KindWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(injectIntl(Pay));
