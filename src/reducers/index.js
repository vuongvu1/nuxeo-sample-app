import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import nuxeo from './nuxeo';

export default (history) => combineReducers({
  router: connectRouter(history),
  nuxeo,
})
