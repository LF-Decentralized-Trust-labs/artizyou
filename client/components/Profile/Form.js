import countries from "i18n-iso-countries";
import debounce from 'lodash/debounce';
import React, {PureComponent} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Redirect, withRouter} from 'react-router';
import styled from 'styled-components';

import Button from '../Button';
import RequiredFormInputTextGroup from '../Form/RequiredFormInputTextGroup'
import RequiredFormInputGroup from '../Form/RequiredFormInputGroup'
import Required from '../Form/Required'
import FormCheckbox from '../Form/Checkbox';
import FormInput from '../Form/Input';
import FormInputGroup from '../Form/InputGroup';
import FormLabel from '../Form/Label';
import TextArea from '../Form/TextArea'
import FormSelect from '../Form/Select';
import FormSelectSearchable from '../Form/SelectSearchable';
import FormDropzone from '../Form/Dropzone';
import {setOrientation} from "../../utils/image-orientation";
import Title from '../Title';
import withUser from '../../containers/withUser';
import withActivities from '../../containers/withActivities'
import withLanguages from '../../containers/withLanguages'
import {hasError, isBlank, isEmptyObject, isFalse} from '../../utils/validations';
import RequiredFormInputTextareaGroup from "../Form/RequiredFormInputTextareaGroup";
import {findOption, collectOptions, domainValuesToOptions} from "../../utils/select_options";
import Notification from "../Notification";

