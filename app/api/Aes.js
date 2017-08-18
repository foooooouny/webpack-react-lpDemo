import { AES, enc, pad, mode } from 'crypto-js';

let BaseLabel;
let lpAes = {
  // 加密方法
  aesEncrypt: (data, keyStr, iv = keyStr) => {
    if (!BaseLabel) {
      BaseLabel = keyStr;
    }

    let encrypted = AES.encrypt(data, enc.Utf8.parse(keyStr || BaseLabel), { iv: enc.Utf8.parse(iv || BaseLabel), mode: mode.CBC, padding: pad.ZeroPadding });

    return encrypted.toString();
  },
  // 解密密方法
  aesDecrypt: (data, keyStr, iv = keyStr) => {
    if (!BaseLabel) {
      BaseLabel = keyStr;
    }

    // 解密的是基于BASE64的数据，此处data是BASE64数据，
    // 后台传输过来的加密字符串如果过长，中间会有 回车 符号，所以需要去掉
    let decrypted = AES.decrypt(data.replace(/[↵]|[\r\n]/g, ''), enc.Utf8.parse(keyStr || BaseLabel), { iv: enc.Utf8.parse(iv || BaseLabel), mode: mode.CBC, padding: pad.ZeroPadding });

    return decrypted.toString(enc.Utf8);
  }
}

export default lpAes;
