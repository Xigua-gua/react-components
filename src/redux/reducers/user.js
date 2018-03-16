import * as TYPES from '../types';

const initialState = {
    status: null,
    error: null,
    info: {}, // 保存登录后的信息
    signup: {}, // 保存注册信息
}

export function user(state=initialState, action) {
    switch (action.type) {
        case TYPES.LOGGED_CHECKING:
            return {
                ...state,
                status: 'checking',
            }
        case TYPES.LOGGED_PEDDING:
            return {
                ...state,
                status: 'pedding',
            }
        case TYPES.LOGGED_ERROR:
            return {
                ...state,
                status: 'error',
            }
        case TYPES.LOGGED_IN:
            return {
                ...state,
                status: 'logged',
                error: null,
                info: action.result,
            }
        case TYPES.LOGGED_OUT:
            return {
                ...state,
                status: 'loggin_out',
                error: null,
                info: {},
            }
        case TYPES.SIGNUP_FETCH_CAPTCHA:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    contact_number: action.contact_number,
                },
            }
        case TYPES.SIGNUP_ERROR:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    status: 'error',
                    error: action.error,
                },
            }
        case TYPES.USER_UPDATE_INFO:
            return {
                ...state,
                info: {
                    ...state.info,
                    ...action.result,
                },
            }
        default:
            return state
    }
}

export function resetPassword(state = {
  payload: false
  }, action) {
  switch (action.type) {
    case TYPES.RESET_PASSWORD:
      return {
        ...state,
        payload: true,
        status: 'logged',
        info: action.result
      }
    default:
      return state
  }
}

export function getDriverInfo(state = {
  payload: false
  }, action) {
  switch (action.type) {
    case TYPES.GETDRIVER_INFO:
      return {
        ...state,
        payload: true,
        status: 'logged',
        info: action.result
      }
    case TYPES.CHANGE_HEADER:
        return {
            ...state,
            error: null,
            info: action.result,
        }
    default:
      return state
  }
}

export function changeDriverInfo(state = {
  payload: false
  }, action) {
  switch (action.type) {
    case TYPES.GETDRIVER_INFO:
      return {
        ...state,
        payload: true,
        status: 'logged',
        info: action.result
      }
    default:
      return state
  }
}
export function userPosition(state = { preload: false }, action) {
  switch (action.type) {
    case TYPES.USER_POSITION_UPDATE:
      return {
        preload: true,
        ...action.result,
      }
    case TYPES.USER_POSITION_CLEAN:
      return {
        preload: false,
      }
    default:
      return state
  }
}
