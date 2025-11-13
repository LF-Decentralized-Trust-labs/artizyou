import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {FormattedHTMLMessage} from 'react-intl';
import styled from 'styled-components';

import CheckIcon from "../../../images/icons/check.svg";
import withNewCreation from "../../../containers/withNewCreation";

const STEPS = [
  'kind',
  'type',
  'infos',
  'registration',
];

const StepWrapper = styled.div`  
  display: none;
  justify-content: space-between;
  
  ${props => props.theme.artz.breakpoint.md} {
    display: flex;
  }
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  padding: 1em;
  background: inherit;
  font-family: ${props => props.theme.artz.secondaryFont};
  font-size: 1em;
  font-weight: 500;
  line-height: 1.25;  
  color: #ABABAB;
  cursor: pointer;    
  transition: all .25s ease;
  border-right: 1px solid ${props => props.theme.artz.stepsBorderColor};
  
  span{
    text-align: left;
  }
  
  &:first-child{
    border-left: 1px solid ${props => props.theme.artz.stepsBorderColor};
  }
  
  @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {  
    /* IE10+ specific styles go here */
    font-size: 0.85em;  
  }
  
  ${props => props.theme.artz.breakpoint.lg} {
    font-size: 1.250em;
  }
`;

const StepCurrent = styled(Step)`
  background: ${({theme, completed}) => completed ? '#FFF' : theme.artz.secondaryColor};    
  color: ${({theme, completed}) => completed ? theme.artz.primaryColor : '#FFF'};
`;

const StepCompleted = styled(Step)`
  background: #FFF;    
  color: ${({theme}) => theme.artz.primaryColor};
`;

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.artz.stepsWrapperBgColor};
  border-top: 1px solid ${props => props.theme.artz.stepsWrapperBorderColor};
  border-bottom: 1px solid ${props => props.theme.artz.stepsWrapperBorderColor};
  text-align: center;
`;

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 43px;
    margin-right: 15px;
    background: transparent;
    border-radius: 45px;
    border: 7px solid ${({theme}) => theme.artz.stepsCircleBorderColor};    
    transition: all .25s ease;        
`;

const CircleCurrent = styled(Circle)`  
    border: 7px solid ${({theme, completed}) => completed ? theme.artz.primaryColor : '#FFF'};    
`;

const CircleCompleted = styled(Circle)`  
    border: 7px solid ${({theme}) => theme.artz.primaryColor};                  
`;

const MobileStepWrapper = styled.div`  
  display: inline-block;
  
  p{
    margin-bottom: 0;
    margin-top: .5em;
    font-family: ${props => props.theme.artz.secondaryFont};
    font-weight: 600;
    color: ${props => props.theme.artz.secondaryColor};
  }
    
  ${props => props.theme.artz.breakpoint.md} {
    display: none;
  }  
`;

const MobileFlexWrapper = styled.div` 
  display: flex;
  justify-content: center;  
  position: relative;
          
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background: ${props => props.theme.artz.stepsWrapperBorderColor};
    left: 0;
    top: 35px;
    z-index: 4;
  }  
`;

const StepMobile = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;  
  cursor: pointer;    
  transition: all .25s ease;
  
  &:first-child{
    padding-left:0;
  }
  
  &:last-child{
    padding-right:0;
  }   
`;

const MobileCircle = styled.div`
    display: inline-block;
    width: 43px;
    height: 43px;
    background: #F5F5F5;
    border-radius: 45px;
    border: 7px solid ${({theme}) => theme.artz.stepsCircleBorderColor};
    z-index: 6;
    transition: all .25s ease;
`;

const MobileCircleCurrent = styled(MobileCircle)`    
    border: 7px solid ${({theme, completed}) => completed ? theme.artz.primaryColor : '#000'};    
`;

const MobileCircleCompleted = styled(MobileCircle)`
    border: 7px solid ${({theme}) => theme.artz.primaryColor};    
`;

const MobileCircleIconWrapper = styled(CheckIcon)`
  position: relative;
  top: 4px;
  left: 1px;
