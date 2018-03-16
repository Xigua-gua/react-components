import { AsyncStorage } from 'react-native';
import * as TYPES from '../types';
import * as CONFIG from '../config';

export function request(route, params, dispatch, success=null, error=null, { method='GET', headers={}, body=null } = {}, is_form_data=false) {
    // 处理query
    const p = Object.keys(params).length > 0 ? '?' + Object.entries(params).map( (i)=> `${i[0]}=${encodeURI(i[1])}` ).join('&') : ''
    const uri = `http://${ CONFIG.API_URI }${ route }${ p }`
    let d = {method: method, headers: headers}
    if (method!='GET') d.body = is_form_data ? body : JSON.stringify(body)
    // console.log(`[${method}] ${uri}`)
    //console.log(uri, d)
    fetch(uri, d)
        .then((response) => {
            //console.log(response)
            if (response.status === 200) {
                return response.json()
            } else {
                return {code: response.status, result: 0}
            }
        })
        .then((data) => {
            if (data.code === 0 || data.result === 1) success && success(data)
            else {
                error && error(data)
            }
        })
        .catch((error) => {
            console.warn(error)
        })
}
