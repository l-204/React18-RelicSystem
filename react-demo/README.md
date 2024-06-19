# 启动项目

该项目使用 create-react-app 搭建 [Create React App](https://github.com/facebook/create-react-app).

## 启动前须知

注意，这里使用的是 npm 指令，意味着你的本地环境需要安装 Node.js 和 npm 包管理工具，如果你还未安装相关环境，请先进行安装[Node.js](https://nodejs.cn/)，并在安装完成后输入`node -V`检查是否安装成功。

安装 Node.js 后，在该目录中打开终端，通过`npm install npm`安装 npm 包管理工具，并进行下一步操作。

## 启动前端项目

进入 react-demo 目录，并在该目录下打开终端（推荐在VSCode打开），并输入以下指令

### `npm install`

安装项目所需依赖，必须执行该指令。

### `npm start`

进入开发环境，这是启动项目的主要方式，必须执行该指令。

执行后将自动打开浏览器并跳转至[前台主页](http://localhost:3000/)。
当用户点击登录并成功登录后，将自动跳转至[后台主页](http://localhost:3000/home)。

**注意：该项目目前并未设置身份验证和路由守卫，因此所有用户都可以在前后台之间自由跳转。**

到这里你已经成功启动了前端项目，如果你有其他需求，也可以尝试后续指令，如果没有，请直接忽略它们。

### `npm test`

进入测试环境，这是启动项目的另一种方式，可以忽略

### `npm run build`

对项目进行打包，用于上传至 GitHub 或者云服务器中，方便文件传输，可以忽略。

### `npm run eject`

暴露 WebPack 配置，用于修改 WebPack 配置文件

**注意: 这是一次性操作. 一旦你使用该指令 `eject`, 你将无法撤销!**