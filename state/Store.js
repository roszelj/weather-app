import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';
import thunk from 'redux-thunk';

import CurrentUserReducer from './CurrentUserReducer';
import CasesReducer from './CasesReducer';

import Effects from '../effects';

function configureStoreProd() {
  const middlewares = [
    // Add other middleware on this line...
    effectsMiddleware(Effects),
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk
  ];

  return createStore(
    combineReducers({
      currentUser: CurrentUserReducer,
      cases: CasesReducer,
    }),
    compose(applyMiddleware(...middlewares))
  );
}
const Store = configureStoreProd;

export default Store;
