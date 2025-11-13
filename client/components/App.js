import React, {Component, Fragment} from 'react';
import {addLocaleData, FormattedMessage, IntlProvider} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import {Route, Switch, withRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import universal from 'react-universal-component';
import countries from "i18n-iso-countries";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Error from './Error';

import Footer from './Footer'
import Header from './Header'
import locales from '../locales';
import theme from '../styles/theme';
import styled from 'styled-components';

import withUser from '../containers/withUser'

const ConditionsOfUse = universal(import('./Legals/ConditionsOfUse'));
const CreationsList = universal(import('./Creations/List'));
const CreationsNew = universal(import('./Creations/New'));
const CreationsPage = universal(import('./Creations/Page'));
const OtherLegalTerms = universal(import('./Legals/OtherLegalTerms'));
const PlagiarismHelpGuide = universal(import('./PlagiarismHelpGuide'));
const ProfileForm = universal(import('./Profile/Form'));
const ProfilePublic = universal(import('./Profile/Public'));
const CreationCompleted = universal(import('./Creations/Completed'));
const CreationCompletedNoBc = universal(import('./Creations/CompletedNoBc'));
const CreationCompletedWithCode = universal(import('./Creations/CompletedWithCode'));
const Pay = universal(import('./Form/Payment/Pay'));

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN || "https://27c56a29ca5a4b0a85b9cc67f9068be9@o297329.ingest.sentry.io/5514835",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const Main = styled.div`
  padding: 25px 0;
  min-height: calc(100vh - 110px);
  
  ${props => props.theme.artz.breakpoint.sm} {
    padding: 75px 0;
  }
  
  .boxed {
    position: relative;
    border: 2px solid #f36f2b;
    border-radius: 38px;
    padding: 0 15px;
    margin: 45px 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    
    .titled {
      font-size: 1em;
      /*line-height: 1.25em;*/
      text-align: center;
      position: relative;
      padding: 12px 20px;
      background-color: #f36f2b;
      border: 2px solid #f36f2b;
      border-radius: 40px;
      display: inline-block;
      top: -20px;
      width: 100%;
  
      ${props => props.theme.artz.breakpoint.sm} { 
        font-size: 1.5em;
        padding: 16px 30px;
      }
    }
  }
`;

addLocaleData(fr);
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

class App extends Component {
  constructor() {
    super();
    this.state = {hasError: false};
  }

  componentDidCatch() {
    const {hasError} = this.state;

    this.setState({hasError: !hasError});
  }

  componentDidMount() {
    [
      ConditionsOfUse,
      CreationsList,
      CreationsNew,
      CreationsPage,
      OtherLegalTerms,
      PlagiarismHelpGuide,
      ProfileForm,
      Pay,
    ].forEach((Component) => {
      Component.preload();
    });
  }

  render() {
    const {hasError} = this.state;
    const {location, user} = this.props;
    const {language} = user;
    const {pathname} = location;

    return (
        <ThemeProvider theme={theme}>
          <IntlProvider locale={language} messages={locales[language]}>
            <Fragment>
              <Header/>
              <Error hasError={hasError}>
                <Main>
                  <Switch>
                    <Route key="creations_list" path="/creations" component={CreationsList} exact/>
                    <Route key="creations_new" path="/creations/new/:step" component={CreationsNew} exact/>
                    <Route key="creations_show" path="/creations/:creationId" component={CreationsPage} exact/>
                    <Route key="profile_new" path="/profile/new"
                           render={() => <ProfileForm title={<FormattedMessage id="profile.create"/>}/>} exact/>
                    <Route key="profile_edit" path="/profile/edit"
                           render={() => <ProfileForm title={<FormattedMessage id="profile.edit"/>}/>} exact/>
                    <Route key="profile_public" path="/profile/:username" component={ProfilePublic} exact/>
                    <Route key="conditions_of_use" path="/terms_of_use" component={ConditionsOfUse} exact/>
                    <Route key="other_legal_terms" path="/privacy_policy" component={OtherLegalTerms} exact/>
                    <Route key="plagiarism_help_guide" path="/plagiarism_help_guide" component={PlagiarismHelpGuide}
                           exact/>
                    <Route key="completed" path="/creations/:creationId/completed" component={CreationCompleted} exact/>
                    <Route key="completed_without_blockchain" path="/creations/:creationId/completed_without_blockchain"
                           component={CreationCompletedNoBc} exact/>
                    <Route key="completed_with_code" path="/creations/:creationId/completed_with_code"
                           component={CreationCompletedWithCode} exact/>
                    <Route key="pay" path="/pay" component={Pay} exact/>
                  </Switch>
                </Main>
              </Error>
              <Footer/>
            </Fragment>
          </IntlProvider>
        </ThemeProvider>
    );
  }
}

export default withRouter(withUser(App));

