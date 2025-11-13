import React, {PureComponent} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {withRouter} from 'react-router';
import styled from 'styled-components';
import {post, createFormData} from 'fungo';

import Categories from './Categories';
import CategoryItem from "../CategoryItem";
import BellIcon from "../../images/icons/bell2.svg";
import Button from '../Button';
import DownloadIcon from "../../images/icons/download.svg";
import EditIcon from "../../images/icons/edit.svg";
import FormInput from '../Form/Input';
import FormInputGroup from '../Form/InputGroup';
import FormLabel from '../Form/Label';
import HelpIcon from "../../images/icons/help.svg";
import Loading from '../Loading';
import Modal from "../Modal";
import ModalContentWrapper from '../ModalContentWrapper'
import PdfIcon from "../../images/icons/pdf.svg";
import Title from '../Title';
import WaitIcon from "../../images/icons/wait.svg";
import withCreation from "../../containers/withCreation";
import withCategories from "../../containers/withCategories";
import withUser from "../../containers/withUser";
import ModalFormPayment from "../Form/Payment/ModalFormPayment";
import PlagiarismHighlighter from '../PlagiarismHighlighter'
import AuthorsModal from "./New/AuthorsModal";
import {
  setCreationField,
  updateAuthors,
  deleteAuthor,
  excludePlagiarism,
} from "../../actions/creations";
import IconClose from "../../images/icons/close.svg";

const Wrapper = styled.div`
`;

const CategorieTags = styled.div`
  margin-top: 1rem;
`;

const PlagiarismButton = styled(Button)`
  padding: 10px 45px;
  margin-bottom: 25px;
  background: none;
  font-size: 0.750em;
  color: ${props => props.theme.artz.primaryColor};  
  border: 2px solid;
  
  &:hover{
    opacity: 1;
    background: ${props => props.theme.artz.primaryColor};
    color: #FFF;
    
    svg {
      path{
        fill: #FFF;
      }
    }
  }
`;

const IconDeletePlagiarism = styled(IconClose)`
  color: ${(props) => props.theme.artz.primaryColor};
  background: none;
  cursor: pointer;
  flex-shrink: 0;

  * {
    fill: ${(props) => props.theme.artz.primaryColor};
  }
`;

