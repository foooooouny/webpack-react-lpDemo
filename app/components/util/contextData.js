// 不用redux的备用目录，用于存储数据，用于多页面使用。

// 下面是个例子
const defaultUserD = {
  userName: null,
  idCard: null,
  userAddress: null
}

let userD = JSON.parse(JSON.stringify(defaultUserD));

// 通用set数据函数
const setData = (obj, defaultData) => {
  if (typeof obj !== 'object') {
    return defaultData;
  }

  return Object.assign(defaultData, obj);
}

// 通用get数据函数
const getData = (params, obj) => {
  if (params) {
    return obj[params];
  }

  return obj;
}

// 获取userD数据，可以通过param，获取某个单独属性的值
export const getUserD = (param) => {
  return getData(param, userD);
}

// 改变userD数据,传输一个 对象参数
export const setUserD = (obj) => {
  return setData(obj, userD);
}

// 销毁userD数据，将userD 还原为 defaultUserD
export const destoryUserD = () => {
  return userD = JSON.parse(JSON.stringify(defaultUserD));
}


// 销毁所有数据，方便实用
export const destoryAllD = () => {
  // 使用方法：一般不推荐销毁userD
  // destoryUserD();
}