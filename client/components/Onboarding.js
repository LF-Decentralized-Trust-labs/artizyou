import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import styled from 'styled-components';

import IconBlockchain from "../images/icons/onboarding/blockchain.svg";
import IconEverywhere from "../images/icons/onboarding/everywhere.svg";
import IconProtection from "../images/icons/onboarding/infinite-protection.svg";
import Button from "./Button";

const Wrapper = styled.div`
  width: 100%;
  ${({theme}) => theme.artz.breakpoint.sm} {
    width: 400px;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  height: 360px;
  width: 100%;
`;

const Slide = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  opacity: ${({show}) => show ? '1' : '0'};
  z-index: 1;
  
  transition: opacity 0.5s ease-in-out;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 210px;
  width: 210px;
  background-color: ${({theme}) => theme.artz.greyWhite};
  border-radius: 50%;
`;

const Title = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
const Desc = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;

const BulletsList = styled.ul`
  display: flex;
  justify-content: center;    
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const Bullet = styled.li`
  height: 17px;
  width: 17px;
  margin-left: 1rem;
  margin-right: 1rem;
  border: solid 2px ${({theme}) => theme.artz.darkGrey};
  border-radius: 50%;
  background-color:  ${({active, theme}) => active ? theme.artz.darkGrey : 'white'};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonNext = styled(Button)`
  width: auto;
`;

class Onboarding extends PureComponent {
  state = {
    selectedSlideIndex: 0,
  };

  lastIndex = 2;

  handleNextSlide = selectedSlideIndex => (
    () => {
      const {closeModal} = this.props;

      if (selectedSlideIndex === 2){
        closeModal();
      } else {
        this.setState({ selectedSlideIndex: selectedSlideIndex + 1 });
      }
    }
  );

  render() {

    const {selectedSlideIndex} = this.state;

    return (
      <Wrapper>
        <SlideWrapper>
          <Slide show={selectedSlideIndex === 0}>
            <IconWrapper>
              <IconProtection />
            </IconWrapper>
            <Title><FormattedMessage id="onboarding.slide1Title"/></Title>
            <Desc><FormattedMessage id="onboarding.slide1Desc"/></Desc>
          </Slide>

          <Slide show={selectedSlideIndex === 1}>
            <IconWrapper>
              <IconEverywhere />
            </IconWrapper>
            <Title><FormattedMessage id="onboarding.slide2Title"/></Title>
            <Desc><FormattedMessage id="onboarding.slide2Desc"/></Desc>
          </Slide>

          <Slide show={selectedSlideIndex === 2}>
            <IconWrapper>
              <IconBlockchain />
            </IconWrapper>
            <Title><FormattedMessage id="onboarding.slide3Title"/></Title>
            <Desc><FormattedMessage id="onboarding.slide3Desc"/></Desc>
          </Slide>
        </SlideWrapper>

        <ButtonWrapper>
          <ButtonNext onClick={this.handleNextSlide(selectedSlideIndex)}><FormattedMessage id="continue"/></ButtonNext>
        </ButtonWrapper>

        <BulletsList>
          <Bullet active={selectedSlideIndex === 0}/>
          <Bullet active={selectedSlideIndex === 1}/>
          <Bullet active={selectedSlideIndex === 2}/>
        </BulletsList>
      </Wrapper>
    );
  }
}

export default Onboarding;