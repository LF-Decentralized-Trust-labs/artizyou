import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import { Elements } from "react-stripe-elements";
import styled from "styled-components";

import FormPaymentElements from "./Elements";
import FormPaymentInitializing from "./Initializing";

import withCreation from "../../../containers/withCreation";
import withUser from "../../../containers/withUser";
import FormInputGroup from "../InputGroup";
import RadioButtonWrapper from "../RadioButtonWrapper";
import FormRadioButton from "../RadioButton";

const Wrapper = styled.div`
  max-width: 425px;
  #creation-save-registration {
    margin: 0 auto;
    display: block;
  }
`;
const SmallTextWrapper = styled.div`
  display: block;

  span {
    color: ${(props) => props.theme.artz.black};
    font-size: 1rem;
    font-weight: 400;
  }
`;
const SectionWrapper = styled.div`
  padding-top: 38px;
  padding-bottom: 25px;
`;

class ModalFormPayment extends PureComponent {
  state = {
    loading: false,
    bipCertificate: false,
    usCopyright: true,
  };

  handleTogglePayLater = (bipCertificate, usCopyright) => {
    this.setState({ bipCertificate, usCopyright });
  };

  renderPlanInfo = (certificate) => {
    const { user } = this.props;
    const { plan } = user;
    if (plan.limited) {
      const paidState = plan.limited && plan.chargeId ? "PAID" : "UNPAID";

      return (
        <SmallTextWrapper>
          <FormattedMessage
            id="creations.new.registration.payment_section.options.save_creation.plan_info"
            values={{
              left: plan.creationLimit - plan.creationCount,
              limit: plan.creationLimit,
            }}
          />
        </SmallTextWrapper>
      );
    }

    return (
      <SmallTextWrapper className="plan-amount-container">
        <FormattedMessage
          id="creations.new.registration.payment_section.options.save_creation.small_text"
          values={{
            left: plan.creationLimit - plan.creationCount,
            limit: plan.creationLimit,
          }}
        />
        <FormattedMessage
          id={
            certificate == "bip"
              ? "creations.new.registration.payment_section.options.save_creation.certificate_amount_bip"
              : "creations.new.registration.payment_section.options.save_creation.certificate_amount_usc"
          }
          values={{
            left: plan.creationLimit - plan.creationCount,
            limit: plan.creationLimit,
          }}
        />
      </SmallTextWrapper>
    );
  };

  render() {
    if (!BROWSER) {
      return <FormPaymentInitializing />;
    }
    const { bipCertificate, usCopyright } = this.state;
    let totalAmount = 0;
    const bipPlan = this.props.user.plans.find((p) => p.code == "bip");
    const uscPlan = this.props.user.plans.find((p) => p.code == "usc");
    if (this.state.bipCertificate && this.state.usCopyright) {
      totalAmount = bipPlan.amount + uscPlan.amount;
    } else if (this.state.bipCertificate) {
      totalAmount = bipPlan.amount;
    } else if (this.state.usCopyright) {
      totalAmount = uscPlan.amount;
    } else {
      totalAmount = 0;
    }

    return (
      <Elements>
        <Wrapper>
          <h1>
            <FormattedMessage id="creations.new.registration.title" />
          </h1>
          <SectionWrapper>
            <FormInputGroup>
              <RadioButtonWrapper
                id="registration-pay"
                onClick={() =>
                  this.handleTogglePayLater(bipCertificate, !usCopyright)
                }
                selected={usCopyright}
                className="certificate-amount"
              >
                <FormRadioButton selected={usCopyright}>
                  <FormattedMessage id="creations.new.registration.payment_section.options.copyright_certificate.text" />
                  {this.renderPlanInfo("usc")}
                </FormRadioButton>
              </RadioButtonWrapper>

              <RadioButtonWrapper
                id="registration-pay"
                onClick={() =>
                  this.handleTogglePayLater(!bipCertificate, usCopyright)
                }
                selected={bipCertificate}
                className="certificate-amount"
              >
                <FormRadioButton selected={bipCertificate}>
                  <FormattedMessage id="creations.new.registration.payment_section.options.save_creation.text" />
                  {this.renderPlanInfo("bip")}
                </FormRadioButton>
              </RadioButtonWrapper>
            </FormInputGroup>
          </SectionWrapper>
          <h1>
            <FormattedMessage id="creations.new.registration.payment_section.button.register_creation" />
          </h1>
          <FormPaymentElements
            {...this.props}
            totalAmount={totalAmount}
            currency={"USD"}
          />
        </Wrapper>
      </Elements>
    );
  }
}

export default withUser(withCreation(ModalFormPayment));
