import * as TYPES from '../types'

//订单列表
export function orderlist(state={}, action) {
  switch (action.type) {
    case TYPES.ORDER_LIST:
      return {
        ...state,
        preload: true,
        ...action.result,
      }
      break;
    default:
      return state
  }
}
//待接单列表
export function orderWait(state={}, action) {
  switch (action.type) {
    case TYPES.ORDER_WAIET:
      return {
        ...state,
        preload: true,
        ...action.result,
      }
      break;
    default:
      return state
  }
}

//货源列表
export function cargoslist(state={}, action) {
  switch (action.type) {
    case TYPES.CARGOS_LIST:
      return {
        ...state,
        preload: true,
        ...action.result,
      }
      break;
    default:
      return state
  }
}

// 订单状态列表
export function statuslist(state= {} ,action) {
  switch (action.type) {
    case TYPES.STATUS_LIST:
      return {
        ...state,
        preload: true,
        ...action.result,
      }
      break;
    default:
      return state
  }
}

//详情列表
export function detaillist(state= {} ,action) {
  switch (action.type) {
    case TYPES.DETAIL_LIST:
      return {
        ...state,
        preload: true,
        ...action.result,
      }
      break;
    default:
      return state
  }
}

//订单支付状态列表
export function accountlist(state= {} ,action) {
  switch (action.type) {
    case TYPES.ORDER_ACCOUNT_LIST:
      return {
        ...state,
        preload: true,
        ...action.result,
      }
      break;
    default:
      return state
  }
}
