import React, {PureComponent} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Redirect, withRouter} from 'react-router';
import styled from 'styled-components';

import FormLabel from '../Form/Label';
import {setOrientation} from "../../utils/image-orientation";
import withUser from '../../containers/withUser';
import withActivities from '../../containers/withActivities';
import withLanguages from '../../containers/withLanguages';

const ImageProfile = styled.div`
  height: 200px;
  width: 200px;
  margin-bottom: 1rem;
  background-position: center;
  border-radius: 50%;
  background-size: cover;
`;

const LabelTextWrapper = styled.div`    
    padding-bottom: 10px;
    color: ${props => props.theme.artz.darkGrey};
    
    label{
      margin-bottom: .25rem;
      font-size: 1em;
      font-weight: 400;      
    }
    
    p{
      font-size: 1.125em;
      font-weight: 600;
    }
`;

class ProfilePublic extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      orientation: '',
    };
  }

  setOrientation = setOrientation.bind(this);

  componentDidMount() {
    const {user} = this.props;
    const {photo} = user;

    if(photo.preview){
      this.setOrientation(photo.preview);
    }
  };

  renderUserLinks = () => {
    const {user} = this.props;
    const {
      facebookUrl, twitterUrl, linkedInUrl, personnalWebsite, professionalWebsite
    } = user;

    let fb = '';
    let twt = '';
    let li = '';
    let perws = '';
    let prows = '';

    if (facebookUrl) {
      fb = <LabelTextWrapper>
        <FormLabel><FormattedMessage id="profile.public.facebook"/></FormLabel>
        <p>{facebookUrl}</p>
      </LabelTextWrapper>;
    }

    if (twitterUrl) {
      twt = <LabelTextWrapper>
        <FormLabel><FormattedMessage id="profile.public.twitter"/></FormLabel>
        <p>{twitterUrl}</p>
      </LabelTextWrapper>;
    }

    if (linkedInUrl) {
      li = <LabelTextWrapper>
        <FormLabel><FormattedMessage id="profile.public.linkedin"/></FormLabel>
        <p>{linkedInUrl}</p>
      </LabelTextWrapper>;
    }

    if (personnalWebsite) {
      perws = <LabelTextWrapper>
        <FormLabel><FormattedMessage id="profile.public.personal_website"/></FormLabel>
        <p>{personnalWebsite}</p>
      </LabelTextWrapper>;
    }

    if (professionalWebsite) {
      prows = <LabelTextWrapper>
        <FormLabel><FormattedMessage id="profile.public.professional_website"/></FormLabel>
        <p>{professionalWebsite}</p>
      </LabelTextWrapper>;
    }

    return (
      <div>
        {fb}
        {twt}
        {li}
        {perws}
        {prows}
      </div>
    );
  };

  renderActivitySpecification = () => {
    const {user} = this.props;
    const {activityPrecision} = user;

    if(activityPrecision){
      return (
        <LabelTextWrapper>
          <FormLabel><FormattedMessage id="profile.public.business_line_specification"/></FormLabel>
          <p>{activityPrecision}</p>
        </LabelTextWrapper>
      );
    } else {
      return false;
    }
  };

  render() {
    const {user, activityList} = this.props;
    const {orientation} = this.state;
    const {
      email, firstName, lastName, activity, description, photo, language
    } = user;
    const {preview} = photo;

    let activityType = activityList.find(({value}) => value === activity);
    let activityRecord = activityType.description;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <ImageProfile style={{backgroundImage: `url(${preview});`, transform: `rotate(${orientation})`}}/>
          </div>

          <div className="col-lg-6 offset-lg-2">
            <LabelTextWrapper>
              <FormLabel><FormattedMessage id="user.email"/></FormLabel>
              <p>{email}</p>
            </LabelTextWrapper>

            <LabelTextWrapper>
              <FormLabel><FormattedMessage id="user.fullname"/></FormLabel>
              <p>{firstName} {lastName}</p>
            </LabelTextWrapper>

            <LabelTextWrapper>
              <FormLabel><FormattedMessage id="user.activity"/></FormLabel>
              <p>{activityRecord}</p>
            </LabelTextWrapper>

            {this.renderActivitySpecification()}

            <LabelTextWrapper>
              <FormLabel><FormattedMessage id="profile.public.description"/></FormLabel>
              <p>{description}</p>
            </LabelTextWrapper>

            {this.renderUserLinks()}
          </div>
        </div>
      </div>
    );
  };
}

export default withLanguages(withActivities(withUser(injectIntl(withRouter(ProfilePublic)))));