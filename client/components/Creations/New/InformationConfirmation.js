import React from "react";
import { FormattedMessage } from "react-intl";
import ReactModal from "react-modal";
import ModalContentWrapper from "../../ModalContentWrapper";
import Button from "../../Button";
import styled from "styled-components";
import IconClose from "../../../images/icons/close.svg";

const IconCloseModal = styled(IconClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  * {
    fill: ${({ theme }) => theme.artz.darkGrey};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
`;

const InformationConfirmationModal = (props) => {
  return (
    <div>
      <ReactModal
        ariaHideApp={false}
        className={{
          base: "ReactModal__Content",
          afterOpen: "ReactModal__Content--after-open",
          beforeClose: "ReactModal__Content--before-close",
        }}
        isOpen={props.showModal}
      >
        <IconCloseModal onClick={props.onClose} />
        <ModalContentWrapper>
          <h1>Attention</h1>
          <MessageContainer>
            <FormattedMessage id="creations.new.infos.form.first_confirmation_message" />
            <FormattedMessage id="creations.new.infos.form.second_confirmation_message" />
          </MessageContainer>
          <ButtonContainer>
            <Button type="primary" size="" onClick={props.onSubmit}>
              <FormattedMessage id="creations.new.infos.form.yes_confirm" />
            </Button>
            <Button type="primary" size="" onClick={props.onClose}>
              <FormattedMessage id="creations.new.infos.form.i_will_confirm" />
            </Button>
          </ButtonContainer>
        </ModalContentWrapper>
      </ReactModal>
    </div>
  );
};

export default InformationConfirmationModal;
