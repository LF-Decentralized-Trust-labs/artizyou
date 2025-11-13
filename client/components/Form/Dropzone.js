import React, {PureComponent} from 'react';
import Dropzone from 'react-dropzone'
import {FormattedMessage} from 'react-intl';
import styled from 'styled-components';

import Button from "../Button";
import ProfilePlaceholder from "../../images/profile-placeholder.png";
import DragPlaceholder from "../../images/icons/dragndrop.svg";

const ButtonPreview = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(244, 244, 244, 0.92);
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  z-index: 9;
`;

const ButtonPreviewProfile = styled.div`
  padding: 11px 45px;  
  background: #FFF;  
  border: 1px solid ${props => props.theme.artz.primaryColor};  
  border-radius: 100px;
  font-family: ${props => props.theme.artz.secondaryFont};
  font-size: 0.750rem;
  color: ${props => props.theme.artz.primaryColor};
  font-weight: 600;
  text-transform: uppercase;    
  cursor: pointer;
  transition: all .25s ease;
  z-index: 9;
  
  @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {  
    /* IE10+ specific styles go here */
    position: relative;
    left: 0px;
    top: 100px;  
  }
`;

const IconDragNDrop = styled(DragPlaceholder)`
  margin-top: 75px;
  margin-left: 20px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 415px;
  height: auto;
  opacity: 1;
`;

const ImageProfile = styled.div`
  height: 200px;
  width: 200px;
  margin-bottom: 1rem;
  background-position: center;
  border-radius: 50%;
  background-size: cover;
`;

const ProfileImageWrapper = styled.div`
  img {
    width: auto;
    width: initial;
    height: 200px;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%);
  }
`;

const DropzoneWrapper = styled.div`
  .dropzone{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100% !important;
    height: auto !important;
    min-height: 230px;
    margin: 0 auto;
    padding: 10px;
    color: black;
    cursor: pointer;
    border: ${({theme, type}) => type === 'user_profile' ? 'none' : '6px dashed ' + (theme.artz.gray)};
    border-radius: 10px;
    transition: all .25s ease;

    &:hover {
      border: ${({theme, type}) => type === 'user_profile' ? 'none' : '6px dashed ' + (theme.artz.primaryColor)};
    
      ${ButtonPreviewProfile}{
        background: ${props => props.theme.artz.primaryColor};
        color: #FFF;
      }
    }
    
    input[type="file"] {
      display: block !important;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
`;

const DropzoneContent = styled.div`
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
`;

const WrapperPreview = styled.div`
  display: flex;
  padding: ${({type}) => type === 'user_profile' ? '0 0' : '0 0 75px 0px'};
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;  
`;

const DragTextWrapper = styled.div`
  margin-top: 25px;
  font-family: ${props => props.theme.artz.secondaryFont};
  font-size: 1.5rem;
  color: ${props => props.theme.artz.darkGrey};
`;

const DragMainText = styled.h2`
  padding: 0 0;
  margin: 0;
  font-weight: 600;
  color: ${props => props.theme.artz.darkGrey};
`;

const DragSmallText = styled.p`
  padding: 0 0;
  margin: 0;
  text-transform: none;
  font-size: 1rem;
`;

class FormDropzone extends PureComponent {
  renderPlaceholder = () => {
    const {imageStyle, src, type} = this.props;
    
    let uploadPlaceholder = null;

    if(type === 'user_profile'){

      if (src) {
        return (
          <WrapperPreview type={type}>
            <ImageProfile style={{backgroundImage: `url(${src})`, ...imageStyle}}/>
            
            <Button size="small" type="secondary">
              <FormattedMessage id="user.profile_image.change"/>
            </Button>
          </WrapperPreview>
        );
      }

      uploadPlaceholder = (
        <WrapperPreview type={type}>
          <ProfileImageWrapper>
            <ImagePreview src={ProfilePlaceholder} />
          </ProfileImageWrapper>
          <ButtonPreviewProfile>
            <FormattedMessage id="user.profile_image.label"/>
          </ButtonPreviewProfile>
        </WrapperPreview>
      );
    }else {

      if (src) {
        return (
          <WrapperPreview type={type}>
            <ImagePreview src={src}/>
            <ButtonPreview>
              <FormattedMessage id="user.profile_image.change"/>
            </ButtonPreview>
          </WrapperPreview>
        );
      }

      uploadPlaceholder = (
        <WrapperPreview type={type}>
          <IconDragNDrop />
          <DragTextWrapper>
            <DragMainText>
              <FormattedMessage id="creations.new.infos.form.upload.title"/>
            </DragMainText>
            <DragSmallText>
              <FormattedMessage id="creations.new.infos.form.upload.small_text"/>
            </DragSmallText>
          </DragTextWrapper>
        </WrapperPreview>
      );
    }

    return (
      <DropzoneContent>
        {uploadPlaceholder}
      </DropzoneContent>
    );
  };

  render() {
    const {src, type, ...remainingProps} = this.props;

    const dropzoneClassName = src ? 'dropzone preview' : 'dropzone';

    return (
      <DropzoneWrapper type={type}>
        <Dropzone accept="image/jpeg,image/jpg,image/png"
                  className={dropzoneClassName}
                  maxSize={10000000}
                  multiple={false}
                  {...remainingProps}
        >
          {this.renderPlaceholder()}
        </Dropzone>
      </DropzoneWrapper>
    );
  }
}

export default FormDropzone;