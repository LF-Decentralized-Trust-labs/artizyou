import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import creation from '../reducers/creation';
import creations from '../reducers/creations';
import creationTypes from '../reducers/creationTypes';
import categories from '../reducers/categories';
import activities from '../reducers/activities';
import languages from '../reducers/languages';
import licenses from '../reducers/licenses';
import user from '../reducers/user';

const reducers = combineReducers({
  activities,
  creation,
  creations,
  creationTypes,
  categories,
  languages,
  licenses,
  user,
});

const {__PRELOADED_STATE__} = global;
const {redux} = __PRELOADED_STATE__;

export default createStore(reducers, redux, applyMiddleware(thunk));