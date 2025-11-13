import React, { PureComponent } from "react";
import countries from "i18n-iso-countries";
import { FormattedMessage, injectIntl } from "react-intl";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import Button from "../../Button";

import Categories from "../Categories";
import FormCheckbox from "../../Form/Checkbox";
import FormDropzone from "../../Form/Dropzone";
import FormLabel from "../../Form/Label";
import FileDropzone from "../../Form/FileDropzone";
import Required from "../../Form/Required";
import RequiredFormInputGroup from "../../Form/RequiredFormInputGroup";
import RequiredFormInputTextGroup from "../../Form/RequiredFormInputTextGroup";
import RequiredFormInputTextareaGroup from "../../Form/RequiredFormInputTextareaGroup";
import FormSection from "../../Form/Section";
import FormSelect from "../../Form/Select";
import FormSelectCreatable from "../../Form/SelectCreatable";
import SpanWithTooltip from "../../SpanWithTooltip";
import HeadingWithText from "../../HeadingWithText";
import HeadingWithTextHighlighted from "../../HeadingWithTextHighlighted";
import withCreationTypes from "../../../containers/withCreationTypes";
import withNewCreation from "../../../containers/withNewCreation";
import withUser from "../../../containers/withUser";
import { yearOptions } from "../../../utils/dates";
import {
  hasError,
  isBlank,
  isEmpty,
  isEmptyObject,
  isFalse,
} from "../../../utils/validations";
import { collectOptions, findOption } from "../../../utils/select_options";
import Notification from "../../Notification";
import DatePicker from "react-datepicker";
import AuthorsModal from "./AuthorsModal";
import InformationConfirmationModal from "./InformationConfirmation";
import "react-datepicker/dist/react-datepicker.css";
import FormSelectSearchable from "../../Form/SelectSearchable";
import { setNewCreationField } from "../../../actions/creation";
import { BsFillXCircleFill } from "react-icons/bs";
import IconClose from "../../../images/icons/close.svg";

const Wrapper = styled.div`
  padding: 25px 0;

  ${(props) => props.theme.artz.breakpoint.sm} {
    padding: 75px 0;
  }
`;

const IconCloseModal = styled(IconClose)`
  margin-left: 5px;
  cursor: pointer;
  *{
    fill: ${({ theme }) => theme.artz.darkGrey};
  };
  }

`;

const CheckboxWrapper = styled(FormCheckbox)`
  top: 0;
  margin: 0 5px 0 0;
`;

const CheckboxSpan = styled.span`
  position: relative;
  top: 2px;
  left: 10px;
  margin-bottom: 0;
  color: ${(props) => props.theme.artz.darkGrey};
`;

const Category = styled.div`
  flex: 0 0 auto;
  justify-content: start;
  display: flex;
  padding: 22px 25px;
  margin: 6px 0px;
  width: 100%;
  background: ${({ selected, theme }) =>
    selected ? "#FFF" : theme.artz.greyWhite};
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.artz.primaryColor : theme.artz.gray};
  color: ${(props) => props.theme.artz.darkGrey};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.24em;
  cursor: ${({ disabled, selected }) =>
    disabled && !selected ? "default" : "pointer"};
  transition: all 0.25s ease;

  &:hover {
    border: 1px solid ${(props) => props.theme.artz.primaryColor};
  }

  ${(props) => props.theme.artz.breakpoint.md} {
    width: 48%;
    margin: 6px 4px;
  }
`;

const ContainerWrapper = styled.div`
  padding-right: 0px;
  padding-left: 0px;
`;

const DescriptionLabelWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 0;
`;

const DescriptionWrapper = styled.div`
  position: relative;
