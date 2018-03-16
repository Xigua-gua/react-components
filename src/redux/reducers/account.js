import * as TYPES from '../types';

// 用户银行卡号
export function accountTargets(state = {
  payload: false
  }, action) {
  switch (action.type) {
    case TYPES.ACCOUNT_TARGETS:
      return {
        ...state,
        payload: true,
        ...action.result,
      }
    default:
      return state
  }
}

// 支持银行及联行号
export function supportBanks(state = {
  payload: false
  }, action) {
  switch (action.type) {
    case TYPES.SUPPORT_BANKS:
      return {
        ...state,
        payload: true,
        ...action.result,
      }
    default:
      return state
  }
}

// 司机账户记录流水
export function userAccountLogs(state = {
  payload: false
  }, action) {
  switch (action.type) {
    case TYPES.USER_ACCOUNT_LOGS:
      return {
        ...state,
        payload: true,
        ...action.result,
      }
    default:
      return state
  }
}
