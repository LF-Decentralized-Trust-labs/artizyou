import React, { PureComponent } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import Modal from "../../Modal";
import ModalContentWrapper from "../../ModalContentWrapper";
import RequiredFormInputTextGroup from "../../Form/RequiredFormInputTextGroup";
import FormCheckbox from "../../Form/Checkbox";
import FormSection from "../../Form/Section";
import Button from "../../Button";

const CustomContainer = styled.div`
  ${(props) => props.theme.artz.breakpoint.md} {
    width: 900px;
  }
`;

const ContainerWrapper = styled.div`
  padding-right: 0px;
  padding-left: 0px;
`;

const errorsInitialState = {
  org_name: false,
  first_name: false,
  last_name: false,
  address: false,
  city: false,
  state: false,
  zip: false,
  mail: false,
  type: false,
};

class AuthorsModal extends PureComponent {
  state = {
    creationUserErrors: { ...errorsInitialState },
    valid: true,
  };

  componentWillUpdate(nextProps) {
    if (!nextProps.isOpen && this.props.isOpen) {
      this.setState((prevState) => {
        return {
          ...prevState,
          creationUserErrors: { ...errorsInitialState },
          valid: true,
        };
      });
    }
  }

  validateCreationUserFields = (errors) => {
    let valid = true;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        valid = false;
      }
    });
    return valid;
  };

  getCreationUserErrors = (users) => {
    let errors = this.state.creationUserErrors;
    Object.keys(errors).forEach((key) => {
      if (key === "org_name") {
        if (users["is_org"] == true) {
          if (!users[key]) {
            errors[key] = true;
          } else {
            errors[key] = false;
          }
        } else {
          errors[key] = false;
        }
      } else {
        if (!users[key]) {
          errors[key] = true;
        }
      }
    });
    return errors;
  };

  handleSubmit = async () => {
    const { saveCreationUser, userData } = this.props;
    await this.setState((prevState) => {
      return {
        ...prevState,
        creationUserErrors: { ...errorsInitialState },
        valid: true,
      };
    });
    let errors = this.getCreationUserErrors(userData);
    if (this.validateCreationUserFields(errors)) {
      saveCreationUser();
    } else {
      await this.setState((prevState) => {
        return {
          ...prevState,
          valid: false,
        };
      });
    }
  };

  render() {
    const {
      userType,
      userData,
      toggleModal,
      isOpen,
      handleAuthorsChange,
      handleIsOrganization,
    } = this.props;
    const { creationUserErrors } = this.state;
    return (
      <Modal opened={isOpen} closeModal={() => toggleModal(userType)}>
        <ModalContentWrapper>
          <h1>Add {userType == "CreationOwner" ? "Owner" : "Author"}</h1>

          <CustomContainer className="container">
            <div className="row">
              <div className="col-md-4 col-12">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.first_name}
                  labelId="creations.new.creation_user.first_name"
                  name="first_name"
                  value={userData.first_name}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"john"}
                />
              </div>
              <div className="col-md-4 col-12">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.last_name}
                  labelId={"creations.new.creation_user.last_name"}
                  name="last_name"
                  value={userData.last_name}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"Doe"}
                />
              </div>
              <div className="col-md-4 col-12">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.mail}
                  labelId={"creations.new.creation_user.mail"}
                  name="mail"
                  value={userData.mail}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"mail"}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-6">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.city}
                  labelId={"creations.new.creation_user.city"}
                  name="city"
                  value={userData.city}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"City"}
                />
              </div>
              <div className="col-md-4 col-6">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.state}
                  labelId={"creations.new.creation_user.state"}
                  name="state"
                  value={userData.state}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"State"}
                />
              </div>
              <div className="col-md-4 col-6">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.zip}
                  labelId={"creations.new.creation_user.zip"}
                  name="zip"
                  value={userData.zip}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"Zip code | Postal code"}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <RequiredFormInputTextGroup
                  hasError={creationUserErrors.address}
                  labelId={"creations.new.creation_user.address"}
                  name="address"
                  value={userData.address}
                  handleChange={(e) => handleAuthorsChange(e)}
                  placeholder={"Address"}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <FormCheckbox
                  id="is_org"
                  checked={userData.is_org}
                  onClick={handleIsOrganization}
                >
                  <FormattedMessage id="creations.new.creation_user.is_org" />
                </FormCheckbox>
              </div>
            </div>
            {userData.is_org ? (
              <div className="row">
                <div className="col-12">
                  <RequiredFormInputTextGroup
                    hasError={creationUserErrors.org_name}
                    labelId={"creations.new.creation_user.org_name"}
                    name="org_name"
                    value={userData.org_name}
                    handleChange={(e) => handleAuthorsChange(e)}
                    placeholder={"Organization name"}
                  />
                </div>
              </div>
            ) : null}

            <FormSection>
              <Button
                id="add-author"
                className="buttonBlock"
                onClick={() => this.handleSubmit()}
              >
                <FormattedMessage id="creations.new.creation_user.save_button" />
              </Button>
            </FormSection>
          </CustomContainer>
        </ModalContentWrapper>
      </Modal>
    );
  }
}

export default AuthorsModal;
