import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import IconImage from "../../../images/icons/image.svg";
import ArtWork from "../../../images/icons/artwork.svg";
import PrePatent from "../../../images/icons/pre-patent.svg";
import IconText from "../../../images/icons/text.svg";
import Page from "../../Page";
import withNewCreation from "../../../containers/withNewCreation";
import withCreationTypes from "../../../containers/withCreationTypes";
import Warning from "./Warning";

const Kind = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  margin: 0 5px 10px 5px;
  background-image: linear-gradient(
    -180deg,
    ${({ type, theme }) =>
      type === "image" || type === "pre-patent-process"
        ? "#FF9E00 0%, #FF6500 100%"
        : "#FDD84C 0%, #FAAF25 100%"}
  );
  cursor: pointer;
  padding-bottom: 0;
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  position: relative;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const TitledFixed = styled.div`
  font-size: 1em;
  line-height: 1.25em;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 0;
  text-align: center;
  position: relative;
  padding: 12px 20px;
  background-color: #f36f2b;
  border: 2px solid #f36f2b;
  border-radius: 40px;
  display: inline-block;
  margin: 30px 0;

  ${(props) => props.theme.artz.breakpoint.sm} {
    font-size: 1.5em;
    padding: 16px 30px;
  }
`;

const Desc = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.artz.secondaryFont};
  font-size: 1.5em;
  line-height: 1.15;
  font-weight: 600;
  color: #fff;
  text-align: center;

  ${(props) => props.theme.artz.breakpoint.md} {
    //margin-top: 2rem;
    font-size: 1.6vw;
    line-height: inherit;
    position: absolute;
    height: 35%;
    display: block;
    bottom: 0;
  }
  ${(props) => props.theme.artz.breakpoint.md} {
    font-size: 1.2vw;
  }
`;

const KindWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;

  ${(props) => props.theme.artz.breakpoint.sm} {
    //height: 230px;
  }
  ${(props) => props.theme.artz.breakpoint.md} {
    //height: 250px;
  }
  ${(props) => props.theme.artz.breakpoint.lg} {
    height: auto;
  }
`;

const IconKindImage = styled(IconImage)`
  height: 40px;
  margin-top: 2rem;

  ${(props) => props.theme.artz.breakpoint.md} {
    margin-top: 0px;
    height: 75%;
    position: absolute;
    display: block;
    top: 0;
  }
`;

const IconKindArtWork = styled(ArtWork)`
  height: 40px;
  margin-top: 2rem;

  ${(props) => props.theme.artz.breakpoint.md} {
    margin-top: 0px;
    height: 73%;
    position: absolute;
    display: block;
    top: 0;
  }
`;

const IconKindPrePatent = styled(PrePatent)`
  height: 40px;
  margin-top: 2rem;

  ${(props) => props.theme.artz.breakpoint.md} {
    margin-top: 0px;
    height: 75%;
    position: absolute;
    display: block;
    top: 0;
  }
`;

const IconKindText = styled(IconText)`
  height: 40px;
  margin-top: 2rem;
  ${(props) => props.theme.artz.breakpoint.md} {
    margin-top: -56px;
    height: auto;
  }
`;

class CreationsNewKind extends PureComponent {
  state = {
    errors: {
      acceptedTerms: null,
    },
    hasToAcceptTerms: false,
    modalAccepted: false,
    modalText: "",
    showModal: false,
  };

  handleSubmitModal = () => {
    const { history } = this.props;
    const { hasToAcceptTerms, modalAccepted } = this.state;

    if (hasToAcceptTerms && !modalAccepted) {
      this.setState({ showModal: true, errors: { acceptedTerms: true } });
    } else {
      this.setState({ showModal: false });
      history.push("/creations/new/type");
    }
  };

  availableCreations = () => {
    const { plan } = this.props;
    return plan.creationLimit - plan.creationCount;
  };

  componentDidMount() {
    if (this.availableCreations() <= 0) {
      this.props.history.push("/creations");
    } else {
      window.scrollTo(0, 0);
      const { resetCreation } = this.props;
      console.log("kind component", this.props);
      resetCreation();
    }
  }

  handleCancelModal = () => {
    this.setState({ showModal: false });
  };

  handleClickAcknowledge = () => {
    this.setState({ modalAccepted: true });
  };

  handleSetKind = (newKind) => () => {
    const {
      creation,
      history,
      resetCreation,
      setCreationKind,
      creationTypesList,
      setNewCreationField,
    } = this.props;
    const { kind } = creation;

    if (kind && newKind !== kind) {
      resetCreation();
    }
    setCreationKind(newKind);

    if (newKind == "pre-patent-process") {
      const creationType = creationTypesList.find(
        (ct) => ct.code == "idea_image"
      );
      if (creationType) {
        setNewCreationField("creationTypeId", creationType.id);
        setNewCreationField("completedLicense", true);
        history.push("/creations/new/infos");
      }
    } else {
      history.push("/creations/new/type");
    }
  };

  render() {
    const { errors, modalAccepted, modalText, showModal } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <FlexBox>
              <TitledFixed>
                <FormattedMessage id="creations.new.kind.subtitle" />
              </TitledFixed>
            </FlexBox>
          </div>

          <div className="col-lg-12">
            <KindWrapper>
              <Kind
                type="image"
                id="kind-image"
                onClick={this.handleSetKind("image")}
              >
                <IconKindImage />
                <Desc>
                  <FormattedMessage id="creations.new.kind.image" />
                </Desc>
              </Kind>

              <Kind
                type="text"
                id="kind-text"
                onClick={this.handleSetKind("text")}
              >
                <IconKindText />
                <Desc>
                  <FormattedMessage id="creations.new.kind.text" />
                </Desc>
              </Kind>

              <Warning
                hasError={errors.acceptedTerms}
                isChecked={modalAccepted}
                onCancel={this.handleCancelModal}
                onClickAcknowledge={this.handleClickAcknowledge}
                onClose={this.handleCancelModal}
                onSubmit={this.handleSubmitModal}
                showModal={showModal}
                textId={modalText}
              />

              <Kind
                type="image"
                id="kind-art"
                onClick={this.handleSetKind("art")}
              >
                <IconKindArtWork />
                <Desc>
                  <FormattedMessage id="creations.new.kind.art" />
                </Desc>
              </Kind>

              <Kind
                type="text"
                id="kind-digital"
                onClick={this.handleSetKind("digital")}
              >
                <IconKindImage />
                <Desc>
                  <FormattedMessage id="creations.new.kind.digital" />
                </Desc>
              </Kind>

              {/* <Kind type="pre-patent-process" id="kind-digital" onClick={this.handleSetKind("pre-patent-process")}>
                <IconKindPrePatent />
                <Desc>
                  <FormattedMessage id="creations.new.kind.pre_patent_process" />
                </Desc>
              </Kind> */}
            </KindWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withNewCreation(withCreationTypes(CreationsNewKind)));