const DescriptionLabelWrapper = styled.div`
  position: absolute; 
  right: 15px;
  top: 0;
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

class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        firstName: false,
        lastName: false,
        username: false,
        activity: false,
        address: false,
        country: false,
        state: false,
        city: false,
        description: false,
        language: false,
        acceptedTerms: false,
        usernameExists: '',
      },
      orientation: '',
      notificationMessage: null,
    };
  }

  setOrientation = setOrientation.bind(this);

  countries = () => {
    const {language} = this.props.user;

    return countries.getNames(language);
  };

  provinces = () => {
    const {intl} = this.props;
    const {formatMessage} = intl;

    const caStates = {
      AB: `${formatMessage({id: 'user.state.alberta'})}`,
      BC: `${formatMessage({id: 'user.state.british_columbia'})}`,
      MB: `${formatMessage({id: 'user.state.manitoba'})}`,
      NB: `${formatMessage({id: 'user.state.new_brunswick'})}`,
      NL: `${formatMessage({id: 'user.state.newfoundland_labrador'})}`,
      NT: `${formatMessage({id: 'user.state.northwest_territories'})}`,
      NS: `${formatMessage({id: 'user.state.nova_scotia'})}`,
      NU: `${formatMessage({id: 'user.state.nunavut'})}`,
      ON: `${formatMessage({id: 'user.state.ontario'})}`,
      PE: `${formatMessage({id: 'user.state.prince_edward_island'})}`,
      QC: `${formatMessage({id: 'user.state.quebec'})}`,
      SK: `${formatMessage({id: 'user.state.saskatchewan'})}`,
      YT: `${formatMessage({id: 'user.state.yukon_territory'})}`
    };

    return caStates;
  };

  componentDidMount() {
    const {user} = this.props;
    const {photo} = user;

    if(photo.preview){
      this.setOrientation(photo.preview);
    }
  };

  sortCountriesOptions = (countriesOptions) => {
    const accent_fold = (function () {
      const accent_map = {
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', // a
        'ç': 'c',                                                   // c
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',                     // e
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',                     // i
        'ñ': 'n',                                                   // n
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', // o
        'ß': 's',                                                   // s
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',                     // u
        'ÿ': 'y'                                                    // y
      };

      return function accent_fold(s) {
        if (!s) {
          return '';
        }
        let ret = '';
        for (let i = 0; i < s.length; i++) {
          ret += accent_map[s.charAt(i)] || s.charAt(i);
        }
        return ret;
      };
    }());

    return (a, b) => {
      if (accent_fold(countriesOptions[a].toLowerCase()) < accent_fold(countriesOptions[b].toLowerCase())) return -1;
      if (accent_fold(countriesOptions[a].toLowerCase()) > accent_fold(countriesOptions[b].toLowerCase())) return 1;
      return 0;
    }
  };

  debouncedVerifyUsername = debounce(async (username) => {
    const {verifyUsername} = this.props;

    if (username.trim() !== '') {
      const {user_id} = await verifyUsername(username);

      if (user_id != null) {
        if (user_id === this.props.user.userId) {
          console.log('mon user est propriétaire du username');
        } else {
          this.setFieldError('username');
          this.setFieldError('usernameExists', 'username exists');
        }
      }
    }
  }, 1000);

  setFieldError = (name, value = true) => {
    const {errors} = this.state;

    this.setState({
      errors: {
        ...errors,
        [name]: value,
      },
    });
  };

  handleChange = ({target}) => {
    const {name, value} = target;

    this.setUserField(name, value);
  };

  handleSelectChange = (name) => (
    ({value}) => {
      this.setUserField(name, value);
    }
  );

  handleUsernameChange = (event) => {
    event.persist();

    this.handleChange(event);

    this.debouncedVerifyUsername(event.target.value);
  };

  handleSave = async () => {
    const {history, updateUser, user} = this.props;
    const {
      firstName, lastName, username, language, activity, activityPrecision, address, country, city, state, description, photo,
      facebookUrl, twitterUrl, linkedInUrl, personnalWebsite, professionalWebsite, acceptedTerms, ethereumWalletAddress
    } = user;

    if (this.validate()) {
      const params = {
        'user[first_name]': firstName,
        'user[last_name]': lastName,
        'user[username]': username,
        'user[language]': language,
        'user[activity]': activity,
        'user[activity_precision]': activityPrecision || '',
        'user[address]': address,
        'user[country]': country,
        'user[state]': country === 'CA' ? state : '',
        'user[city]': city,
        'user[description]': description,
        'user[accepted_terms]': acceptedTerms,
        'user[facebook_url]': facebookUrl || '',
        'user[ethereum_wallet_address]': ethereumWalletAddress || '',
        'user[twitter_url]': twitterUrl || '',
        'user[linked_in_url]': linkedInUrl || '',
        'user[personnal_website]': personnalWebsite || '',
        'user[professional_website]': professionalWebsite || '',
      };

      if (photo && photo.name) {
        params['user[photo]'] = photo
      }

      await updateUser(params);

      history.push('/creations');
    }
  };

  handleClickCheckbox = (name) => (
    (e) => {
      const {acceptedTerms} = this.props.user;
      this.setUserField(name, !acceptedTerms);
    }
  );

  setUserField = (name, value) => {
    const {setUserField} = this.props;

    this.setFieldError(name, false);

    setUserField(name, value);
  };

  validate = () => {
    const {history, user} = this.props;
    const {firstName, lastName, username, activity,country, state, language, acceptedTerms} = user;
    const {location} = history;
    const {pathname} = location;

    const errors = {};

    errors.firstName = isBlank(firstName);
    errors.lastName = isBlank(lastName);
    errors.username = isBlank(username);
    errors.activity = isEmptyObject(activity);
    errors.country = isEmptyObject(country);
    errors.language = isEmptyObject(language);

    if (country === 'CA') {
      errors.state = isEmptyObject(state);
    }

    if (!hasError(errors) && pathname !== '/profile/edit') {
      errors.acceptedTerms = isFalse(acceptedTerms);
    }

    let notificationMessage = null;
    if (hasError(errors)) {
      notificationMessage = 'error.generic';
    }

    this.setState({errors: errors, notificationMessage: notificationMessage});

    return !hasError(errors);
  };

  handleCloseNotification = () => {
    this.setState({notificationMessage: false});
  };

  handleDropPhoto = (acceptedFiles, rejectedFiles) => {
    const {setUserPhoto} = this.props;

    this.setOrientation(acceptedFiles[0].preview);

    setUserPhoto(acceptedFiles, rejectedFiles, this.handleDropError)
  };

  handleDropError = () => {
    this.setState({
      notificationMessage: <FormattedMessage id="error.rejected_file"/>,
    })
  };

  renderNotification = () => {
    const {notificationMessage} = this.state;

    if (!notificationMessage) {
      return null;
    }

    return (
      <Notification onClose={this.handleCloseNotification} key={notificationMessage} error>
        <FormattedMessage id={notificationMessage}/>
      </Notification>
    );
  };

  renderPublicAddress = () => {
    const {history, user} = this.props;
    const {location} = history;
    const {pathname} = location;

    if (pathname === '/profile/edit') {
      const {publicUrl} = user;
      return (
        <LabelTextWrapper>
          <FormLabel><FormattedMessage id="user.public_url"/></FormLabel>
          <p>{publicUrl}</p>
        </LabelTextWrapper>
      );
    }
    return null;
  };

  renderTerms = () => {
    const {history, user} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {acceptedTerms} = user;

    if (pathname === '/profile/edit') {
      return null;
    }

    return (
      <FormInputGroup>
        <Required errorName="acceptedTerms" message="error.accept_profile_terms"
                  hasError={this.state.errors.acceptedTerms}>
          <FormCheckbox id="acceptedTerms" checked={acceptedTerms} onClick={this.handleClickCheckbox('acceptedTerms')}>
            <FormattedMessage id="user.terms_conditions"/>
          </FormCheckbox>
        </Required>
      </FormInputGroup>
    );
  };

  renderProvince = () => {
    const {intl, user} = this.props;
    const {country, state} = user;
    const {formatMessage} = intl;

    if (country === 'CA') {
      return (
        <div className="col-lg-12">
          <RequiredFormInputGroup name="state" hasError={this.state.errors.state} labelId='user.state.label' placeholder={formatMessage({id: 'user.state.placeholder'})}>
            <FormSelectSearchable id="state" name="state"
                        options={collectOptions(this.provinces())}
                        placeholder={formatMessage({id: 'action.select'})}
                        value={findOption(state, collectOptions(this.provinces()))}
                        onChange={this.handleSelectChange('state')}/>
          </RequiredFormInputGroup>
        </div>
      );
    }
  };

  render() {
    const {history, title, intl, user, activityList, languageList} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {
      completedProfile, email, firstName, lastName, username, language, activity,
      activityPrecision, address, country, state, city, description, photo,
      facebookUrl, twitterUrl, linkedInUrl, personnalWebsite, professionalWebsite, ethereumWalletAddress
    } = user;
    const {formatMessage} = intl;
    const {preview} = photo;
    const {orientation} = this.state;
    let readonly = '';

    if (pathname === '/profile/edit') {
      readonly = 'true';
    }

    if (pathname === '/profile/new' && completedProfile) {
      return <Redirect to="/profile/edit"/>
    }

    return (
      <div className="container">
        <Title>
          {title}
        </Title>

        <div className="row">
          <div className="col-lg-4">
            <FormDropzone imageStyle={{transform: `rotate(${orientation})`}} name="photo" type="user_profile" onDrop={this.handleDropPhoto} src={preview}/>
            <p><FormattedMessage id="user.details.subtext"/></p>

            <p><br/><br/><br/></p>
            <div>
              <img id="resetIMG" src="" alt=""/>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-2">

            <LabelTextWrapper>
              <FormLabel><FormattedMessage id="user.email"/></FormLabel>
              <p>{email}</p>
            </LabelTextWrapper>

            <div className="row">
              <div className="col-lg-12">
                <RequiredFormInputTextGroup hasError={this.state.errors.username} labelId='user.username'
                                            name="username" message={this.state.errors.usernameExists} value={username} readonly={readonly}
                                            handleChange={this.handleUsernameChange}/>
              </div>

              <div className="col-lg-6">
                <RequiredFormInputGroup name="language" hasError={this.state.errors.language} labelId='user.language'>
                  <FormSelect id="language" name="language"
                              options={collectOptions(domainValuesToOptions(languageList))}
                              value={findOption(language, collectOptions(domainValuesToOptions(languageList)))}
                              onChange={this.handleSelectChange('language')}/>
                </RequiredFormInputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <RequiredFormInputTextGroup hasError={this.state.errors.firstName} labelId='user.firstName'
                                            name="firstName" value={firstName}
                                            handleChange={this.handleChange}/>
              </div>

              <div className="col-lg-6">
                <RequiredFormInputTextGroup hasError={this.state.errors.lastName} labelId='user.lastName'
                                            name="lastName" value={lastName}
                                            handleChange={this.handleChange}/>
              </div>

              <div className="col-lg-12">
                <RequiredFormInputGroup name="activity" hasError={this.state.errors.activity} labelId='user.activity'>
                  <FormSelect id="activity" name="activity"
                              options={collectOptions(domainValuesToOptions(activityList))}
                              value={findOption(activity, collectOptions(domainValuesToOptions(activityList)))}
                              onChange={this.handleSelectChange('activity')}/>
                </RequiredFormInputGroup>
              </div>

              <div className="col-lg-12">
                <FormInputGroup>
                  <FormLabel><FormattedMessage id="user.activity_specification.label"/></FormLabel>
                  <FormInput name="activityPrecision" value={activityPrecision}
                             placeholder={formatMessage({id: 'user.activity_specification.placeholder'})}
                             onChange={this.handleChange}/>
                </FormInputGroup>
              </div>
              <div className="col-lg-12">
                <FormInputGroup>
                  <FormLabel><FormattedMessage id="user.ethereumWalletAddress"/></FormLabel>
                  <FormInput name="ethereumWalletAddress" value={ethereumWalletAddress} onChange={this.handleChange}/>
                </FormInputGroup>
              </div>

              <div className="col-lg-12">
               <FormInputGroup>
                <FormLabel><FormattedMessage id="user.address.label"/></FormLabel>
                <FormInput                  labelId='user.address.label'
                                            name="address" value={address}
                                            placeholder={formatMessage({id: 'user.address.placeholder'})}
                                            onChange={this.handleChange}/>
               </FormInputGroup>
              </div>

              <div className="col-lg-6">
                <FormInputGroup>
                  <FormLabel><FormattedMessage id="user.city.label"/></FormLabel>
                  <FormInput name="city" value={city}
                             placeholder={formatMessage({id: 'user.city.placeholder'})}
                             onChange={this.handleChange}/>
                </FormInputGroup>
              </div>

              <div className="col-lg-6">
                <RequiredFormInputGroup name="country" hasError={this.state.errors.country} labelId='user.country'>
                  <FormSelectSearchable id="country" name="country"
                              options={collectOptions(this.countries(), this.sortCountriesOptions(this.countries()))}
                              placeholder={formatMessage({id: 'action.select'})}
                              value={findOption(country, collectOptions(this.countries()))}
                              onChange={this.handleSelectChange('country')}/>
                </RequiredFormInputGroup>
              </div>

              {this.renderProvince()}

              <div className="col-lg-12">
                <FormInputGroup>
                  <DescriptionLabelWrapper>
                    <FormLabel> {description.length}/25000 </FormLabel>
                  </DescriptionLabelWrapper>
                  <FormLabel><FormattedMessage id="user.description.label"/></FormLabel>
                  <TextArea maxLength="25000"
                            name="description" value={description}
                            onChange={this.handleChange}
                            placeholder={formatMessage({id: 'user.description.placeholder'})}/>

                </FormInputGroup>
              </div>
            </div>

            <FormInputGroup>
              <FormLabel><FormattedMessage id="user.links.facebook"/></FormLabel>
              <FormInput name="facebookUrl" value={facebookUrl} onChange={this.handleChange}/>
            </FormInputGroup>

            <FormInputGroup>
              <FormLabel><FormattedMessage id="user.links.twitter"/></FormLabel>
              <FormInput name="twitterUrl" value={twitterUrl} onChange={this.handleChange}/>
            </FormInputGroup>

            <FormInputGroup>
              <FormLabel><FormattedMessage id="user.links.linkedin"/></FormLabel>
              <FormInput name="linkedInUrl" value={linkedInUrl} onChange={this.handleChange}/>
            </FormInputGroup>

            <FormInputGroup>
              <FormLabel><FormattedMessage id="user.links.personal_website"/></FormLabel>
              <FormInput name="personnalWebsite" value={personnalWebsite} onChange={this.handleChange}/>
            </FormInputGroup>

            <FormInputGroup>
              <FormLabel><FormattedMessage id="user.links.professional_website"/></FormLabel>
              <FormInput name="professionalWebsite" value={professionalWebsite} onChange={this.handleChange}/>
            </FormInputGroup>

            {this.renderPublicAddress()}

            {this.renderTerms()}

            <Button className="buttonBlock" id="save-profile-form" onClick={this.handleSave}><FormattedMessage id="save"/></Button>
          </div>
        </div>

        {this.renderNotification()}
      </div>
    );
  };
}

export default withLanguages(withActivities(withUser(injectIntl(withRouter(ProfileForm)))));