# Vue Pure Cron

[![npm](https://img.shields.io/npm/v/vue-pure-cron.svg)](https://www.npmjs.com/package/vue-pure-cron)

## 简介
Vue pure cron是一个用于生成常用cron表达式的vue组件，只要是使用vue开发的项目就可以轻松使用。

## 通过npm安装
```
npm install vue-pure-cron --save
```

## 使用
```
import Vue from 'vue';
import PureCron from 'vue-pure-cron';

Vue.use(PureCron);
```

## 最近更新
- 支持多语言：英语和简体中文

## 属性
| 属性名 | 描述 | 类型 | 默认 | 注意
|-|-|-|-|-|
|width|组件的宽度|string, number|`'100%'`|组件有一个420px的最小宽度|
|showOperationPanel|是否展示操作面板|boolean|`true`|-|
|defaultLang|Vue Pure Cron组件的默认语言|string|`en`|-|
|showLangSwitch|是否展示语言切换按钮|boolean|`true`|-|

## 事件
| 事件名 | 描述 | 参数 | 注意
|-|-|-|-|
|generate|点击确定按钮时触发|组件当前生产的表达式|只有当`showOperationPanel`属性是`true`时，确定按钮才会显示|
