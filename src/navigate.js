/**
 * [防止路由重复跳转]
 */

global.route = null
export function navigate(route, params, navigation) {
  // console.log(route)
  if (global.route == null || global.route != route) {
    global.route = route
    navigation.navigate(route, params)
    setTimeout(() => {global.route = null},2000)
  }
}
