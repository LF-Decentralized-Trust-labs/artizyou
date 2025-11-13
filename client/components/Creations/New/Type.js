import {FormattedMessage, injectIntl} from 'react-intl';
import filter from 'lodash/filter';
import React, {PureComponent} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import Button from "../../Button";
import FormInputGroup from '../../Form/InputGroup';
import FormSection from "../../Form/Section";
import HeadingWithText from '../../HeadingWithText';
import withCreationTypes from "../../../containers/withCreationTypes";
import withNewCreation from "../../../containers/withNewCreation";
import withUser from '../../../containers/withUser';
import FormRadioButton from "../../Form/RadioButton";
import RadioButtonWrapper from "../../Form/RadioButtonWrapper";
import Warning from './Warning';

const Wrapper = styled.div`
  padding-top: 75px;
`;

const NewCreationType = styled.span`
  display: inline;
  float: right;
  color: #f36f2b;
`;

class CreationsNewType extends PureComponent {
  state = {
    errors: {
      acceptedTerms: null
    },
    hasToAcceptTerms: false,
    modalAccepted: false,
    modalText: '',
    showModal: false,
  };

  componentDidMount(){
    window.scrollTo(0, 0);

  }

  handleClick = (id, code) => (
    () => {
      const {setNewCreationField, resetCreationDocument} = this.props;

      resetCreationDocument();
      setNewCreationField('creationTypeId', id);

      if (['idea_image', 'idea_text', 'industrial'].includes(code)) {
        const textId = ((code) => {
          switch (code) {
            case 'industrial':
              return 'creations.show.modals.image_industrial_text';
            case 'idea_image':
            case 'idea_text':
              return 'creations.show.modals.invention_kind_text';
          }
        })(code);

        this.setState({hasToAcceptTerms: true, modalText: textId, showModal: true});
      }
    }
  );

  handleSubmit = () => {
    const {history, setNewCreationField, creation} = this.props;
    if (!creation.creationTypeId){

    }
   else if (this.state.hasToAcceptTerms && !this.state.modalAccepted) {
      this.setState({showModal: true, errors: {acceptedTerms: true}});
    } else {
      setNewCreationField('completedLicense', true);
      history.push('infos');
    }
  };

  handleCloseModal = () => {
    this.setState({showModal: false});
  };

  handleClickAcknowledge = () => {
    this.setState({modalAccepted: true});
  };

  renderLicenses = () => {
    const {creation, creationTypesList, user} = this.props;
    const {creationTypeId, kind} = creation;
    const creationTypesForKind = filter(creationTypesList, (o) => {
      return o.kind === kind
    });

    const licensesRadioButtons = creationTypesForKind.map(({id, code, nameFr, nameEn, newFeatureExpiryDate}) => (
        <div>
          <RadioButtonWrapper id={`type-${code}`} key={id} onClick={this.handleClick(id, code)}
                              selected={id === creationTypeId}>
            <FormRadioButton selected={id === creationTypeId}>
              {user.language === 'en' ? nameEn : nameFr}
            </FormRadioButton>
            {
              newFeatureExpiryDate && new Date() <= new Date(newFeatureExpiryDate) ? 
              <NewCreationType>{this.props.intl.formatMessage({id: 'creations.new.copyrights.new'})}</NewCreationType> : null
            }
          </RadioButtonWrapper>
        </div>
    ));

    return (
      <FormInputGroup>
        {licensesRadioButtons}
      </FormInputGroup>
    );
  };

  render() {
    const {creation, intl} = this.props;
    const {errors, modalAccepted, modalText, showModal} = this.state;
    const {kind, creationTypeId} = creation;
    const {formatMessage} = intl;
    if (!kind) {
      return <Redirect to="kind"/>;
    }

    return (
      <Wrapper>
        <div className="container">
          <div className="row boxed">
            <div className=""><HeadingWithText subtitle={formatMessage({id: 'creations.new.copyrights.title'})} text={formatMessage({id: 'creations.new.copyrights.subtext'})}/></div>
            <div className="col-lg-6">
              <FormSection>
                {this.renderLicenses()}

                <Button id="creation-save-license" className="buttonBlock" onClick={this.handleSubmit}>
                  <FormattedMessage id="creations.new.infos.form.cont_btn"/>
                </Button>
              </FormSection>

              <Warning onCancel={this.handleCloseModal}
                       hasError={errors.acceptedTerms}
                       isChecked={modalAccepted}
                       onClickAcknowledge={this.handleClickAcknowledge}
                       onClose={this.handleCloseModal}
                       onSubmit={this.handleSubmit}
                       showModal={showModal}
                       textId={modalText}/>

            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(withUser(withNewCreation(withCreationTypes(injectIntl(CreationsNewType)))));