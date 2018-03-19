/**
 项目配置信息
 **/
export const API_URI = 'xxxx:8488'

export const HEADERS = {
    'Accept': 'application/json',
    'Content-Type' : 'application/json; charset=UTF-8',
    'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
    'Host': API_URI.split('/')[0],
    'Referer': 'http://' + API_URI + '/',
}
export const USER_KEY = '@Rntest:USER';
