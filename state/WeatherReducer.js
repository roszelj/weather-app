import ActionTypes from './ActionTypes';
import { WeatherState, Weather, CurrentWeather } from './Records';

//import { objectAssign } from 'object-assign';
import assign from 'lodash.assign';


class WeatherReducer {
  static reduce(state = new WeatherState(), action) {
    if (WeatherReducer[action.type]) {
      return WeatherReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_CASES](state, action) {
    let weather = action.weather.sort((weather,a) => a.createdAt - weather.createdAt);
    return state.set('all', weather);
  }

/*
  static [ActionTypes.SET_NEARBY_CASES](state, action) {
    return state.set('nearby', action.caseIds);
  }

  static [ActionTypes.ADD_CASE](state, action) {
    let new_case = state.all.push(action.cases);

    return state.set('all', new_case);
  }
  */

  static [ActionTypes.SET_CURRENT_WEATHER](state, action) {

      /*newState = Object.assign({}, state);
      newState[action.fieldName] = action.value;*/
      //let newState = assign({},state);

      //let newState = Object.assign({}, state);
      return state.set('current', action.currentWeather);


  }

  static [ActionTypes.UPDATE_CASES](state, action) {
      let cases = state.get('all');
      //let newState = state.get('all');
      console.log(action.cases.id);
      state.all.map( (item, index) => {
        console.log(index);
        if(item.id === action.cases.id) {

          cases = state.all.setIn([index], action.cases);
        }
      });

      return state.set('all', cases);


  }
}

export function updateObjectInArray(array, action) {
  return array.map( (item, index) => {

      if(index.id !== action.id) {

          // This isn't the item we care about - keep it as-is
          return item;
      }

      // Otherwise, this is the one we want - return an updated value

      return {
          ...item,
          ...action.item
      };
  });
}



export default CasesReducer.reduce;
