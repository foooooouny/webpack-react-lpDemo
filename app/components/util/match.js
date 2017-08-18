// 公共验证正则表达式,将项目中需要用到的正则表达式写在这里面，统一调用
const myMatch = {
  idCardMatch: /^\d{17}([0-9]|x|X)$/,
  phoneMatch: /^1[3|4|5|7|8]\d{9}$/
}

export default myMatch;