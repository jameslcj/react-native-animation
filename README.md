# ReactNative 小动画
## demo演示
![image](https://raw.githubusercontent.com/jameslcj/react-native-animation/master/demo.gif)
![image](https://raw.githubusercontent.com/jameslcj/react-native-animation/master/demo2.gif)
## 项目解释
- 最近在学习RN的动画, redux, mobx, 随便写了几个demo
- 主要是按照某天气app做的几个天气变化动画(因为没有素材, 所以样式比较丑= = )
- 此项目主要拿来随性写些demo, 所以比较乱, 不好意思哈
- 雪景暂时使用的是canvas, 用webview引入, 性能较差, 还在想其他方法优化中

## 绘图库安装
- npm安装art库
```
npm i art --save

```
- 并且需要在项目中添加依赖：

    1. 右键点击项目 -> ‘Add Files to ProjectName -> 选择 node_modules/react-native/Libraries/ART/ART.xcodeproj’
    2. 将 libART.a 添加到 Linked Binary and Libraries

- [绘图学习引用: React Native 浅入门 —— 绘图篇 - leowang721](http://leowang721.github.io/2015/08/24/learning/react-native/drawing/)

## 代码
- [天气变化动画源代码](https://github.com/jameslcj/ReactNative_animation/blob/master/mobx/demo_sun.js)
