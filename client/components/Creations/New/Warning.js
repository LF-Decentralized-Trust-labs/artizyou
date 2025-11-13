import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import Button from '../../Button';
import FormCheckbox from "../../Form/Checkbox";
import Modal from '../../Modal';
import ModalContentWrapper from '../../ModalContentWrapper';
import Required from '../../Form/Required';

const Warning = (props) => {
  return (
    <Modal opened={props.showModal} closeModal={props.onClose} cancelModal={props.onCancel} closeLabel={props.closeLabel} onSubmit={props.onSubmit}>
      <ModalContentWrapper>
        <h1>Attention</h1>
        <p><FormattedMessage id={props.textId}/></p>

        <Required errorName="acceptedTerms" hasError={props.hasError}>
          <FormCheckbox checked={props.isChecked} onClick={props.onClickAcknowledge}>
            <FormattedMessage id="acknowledge"/>
          </FormCheckbox>
        </Required>

        <div className="text-center">
          <Button type="primary" size="" onClick={props.onSubmit}>
            <FormattedMessage id="creations.new.infos.form.cont_btn"/>
          </Button>
        </div>
      </ModalContentWrapper>
    </Modal>
  );
};

export default Warning;