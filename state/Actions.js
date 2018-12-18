import ActionTypes from './ActionTypes';

export default class Actions {
  static setCurrentUser(user) {
    return {
      type: ActionTypes.SET_CURRENT_USER,
      user,
    }
  }

  static signIn(user) {
    return {
      type: ActionTypes.SIGN_IN,
      user,
    }
  }

  static signOut() {
    return {
      type: ActionTypes.SIGN_OUT,
    }
  }


  static setCases(cases) {
    return {
      type: ActionTypes.SET_CASES,
      cases,
    }
  }

  static setNearbyCases(caseIds) {
    return {
      type: ActionTypes.SET_NEARBY_CASES,
      caseIds,
    }
  }

  static computeDistances() {
    return {
      type: ActionTypes.COMPUTE_DISTANCES,
    }
  }
}
