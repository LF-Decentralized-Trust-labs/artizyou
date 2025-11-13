import { FormattedMessage } from "react-intl";
import React, { Component } from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
} from "react-stripe-elements";
import styled from "styled-components";
import Button from "../../Button";
import FormCheckbox from "../Checkbox";
import IconCreditCard from "../../../images/icons/credit-card.svg";
import IconCalendar from "../../../images/icons/calendar.svg";
import IconLock from "../../../images/icons/lock-payment.svg";
import IconStripe from "../../../images/icons/stripe.svg";
import InputGroup from "../../Form/InputGroup";
import Label from "../Label";
import Loading from "../../Loading";
import RequiredFormInputTextGroup from "../RequiredFormInputTextGroup";
import Required from "../Required";
import { isBlank, isFalse } from "../../../utils/validations";
import { setCreationField } from "../../../actions/creations";
import Notification from "../../Notification";
import BillingSummary from "./BillingSummary";
import { calculateAmounts } from "../../../utils/amounts";
import withUser from "../../../containers/withUser";
import RadioButtonWrapper from "../RadioButtonWrapper";
import FormRadioButton from "../RadioButton";

const ContainerWrapper = styled.div`
  padding-right: 0px;
  padding-left: 0px;
`;

const InputCSS = `
    display: block;
    width: 100%;
    line-height: 1.5;
    font-weight: 600;
    border: 1px solid #d8d8d8;
    border-radius: 3px;
    padding: 1.065em;
    padding-left: 50px;
    outline: 0;
    transition: all .25s ease;
    
    &:focus{
      box-shadow: 0 0 5px rgba(162, 162, 162, 1);
      border-color: rgba(162, 162, 162, 1);        
    }
`;

const InputStyle = {
  base: {
    color: "#626262",
    fontSize: "16px",
    fontWeight: "600",
    "::placeholder": {
      color: "#d8d8d8",
    },
  },
  invalid: {
    color: "#F32B2B",
  },
};

const InputWrapper = styled.div`
  position: relative;
  ${InputCSS}
  input {
    border: 0 !important;
  }
  > svg {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
`;

const InputDateWrapper = styled.div`
  ${(props) => props.theme.artz.breakpoint.sm} {
    display: inline-block;
    width: calc(50% - 8px);
    margin-right: 8px;
  }
`;

const InputCVCWrapper = styled.div`
  margin-top: 25px;

  ${(props) => props.theme.artz.breakpoint.sm} {
    display: inline-block;
    margin-top: 0px;
    width: calc(50% - 8px);
    margin-left: 8px;
  }
`;

