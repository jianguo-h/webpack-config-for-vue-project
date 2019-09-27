# webpack-config-for-vue-project

> 为 `vue` 项目开发而搭建的一套 `webpack` 基础配置，在此配置上进行扩展，支持 ts，推荐使用 vs code 编辑器

## 目录按如下

```
├── build                                       // webpack启动，打包等配置文件
├── config                                      // 其它一些配置
├── dist                                        // 打包后的目录
├── src                                         // 源码
│   ├── api                                     // 接口管理
│   ├── components                              // 组件
│   ├── styles                                  // 全局样式
│   ├── router                                  // vue路由配置
│   ├── store                                   // vuex配置
│   ├── utils                                   // 工具函数
│   ├── types                                   // ts类型声明
│   ├── libs                                    // 打包的三方库, 如vue, vuex等
│   ├── pages                                   // 页面级组件
│   ├── static                                  // 静态资源
│   ├── App.vue                                 // 根组件文件
│   ├── index.ts                                // 入口文件
│   ├── index.html                              // 模板html文件
├── babel.config.js                             // babel配置文件
├── .eslintrc.js                                // eslint配置文件
├── postcss.config.js                           // postcss配置文件
├── tsconfig.json                               // ts编译配置文件
```

## 启动

``` bash
# 安装依赖
npm i or cnpm i
如果安装了yarn, 也可以yarn install

# 提取三方库, 该步骤执行一次即可，除非有增加或者减少三方库
npm run build-dll, 生成三方库的libs文件（如vue全家桶, element-ui， axios等）

# 开发坏境下编译
npm run dev

# 打包
npm run build
```

## 其他
项目启动后，在 vs code 编辑器下可能会出现一些检查规则上的错误，这是由于编辑器自身会去检查代码的缘故，这里可以对编辑器原有的配置进行一些修改，首先打开编辑器自身的 **setting.json** 文件，然后增加以下配置即可

``` json
{
  "eslint.validate": [
    "typescript", 
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
  "typescript.validate.enable": false,
  "javascript.validate.enable": false,
  "vetur.validation.script": false
}
```