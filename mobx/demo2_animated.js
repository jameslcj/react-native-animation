/**
 * Created by lichen on 2017/2/10.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Animated,
    Image,
    LayoutAnimation,
    Easing,
    TouchableOpacity,
    PanResponder,
    Dimensions
} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

const {width, height} = require('Dimensions').get('window');

export default class Demo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<Ani store={storer} > </Ani>)
    }
}

const storer = observable({
    opacityAnmValue: new Animated.Value(0),
});

let _animateHandler;
let _animateHandler2;

class Ani extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacityAnmValue: new Animated.Value(0),
            zoom: new Animated.Value(0),
            transY: new Animated.Value(0),
            transXY: new Animated.ValueXY({
                x: 150,
                y: 598,
            })
        }
        this.val = 0;
        this.isFirst = 1;
        this._panResponder = {};
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._returnTrue.bind(this),
            onMoveShouldSetPanResponder: this._returnTrue.bind(this),
            //手势开始处理
            //手势移动时的处理
            onPanResponderMove: Animated.event([null, {
                dy : this.state.transY
            }])
        });
    }

    _returnTrue(e, gestureState) {
        return true;
    }

    componentDidMount() {
            _animateHandler = Animated.timing(this.state.opacityAnmValue, {
                toValue: this.val,  //透明度动画最终值
                duration: 10000,   //动画时长3000毫秒
                easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)  //缓动函数
            })
            this.state.zoom.setValue(1.5)
            _animateHandler2 = Animated.spring(
                this.state.zoom,
                {
                    toValue: this.val,
                    friction: 8,
                    tension: 42,
                }
            );
    }

    _onPress() {
        if (this.isFirst) {
            this.val = this.val ? 0 : 1;
            // this.isFirst = 0;
            // _animateHandler.start && _animateHandler.start((obj) => {
            //     // alert(obj.finished)
            // })

            // Animated.timing(this.state.opacityAnmValue, {
            //     toValue: this.val,  //透明度动画最终值
            //     duration: 3000,   //动画时长3000毫秒
            //     easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)  //缓动函数
            // }).start();
            // this.state.zoom.setValue(1.5)
            // Animated.spring(
            //     this.state.zoom,
            //     {
            //         toValue: this.val,
            //         friction: 8,
            //         tension: 42,
            //     }
            // ).start()
            this.state.zoom.setValue(1.5)
            Animated.parallel([
                Animated.timing(this.state.opacityAnmValue, {
                    toValue: this.val,  //透明度动画最终值
                    duration: 3000,   //动画时长3000毫秒
                    easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)  //缓动函数
                }),
                Animated.spring(
                    this.state.zoom,
                    {
                        toValue: this.val,
                        friction: 8,
                        tension: 42,
                    }
                )
            ]).start();
        } else {
            this.state.opacityAnmValue.stopAnimation((value) => {
                alert(JSON.stringify(value))
            })
        }

    }

    _onPress2Fade() {
        // Animated.timing(
        //     this.state.opacityAnmValue,
        //     {
        //         toValue: 0,
        //         duration: 3000,
        //         easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
        //     }
        // ).start()
        // _animateHandler.stop();
    }

    render() {
        return ( <View style={styles.container}>
            <Animated.View ref="view" style={[styles.content, {width: 200, height: 20, transform: [{
                scale: this.state.zoom,
                translateY : this.state.transY
            }],opacity: this.state.opacityAnmValue}]}>
                <Text style={[{textAlign: 'center'}]}>Hi, here is VaJoy</Text>
            </Animated.View>
            <TouchableOpacity onPress={() => this._onPress()}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Press me!</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPress2Fade}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>忽略本按钮</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }
}

// const AniComp = observer(Ani);

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