`;

class CreationsNewNavigation extends PureComponent {
  getCurrentStep = () => {
    const {match} = this.props;
    const {params} = match;
    const {step} = params;

    return step;
  };

  handleClickStep = (step) => (
    () => {
      const {creation, history} = this.props;
      const {completedInfos, creationTypeId, kind} = creation;
      let blockNavigation = false;

      switch (step) {
        case 'type': {
          blockNavigation = !kind;
          break;
        }
        case 'infos': {
          blockNavigation = !creationTypeId;
          break;
        }
        case 'registration': {
          blockNavigation = !completedInfos;
          break;
        }
        default: {
          break;
        }
      }

      if (!blockNavigation) {
        history.push(step);
      }
    }
  );

  isCompleted = (step) => {
    const {creation} = this.props;
    const {completedInfos, completedLicense, kind} = creation;

    switch (step) {
      case 'kind': {
        return !!kind;
      }
      case 'infos': {
        return completedInfos;
      }
      case 'type': {
        return completedLicense;
      }
      default: {

      }
    }
  };

  renderSteps = () => (
    STEPS.map(step => {
      const isCompleted = this.isCompleted(step);
      const isCurrent = step === this.getCurrentStep();
      let locale_id = 'creations.new.submenu.' + step;

      if(isCurrent){
        return (
          <StepCurrent id={`step-${step}`} key={step} completed={isCompleted} onClick={this.handleClickStep(step)}>
            {this.renderCircle(isCompleted, true)}
            <FormattedHTMLMessage id={locale_id} />
          </StepCurrent>
        );
      }

      if(isCompleted){
        return (
          <StepCompleted id={`step-${step}`} key={step} onClick={this.handleClickStep(step)}>
            {this.renderCircle(true, false)}
            <FormattedHTMLMessage id={locale_id} />
          </StepCompleted>
        );
      }

      return (
        <Step id={`step-${step}`} key={step}>
          {this.renderCircle(false, false)}
          <FormattedHTMLMessage id={locale_id} />
        </Step>
      );
    })
  );

  renderCircle = (completed, current) => {
    if (completed) {
      return (
        <CircleCompleted>
          <CheckIcon />
        </CircleCompleted>
      );
    }

    if (current) {
      return <CircleCurrent completed={completed} />;
    }

    return <Circle />;
  };

  renderMobileSteps = () => (
    STEPS.map(step => {
      const isCompleted = this.isCompleted(step);
      const isCurrent = step === this.getCurrentStep();

      if(isCurrent){
        return (
          <StepMobile id={`step-${step}`} key={step} onClick={this.handleClickStep(step)}>
            {this.renderMobileCircle(isCompleted, true)}
          </StepMobile>
        );
      }

      if(isCompleted){
        return (
          <StepMobile id={`step-${step}`} key={step} onClick={this.handleClickStep(step)}>
            {this.renderMobileCircle(true, false)}
          </StepMobile>
        );
      }

      return (
        <StepMobile key={step} onClick={this.handleClickStep(step)}>
          {this.renderMobileCircle(false, false)}
        </StepMobile>
      );
    })
  );

  renderMobileCircle = (completed, current) => {
    if (completed) {
      return (
        <MobileCircleCompleted>
          <MobileCircleIconWrapper />
        </MobileCircleCompleted>
      );
    }

    if (current) {
      return <MobileCircleCurrent completed={completed} />;
    }

    return <MobileCircle />;
  };

  render() {
    let locale_id = 'creations.new.submenu.' + this.getCurrentStep();

    return (
      <Wrapper>
        <div className="container">
          <MobileStepWrapper>
            <p>
              <FormattedHTMLMessage id={locale_id} />
            </p>
            <MobileFlexWrapper>
              {this.renderMobileSteps()}
            </MobileFlexWrapper>
          </MobileStepWrapper>
          <StepWrapper>
            {this.renderSteps()}
          </StepWrapper>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(withNewCreation(CreationsNewNavigation));