`;

const userIntialState = {
  is_org: false,
  org_name: "",
  first_name: "",
  last_name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  mail: "",
  type: "",
};

class CreationsNewInfos extends PureComponent {
  state = {
    showModal: false,
    errors: {
      author: false,
      categories: false,
      description: false,
      document: null,
      video: false,
      audio: false,
      virtual_object: false,
      proof_of_invention: false,
      firstMarketUse: false,
      marketYear: "",
      image: false,
      name: false,
      owner: false,
      operatingTerritories: false,
      publishedTerritories: false,
      textExtract: false,
      publishedYear: false,
      acceptedTerms: false,
      creationDate: false,
    },
    notificationMessage: null,
    acceptedTerms: false,
    published: false,
    isOpen: false,
    modalType: "CreationAuthor",
    selectedAuthor: { ...userIntialState },
    selectedOwner: { ...userIntialState },
    dateOfInvention: null,
    corresponding_to_customer_number:
      this.props.creation.corresponding_to_customer_number,
    corresponding_to_firm_orindividual:
      this.props.creation.corresponding_to_firm_orindividual,
    authors: [],
    owners: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setNewCreationField(name, value);
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
    this.setState({
      selectedAuthor: this.state.authors.find((author) => author.key === key),
    });
  };

  setSelectedOwner = (key) => {
    this.setState({
      selectedOwner: this.state.owners.find((owner) => owner.key === key),
    });
  };

  setFieldError = (name, value = true) => {
    const { errors } = this.state;

    this.setState({
      errors: {
        ...errors,
        [name]: value,
      },
    });
  };

  setNewCreationField = (name, value) => {
    const { setNewCreationField } = this.props;

    this.setFieldError(name, false);

    setNewCreationField(name, value);
  };

  handleSubmit = () => {
    const { errors } = this.state;
    this.setState({
      errors: { ...errors, authors: false, owners: false },
      notificationMessage: null,
    });
    if (this.validate()) {
      this.setState({ ...this.state, showModal: true });
    }
  };

  handleInformationConfirmed = () => {
    const { history, setNewCreationField } = this.props;
    setNewCreationField("acceptedTerms", new Date());
    setNewCreationField("completedInfos", true);
    history.push("registration");
  };

  handleSelectChange = (name, value) => this.setNewCreationField(name, value);

  handleFirstMarketSelectChange = (event) => {
    this.setNewCreationField("firstMarketUse", event.value);
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
    const {
      owners,
      authors,
      selectedAuthor,
      selectedOwner,
      modalType,
      isOpen,
      errors,
    } = this.state;
    const { setCreationUsers } = this.props;

    if (modalType == "CreationAuthor") {
      await this.setState({
        authors: this.updatedUsers(authors, selectedAuthor),
        isOpen: !isOpen,
      });
      await setCreationUsers(modalType, this.state.authors);
      this.setState({
        selectedAuthor: { ...userIntialState },
        errors: { ...errors, authors: false },
      });
    } else if (modalType == "CreationOwner") {
      await this.setState({
        owners: this.updatedUsers(owners, selectedOwner),
        isOpen: !isOpen,
      });
      await setCreationUsers(modalType, this.state.owners);
      this.setState({
        selectedOwner: { ...userIntialState },
        errors: { ...errors, owners: false },
      });
    }
  };

  updatedUsers = (users, newUser) => {
    if (!newUser.key) {
      const random = require("unique-random")(1, 1000);
      const key = random();
      newUser = { ...newUser, key: key };
    }
    users = users.filter((user) => user.key !== newUser.key);
    return [...users, newUser];
  };

  handleCreationDateChange = (name, date) => {
    this.setNewCreationField(name, date);
  };

  descriptionSmallText = () => {
    const { creation, intl } = this.props;
    const { formatMessage } = intl;
    if (creation && creation.kind == "pre-patent-process") {
      return formatMessage({
        id: "creations.new.infos.pre_patent_small_description",
      });
    } else {
      return formatMessage({
        id: "creations.new.infos.small_description",
      });
    }
  };

  descriptionLabel = () => {
    const { creation, intl } = this.props;
    const { formatMessage } = intl;
    if (creation && creation.kind == "pre-patent-process") {
      return "creations.new.infos.form.description.pre_patent_label";
    } else {
      return "creations.new.infos.form.description.label";
    }
  };

  toggleAcceptedTermsCheckbox = () => {
    const { acceptedTerms } = this.state;

    this.setState({
      acceptedTerms: !acceptedTerms,
    });
  };

  togglePublishedCheckbox = () => {
    const { published } = this.state;

    if (published) this.resetPublicationInfos();

    this.setState({
      published: !published,
    });
  };

  setCreationImage = (acceptedFiles, rejectedFiles) => {
    const { setCreationImage } = this.props;

    this.setFieldError("image", false);
    setCreationImage(acceptedFiles, rejectedFiles, this.handleDropError);
  };

  documentType = () => {
    const { creation, creationTypesData } = this.props;
    const creationType = creationTypesData[creation.creationTypeId];
    if (creationType.fileType == "video" || creationType.fileType == "audio") {
      return creationType.fileType;
    } else if (creationType.fileType == "any") {
      return "virtual_object";
    } else if (creation.kind === "pre-patent-process") {
      return "proof_of_invention";
    } else {
      return "document";
    }
  };

  setCreationDocument = (acceptedFiles, rejectedFiles) => {
    const { setCreationDocument } = this.props;

    this.setFieldError(this.documentType(), false);
    setCreationDocument(
      acceptedFiles,
      rejectedFiles,
      this.handleDropError,
      this.documentType()
    );
  };

  setCreationCategories = (selectedCategories) => {
    this.setFieldError("document", false);
    this.setNewCreationField("categories", selectedCategories);
  };

  setOtherCreation = (name) => {
    this.setFieldError("document", false);
    this.setNewCreationField("otherCategory", name);
  };

  setOperatingTerritories = (values) => {
    let country_codes = [];
    if (values) {
      values.forEach((item) => {
        country_codes.push(item.value);
      });

      this.setFieldError("operatingTerritories", false);
      this.setNewCreationField("operatingTerritories", country_codes);
    }
  };

  setPublishedTerritories = (values) => {
    let country_codes = [];
    if (values) {
      values.forEach((item) => {
        country_codes.push(item.value);
      });

      this.setFieldError("publishedTerritories", false);
      this.setNewCreationField("publishedTerritories", country_codes);
    }
  };

  resetPublicationInfos = () => {
    this.setFieldError("publicationYear", false);
    this.setNewCreationField("publishedTerritories", []);
    this.setNewCreationField("publicationYear", null);
  };

  handleCloseNotification = () => {
    this.setState({ notificationMessage: false });
  };

  handleDropError = () => {
    this.setState({
      notificationMessage: <FormattedMessage id="error.rejected_file" />,
    });
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

  validate = () => {
    const { acceptedTerms, authors, owners } = this.state;
    const { creation, creationTypesData } = this.props;
    const {
      author,
      categories,
      creationTypeId,
      description,
      document,
      firstMarketUse,
      image,
      kind,
      name,
      owner,
      textExtract,
      creationDate,
    } = creation;
    const creationType = creationTypesData[creationTypeId];

    const errors = {};
    const year = creationDate.getFullYear();

    errors.categories = isEmpty(categories);
    errors.description = isBlank(description);
    errors.authors = isEmpty(authors);
    errors.owners = isEmpty(owners);
    errors.image = isEmptyObject(image);
    errors.name = isBlank(name);
    errors.creationDate = !year;

    if (kind === "text") {
      errors.document = isEmptyObject(document);
      errors.textExtract = isEmptyObject(textExtract);
    }

    if (creationType.licenses.includes("TM") && year && firstMarketUse) {
      errors.marketYear = this.validateMarketUseYears(firstMarketUse, year);
      if (errors.marketYear !== "") {
        errors.firstMarketUse = true;
      }
    }

    if (!hasError(errors)) {
      errors.acceptedTerms = isFalse(acceptedTerms);
    }

    let notificationMessage = null;
    if (hasError(errors)) {
      notificationMessage = "error.generic";
    }

    this.setState({ errors: errors, notificationMessage: notificationMessage });
    return !hasError(errors);
  };

  validateMarketUseYears = (firstMarketYear, creationYear) => {
    const marketYear = parseInt(firstMarketYear);
    const year = parseInt(creationYear);

    if (marketYear < year) {
      return "first market year error";
    }

    return "";
  };

  countries = () => {
    const { language } = this.props.user;
    return countries.getNames(language);
  };

  sortCountriesOptions = (countriesOptions) => {
    const accent_fold = (function () {
      const accent_map = {
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a", // a
        ç: "c", // c
        è: "e",
        é: "e",
        ê: "e",
        ë: "e", // e
        ì: "i",
        í: "i",
        î: "i",
        ï: "i", // i
        ñ: "n", // n
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o", // o
        ß: "s", // s
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u", // u
        ÿ: "y", // y
      };

      return function accent_fold(s) {
        if (!s) {
          return "";
        }
        let ret = "";
        for (let i = 0; i < s.length; i++) {
          ret += accent_map[s.charAt(i)] || s.charAt(i);
        }
        return ret;
      };
    })();

    return (a, b) => {
      if (
        accent_fold(countriesOptions[a].toLowerCase()) <
        accent_fold(countriesOptions[b].toLowerCase())
      )
        return -1;
      if (
        accent_fold(countriesOptions[a].toLowerCase()) >
        accent_fold(countriesOptions[b].toLowerCase())
      )
        return 1;
      return 0;
    };
  };

  getFileExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  };

  renderText = () => {
    const fileName = this.documentType();
    const { creation, creationTypesData, intl } = this.props;
    const { image, creationTypeId, textExtract } = creation;
    const { preview } = image;
    const { name } = creation[fileName];
    const { formatMessage } = intl;
    const creationType = creationTypesData[creationTypeId];
    let headingTitle =
      creationType.fileType == "video" || creationType.fileType == "audio"
        ? creationType.fileType + "_title"
        : "title";

    return (
      <div>
        <div className="row boxed">
          <div class="">
            <HeadingWithText
              subtitle={formatMessage({
                id:
                  "creations.new.infos.section_file.title" +
                  "_" +
                  creationType.fileType,
              })}
              text={formatMessage({
                id: "creations.new.infos.section_file.subtext",
              })}
            />
          </div>
          <div className="col-lg-6 ">
            <FormSection>
              <Required
                errorName={fileName}
                hasError={this.state.errors[fileName]}
              >
                <FileDropzone
                  name={fileName}
                  onDrop={this.setCreationDocument}
                  src={name}
                  type={creationType.fileType}
                  maxSize={1100000000}
                />
              </Required>
            </FormSection>
          </div>
        </div>
        <div className="row boxed">
          <div class="">
            <HeadingWithText
              subtitle={formatMessage({
                id: "creations.new.infos.section_cover.title",
              })}
              text={formatMessage({
                id: "creations.new.infos.section_cover.subtext",
              })}
            />
          </div>
          <div className="col-lg-6 ">
            <FormSection>
              <Required errorName="image" hasError={this.state.errors.image}>
                <FormDropzone
                  name="image"
                  type="file_upload"
                  onDrop={this.setCreationImage}
                  src={preview}
                />
              </Required>
            </FormSection>
          </div>
        </div>
        <div className="row boxed">
          <div className="">
            <HeadingWithText
              subtitle={formatMessage({
                id: "creations.new.infos.section_extract." + headingTitle,
              })}
            />
          </div>
          <div className="col-lg-6 ">
            <DescriptionWrapper>
              <RequiredFormInputTextareaGroup
                hasError={this.state.errors.textExtract}
                maxLength="400000"
                labelId="creations.new.infos.form.description.label"
                name="textExtract"
                value={textExtract}
                handleChange={this.handleChange}
              />
              <DescriptionLabelWrapper>
                <FormLabel>
                  {" "}
                  {textExtract ? textExtract.length : 0}/400000{" "}
                </FormLabel>
              </DescriptionLabelWrapper>
            </DescriptionWrapper>
          </div>
        </div>
      </div>
    );
  };

  renderImage = () => {
    const fileName = this.documentType();
    const { creation, intl, creationTypesData } = this.props;
    const { creationTypeId } = creation;
    const creationType = creationTypesData[creationTypeId];
    const { image } = creation;
    const { preview } = image;
    const { formatMessage } = intl;
    const sectionTitle =
      creation.kind === "pre-patent-process"
        ? "creations.new.infos.section_image.prepatent_title"
        : "creations.new.infos.section_image.title";
    const subtext =
      creation.kind === "pre-patent-process"
        ? "creations.new.infos.section_image.prepatent_subtext"
        : "creations.new.infos.section_image.subtext";

    return (
      <div>
        <div className="row boxed">
          <div class="">
            <HeadingWithText
              subtitle={formatMessage({ id: sectionTitle })}
              text={formatMessage({
                id: subtext,
              })}
            />
          </div>
          <div className="col-lg-6 ">
            <FormSection>
              <Required errorName="image" hasError={this.state.errors.image}>
                <FormDropzone
                  name="image"
                  type="file_upload"
                  onDrop={this.setCreationImage}
                  src={preview}
                />
              </Required>
            </FormSection>
          </div>
        </div>
        {creation.kind === "pre-patent-process" ? (
          <div className="row boxed">
            <div class="">
              <HeadingWithText
                subtitle={formatMessage({
                  id: "creations.new.infos.section_file.pre_patent_publication",
                })}
              />
            </div>
            <div className="col-lg-6 ">
              <FormSection>
                <Required
                  errorName={fileName}
                  hasError={this.state.errors[fileName]}
                >
                  <FileDropzone
                    name={fileName}
                    onDrop={this.setCreationDocument}
                    src={name}
                    type="any"
                    maxSize={1100000000}
                  />
                </Required>
              </FormSection>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  handlePrepatentForm = (fieldName) => {
    this.setState({ [fieldName]: !this.state[fieldName], ...this.state });
  };

  renderPrePatentInformationForm = () => {
    const { creation, intl } = this.props;
    const { formatMessage } = intl;
    return (
      <div className="row boxed">
        <div>
          <HeadingWithText
            subtitle={formatMessage({
              id: "creations.new.infos.section_cover.prepatent_form_title",
            })}
          />
        </div>
        <Category
          className="category"
          key="corresponding_to_customer_number"
          name="corresponding_to_firm_orindividual"
          onClick={() =>
            this.handlePrepatentForm("corresponding_to_firm_orindividual")
          }
          selected={this.state.corresponding_to_firm_orindividual}
        >
          <CheckboxWrapper
            checked={this.state.corresponding_to_firm_orindividual}
          />{" "}
          <CheckboxSpan>
            {formatMessage({
              id: "creations.new.infos.section_cover.customer_number",
            })}
          </CheckboxSpan>
        </Category>
        <Category
          className="category"
          key="corresponding_to_firm_orindividual"
          name="corresponding_to_firm_orindividual"
          onClick={() =>
            this.handlePrepatentForm("corresponding_to_firm_orindividual")
          }
          selected={this.state.corresponding_to_firm_orindividual}
        >
          <CheckboxWrapper
            checked={this.state.corresponding_to_firm_orindividual}
          />{" "}
          <CheckboxSpan>
            {formatMessage({
              id: "creations.new.infos.section_cover.firm_or_individual",
            })}
          </CheckboxSpan>
        </Category>
      </div>
    );
  };

  sortYearOptions = (yearOptions) => {
    return (a, b) => {
      return yearOptions[b] - yearOptions[a];
    };
  };

  renderToolTip = (licenseType) => {
    const type = ((licenseType) => {
      switch (licenseType.toLowerCase()) {
        case "cr":
          return "copyrights";
        case "tm":
          return "trademark";
        default:
          return null;
      }
    })(licenseType);

    if (type) {
      return (
        <SpanWithTooltip
          textId={"creations.new." + type + ".tooltips.label"}
          tooltipTextId={"creations.new." + type + ".tooltips.text"}
        />
      );
    } else {
      return null;
    }
  };

  removeAuthor = (key) => {
    let { authors } = this.state;
    authors = authors.filter((author) => author.key !== key);
    this.setState({ authors: authors });
  };

  removeOwner = (key) => {
    let { owners } = this.state;
    owners = owners.filter((owner) => owner.key !== key);
    this.setState({ owners: owners });
  };

  render() {
    const {
      acceptedTerms,
      published,
      errors,
      modalType,
      selectedAuthor,
      selectedOwner,
    } = this.state;
    const {
      creation,
      creationTypesData,
      country,
      setCreationCategories,
      intl,
      user,
    } = this.props;
    const {
      categories,
      completedLicense,
      creationTypeId,
      description,
      firstMarketUse,
      kind,
      materials,
      name,
      publicationDate,
      operatingTerritories,
      publishedTerritories,
      otherCategory,
      creationDate,
      owner,
      publicationYear,
    } = creation;
    const { formatMessage } = intl;
    const creationType = creationTypesData[creationTypeId];
    let renderKindUpload = null;
    let creationTitleLabel;
    let creationTitlePlaceholder;

    if (creationType.code === "trade") {
      creationTitleLabel = "creations.new.infos.form.brand_name.label";
      creationTitlePlaceholder =
        "creations.new.infos.form.brand_name.placeholder";
    } else {
      creationTitleLabel = "creations.new.infos.form.creation_title";
      creationTitlePlaceholder =
        "creations.new.infos.form.creation_title_placeholder";
    }

    if (!completedLicense) {
      return <Redirect to="creation" />;
    }

    if (kind === "text" || kind === "digital") {
      renderKindUpload = this.renderText();
    } else {
      renderKindUpload = this.renderImage();
    }

    const myYearOptions = yearOptions();
    console.log("creation", this.props.creation);

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
          <div className="row boxed">
            <div class="">
              <HeadingWithText
                subtitle={formatMessage({
                  id: "creations.new.infos.section_ident.title",
                })}
                text={formatMessage({
                  id: "creations.new.infos.section_ident.subtext",
                })}
              />
            </div>
            <div className="col-lg-6 ">
              <FormSection>
                <RequiredFormInputTextGroup
                  hasError={errors.name}
                  labelId={creationTitleLabel}
                  name="name"
                  value={name}
                  handleChange={this.handleChange}
                  placeholder={formatMessage({ id: creationTitlePlaceholder })}
                />
                {this.props.creation.kind == "pre-patent-process" ? (
                  <RequiredFormInputGroup
                    name="creationDate"
                    hasError={errors.creationDate}
                    labelId="creations.new.infos.form.date_of_invention"
                  >
                    <ContainerWrapper className="col-lg-4">
                      <DatePicker
                        onChange={(date) =>
                          this.handleCreationDateChange("dateOfInvention", date)
                        }
                        selected={creationDate}
                      />
                    </ContainerWrapper>
                  </RequiredFormInputGroup>
                ) : null}

                <DescriptionWrapper>
                  <RequiredFormInputTextareaGroup
                    smallText={this.descriptionSmallText()}
                    hasError={errors.description}
                    labelId={this.descriptionLabel()}
                    maxLength="25000"
                    name="description"
                    value={description}
                    handleChange={this.handleChange}
                    placeholder={formatMessage({
                      id: "creations.new.infos.form.description.placeholder",
                    })}
                  />
                  <DescriptionLabelWrapper>
                    <FormLabel>
                      {description ? description.length : 0}/25000{" "}
                    </FormLabel>
                  </DescriptionLabelWrapper>
                </DescriptionWrapper>
                {this.props.creation.kind == "pre-patent-process" ? null : (
                  <RequiredFormInputGroup
                    name="creationDate"
                    hasError={errors.creationDate}
                    labelId="creations.new.infos.form.creation_date"
                  >
                    <ContainerWrapper className="col-lg-4">
                      <DatePicker
                        onChange={(date) =>
                          this.handleCreationDateChange("creationDate", date)
                        }
                        selected={creationDate}
                      />
                    </ContainerWrapper>
                  </RequiredFormInputGroup>
                )}
                <FormCheckbox
                  id="published"
                  checked={published}
                  onClick={this.togglePublishedCheckbox}
                >
                  <FormattedMessage
                    id={
                      this.props.creation.kind === "pre-patent-process"
                        ? "creations.new.infos.form.published_prepatent"
                        : "creations.new.infos.form.published"
                    }
                  />
                </FormCheckbox>

                {this.state.published ? (
                  <ContainerWrapper>
                    <RequiredFormInputGroup
                      name="publicationYear"
                      hasError={errors.publicationYear}
                      labelId={
                        this.props.creation.kind === "pre-patent-process"
                          ? "creations.new.infos.form.publication_prepatent_date"
                          : "creations.new.infos.form.publication_year"
                      }
                    >
                      <ContainerWrapper className="col-lg-4">
                        <DatePicker
                          onChange={(date) =>
                            this.handleSelectChange("publicationDate", date)
                          }
                          selected={publicationDate}
                        />
                      </ContainerWrapper>
                    </RequiredFormInputGroup>
                    <RequiredFormInputGroup
                      name="publishedTerritories"
                      hasError={this.state.errors.publishedTerritories}
                      labelId="creations.new.infos.form.publishedTerritories"
                    >
                      <FormSelectCreatable
                        id="publishedTerritories"
                        name="publishedTerritories"
                        options={collectOptions(
                          this.countries(),
                          this.sortCountriesOptions(this.countries())
                        )}
                        value={publishedTerritories}
                        onChange={this.setPublishedTerritories}
                      />
                    </RequiredFormInputGroup>
                  </ContainerWrapper>
                ) : null}

                <RequiredFormInputTextareaGroup
                  labelId="creations.new.infos.form.creation_materials.label"
                  name="materials"
                  value={materials}
                  handleChange={this.handleChange}
                  placeholder={formatMessage({
                    id: "creations.new.infos.form.creation_materials.placeholder",
                  })}
                />

                {this.state.authors.map(
                  (author) =>
                    creationType.licenses.indexOf("CR") >= 0 && (
                      <div className="author-owner-field-container">
                        <RequiredFormInputTextGroup
                          hasError={errors.author}
                          labelId="creations.new.infos.form.author.label"
                          name="author"
                          onClick={() =>
                            this.handleEditUserModal(
                              "CreationAuthor",
                              author.mail,
                              author.key
                            )
                          }
                          onChange={() => {}}
                          value={author.first_name + " " + author.last_name}
                          placeholder={formatMessage({
                            id: "creations.new.infos.form.author.placeholder",
                          })}
                        />
                        <div onClick={() => this.removeAuthor(author.key)}>
                          <IconCloseModal />
                        </div>
                      </div>
                    )
                )}
                {this.state.errors.authors && (
                  <div className="error-description block-error-display">
                    Must add at least one Author
                  </div>
                )}
                <FormSection>
                  <Button
                    id="add-author"
                    className="buttonBlock"
                    onClick={() => this.toggleModal("CreationAuthor")}
                  >
                    <FormattedMessage
                      id={
                        this.props.creation.kind == "pre-patent-process"
                          ? "creations.new.infos.form.author.add_button_prepatent"
                          : "creations.new.infos.form.author.add_button"
                      }
                    />
                  </Button>
                </FormSection>
                {this.state.owners.map(
                  (owner) =>
                    creationType.licenses.indexOf("CR") >= 0 && (
                      <div className="author-owner-field-container">
                        <RequiredFormInputTextGroup
                          hasError={errors.owner}
                          labelId="creations.new.infos.form.owner.label"
                          name="owner"
                          onClick={() =>
                            this.handleEditUserModal(
                              "CreationOwner",
                              owner.mail,
                              owner.key
                            )
                          }
                          onChange={() => {}}
                          value={
                            owner && owner.first_name + " " + owner.last_name
                          }
                          placeholder={formatMessage({
                            id: "creations.new.infos.form.owner.placeholder",
                          })}
                        />
                        <div onClick={() => this.removeOwner(owner.key)}>
                          <IconCloseModal />
                        </div>
                      </div>
                    )
                )}
                {this.state.errors.owners && (
                  <div className="error-description block-error-display">
                    Must add at least one Owner
                  </div>
                )}
                <FormSection>
                  <Button
                    id="add-owner"
                    className="buttonBlock"
                    onClick={() => this.toggleModal("CreationOwner")}
                  >
                    <FormattedMessage id="creations.new.infos.form.owner.add_button" />
                  </Button>
                </FormSection>
                {creationType.licenses.indexOf("TM") >= 0 && (
                  <RequiredFormInputGroup
                    name="firstMarketUse"
                    hasError={errors.firstMarketUse}
                    message={this.state.errors.marketYear}
                    labelId="creations.new.infos.form.first_market_use"
                  >
                    <ContainerWrapper className="col-lg-4">
                      <FormSelect
                        id="firstMarketUse"
                        name="firstMarketUse"
                        options={collectOptions(
                          myYearOptions,
                          this.sortYearOptions(myYearOptions)
                        )}
                        value={findOption(
                          firstMarketUse,
                          collectOptions(myYearOptions)
                        )}
                        onChange={this.handleFirstMarketSelectChange}
                      />
                    </ContainerWrapper>
                  </RequiredFormInputGroup>
                )}

                {creationType.licenses.indexOf("TM") >= 0 && (
                  <RequiredFormInputGroup
                    name="operatingTerritories"
                    hasError={this.state.errors.operatingTerritories}
                    labelId="creations.new.infos.form.operatingTerritories"
                  >
                    <FormSelectCreatable
                      id="operatingTerritories"
                      name="operatingTerritories"
                      options={collectOptions(
                        this.countries(),
                        this.sortCountriesOptions(this.countries())
                      )}
                      value={operatingTerritories}
                      onChange={this.setOperatingTerritories}
                    />
                  </RequiredFormInputGroup>
                )}
              </FormSection>
            </div>
          </div>

          {renderKindUpload}
          {this.props.creation.kind == "pre-patent-process"
            ? this.renderPrePatentInformationForm()
            : null}

          <div className="row boxed">
            <div class="">
              <HeadingWithText
                subtitle={formatMessage({
                  id: "creations.new.infos.section_categories.title",
                })}
                text={formatMessage({
                  id: "creations.new.infos.section_categories.subtext",
                })}
              />
            </div>
            <div className="col-lg-6 ">
              <FormSection>
                <Required errorName="categories" hasError={errors.categories}>
                  <Categories
                    onSelect={this.setCreationCategories}
                    onAddOtherCreation={this.setOtherCreation}
                    selected={categories}
                    otherCategory={otherCategory}
                    creation={creation}
                  />
                </Required>
              </FormSection>

              {creationType.licenses.indexOf("TM") >= 0 &&
                this.renderToolTip("TM")}
              {creationType.licenses.indexOf("CR") >= 0 &&
                this.renderToolTip("CR")}

              <Required
                errorName="acceptedTerms"
                hasError={errors.acceptedTerms}
              >
                <FormCheckbox
                  id="creationAcceptedTerms"
                  checked={acceptedTerms}
                  onClick={this.toggleAcceptedTermsCheckbox}
                >
                  <FormattedMessage id="creations.new.infos.form.terms_conditions1" />
                  <br />
                  <br />
                  <FormattedMessage id="creations.new.infos.form.terms_conditions2" />
                </FormCheckbox>
              </Required>

              <FormSection>
                <Button
                  id="creation-save-infos"
                  className="buttonBlock"
                  onClick={this.handleSubmit}
                >
                  <FormattedMessage id="creations.new.infos.form.cont_btn" />
                </Button>
              </FormSection>
              <InformationConfirmationModal
                showModal={this.state.showModal}
                onClose={() => {
                  this.setState({ ...this.state, showModal: false });
                }}
                onSubmit={this.handleInformationConfirmed}
              />
            </div>
          </div>
        </div>

        {this.renderNotification()}
      </Wrapper>
    );
  }
}

export default withUser(
  withCreationTypes(withNewCreation(injectIntl(CreationsNewInfos)))
);
