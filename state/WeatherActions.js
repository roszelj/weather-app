import ActionTypes from './ActionTypes';

export function addNewCase(cases){

  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
     dispatch({
      type: ActionTypes.ADD_CASE,
      //dateModified: getFormattedDateTime(),
      cases
    })
    return Promise.resolve();
  };
}

export function setCurrentCase(currentCase) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
     dispatch({
      type: ActionTypes.SET_CURRENT_CASE,
      //dateModified: getFormattedDateTime(),
      currentCase
     })
     return Promise.resolve();
  };
}

export function setCases(cases) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.SET_CASES,
      cases,
    })
    return Promise.resolve();
  };
}

export function updateCases(cases) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.UPDATE_CASES,
      cases,
    })
    return Promise.resolve();
  };
}

export function calcNearby() {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.COMPUTE_DISTANCES,
    })
    return Promise.resolve();
  };
}

export function setNearbyCases(caseIds) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.SET_NEARBY_CASES,
      caseIds,
    })
    return Promise.resolve();
  };
}