const PaymentSecurity = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6rem;
  text-align: center;
  svg{
    width: 50px;
    height: 29px;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    & *{
      fill: ${(props) => props.theme.artz.darkGrey};
    }
`;

class FormPaymentElements extends Component {
  state = {
    newCreationId: this.props.creation ? this.props.creation.creationId : null,
    cardOwner: "",
    acceptedTerms: false,
    acceptedEncryptionTerms: false,
    acceptedAutomaticPaymentTerms: false,
    showForm: this.props.user.cards ? false : true,
    cards: this.props.user.cards,
    errors: {
      cardOwner: false,
      acceptedTerms: false,
      acceptedEncryptionTerms: false,
      acceptedAutomaticPaymentTerms: false,
    },
    notificationMessage: null,
    loading: false,
    paidWithoutTaxes: null,
    plan: {
      currency: null,
      amount: null,
      code: null,
      total: null,
      taxes: null,
    },
  };

  calculateAmounts = calculateAmounts.bind(this);

  componentWillMount() {
    this.calculateAmounts();
    let cards =
      this.state.cards && this.state.cards.length ? this.state.cards : false;
    if (cards) {
      cards[0].selected = true;
      this.setState((prevState) => ({ ...prevState, cards: cards }));
    }
  }

  handleChangeCardOwner = ({ target }) => {
    const { value } = target;

    this.setState({
      cardOwner: value,
      errors: {
        cardOwner: false,
      },
    });
  };

  handleSubmitSavedCard = async (event) => {
    event.preventDefault();
    if (this.locked) {
      return true;
    }

    this.locked = true;
    this.setState({ loading: true });

    const { cards } = this.state;
    const {
      createPaymentIntent,
      createPaymentIntentUser,
      createCreation,
      payCreation,
      pay,
      registerCreation,
      stripe,
      creation,
      refreshUser,
      totalAmount,
      currency,
    } = this.props;
    const { plan } = this.state;
    const amount = plan.taxes.length > 0 ? plan.total : totalAmount;
    try {
      let card = cards.find((card) => card.selected == true);
      let _msgCode = null;
      if (!!registerCreation) {
        let { creationId } = creation;
        if (!creationId && !this.state.newCreationId) {
          const response = await createCreation();
          creationId = response.creationId;
          this.setState(
            {
              ...this.state,
              newCreationId: creationId,
            },
            () => {
              setCreationField("id", this.state.newCreationId);
            }
          );
          await refreshUser();
        }
        const response = await createPaymentIntent(
          null,
          new Date(Date.now()).toLocaleString(),
          card.card_id,
          amount,
          currency.toLowerCase()
        );
        const paymentResponse = await stripe.confirmCardPayment(
          response.client_secret,
          {
            payment_method: response.card,
          }
        );
        if (
          paymentResponse &&
          paymentResponse.paymentIntent &&
          paymentResponse.paymentIntent.status == "succeeded"
        ) {
          this.locked = true;
          this.setState({ loading: true });
          const { msgCode, status } = await payCreation(
            this.state.newCreationId,
            null,
            new Date(Date.now()).toLocaleString(),
            card.card_id,
            amount,
            currency.toLowerCase(),
            paymentResponse.paymentIntent.id
          );
          _msgCode = msgCode;
          await refreshUser();
          await registerCreation(this.state.newCreationId);
          await refreshUser();
          if (status === 200) {
            const { registerCallback } = this.props;
            return registerCallback(this.state.newCreationId);
          }
          this.locked = false;
          this.setState({ loading: false });
        } else {
          if (paymentResponse.error) {
            return this.setState({
              notificationMessage: paymentResponse.error.message,
            });
          }
        }
      } else {
        let response = await createPaymentIntentUser(
          null,
          new Date(Date.now()).toLocaleString(),
          amount,
          currency.toLowerCase(),
          card.card_id
        );
        let paymentResponse = await stripe.confirmCardPayment(
          response.client_secret,
          {
            payment_method: response.card,
          }
        );
        if (
          paymentResponse &&
          paymentResponse.paymentIntent &&
          paymentResponse.paymentIntent.status == "succeeded"
        ) {
          const { msgCode, status } = await pay(
            paymentResponse.paymentIntent.id,
            new Date(Date.now()).toLocaleString()
          );
          _msgCode = msgCode;
          await refreshUser();

          if (status === 200) {
            const { registerCallback } = this.props;
            return registerCallback();
          }
        } else {
          if (paymentResponse.error) {
            return this.setState({
              notificationMessage: paymentResponse.error.message,
            });
          }
        }
      }
    } catch (error) {
      console.log("paying error", error);
      return this.setState({ notificationMessage: "error.stripe" });
    } finally {
      this.locked = false;
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.cardOwnerRef.focus();
    this.cardOwnerRef.blur();

    if (this.locked) {
      return true;
    }

    this.locked = true;

    this.setState({ loading: true });

    const { cardOwner, acceptedTerms, acceptedEncryptionTerms } = this.state;
    const {
      createCreation,
      createPaymentIntent,
      createPaymentIntentUser,
      payCreation,
      registerCreation,
      stripe,
      creation,
      refreshUser,
      pay,
      user,
      updateUser,
      totalAmount,
      currency,
    } = this.props;
    const { plan } = this.state;
    const amount = plan.taxes.length > 0 ? plan.total : totalAmount;
    const { createToken } = stripe;
    const regexConst = new RegExp(/^(.*?) (.*?)$/g);

    if (!user.firstName || user.firstName === " undefined") {
      const params = {
        "user[first_name]": cardOwner.split(regexConst)[0]
          ? cardOwner.split(regexConst)[0]
          : "",
        "user[last_name]": cardOwner.split(regexConst)[1]
          ? cardOwner.split(regexConst)[1]
          : "",
      };

      await updateUser(params);
    }

    try {
      const trimmedCardOwner = cardOwner.trim();

      if (isBlank(trimmedCardOwner)) {
        return this.setState({
          errors: { cardOwner: true },
          notificationMessage: "error.generic",
        });
      }
      if (isFalse(acceptedTerms)) {
        return this.setState({
          errors: { acceptedTerms: true },
          notificationMessage: "error.generic",
        });
      }
      if (isFalse(acceptedEncryptionTerms)) {
        return this.setState({
          errors: { acceptedEncryptionTerms: true },
          notificationMessage: "error.generic",
        });
      }

      const { error, token } = await createToken({ name: trimmedCardOwner });
      const { id: tokenId } = token;
      if (error) {
        return this.setState({ notificationMessage: "error.stripe" });
      }

      let _msgCode = null;

      if (!!registerCreation) {
        let { creationId } = creation;
        if (!creationId && !this.state.newCreationId) {
          const response = await createCreation();
          creationId = response.creationId;
          this.setState(
            {
              ...this.state,
              newCreationId: creationId,
            },
            () => {
              setCreationField("id", this.state.newCreationId);
            }
          );
          await refreshUser();
        }
        const response = await createPaymentIntent(
          tokenId,
          new Date(Date.now()).toLocaleString(),
          null,
          amount,
          currency.toLowerCase(),
          token.card.last4
        );
        let paymentResponse = await stripe.confirmCardPayment(
          response.client_secret,
          {
            payment_method: response.card,
          }
        );
        if (
          paymentResponse &&
          paymentResponse.paymentIntent &&
          paymentResponse.paymentIntent.status == "succeeded"
        ) {
          const { msgCode, status } = await payCreation(
            this.state.newCreationId,
            tokenId,
            new Date(Date.now()).toLocaleString(),
            null,
            amount,
            currency.toLowerCase(),
            paymentResponse.paymentIntent.id
          );
          _msgCode = msgCode;
          await refreshUser();

          await registerCreation(this.state.newCreationId);
          await refreshUser();
          if (status === 200) {
            const { registerCallback } = this.props;
            return registerCallback(this.state.newCreationId);
          }
          return this.setState({ notificationMessage: `stripe.${_msgCode}` });
        } else {
          if (paymentResponse.error) {
            return this.setState({
              notificationMessage: paymentResponse.error.message,
            });
          }
        }
      } else {
        let response = await createPaymentIntentUser(
          tokenId,
          new Date(Date.now()).toLocaleString(),
          amount,
          currency.toLowerCase(),
          null,
          token.card.last4
        );
        let paymentResponse = await stripe.confirmCardPayment(
          response.client_secret,
          {
            payment_method: response.card,
          }
        );
        if (
          paymentResponse &&
          paymentResponse.paymentIntent &&
          paymentResponse.paymentIntent.status == "succeeded"
        ) {
          const { msgCode, status } = await pay(
            paymentResponse.paymentIntent.id,
            new Date(Date.now()).toLocaleString()
          );
          _msgCode = msgCode;
          await refreshUser();

          if (status === 200) {
            const { registerCallback } = this.props;
            return registerCallback();
          }
        } else {
          if (paymentResponse.error) {
            return this.setState({
              notificationMessage: paymentResponse.error.message,
            });
          }
        }
      }
    } catch (error) {
      console.log("paying error", error);
      return this.setState({ notificationMessage: "error.stripe" });
    } finally {
      this.locked = false;
      this.setState({ loading: false });
    }
  };

  handleClickCheckbox = (e) => {
    const {
      acceptedTerms,
      acceptedEncryptionTerms,
      acceptedAutomaticPaymentTerms,
    } = this.state;

    switch (e) {
      case "acceptedTerms":
        this.setState({
          acceptedTerms: !acceptedTerms,
        });
        break;
      case "acceptedEncryptionTerms":
        this.setState({
          acceptedEncryptionTerms: !acceptedEncryptionTerms,
        });
        break;
      case "acceptedAutomaticPaymentTerms":
        this.setState({
          acceptedAutomaticPaymentTerms: !acceptedAutomaticPaymentTerms,
        });
        break;
    }
  };

  setCardOwnerRef = (ref) => {
    this.cardOwnerRef = ref;
  };

  handleCloseNotification = () => {
    this.setState({ notificationMessage: false });
  };

  renderNotification = () => {
    const { notificationMessage } = this.state;

    if (!notificationMessage) {
      return null;
    }

    return (
      <Notification
        onClose={this.handleCloseNotification}
        key={notificationMessage}
        error
      >
        <FormattedMessage id={notificationMessage} />
      </Notification>
    );
  };
  handleCardSelectChange = (id) => {
    const { cards } = this.state;
    let updatedCards = cards;
    updatedCards.map((card) => {
      if (card.id == id) {
        card.selected = true;
      } else {
        card.selected = false;
      }
    });
    this.setState((prevState) => ({ ...prevState, cards: updatedCards }));
  };
  handleShowForm = () => {
    this.setState((prevState) => ({ ...prevState, showForm: true }));
  };

  renderLoading = () => {
    const { loading } = this.state;

    if (!loading) {
      return null;
    }

    return <Loading />;
  };

  render() {
    const { totalAmount, currency } = this.props;
    const { plan } = this.state;
    const amount = plan.taxes.length > 0 ? plan.total : totalAmount;
    const updatedPlan = {
      total: amount,
      currency: currency,
    };
    const { user } = this.props;
    const { cards } = this.state;

    const {
      cardOwner,
      errors,
      acceptedTerms,
      acceptedEncryptionTerms,
      showForm,
    } = this.state;
    const {
      cardOwner: cardOwnerError,
      acceptedTerms: acceptedTermsError,
      acceptedEncryptionTerms: acceptedEncryptionTermsError,
    } = errors;

    if (plan.total === null) {
      return null;
    }
    if (showForm) {
      return (
        <form>
          <ContainerWrapper>
            <RequiredFormInputTextGroup
              handleChange={this.handleChangeCardOwner}
              hasError={cardOwnerError}
              innerRef={this.setCardOwnerRef}
              labelId="payment.card_owner"
              name="cardOwner"
              value={cardOwner}
            />

            <InputGroup>
              <Label>
                <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.card_number" />
              </Label>
              <InputWrapper>
                <IconCreditCard />
                <CardNumberElement style={InputStyle} />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <InputDateWrapper>
                <Label>
                  <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.expiry_date" />
                </Label>
                <InputWrapper>
                  <IconCalendar />
                  <CardExpiryElement style={InputStyle} />
                </InputWrapper>
              </InputDateWrapper>

              <InputCVCWrapper>
                <Label>
                  <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.cvv" />
                </Label>
                <InputWrapper>
                  <IconLock />
                  <CardCVCElement style={InputStyle} hideIcon={false} />
                </InputWrapper>
              </InputCVCWrapper>
            </InputGroup>

            <InputGroup>
              <PaymentSecurity>
                <FormattedMessage id="payment.security_1" />
                <br />
                <a href="https://stripe.com/ca" target="_blank">
                  <IconStripe />
                </a>
                <br />
                <FormattedMessage id="payment.security_2" />
              </PaymentSecurity>
            </InputGroup>

            <BillingSummary plan={plan} updatedPlan={updatedPlan} />

            <br />
            <br />
            <br />

            <InputGroup>
              <Required name="acceptedTerms" hasError={acceptedTermsError}>
                <FormCheckbox
                  id="paymentAcceptedTerms"
                  checked={acceptedTerms}
                  onClick={(e) => this.handleClickCheckbox("acceptedTerms")}
                >
                  <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.terms_conditions" />
                  <a href="/terms_of_use" target="_blank">
                    <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.terms_conditions_link_legal" />
                  </a>
                  <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.terms_conditions_and" />
                  <a href="/privacy_policy" target="_blank">
                    <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.terms_conditions_link_policy" />
                  </a>
                  <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.terms_conditions_link_artizyou" />
                </FormCheckbox>
              </Required>
            </InputGroup>

            <InputGroup>
              <Required
                name="acceptedEncryptionTerms"
                hasError={acceptedEncryptionTermsError}
              >
                <FormCheckbox
                  id="paymentAcceptedEncryptionTerms"
                  checked={acceptedEncryptionTerms}
                  onClick={(e) =>
                    this.handleClickCheckbox("acceptedEncryptionTerms")
                  }
                >
                  <FormattedMessage id="creations.new.registration.payment_section.credit_card_form.encryption_terms" />
                </FormCheckbox>
              </Required>
            </InputGroup>

            <Button
              className="buttonBlock"
              id="creation-save-registration"
              onClick={this.handleSubmit}
            >
              <FormattedMessage id="creations.new.registration.payment_section.button.register" />
            </Button>
          </ContainerWrapper>

          {this.renderNotification()}

          {this.renderLoading()}
        </form>
      );
    }
    if (cards && cards.length > 0 && !showForm) {
      return (
        <ContainerWrapper>
          <FormattedMessage id="creations.new.registration.payment_section.select_card" />
          <br />
          <br />
          <InputGroup>
            {cards.map(({ id, last_four_digit, selected }) => (
              <RadioButtonWrapper
                id="registration-pay"
                onClick={() => this.handleCardSelectChange(id)}
                selected={selected ? true : false}
                className="certificate-amount"
              >
                <FormRadioButton selected={selected ? true : false}>
                  **** **** **** {last_four_digit}
                </FormRadioButton>
              </RadioButtonWrapper>
            ))}
          </InputGroup>
          <BillingSummary plan={plan} updatedPlan={updatedPlan} />

          <br />
          <br />
          <Button
            className="buttonBlock"
            id="creation-save-registration"
            onClick={() => this.handleShowForm()}
          >
            <FormattedMessage id="creations.new.registration.payment_section.pay_with_another" />
          </Button>
          <br />
          <br />
          <Button
            className="buttonBlock"
            id="creation-save-registration"
            onClick={(e) => this.handleSubmitSavedCard(e)}
          >
            <FormattedMessage id="creations.new.registration.payment_section.button.register" />
          </Button>

          {this.renderNotification()}

          {this.renderLoading()}
        </ContainerWrapper>
      );
    }
  }
}

export default withUser(injectStripe(FormPaymentElements));
