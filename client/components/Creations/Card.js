import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import IconBell from "../../images/icons/bell.svg";
import CategoryItem from "../CategoryItem";
import IconLicense from "../../images/icons/license.svg";
import IconLock from "../../images/icons/lock.svg";
import IconNoLicense from "../../images/icons/nolicense.svg";
import IconUnlock from "../../images/icons/unlock.svg";
import withCreationTypes from "../../containers/withCreationTypes";
import withCategories from "../../containers/withCategories";
import withCreation from "../../containers/withCreation";
import withUser from "../../containers/withUser";

const InnerContent = styled.div`
  padding: 15px;

  h2 {
    margin: 0 0 5px 0;
    font-weight: 600;
    text-align: left;
  }
`;

const Image = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 200px;
  background: url(${(props) =>
    props.imageurl ? props.imageurl : "http://via.placeholder.com/350x200"});
  background-size: cover;
  background-position: center center;
`;

const IconWrapper = styled.div`
  display: inline-block;

  svg {
    position: relative;
    top: 1px;
  }
`;

const IconTextWrapper = styled.div`
  color: #a9a9a9;
  font-size: 0.938em;
  p {
    color: ${({ hasLicense, isSaved, theme }) =>
      !hasLicense || !isSaved ? "#a9a9a9" : theme.artz.secondaryColor};
    margin-bottom: 0.2rem;
  }
`;

const AlertCorner = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 70px 70px 0;
  border-color: transparent
    ${({ plagiatCount, theme }) =>
      plagiatCount > 0 ? theme.artz.primaryColor : "rgba(0,0,0,0.6)"}
    transparent transparent;
`;

const AlertIconTextWrapper = styled.div`
  display: inline-block;
  position: relative;
  left: 46.55px;
  top: 8px;
`;

const AlertText = styled.span`
  display: block;
  position: absolute;
  top: 18px;
  right: -9px;
  width: 33px;
  font-family: ${(props) => props.theme.artz.secondaryFont};
  font-size: 10.8px;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

const BellIconWrapper = styled(IconBell)`
  display: block;
`;

const Categories = styled.div`
  margin-top: 1rem;
`;

class CreationsCard extends PureComponent {
  state = {
    currentPlagiatCount: 0,
  };
  renderBlockchainIcon = () => {
    const { creation } = this.props;
    const { txHash } = creation;

    let icon = <IconLock />;
    let text = <FormattedMessage id="creations.list.registered" />;

    if (!txHash) {
      icon = <IconUnlock />;
      text = <FormattedMessage id="creations.list.not_registered" />;
    }

    return (
      <p>
        <IconWrapper>{icon}</IconWrapper> &nbsp;{text}
      </p>
    );
  };

  renderLicense = () => {
    const { creation, creationTypesList, user } = this.props;
    const { creationTypeId } = creation;
    const { language } = user;
    const icon = <IconLicense />;
    let creationTypeName = "";

    const creationType = creationTypesList.find(
      ({ id }) => id === creationTypeId
    );
    if (language === "fr") {
      creationTypeName = creationType.nameFr;
    } else {
      creationTypeName = creationType.nameEn;
    }

    return (
      <p>
        <IconWrapper>{icon}</IconWrapper> &nbsp;{creationTypeName}
      </p>
    );
  };

  getDetections = async () => {
    const { creation, plagiats } = this.props;
    const { creationId } = creation;

    const myPlagiats = await plagiats(creationId);
    const detections = myPlagiats.filter(
      (p) => parseInt(p.score) > 50 && !p.excluded
    );
    const excluded = myPlagiats.filter((p) => p.excluded);
    this.setState({
      currentPlagiatCount: detections.length,
    });
  };

  render() {
    const { creation, licenseId, categoryList, txHash, user } = this.props;
    let { currentPlagiatCount } = this.state;
    const { name, categories, image, plagiatCount, creationCategories } =
      creation;
    const { language } = user;

    let myPlagiatCount = plagiatCount;
    if (myPlagiatCount > 99) {
      myPlagiatCount = "99+";
    }
    if (plagiatCount > 0) {
      this.getDetections();
    }

    return (
      <div>
        <Image imageurl={image}>
          <AlertCorner currentPlagiatCount={currentPlagiatCount}>
            <AlertIconTextWrapper>
              <BellIconWrapper />
              <AlertText>{currentPlagiatCount}</AlertText>
            </AlertIconTextWrapper>
          </AlertCorner>
        </Image>
        <InnerContent>
          <h2>{name}</h2>
          <IconTextWrapper hasLicense={licenseId}>
            {this.renderLicense()}
          </IconTextWrapper>
          <IconTextWrapper isSaved={!!txHash}>
            {this.renderBlockchainIcon()}
          </IconTextWrapper>

          <Categories>
            {creationCategories.map((categoryDomain) => {
              let categoryName = categoryDomain.nameFr;
              if (language === "en") {
                categoryName = categoryDomain.nameEn;
              }
              return (
                <CategoryItem size="sm" key={categoryDomain.id}>
                  {categoryName}
                </CategoryItem>
              );
            })}
          </Categories>
        </InnerContent>
      </div>
    );
  }
}

export default withUser(
  withCreation(withCreationTypes(withCategories(CreationsCard)))
);
