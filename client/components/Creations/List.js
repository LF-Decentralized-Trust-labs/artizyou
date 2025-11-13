import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import AddIcon from "../../images/icons/menu/add.svg";
import Button from "../Button";
import CreationsCard from "./Card";
import Page from "../Page";
import withCreations from "../../containers/withCreations";
import { isEmpty } from "../../utils/validations";

const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const AddIconWrapper = styled(AddIcon)`
  position: relative;
  top: 3px;
  width: 20px;
  height: 20px;

  polygon {
    fill: ${(props) => props.theme.artz.secondaryColor};
  }

  ${(props) => props.theme.artz.breakpoint.md} {
    top: 1px;
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;

const CardLink = styled(Link)`
  display: block;
  width: 100%;
  margin: 0 4% 35px 4%;
  box-shadow: 0 18px 20px -12px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0),
    0 0 40px rgba(0, 0, 0, 0.1);
  text-decoration: none;

  animation: ${fadeIn} ease-in 1s;

  &:hover,
  &:focus {
    text-decoration: none;
    transform: scale(1.05);
  }

  ${(props) => props.theme.artz.breakpoint.md} {
    width: 47.35%;
    margin: 0 1% 35px 1%;
  }

  ${(props) => props.theme.artz.breakpoint.lg} {
    width: 31.33%;
    margin: 0 1% 35px 1%;
  }
`;

const CardsWrapper = styled.div`
  margin-top: 25px;

  ${(props) => props.theme.artz.breakpoint.sm} {
    margin-top: 50px;
  }
`;

const CardWrapperFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TitleList = styled.h1`
  display: block;
  width: 100%;
  margin-bottom: 0px;
  font-family: ${(props) => props.theme.artz.secondaryFont};
  font-size: 1.375em;
  color: #000;
  letter-spacing: 0;
  font-weight: 700;
  text-align: center;

  ${(props) => props.theme.artz.breakpoint.sm} {
    display: inline-block;
    width: initial;
    font-size: 2.563em;
    text-align: left;
  }

  @media screen and (-ms-high-contrast: active),
    screen and (-ms-high-contrast: none) {
    /* IE10+ specific styles go here */
    width: 500px;
  }
`;

const AddCreationButton = styled(Button)`
  position: fixed;
  left: 20px;
  bottom: 25px;
  width: 60px;
  height: 60px;
  padding: 0;
  float: none;
  z-index: 9;

  span {
    display: none;
  }

  ${(props) => props.theme.artz.breakpoint.md} {
    position: relative;
    right: 0;
    bottom: 0px;
    width: auto;
    width: initial;
    height: initial;
    padding: 11px 45px;
    float: right;

    span {
      display: inline-block;
      font-size: 0.95em;
    }
  }

  ${(props) => props.theme.artz.breakpoint.lg} {
    bottom: 0px;
    padding: 11px 45px;
  }
`;

const NoCreationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoCreationTitle = styled.h2`
  margin-bottom: 1rem;
`;

class CreationsList extends PureComponent {
  handleAddCreation = () => {
    const { history } = this.props;

    history.push("/creations/new/kind");
  };

  renderCreationsCards = () => {
    const { creations } = this.props;

    return creations.map((creation) => {
      const { creationId } = creation;

      return (
        <CardLink key={creationId} to={`/creations/${creationId}`}>
          <CreationsCard creation={creation} />
        </CardLink>
      );
    });
  };
  renderList = () => {
    const { creations } = this.props;

    if (isEmpty(creations)) {
      return (
        <NoCreationWrapper>
          <NoCreationTitle>
            <FormattedMessage id="creations.emptyCreationTitle" />
          </NoCreationTitle>
          <Button
            type="secondary"
            size="small"
            onClick={this.handleAddCreation}
          >
            <FormattedMessage id="creations.emptyCreationButton" />
          </Button>
        </NoCreationWrapper>
      );
    }

    return <CardWrapperFlex>{this.renderCreationsCards()}</CardWrapperFlex>;
  };

  availableCreations = () => {
    const { user } = this.props;
    const { plan } = user;
    return plan.creationLimit - plan.creationCount;
  };

  renderAddCreationButton = () => {
    const { creations } = this.props;

    if (isEmpty(creations)) {
      return null;
    }

    return this.availableCreations() <= 0 ? (
      <span style={{ float: "right" }}>
        You have reached the creation limit please contact to Admin to get more
        creations
      </span>
    ) : (
      <AddCreationButton onClick={this.handleAddCreation}>
        <AddIconWrapper />
        <FormattedMessage id="creations.add" />
      </AddCreationButton>
    );
  };

  //*****Modifier span englobant Formattedmesssage du bouton

  render() {
    return (
      <Page>
        <div className="row">
          <div className="col-lg-12">
            <TitleList>
              <FormattedMessage id="creations.yours" />
            </TitleList>
            {this.renderAddCreationButton()}
          </div>
        </div>

        <CardsWrapper>
          <div className="row">
            <div className="col-lg-12">{this.renderList()}</div>
          </div>
        </CardsWrapper>
      </Page>
    );
  }
}

export default withCreations(CreationsList);
