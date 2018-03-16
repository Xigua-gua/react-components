/**
 * @desc 导航 reducers
 */
import { addNavigationHelpers } from 'react-navigation'

import AppNavigator from '../../navigator'

const getCurrentRouteName = (state) => {
  const route = state.routes[state.index];
  return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route);
}

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'))

export function nav(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  //console.log(nextState)

  // prevents navigating twice to the same route
  if (state && nextState) {
    const stateRouteName = getCurrentRouteName(state);
    const nextStateRouteName = getCurrentRouteName(nextState);
    return stateRouteName === nextStateRouteName ? state : nextState;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
