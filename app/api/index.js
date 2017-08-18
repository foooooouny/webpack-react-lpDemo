import axios from 'axios';
import querystring from 'querystring';
import conf from 'Config';
import myAes from './Aes';

let BaseUrl;
let BaseLabel;
let pathUrl = conf.appEnv === 'dev' ? '../app/utils/env/index.js' : './utils/env/index.js'

// 获取 baseUrl
const getBaseUrl = () => {

  return new Promise((resolve, reject) => {
    if (BaseUrl) {
      resolve({ BaseUrl, BaseLabel });
    } else {
      axios.get(pathUrl).
        then(d => {
          let pathObj = d.data.pathObj;
          BaseLabel = d.data.pathLabel;
          for(let i of pathObj) {
            if (i.label === d.data.pathValue) {
              BaseUrl = i.value;
            }
          }
          resolve({ BaseUrl, BaseLabel });
        }).
        catch(err => {
          reject(err);
        })
    }
  })
}


// get 请求方法 config 为自定义配置参数
export const lpGetData = async function lpGetData(url, params, config) {
  let cfg = Object.assign({}, {
    method: 'get',
    url: `${(await getBaseUrl()).BaseUrl}${url}`,
    params,
    withCredentials: true
  }, config);
    
  const $promise = axios(cfg);
  
  return $promise;
}

// get 不带参请求方法 config 为自定义配置参数
export const lpGetUtils = (url, config) => {
  let cfg = Object.assign({}, {
      method: 'get',
      url: `${url}`,
      withCredentials: true
    }, config);
  
  const $promise = axios(cfg);

  return $promise;
}

// post application/json 请求方法 config 为自定义配置参数
export const lpPostData = async function lpPostData(url, data, config) {
  let cfg = Object.assign({}, {
      method: 'post',
      url: `${(await getBaseUrl()).BaseUrl}${url}`,
      data,
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    }, config);

  const $promise = axios(cfg);

  return $promise;
}

// post application/x-www-form-urlencoded 请求方法,一般就是默认请求方法 config 为自定义配置参数
export const lpPostUrcodeData = async function lpPostUrcodeData(url, data, config) {

  let cfg = Object.assign({}, {
      method: 'post',
      url: `${(await getBaseUrl()).BaseUrl}${url}`,
      data: querystring.stringify(data),
      headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    }, config);

  const $promise = axios(cfg);

  return $promise;
}

// post application/x-www-form-urlencoded 加密请求方法 config 为自定义配置参数
// 如果参数需要加密传输，需要调用这个方法
export const lpPostSecretUrcodeD = async function lpPostSecretUrcodeD(url, d, config) {
  let data = querystring.stringify({ str: lpAes.aesEncrypt(JSON.stringify(d), (await getBaseUrl()).BaseLabel)});
  let cfg = Object.assign({}, {
      method: 'post',
      url: `${(await getBaseUrl()).BaseUrl}${url}`,
      data,
      headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    }, config);

  const $promise = axios(cfg);

  return $promise;
}

// 解密及参数序列化方法，对接收的 data 加密值进行解密并序列化为JSON格式参数
export const parseDecryptD = (value) => {
  let data = lpAes.aesDecrypt(value);

  return JSON.parse(data)
}