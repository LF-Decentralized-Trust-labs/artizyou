import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import {Route} from 'react-router-dom';
import styled from 'styled-components';

import CreationsNewNavigation from './Navigation';
import CreationsNewInfos from './Infos';
import CreationsNewType from './Type';
import CreationsNewRegistration from './Registration';
import Title from '../../Title';
import CreationsNewKind from './Kind';
import withNewCreation from "../../../containers/withNewCreation";

const Wrapper = styled.div`
`;

class CreationsNew extends PureComponent {
  componentWillUnmount() {
    const {resetCreation} = this.props;

    resetCreation();
  }

  render() {
    return (<Wrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Title><FormattedMessage id="creations.add"/></Title>
              {/*{Object.keys(creation).map(key => <p key={key}>{`${key} : ${creation[key]}`}</p>)}*/}
            </div>
          </div>
        </div>

        <CreationsNewNavigation/>

        <Route path="/creations/new/kind" component={CreationsNewKind} exact/>
        <Route path="/creations/new/infos" component={CreationsNewInfos} exact/>
        <Route path="/creations/new/type" component={CreationsNewType} exact/>
        <Route path="/creations/new/registration" component={CreationsNewRegistration} exact/>
      </Wrapper>
    )
  }
}

export default withNewCreation(CreationsNew);