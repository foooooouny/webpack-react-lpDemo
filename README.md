# webpack-react-lpDemo
webpack-react 底层环境框架

## 项目概述

  > 项目使用 `webpack` 构建。使用 `React + React-Router + antd + less` 作为主要开发技术，开发中使用到的工具有 webpack babel eslint，其他组件或工具后续开发过程中根据实际情况再添加。


-----------

## Installation

**1. clone the project**

```sh
git clone http://192.168.0.253/DEV/web.git jylp-app
cd jylp-app
```

**2. Install the dependencies**

```sh
npm install
```

## Development Workflow

**4. start a deveplpment server**

```sh
npm start               // 启动本地服务，端口：8080
```

**5. Generate a production build in `./public`:**

```sh
npm run build:dll             // 打包 dll 文件，只需要在初次打包时执行一次，成功之后才可以执行 npm run build

npm run copy:utils            // 复制 /app/utils 文件到 /public/utils,成功之后，找到 /public/utils/env/index.js，将 pathValue 改为当前环境值
 
npm run build                 // 打包项目文件，第一次打包的时候，必须要先执行 npm run build:dll
```
