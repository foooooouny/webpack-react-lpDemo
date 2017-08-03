// Api 封装
import axios from 'axios';
import querystring from 'axios';

// '/api' 是webpack 反向代理的地址，如果要用反向代理，需要调整 '/cfg/base' 中的 devServer => proxy => target 地址
let BaseUrl = process.env.REACT_WEBPACK_ENV === 'dev' ? '/api' : 'http://jiekouUrl/';

// 参数分别代表： api请求地址  请求参数  额外的配置项
export const getData = (apiUrl, params, option) => {
  let cfg = Object.assign({}, {
      method: 'get',
      url: `${BaseUrl}${apiUrl}`,
      params,
      withCredentials: true
    }, option);

  const $promise = axios(cfg);

  return $promise;
}

// 数据传输格式为 application/json
export const postData = (apiUrl, data, option) => {
  let cfg = Object.assign({}, {
      method: 'post',
      url: `${BaseUrl}${apiUrl}`,
      data,
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    }, option);

  const $promise = axios(cfg);

  return $promise;
}

// 数据传输格式为 application/x-www-form-urlencoded 
export const postUrcodeData = (apiUrl, data, option) => {
  let cfg = Object.assign({}, {
      method: 'post',
      url: `${BaseUrl}${apiUrl}`,
      data: querystring.stringify(data),
      headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    }, option);

  const $promise = axios(cfg);

  return $promise;
}