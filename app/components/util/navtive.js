// 原生app方法

// 检查 设备
export const checkBrowser = () => {
  let u = navigator.userAgent;
  let app = navigator.appVersion;
  let browser = {
    // 移动终端浏览器版本信息
    versions: {
      // IE内核
      trident: u.indexOf('Trident') > -1, 
      // opera内核
      presto: u.indexOf('Presto') > -1, 
      // 苹果、谷歌内核
      webKit: u.indexOf('AppleWebKit') > -1, 
      // 火狐内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, 
      // 是否为移动终端
      mobile: Boolean(u.match(/AppleWebKit.*Mobile.*/)) || Boolean(u.match(/AppleWebKit/)), 
      // ios终端
      ios: Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)), 
      // android终端或者uc浏览器
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
        // 是否为iPhone或者QQHD浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
      // 是否iPad
      iPad: u.indexOf('iPad') > -1, 
      // 是否web应该程序，没有头部与底部
      webApp: u.indexOf('Safari') === -1 
    },
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  return browser;
}

// 公共设备判断及app方法调用函数
export let pubSingle = (funcName, androidFuncValue, iosFuncValue) => {
  let { versions, language } = checkBrowser();
  let iosValue = iosFuncValue || androidFuncValue;
  if (versions.android) {
    android.caSign(funcName, androidFuncValue);
  } else if (versions.ios || versions.iPhone || versions.iPad) {
    caSign(funcName, iosValue);
  }
}

// 签名方法 初始化函数一 
let initSign = (value) => {
  // String templateID  模板ID
  // String contextId   业务流水号/工单号，不可为空
  // String bTemplate   表示模板数据byte数组类型，不可为空
  return pubSingle('initSign', value);
}

// 签名方法 初始化函数二 
let setSingleSigner = (value) => {
  // String iDCardNum   身份证号
  // String iDCardName  身份证姓名
  // String keyWord     关键字
  return pubSingle('setSingleSigner', value);
}

// 签名初始化函数
export let qmInit = (initValue, singleValue) => {
  let { versions, language } = checkBrowser();
  let funcObj = {
    func: () => {
      if (versions.android) {
      // 安卓方法
        initSign(JSON.stringify(initValue));
        setSingleSigner(JSON.stringify(singleValue));

      } else if (versions.ios || versions.iPhone || versions.iPad) {
        // iphone方法
        setTimeout(initSign(JSON.stringify(initValue).replace(/"/g, "\\\"")), 1000);
        setTimeout(setSingleSigner(JSON.stringify(singleValue).replace(/"/g, "\\\"")), 1500);
      }
    }
  }

  return funcObj.func;
}

// 点击调用 签名 模版
export let showSinglesign = () => {

  let funcObj = {
    func: () => {
      return pubSingle("showSinglesign", "{'showType':0}", "{\"showType\":0}")
    }
  }

  return funcObj.func;
}

// 数据加密函数
export let genData = () => {
  let funcObj = {
    func: () => {
      return pubSingle('genData', "{'':''}", "{\"\":\"\"}");
    }
  }

  return funcObj.func;
}
// 签名点击确认之后 回调方法
// export let callBackCAImage = (imgUrl, cb) => {
//     genData()();

//     return cb(imgUrl);
// }

// 调取原生相机
export let nativeCamera = () => {
  let { versions } = checkBrowser();

  let funcObj = {
    func: () => {
      if (versions.android) {
        // 安卓返回app首页方法
        // fuch.showCamera(); 默认参数为：720P 宽: 1080 高：720 需要压缩图片大小：200K
        // fuch.showCamera(String width,String height,String size); 传三个参数：宽，高，需要压缩的大小
        // fuck.showCamera();
        fuck.showCamera('1080', '720', '200');
      } else if (versions.ios || versions.iPhone || versions.iPad) {
        // iphone返回app首页方法
        showCamera();
      }
    }
  }

  return funcObj.func;
}

// 返回首页 app 原生方法
export let backPage = () => {
  let { versions } = checkBrowser();

  let funcObj = {
    func: () => {
      if (versions.android) {
        // 安卓返回app首页方法
        fuck.backFirstPage();
      } else if (versions.ios || versions.iPhone || versions.iPad) {
        // iphone返回app首页方法
        backFirstPage();
      }
    }
  }

  return funcObj.func;
}
