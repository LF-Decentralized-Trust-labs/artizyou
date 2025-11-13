import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import Dropzone from 'react-dropzone'
import styled from 'styled-components';

import IconAttachedFile from '../../images/icons/icon-attach-file.svg';
//import IconDelete from '../../images/icon-delete.svg';

const Wrapper = styled.div`
  position: relative;  
`;

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
  z-index: 10;
`;

const DropZoneWrapper = styled.div`
  .dropzone{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: auto !important;
    //margin: 0 0 2rem 0;
    padding: 2rem 3rem;
    color: ${props => props.theme.artz.darkGrey};
    cursor: pointer;
    border: 6px dashed ${props => props.theme.artz.gray};
    border-radius: 10px;  
    
    &:hover {
      ${ButtonPreview}{
        background: rgba(244, 244, 244, 1);
        transition: all 0.2s;
      }
      
      border: 6px dashed ${props => props.theme.artz.primaryColor};    
    }
    
    input[type="file"] {
      display: block !important;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }
  }
`;

const DropZoneContent = styled.div`
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
`;

const WrapperPreview = styled.div`
  color: ${props => props.theme.artz.darkGrey};
  font-weight: 600;
  text-align: center;
`;

// const IconDeletePdf = styled(IconDelete)`
//   position: absolute;
//   top: 0;
//   right: -45px;
//   height: 49px;
//   width: 33px;
//   padding: 10px;
//   cursor: pointer;
// `;

const IconFile = styled(IconAttachedFile)`
  position: relative;
  bottom: -3px;
`;

class FileDropzone extends PureComponent {
  // renderDeleteIcon = () => {
  //   const {onClear, src} = this.props;
  //
  //   if (!src) {
  //     return null;
  //   }
  //
  //   return <IconDeletePdf onClick={onClear}/>
  // };

  renderPlaceholder = () => {
    const {src, type} = this.props;

    if (src) {
      return <WrapperPreview>{src}</WrapperPreview>;
    }

    return (
      <DropZoneContent>
        <IconFile/>&nbsp;<FormattedMessage id={`creations.new.infos.section_file.join_${type}`}/>
      </DropZoneContent>
    );
  };

  render() {
    const {onClear, src, type, ...remainingProps} = this.props;
    let accept = '';

    const dropzoneClassName = src ? 'dropzone preview' : 'dropzone';

    switch (type) {
      case 'pdf':
        accept = "application/pdf";
        break;
      case 'video':
        accept = "video/*"
        break;
      case 'any':
        accept = ''
        break;
      case 'audio':
        accept = "audio/*"
        break;
      case 'zip_ppt':
        accept = "application/zip, application/x-zip-compressed, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.presentationml.slideshow";
        break;
      case 'zip':
        accept = "application/zip, application/x-zip-compressed";
        break;
      default:
        accept = "application/pdf";
        break;
    }

    return (
      <Wrapper>
        <DropZoneWrapper>
          <Dropzone accept={accept}
                    className={dropzoneClassName}
                    multiple={false}
                    inputProps={{id: 'fileInput'}}
                    {...remainingProps} >

            {this.renderPlaceholder()}

          </Dropzone>
        </DropZoneWrapper>

        {/*{this.renderDeleteIcon()}*/}

      </Wrapper>
    );
  }
}

export default FileDropzone;