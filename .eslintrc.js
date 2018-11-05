module.exports = {
  "extends": ["eslint:recommended"], //eslint推荐配置
  "rules": {
    "no-console": "off", //允许console
    "no-unused-vars": "off" //允许有声明后未被使用的变量或参数 
  }, //自定义规则进行覆盖原有规则
  "parser": "babel-eslint", //解析器
  "parserOptions": {
    "ecmaVersion": 6, //ecmascript版本
    "sourceType": "script"
  },
  "globals": {
    "window": true
  }, //全局变量的设置
  "env": {
    "node": true,
    "es6": true,
    "mocha": true //测试框架
  } //环境
};