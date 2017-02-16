/**
 * Created by lichen on 2017/2/13.
 */
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
        return (<AwesomeProject  > </AwesomeProject>)
    }
}

class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //注意这里初始化value都为0
            grassTransY : new Animated.Value(0),
            bigDogeTransY : new Animated.Value(0),
            rollZ: new Animated.Value(0),
        }
    }

    componentDidMount() {
        var timing = Animated.timing;
        Animated.parallel(['grassTransY', 'bigDogeTransY'].map((prop, i) => {
            var _conf = {
                toValue: 1,    //注意这里设置最终value都为1
                duration: 1000 + i * 1000
            };
            i || (_conf.easing = Easing.bezier(0.15, 0.73, 0.37, 1.2));

            return timing(this.state[prop], _conf)
        })).start(() => {
            this._roll();
        });
    }

    _roll() {
        this.state.rollZ.setValue(0);
        Animated.timing(
            this.state.rollZ,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start(() => {
            this._roll();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.doges, {transform: [{
                        translateX: Dimensions.get('window').width/2 - 139
                    },
                    {
                        translateY: this.state.bigDogeTransY.interpolate({
                            inputRange: [0, 1],  //动画value输入范围
                            outputRange: [298, -200]  //对应的输出范围
                    })
                },
                {
                    rotateZ: this.state.rollZ.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                    })
                }
                ]}]}>
                    <Image source={require('../assets/holidays_img_loading1.png')}/>
                </Animated.View>

                <Animated.View style={[styles.grass, {transform: [{
                    translateY: this.state.grassTransY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [Dimensions.get('window').height/2, 200]
                    })
                }]}]}></Animated.View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    grass: {
        position: 'absolute',
        width:  Dimensions.get('window').width,
        backgroundColor: '#A3D900',
        height: 240
    },
    doges: {
        position: 'absolute'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73B9FF'
    }
});