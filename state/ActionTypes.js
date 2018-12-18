export default defineActionConstants([
  'SET_CURRENT_USER',
  'SIGN_IN',
  'SIGN_OUT',
  'SET_CASES',
  'SET_CURRENT_CASE',
  'SET_NEARBY_CASES',
  'ADD_CASE',
  'UPDATE_CASES',
  'COMPUTE_DISTANCES'
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
