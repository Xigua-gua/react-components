/**
 * @desc 请求模块的reducers
 * @author Jafeney<jafeney@yijunet.cc>
 * @date 2017-05-25
 */

import * as TYPES from '../types'

export function request(state = { status: null }, action) {
  switch (action.type) {
    case TYPES.REQUEST_PENDDING:
      return {
        status: 'pending',
      }
    case TYPES.REQUEST_ERROR:
      return {
        status: 'error',
      }
    case TYPES.REQUEST_SUCCESS:
      return {
        status: 'success',
      }
    case TYPES.REQUEST_CLEAN:
      return {
        status: null,
      }
    default:
      return state
  }
}
