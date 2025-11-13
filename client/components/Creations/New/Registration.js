import { FormattedMessage, injectIntl } from "react-intl";
import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import Button from "../../Button";
import withNewCreation from "../../../containers/withNewCreation";
import { withRouter } from "react-router-dom";
import withUser from "../../../containers/withUser";
import Loading from "../../Loading";

const Wrapper = styled.div`
  padding-top: 75px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  button:first-of-type {
    margin-right: 1rem;
    margin-bottom: 1rem;
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

class CreationsNewRegistration extends PureComponent {
  state = {
    later: false,
    loading: false,
    bipCertificate: false,
    usCopyright: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    if (!this.props.user.enabledUsCopyRightFeature) {
      this.setState({ bipCertificate: true });
    } else {
      this.setState({ usCopyright: true });
    }
  }

  handleCreateNoRegistration = async () => {
    try {
      this.setState({ loading: true });
      const { createCreation, history } = this.props;
      await createCreation();
      history.push(`/creations`);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRegisterNow = () => async () => {
    try {
      this.setState({ loading: true });
      const { registerCreation, refreshUser, createCreation, resetCreation } =
        this.props;

      const { creationId } = await createCreation();
      await registerCreation(creationId);
      await refreshUser();

      this.redirectToCreationCompletedWithCode(creationId);

      resetCreation();
    } finally {
      this.setState({ loading: false });
    }
  };

  redirectToCreationCompleted = (creationId) => {
    const { history } = this.props;
    return history.push(`/creations/${creationId}/completed`);
  };

  redirectToCreationCompletedWithCode = (creationId) => {
    const { history } = this.props;
    return history.push(`/creations/${creationId}/completed_with_code`);
  };

  renderPayment = () => {
    return (
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
          <ButtonWrapper>
            <Button
              type="secondary"
              id="creation-save-no-registration"
              onClick={this.handleCreateNoRegistration}
            >
              <FormattedMessage id="creations.new.registration.payment_section.button.no_register" />
            </Button>
          </ButtonWrapper>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <ButtonWrapper>
            <Button className="buttonBlock" onClick={this.handleRegisterNow()}>
              <FormattedMessage id="creations.new.registration.payment_section.button.register_creation" />
            </Button>
          </ButtonWrapper>
        </div>
      </div>
    );
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

  renderLoading = () => {
    const { loading } = this.state;

    if (!loading) {
      return null;
    }

    return <Loading />;
  };

  render() {
    const { creation } = this.props;
    const { completedInfos } = creation;

    if (!completedInfos) {
      return <Redirect to="infos" />;
    }

    return (
      <Wrapper>
        <div className="container">
          {this.renderPayment()}

          {this.renderLoading()}
        </div>
      </Wrapper>
    );
  }
}

export default withUser(
  withNewCreation(withRouter(injectIntl(CreationsNewRegistration)))
);
