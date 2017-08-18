# webpack-react-lpDemo
webpack-react 底层环境框架

## 项目概述

  > 项目使用 `webpack` 构建。使用 `React + React-Router + antd + less` 作为主要开发技术，开发中使用到的工具有 webpack babel eslint，其他组件或工具后续开发过程中根据实际情况再添加。


-----------

## Installation

**1. clone the project**

```sh
git clone https://github.com/foooooouny/webpack-react-lpDemo.git jyxm-app
cd jyxm-app
```

**2. Install the dependencies**

```sh
npm install
```

## Development Workflow

**4. start a deveplpment server**

```sh
npm start               // 启动本地服务，端口：8000
```

**5. Generate a production build in `./public`:**

```sh
npm run build:dll             // 打包 dll 文件，只需要在初次打包时执行一次，成功之后才可以执行 npm run build

npm run copy:utils            // 复制 /app/utils 文件到 /build/dist/utils,成功之后，找到 /public/utils/env/index.js，将 pathValue 改为当前环境值
 
npm run dist                 // 打包项目文件，第一次打包的时候，必须要先执行 npm run build:dll
```

------------
## 目录介绍

----------
### 1.0.0.0 `根目录及文件`

```js
`/app`                            // 项目主文件夹
`/dllConfig`                      // npm run dll 之后生成的 [name]-manifest.json 文件所在文件夹
`/public`                         // npm run build 之后生成的打包文件夹
`.babelrc`                        // babel 配置文件，支持 es6写法及组件的按需加载
`.eslintignore`                   // eslint验证忽略文件
`.eslintrc.js`                    // eslint验证规则文件
`.gitignore`                      // git commit 忽略文件，里面的目录是git忽略提交的目录
`package-lock.json`               // 描述组件依赖关系树，不需要被git提交
`package.json`                    // 包文件
`server.js`                       // 用以使用node启动server，但是此项目没有使用node 启动 webpack-dev-server,所以没什么作用，如果想要使用 node 启动，可以自行修改
`webpack.config.js`               // webpack 开发环境配置文件
`webpack.production.config.js`    // webpack 生产环境配置文件
`webpack.dll.config.js`           // webpack dll 配置文件，里面用以打包需要用到,但是不想要打包在main.js文件中的文件，目前配置的文件包括：react, react-router, antd在项目中用到的包, 以及其他一些小包
```

### 1.1.0.0 `项目主文件夹 /app 文件`

```js
`./actions`               // 备用文件，目前没什么作用
`./api`                   // 封装的接口文件，里面包含两个文件，`Aes.js、index.js`，详细介绍在下面
`./components`            // 项目主要内容文件
`./config`                // 获取项目环境变量是 dev 或 dist，请求方式： import conf from 'Config', conf 是一个对象，里面有一个属性 appEnv 代表当前环境变量，根据此值区分本地或线上
`./styles`                // 本地样式文件
`./image`                 // 本地图片文件
`./stores`                // 备用文件，目前没什么作用
`./image`                 // 本地图片文件
`./utils`                 // 本地工具包，里面是用于本地请求的 医院数据 hostipal.js 及 环境变量配置文件 env/index.js
`index.template.html`     // 项目打包html模版文件
`index.html`              // 生产环境主页面
`index.js`                // 项目入口文件，最上面 import `babel-polyfill` 用以支持低版本浏览器兼容
```

### 1.1.1.0 `/app/api 文件`

```js
`Aes.js`        // Aes 加密方法封装 
`index.js`      // 接口封装文件
``` 

#### 1.1.1.1 `/app/api/aes.js Aes加解密文件`

```text
文件中含有一个lpAes对象，对象里面有两个函数：aesEncrypt 数据加密及aesDecrypt 数据解密
还有一个 BaseLabel 变量，用以存储加密时的 密钥，方便在解密时使用
因为在 api/index.js 中做了加密及解密的封装，一般来讲，除了修改加密参数不需要改动
还有就是，从后台获取到的加密串，如果过长的话，里面会包含 回车符号，所以解密的函数里面做了数据过滤，如果之后还有其他的过滤项，酌情修改
```

#### 1.1.1.2 `/app/api/index.js 接口封装文件` 

```js
//文件中含有6个可导出函数方法，函数统一使用 async 类型函数，用来获取 getBaseUrl 中的值。除了 lpGetUtils有 url、config 两个参数，代表请求路径，及额外的请求头，其他函数都有 url、param/data、config三个参数，分别代表接口请求地址、请求参数及额外的请求头信息。
`lpGetData`                  // get请求封装，地址栏由 baseUrl 及 url 拼接
`lpGetUtils`                 // get相对地址请求封装，地址栏只有url，用来请求相对路径下的文件，eg：utils/env/index.js
`lpPostData`                 // post请求封装，地址栏由 baseUrl 及 url 拼接，请求参数类型为 `application/json`
`lpPostUrcodeData`           // post请求封装，地址栏由 baseUrl 及 url 拼接，请求参数类型为 `x-form-urlencoded`
`lpPostSecretUrcodeD`        // 加密数据post请求封装，地址栏由 baseUrl 及 url 拼接，请求参数类型为 `x-form-urlencoded`
`parseDecryptD`              // 数据解密及json序列化方法，从后台传输过来的数据实际为json格式数据，通过解密加密串，得到json字符串，然后序列化之后得到json数据。
```

---------