const IconCloseModal = styled(IconClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  margin-left: 5px;
  cursor: pointer;
  *{
    fill: ${({theme}) => theme.artz.darkGrey};
  };
`;

const CustomLink = styled.a`
  display: inline-block;
  color: ${props => props.theme.artz.primaryColor};
  text-decoration: underline;
`;

const LinkIconWrapper = styled(EditIcon)`
  margin-right: 5px;
`;

const DownloadIconWrapper = styled(DownloadIcon)`
  margin-right: 5px;
`;

const WaitIconWrapper = styled(WaitIcon)`
  position: relative;
  width: 15px;
  height: 15px;
  bottom: -2px;
`;

const HelpIconWrapper = styled(HelpIcon)`
  margin-left: 8px;
  vertical-align: middle;
  display: none;
`;

const PdfIconWrapper = styled(PdfIcon)`
  margin-right: 5px;
  vertical-align: middle;  
`;

const BellIconWrapper = styled(BellIcon)`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  vertical-align: bottom;
  
  path {
    fill: ${props => props.theme.artz.primaryColor};
  }
`;

const CreationDetailsWrapper = styled.div`
  margin-bottom: 25px;  
`;

const DownloadLinkWrapper = styled.div`
  margin-bottom: 40px;  
  text-align: center;
      
  ${props => props.theme.artz.breakpoint.md}{
    text-align: left;
  }         
`;

const LabelTextWrapper = styled.div`
  label {
    margin-bottom: 0;
    color: ${props => props.theme.artz.darkGrey};  
  }  
`;

const Description = styled.p`
  margin-bottom: 25px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;  
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
`;

const TextWrapper = styled.div`
  padding: 15px;
  margin-bottom: 25px;
  overflow-y: scroll;
  border: 2px solid #d2d2d2;    
`;

const Notification = styled.div`
  padding: 1.5rem;
  background-color: ${({theme}) => theme.artz.greyWhite};
  p{
    margin-bottom: 1.5rem;
  }
`;

const CustomContainer = styled.div`        
    ${props => props.theme.artz.breakpoint.md}{
      width: 900px;
    }       
`;

const ContainerWrapper = styled.div`       
    ${props => props.theme.artz.breakpoint.md}{
      padding-right: 0px;
      padding-left: 0px;
    }         
`;

const DetectionListWrapper = styled.div`       
  margin-top: 25px;  
`;

const PlagiarismNotice = styled.p`
  font-style: italic;
  color: #777777;
`;

const DetectionList = styled.div`
  @media (max-width: 576px) {
    padding-right: 25px !important;
  }

  ul {
    padding-left: 0;
    list-style-type: none;
    li {
      &:nth-child(odd) {
        background: #ededed;
      }
      
      &:nth-child(even){
        background: #FFF;
      }
      
      a{
        display: block;
        padding: 5px 12px;
        color: ${props => props.theme.artz.primaryColor};
        text-decoration: underline;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 45em;
      }

      span{
        color: black;
        text-decoration: none;
        padding-left: 1.5rem;
      }
    }
  }
  .link_highlight{
    color: ${props => props.theme.artz.primaryColor};
    font-weight: bold;
    
    }     
  .link_highlight:hover{
     color: #1b88b3;
     cursor: pointer;
     }
`;

const ExcludedDetectionList = styled.div`
  ul {
    padding-left: 0;
    list-style-type: none;

    li {
      a {
        display: block;
        padding: 5px 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const HideOnMobileDevice = styled.div`
  display: none;      
  
  ${props => props.theme.artz.breakpoint.lg} {
    display: block;    
  }
`;

function createMarkup() {
  return {__html: 'First &middot; Second'};
}

const userIntialState = {
  is_org: false,
  org_name: '',
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  mail: '',
  type: '',
}

class CreationsPage extends PureComponent {
  state = {
    modalCategoriesOpened: false,
    modalCertificateOpened: false,
    modalPlagiarismOpened: false,
    modalExcludePlagiarismOpened: false,
    modalRegisterOpened: false,
    excludedPlagiarismId: null,
    currentPlagiatCount: null,
    detections: [],
    excludedDetections: [],
    pdfPassword: null,
    loading: false,
    isOpen: false,
    modalType: "CreationAuthor",
    selectedAuthor: { ...userIntialState },
    selectedOwner: { ...userIntialState },
    creation: {
      ...this.props.creation,
    },
  };

  handleOpenModalDiffered = (modalName) => {
    return (e) => this.handleOpenModal(modalName, e);
  }

  handleOpenModal = (name, e) => {
    e.preventDefault();
    this.setState({
      [name]: true,
    });

  };

  handleCloseModal = (name) => {
    return () => {
      this.setState({
        [name]: false,
        loading: false
      });
    };
  };

  setOtherCreation = (name) => {
    const { creation } = this.state;
    if (creation) {
      this.setState({
        creation: {
          ...creation,
          otherCategory: name,
        },
      });
      this.props.dispatch(
        setCreationField(creation.creationId, "otherCategory", name)
      );
    }
  };

  setUpdatedCreationCategories = (creationCategories, categories) => {
    const { creation } = this.state;
    this.setState({
      creation: {
        ...creation,
        categories: categories,
        creationCategories: creationCategories,
      },
    });
    this.props.dispatch(
      setCreationField(creation.creationId, "categories", categories)
    );
    this.props.dispatch(
      setCreationField(
        creation.creationId,
        "creationCategories",
        creationCategories
      )
    );
  };

  updateSelectedCategories = (newSelected) => {
    const { creation } = this.state;
    this.setState({
      creation: {
        ...creation,
        categories: newSelected,
      },
    });
    this.props.setCreationCategories(creation.creationId, newSelected);
  };

  handleCloseCategories = () => {
    const {resetCreations} = this.props;
    resetCreations();
    return this.handleCloseModal('modalCategoriesOpened')();
  };

  handleNavigateToPlagiarismHelpGuide = () => {
    const {history} = this.props;

    history.push('/plagiarism_help_guide')
  }

  renderPlagiarism = () => {
    const { creation } = this.state;
    const { currentPlagiatCount } = this.state;
    const { registeredState } = creation;

    if (registeredState) {
      return (
        <PlagiarismButton id="detections" onClick={this.openDetections}>
          {currentPlagiatCount > 0 && <BellIconWrapper />}
          {currentPlagiatCount > 0 ? (
            <FormattedMessage
              id="creations.show.detection"
              values={{ number: currentPlagiatCount }}
            />
          ) : (
            <FormattedMessage id="creations.show.no_new_detection" />
          )}
        </PlagiarismButton>
      );
    } else {
      return (
        <LabelTextWrapper>
          <label>
            <FormattedMessage id="creations.show.detections.label"/>
          </label>
          <p>
            <small>
              <FormattedMessage id="creations.show.detections.no_detection_until_registered"/>
            </small>
          </p>
        </LabelTextWrapper>
      );
    }
  };

  handleRegisterNow = () => async () => {
    try {
      this.setState({ loading: true });
      const { registerCreation, refreshUser, resetCreation } = this.props;
      const { creation } = this.state;

      const { creationId } = creation;
      await registerCreation(creationId);
      await refreshUser();

        this.redirectToRegisterCompleted(creationId);

        resetCreation();
      } finally {
        this.setState({loading: false});
      }
    };

  redirectToRegisterCompleted = (creationId) => {
    const {history} = this.props;
    return history.push(`/creations/${creationId}/completed_with_code`);
  }

  renderRegistration = () => {
    const {user} = this.props;
    const { creation } = this.state;
    const {allowRegisterWithoutPayment} = user;
    const { registeredState } = creation;

    if (!registeredState && allowRegisterWithoutPayment) {
      return (
        <Notification>
          <p><FormattedMessage id="creations.new.registration.payment_section.options.not_now_warning_title"/></p>
          <Button size="small" onClick={this.handleRegisterNow()}>
            <FormattedMessage id="creations.show.no_register_button"/>
          </Button>
        </Notification>
      );
    }

    const {modalRegisterOpened} = this.state;

    if (!registeredState) {
      return (
        <Notification>
          <Modal opened={modalRegisterOpened} closeModal={this.handleCloseModal('modalRegisterOpened')}>
            <ModalContentWrapper>
              <ModalFormPayment registerCallback={this.handleCloseModal('modalRegisterOpened')} />
            </ModalContentWrapper>
          </Modal>

          <p><FormattedMessage id="creations.new.registration.payment_section.options.not_now_warning_title"/></p>
          <Button size="small" onClick={this.handleOpenModalDiffered('modalRegisterOpened')}>
            <FormattedMessage id="creations.show.no_register_button"/>
          </Button>
        </Notification>
      );
    }

    return null;
  };

  renderCertificate = () => {
    const { txHash, registeredState } = this.state.creation;

    if (registeredState != null) {
      return (
        <LabelTextWrapper>
          <p>
            <CustomLink id="certificate-link" href="#" onClick={this.handleOpenModalDiffered('modalCertificateOpened')}>
              <PdfIconWrapper/>
              <FormattedMessage id="creations.show.proof_record"/>
            </CustomLink>
          </p>
        </LabelTextWrapper>
      );
    } else {
      return (
        <LabelTextWrapper>
          <p>
            <small>
              <FormattedMessage id="creations.show.no_proof_record"/>
            </small>
          </p>
        </LabelTextWrapper>
      )
    }


  };

  openCategories = (e) => {
    const {takeSnapshotOfCreations} = this.props;
    takeSnapshotOfCreations();
    return this.handleOpenModal('modalCategoriesOpened', e);
  };

  getDetections = async () => {
    const { plagiats } = this.props;
    const { creation } = this.state;
    const { creationId } = creation;

    const myPlagiats = await plagiats(creationId);
    const detections = myPlagiats.filter(
      (p) => parseInt(p.score) > 50 && !p.excluded
    );
    const excluded = myPlagiats.filter((p) => p.excluded);

    this.setState({
      detections: detections,
      currentPlagiatCount: detections.length,
      excludedDetections: excluded,
    });
  };

  openDetections = async (e) => {
    await this.getDetections();
    return this.handleOpenModal("modalPlagiarismOpened", e);
  };

  openExcludePlagiarism = async (e) => {
    this.setState({
      excludedPlagiarismId: e.currentTarget.querySelector("input").value,
    });
    return this.handleOpenModal("modalExcludePlagiarismOpened", e);
  };

  convertKeysToCamelCase = (obj) => {
    const result = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, char) =>
          char.toUpperCase()
        );
        result[camelCaseKey] = obj[key];
      }
    }
    return result;
  };

  renderCategories = () => {
    const {modalCategoriesOpened} = this.state;
    const {categoryList, user} = this.props;
    const { creation } = this.state;
    const { creationCategories } = creation;
    const {categories} = creation;
    const {language} = user;
    console.log(this.props, 'this.props');
    return (
      <CategorieTags>
        {creationCategories.map((categoryDomain) => {
          let categoryName = categoryDomain.nameFr;
          if (language === 'en') {
            categoryName = categoryDomain.nameEn;
          }
          return (
            <CategoryItem size="sm" key={categoryDomain.id}>
              {categoryName}
            </CategoryItem>
          );
        })}

        <p>
          <CustomLink href="#" onClick={this.openCategories}>
            <LinkIconWrapper/>
            <FormattedMessage id="creations.show.catgory_link"/>
          </CustomLink>
        </p>
      </CategorieTags>
    )
  };

  renderText = () => {
    const { creation } = this.state;
    const { textExtract } = creation;

    return (
      <LabelTextWrapper>
        <label>
          <FormattedMessage id="creations.new.infos.section_extract.title"/>
        </label>
        <p>{textExtract}</p>
      </LabelTextWrapper>
    )
  };

  renderRegisteredKeyLabel = () => {
    return (
      <label>
        <FormattedMessage id="creations.show.registry_key"/>
        <HelpIconWrapper/>
      </label>
    )
  };

  renderRegisteredKey = () => {
    const { contractAddress, txHash, registeredState, creationId } = this.state.creation;
    if (registeredState === 'registered') {
      return (
        <LabelTextWrapper>
          {this.renderRegisteredKeyLabel()}
          <a
            href={`https://polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>{txHash}</p>
          </a>
        </LabelTextWrapper>
      );
    }

    else if (registeredState != null) {
      return (
        <LabelTextWrapper>
          {this.renderRegisteredKeyLabel()}
          <p><WaitIconWrapper/> <FormattedMessage id="creations.show.pending"/></p>
        </LabelTextWrapper>
      );
    // } else if (registeredState === 'building') {
    //   return (
    //     <LabelTextWrapper>
    //       {this.renderRegisteredKeyLabel()}
    //       <p>{txHash}</p>
    //     </LabelTextWrapper>
    //   );
    }

    return (
      null
    );
  };

  saveCategories = async () => {
    const { creation } = this.state;
    const { saveCategories } = this.props;
    const updatedCreation = await saveCategories(creation);
    this.setUpdatedCreationCategories(
      updatedCreation.creationCategories,
      updatedCreation.categories
    );
    this.handleCloseModal("modalCategoriesOpened")();
  };

  readableDate = (dateInString) =>
    new Date(dateInString).toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      year: "numeric",
      month: "long",
    });

  certify = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ loading: true });

    try {
      const { creation } = this.state;
      const { pdfPassword } = this.state;
      const formData = createFormData({
        password: pdfPassword,
        id: creation.creationId,
      });
      const response = await post(
        `/creations/${creation.creationId}/certify/`,
        formData
      );
      const data = await response.blob();
      let url = "";

      if (window.navigator.msSaveOrOpenBlob) {
        url = window.navigator.msSaveOrOpenBlob(data, "certificate.zip");
      } else {
        url = window.URL.createObjectURL(data, { type: "application/zip" });
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "certificate.zip";
        a.click();
        window.URL.revokeObjectURL(url);
      }

      this.handleCloseModal("modalCertificateOpened")();
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  setPdfPassword = (e) => {
    const { value } = e.target;
    this.setState({ pdfPassword: value });
  };

  renderLoading = () => {
    const { loading } = this.state;

    if (!loading) {
      return null;
    }

    return <Loading />;
  };

  renderTextFromSnippet = (annotated_text) => {
    const snippets = JSON.parse(annotated_text);

    return (
      <p>
        {snippets.map(({ text, links }) => {
          if (links) {
            return <PlagiarismHighlighter text={text} toolTipText={links} />;
          } else {
            return text;
          }
        })}
      </p>
    );
  };

  toggleModal = (modalType) => {
    this.setInitialState(modalType);
    this.setState({
      isOpen: !this.state.isOpen,
      modalType: modalType,
    });
  };

  setInitialState = (modalType) => {
    if (modalType == "CreationAuthor") {
      this.setState({
        selectedAuthor: { ...userIntialState },
      });
    } else {
      this.setState({
        selectedOwner: { ...userIntialState },
      });
    }
  };

  handleAuthorsChange = (e) => {
    const { modalType, selectedAuthor, selectedOwner } = this.state;
    if (modalType == "CreationAuthor") {
      this.setState({
        selectedAuthor: {
          ...selectedAuthor,
          [e.target.name]: e.target.value,
          type: "CreationAuthor",
        },
      });
    } else if (modalType == "CreationOwner") {
      this.setState({
        selectedOwner: {
          ...selectedOwner,
          [e.target.name]: e.target.value,
          type: "CreationOwner",
        },
      });
    }
  };

  handleIsOrganization = () => {
    const { modalType, selectedAuthor, selectedOwner } = this.state;
    if (modalType == "CreationAuthor") {
      this.setState({
        selectedAuthor: {
          ...selectedAuthor,
          is_org: !selectedAuthor.is_org,
        },
      });
    } else if (modalType == "CreationOwner") {
      this.setState({
        selectedOwner: {
          ...selectedOwner,
          is_org: !selectedOwner.is_org,
        },
      });
    }
  };

  saveCreationUser = async () => {
    const { selectedAuthor, selectedOwner, modalType, isOpen, errors } =
      this.state;
    const { dispatch } = this.props;
    const { creation } = this.state;
    const { creationAuthors, creationOwners, creationId } = creation;

    if (modalType == 'CreationAuthor') {
      let authors = creationAuthors.map( author => {
        if (author.id === selectedAuthor.id) {
          return selectedAuthor;
        } else {
          return author;
        }
      });
      Array.prototype.push.apply(authors, creationOwners);
      await this.setState({ isOpen: !isOpen });
      await updateAuthors(authors, creationId);
      let newAuthors = creationAuthors.map((author) => {
        if (author.id === selectedAuthor.id) {
          return selectedAuthor;
        } else {
          return author;
        }
      });
      this.setState({ creation: { ...creation, creationAuthors: newAuthors } });
      dispatch(setCreationField(creationId, "creationAuthors", newAuthors));
      await this.setState({ selectedAuthor: { ...userIntialState } });
    } else if (modalType == "CreationOwner") {
      let owners = creationOwners.map((owner) => {
        if (owner.id === selectedOwner.id) {
          return selectedOwner;
        } else {
          return owner;
        }
      });
      Array.prototype.push.apply(owners, creationAuthors);
      await this.setState({ isOpen: !isOpen });
      await updateAuthors(owners, creationId);
      let newOwners = creationOwners.map((owner) => {
        if (owner.id === selectedOwner.id) {
          return selectedOwner;
        } else {
          return owner;
        }
      });
      this.setState({ creation: { ...creation, creationOwners: newOwners } });
      dispatch(setCreationField(creationId, "creationOwners", newOwners));
      await this.setState({ selectedOwner: { ...userIntialState } });
    }
  };

  handleEditUserModal = async (modalType, email, key) => {
    if (modalType == "CreationAuthor") {
      await this.setSelectedAuthor(key);
    } else {
      await this.setSelectedOwner(key);
    }
    this.setState({
      isOpen: !this.state.isOpen,
      modalType: modalType,
    });
  };

  setSelectedAuthor = (key) => {
    const { creation } = this.state;
    const { creationAuthors } = creation;
    this.setState({
      selectedAuthor: creationAuthors.find((author) => author.id === key),
    });
  };

  setSelectedOwner = (key) => {
    const { creation } = this.state;
    const { creationOwners } = creation;
    this.setState({
      selectedOwner: creationOwners.find((owner) => owner.id === key),
    });
  };

  digitalMusicComponent = () => {
    const { audio, video } = this.state.creation;

    if (audio && Object.keys(audio).length > 0) {
      return <audio controls src={audio} style={{ width: "100%" }} />;
    } else if (video && Object.keys(video).length > 0) {
      return <video src={video} controls style={{ width: "100%" }} />;
    } else {
      return null;
    }
  };

  removeAuthor = async (authorId) => {
    const { creation } = this.state;
    const { dispatch } = this.props;
    let { creationAuthors, creationOwners, creationId } = creation;
    creationAuthors = creationAuthors.filter(
      (author) => author.id !== authorId
    );
    await deleteAuthor(authorId, creationId);
    this.setState({
      creation: { ...creation, creationAuthors: creationAuthors },
    });
    dispatch(setCreationField(creationId, "creationAuthors", creationAuthors));
  };

  removeOwner = async (ownerId) => {
    const { dispatch } = this.props;
    const { creation } = this.state;
    let { creationAuthors, creationOwners, creationId } = creation;
    creationOwners = creationOwners.filter((owner) => owner.id !== ownerId);
    await deleteAuthor(ownerId, creationId);
    this.setState({
      creation: { ...creation, creationOwners: creationOwners },
    });
    dispatch(setCreationField(creationId, "creationOwners", creationOwners));
  };

  excludePlagiarism = async (e) => {
    const { creation } = this.state;
    const { excludedPlagiarismId } = this.state;
    let { creationId } = creation;
    if (creationId && excludedPlagiarismId) {
      await excludePlagiarism(creationId, excludedPlagiarismId);
      await this.getDetections();
      this.handleCloseModal("modalExcludePlagiarismOpened")();
      if (this.state.detections.length < 1) {
        this.handleCloseModal("modalPlagiarismOpened")();
      }
    }
  };

  componentDidMount() {
    this.getDetections();
  }

  render() {
    const {
      modalCategoriesOpened,
      modalCertificateOpened,
      modalPlagiarismOpened,
      modalExcludePlagiarismOpened,
      excludedPlagiarismId,
      detections,
      excludedDetections,
      pdfPassword,
    } = this.state;
    const { currentPlagiatCount, modalType, selectedAuthor, selectedOwner } =
      this.state;
    const { intl } = this.props;
    const { creation } = this.state;
    const {
      creationCategories,
      description,
      kind,
      image,
      name,
      categories,
      document,
      otherCategory,
      creationId,
      virtualObject,
      creationDate,
      creationAuthors,
      creationOwners,
    } = creation;
    const { formatMessage } = intl;
    let renderTextExtract = null;

    if (kind === "text") {
      renderTextExtract = this.renderText();
    }
    return (
      <Wrapper>
        <AuthorsModal
          userType={modalType}
          userData={
            modalType == "CreationAuthor" ? selectedAuthor : selectedOwner
          }
          isOpen={this.state.isOpen}
          toggleModal={this.toggleModal}
          handleAuthorsChange={this.handleAuthorsChange}
          saveCreationUser={this.saveCreationUser}
          handleIsOrganization={this.handleIsOrganization}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <Title>{name}</Title>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Image id="creation-image" src={image} />

              <DownloadLinkWrapper>
                <CustomLink
                  href={virtualObject || document || image}
                  target="_blank"
                >
                  <DownloadIconWrapper />
                  <FormattedMessage id="creations.download_link" />
                </CustomLink>
              </DownloadLinkWrapper>
              {this.digitalMusicComponent()}
              <div>
                <h4>
                  <FormattedMessage id="creations.owners" />
                </h4>
                {creationOwners.map((owner) => (
                  <div className="creation-show-author-owner-container">
                    <div>
                      <div className="user-name">
                        {owner.first_name} {owner.last_name} ({owner.mail})
                      </div>
                      <small>{owner.address}</small>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div>
                <h4>
                  <FormattedMessage id="creations.authors" />
                </h4>
                {creationAuthors.map((author) => (
                  <div className="creation-show-author-owner-container">
                    <div>
                      <div className="user-name">
                        {author.first_name} {author.last_name} ({author.mail})
                      </div>
                      <small>{author.address}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <CreationDetailsWrapper>
                {this.renderPlagiarism()}

                <LabelTextWrapper>
                  <label>
                    <FormattedMessage id="creations.description" />
                  </label>
                  <Description>{description}</Description>
                </LabelTextWrapper>

                {renderTextExtract}

                {this.renderCategories()}

                <LabelTextWrapper>
                  <label>
                    <FormattedMessage id="creations.show.creation_date" />
                  </label>
                  <p>{this.readableDate(creationDate)}</p>
                </LabelTextWrapper>
                {this.renderRegisteredKey()}
                {this.renderCertificate()}
              </CreationDetailsWrapper>

              {this.renderRegistration()}
            </div>
          </div>
        </div>

        <Modal
          opened={modalCategoriesOpened}
          closeModal={this.handleCloseCategories}
        >
          <ModalContentWrapper>
            <h1>
              <FormattedMessage id="creations.new.infos.section_categories.title" />
            </h1>
            <p>
              <FormattedMessage id="creations.show.modal_categories_subtext" />
            </p>

            <CustomContainer className="container">
              <div className="row">
                <ContainerWrapper className="col-lg-12">
                  <Categories
                    onSelect={this.updateSelectedCategories}
                    selected={categories}
                    otherCategory={otherCategory}
                    creationCategories={this.convertKeysToCamelCase(
                      creationCategories
                    )}
                  />
                </ContainerWrapper>
              </div>
            </CustomContainer>

            <div className="text-center">
              <Button type="primary" size="" onClick={this.saveCategories}>
                <FormattedMessage id="save" />
              </Button>
            </div>
          </ModalContentWrapper>
        </Modal>

        <Modal
          id="modalCertificate"
          opened={modalCertificateOpened}
          closeModal={this.handleCloseModal("modalCertificateOpened")}
        >
          <ModalContentWrapper>
            <h1>
              <FormattedMessage id="creations.show.proof_record" />
            </h1>
            <p>
              <FormattedMessage id="creations.show.modal_proof_record_subtext" />
            </p>

            <FormInputGroup>
              <FormLabel>
                <FormattedMessage id="creations.show.pdf_password" />
              </FormLabel>
              <FormInput
                name="pdf_password"
                placeholder={formatMessage({ id: "creations.show.optional" })}
                onChange={this.setPdfPassword}
                value={pdfPassword}
              />
            </FormInputGroup>

            <div className="text-center">
              <Button
                id="generate-cert-btn"
                type="primary"
                size=""
                onClick={this.certify}
              >
                <FormattedMessage id="creations.show.pdf_create_button" />
              </Button>
            </div>
          </ModalContentWrapper>
        </Modal>

        <Modal
          opened={modalPlagiarismOpened}
          closeModal={this.handleCloseModal("modalPlagiarismOpened")}
        >
          <ModalContentWrapper>
            <h1>
              <FormattedMessage
                id="creations.show.detections.title"
                values={{ number: currentPlagiatCount }}
              />
            </h1>
            <h1>
              {detections && detections.length > 0
                ? detections[0].score + "%"
                : ""}
            </h1>

            {currentPlagiatCount > 0 ? (
              <p>
                <FormattedMessage
                  id="creations.show.modal_detection_subtext"
                  values={{ number: currentPlagiatCount }}
                />
              </p>
            ) : (
              <p>
                <FormattedMessage id="creations.show.modal_no_detection" />
              </p>
            )}

            <div className="text-center remove-margin">
              <PlagiarismButton
                size="small"
                onClick={this.handleNavigateToPlagiarismHelpGuide}
              >
                <FormattedMessage id="creations.show.modal_detection_btn" />
              </PlagiarismButton>
            </div>

            <div className="text-center remove-margin">
              <small>
                <FormattedMessage id="mailer.confirmation_instructions.body_3" />
              </small>
              <br></br>
              <CustomLink href="https://www.artizyou.com/faq.html">
                <small>www.artizyou.com/faq</small>
              </CustomLink>
            </div>

            <CustomContainer className="container">
              <div className="row">
                <ContainerWrapper className="col-lg-12">
                  <DetectionListWrapper>
                    <h2 className="my-4">{name}</h2>
                    <DetectionList>
                      <ul>
                        {detections.map(({ id, score, url }) => {
                          return (
                            <div class="row">
                              <div class="col-lg-11 p-0">
                                <li>
                                  <a target="_blank" href={url}>
                                    {score}% - {url}
                                  </a>
                                </li>
                              </div>
                              <div
                                class="col-1 d-flex align-items-center mb-2"
                                onClick={this.openExcludePlagiarism}
                              >
                                <input hidden="true" value={id} />
                                <IconDeletePlagiarism />
                              </div>
                            </div>
                          );
                        })}
                      </ul>
                    </DetectionList>
                    {excludedDetections.length > 0 && (
                      <ExcludedDetectionList className="mt-5">
                        <h6>Previous detections:</h6>
                        <ul>
                          {excludedDetections.map(({ url }) => {
                            return (
                              <div class="row">
                                <div class="col-lg-12 p-0">
                                  <li>
                                    <a target="_blank" href={url}>
                                      {url}
                                    </a>
                                  </li>
                                </div>
                              </div>
                            );
                          })}
                        </ul>
                      </ExcludedDetectionList>
                    )}
                    {/* {
                      'text' === kind && (
                        <DetectionList>
                          {detections.map(({annotated_text, score, sources}) => {
                            return this.renderTextFromSnippet(annotated_text)
                          })}
                        </DetectionList>
                      )
                    }
                    {
                      'image' === kind && (
                        <DetectionList>
                          <ul>
                            {detections.map(({url}) => {
                              return <li><a target="_blank" href={url}>{url}</a></li>;
                            })}
                          </ul>
                        </DetectionList>
                      )
                    } */}
                  </DetectionListWrapper>
                </ContainerWrapper>
              </div>
            </CustomContainer>
          </ModalContentWrapper>
        </Modal>

        <Modal
          opened={modalCategoriesOpened}
          closeModal={this.handleCloseCategories}
        >
          <ModalContentWrapper>
            <h1>
              <FormattedMessage id="creations.new.infos.section_categories.title" />
            </h1>
            <p>
              <FormattedMessage id="creations.show.modal_categories_subtext" />
            </p>

            <CustomContainer className="container">
              <div className="row">
                <ContainerWrapper className="col-lg-12">
                  <Categories
                    onSelect={this.updateSelectedCategories}
                    selected={categories}
                    otherCategory={otherCategory}
                    onAddOtherCreation={this.setOtherCreation}
                    creationCategories={this.convertKeysToCamelCase(
                      creationCategories
                    )}
                  />
                </ContainerWrapper>
              </div>
            </CustomContainer>

            <div className="text-center">
              <Button type="primary" size="" onClick={this.saveCategories}>
                <FormattedMessage id="save" />
              </Button>
            </div>
          </ModalContentWrapper>
        </Modal>

        <Modal
          opened={modalExcludePlagiarismOpened}
          closeModal={this.handleCloseModal("modalExcludePlagiarismOpened")}
        >
          <ModalContentWrapper>
            <h1>
              <FormattedMessage id="creations.show.detections.delete.title" />
            </h1>
            <p>
              <FormattedMessage id="creations.show.detections.delete.label" />
            </p>

            <div className="row d-flex justify-content-center my-5">
              <div className="text-center remove-margin">
                <PlagiarismButton
                  size="small"
                  onClick={this.handleCloseModal(
                    "modalExcludePlagiarismOpened"
                  )}
                >
                  <FormattedMessage id="creations.show.detections.delete.cancel" />
                </PlagiarismButton>
              </div>
              <div className="text-center remove-margin pl-1">
                <PlagiarismButton size="small" onClick={this.excludePlagiarism}>
                  <FormattedMessage id="creations.show.detections.delete.confirm" />
                </PlagiarismButton>
              </div>
            </div>

            {/*
            <CustomContainer className="container">
              <div className="row">
                <ContainerWrapper className="col-lg-12">
                  <Categories onSelect={setCreationCategories(creationId)} selected={categories}/>
                </ContainerWrapper>
              </div>
            </CustomContainer>

            <div className="text-center">
              <Button type="primary" size="" onClick={this.saveCategories}>
                <FormattedMessage id="save"/>
              </Button>
            </div> */}
          </ModalContentWrapper>
        </Modal>

        {this.renderLoading()}
      </Wrapper>
    );
  }
}

export default withUser(
  withCategories(withCreation(injectIntl(withRouter(CreationsPage))))
);
