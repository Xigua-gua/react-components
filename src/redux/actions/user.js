/**
用户模块 actions

 **/

import { AsyncStorage } from 'react-native';
import * as TYPES from '../types';
import * as CONFIG from '../config';
import { request } from './request';
import base64 from 'base-64'

export function login(opt = {}) {
    return (dispatch) => {
        //dispatch({type: TYPES.LOGGED_PEDDING});
        const route = '/token';
        const method = 'GET';
        const headers = {
            ...CONFIG.HEADERS,
            'Authorization': `Basic ${base64.encode(`${opt.username}:${opt.password}`)}`,
        }
        const success = (data) => {
          //创建本地储存 localStorage.setItem()或者AsyncStorage.setItem
          AsyncStorage.setItem(CONFIG.USER_KEY, JSON.stringify(data.result))
          if(data.code === 0) {
            dispatch({ type: TYPES.LOGGED_IN, result: data.result })
          }
          opt.success && opt.success(data)
        }
        const error = (data)=> {
            dispatch({type: TYPES.LOGGED_ERROR, error: data.error})
            opt.error && opt.error(data)
        };
        request(route, {}, dispatch, success, error, {method: method, headers: headers})
    }
}
//验证本地是否已经登录
export function checkAuth(opt={}) {
  return (dispatch) => {
    //从本地存储获取数据
    AsyncStorage.getItem(CONFIG.USER_KEY, (error, result) => {
      if(result){
        const data = JSON.parse(result)
        dispatch({ type: TYPES.LOGGED_IN, result: data })
        opt.success && opt.success(data)
      }else {
        dispatch({type: TYPES.LOGGED_OUT})
        opt.error && opt.error()
        }
      })
    }
  }
//退出登录
export function logout(opt = {}) {
    return (dispatch) => {
      AsyncStorage.removeItem(CONFIG.USER_KEY)
      dispatch({type: TYPES.LOGGED_OUT})
      opt.success && opt.success()
    }
}

/**
 * [getAddress 通过经纬度获取详细地址]
 */
export function getAddress(opt = {}) {
  return (dispatch) => {
    const key = CONFIG.AMAP_KEY
    const params = {
      location: `${!!opt.lng ? opt.lng.toFixed(6) : 120.2},${!!opt.lat ? opt.lat.toFixed(6) : 30.3}`,
    }
    const p = Object.keys(params).length > 0 ?
      `${Object.entries(params)
        .map(i => `${i[0]}=${encodeURI(i[1])}`).join('&')}` : ''
    const uri = `http://restapi.amap.com/v3/geocode/regeo?key=${key}&${p}`
    //console.log(uri)
    fetch(uri, { method: 'GET' }).then((res) => {
      // console.log('res->',res)
      if (res.status === 200) {
        return res.json()
      }
    }).then((data) => {
      // console.log('data->',data)
      if (data && data.status === '1') {
        const { formatted_address } = data.regeocode
        result = formatted_address
        // console.log('result->',result)
        opt.success && opt.success(result)
      }
    })
  }
}
