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
            grassTransY : new Animated.Value(Dimensions.get('window').height/2),
            bigDogeTrans : new Animated.ValueXY({
                x: 100,
                y: 298
            })
        }
    }

    componentDidMount() {
        Animated.timing(this.state.grassTransY, {
            toValue: 200,
            duration: 1000,
            easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
        }).start();

        Animated.timing(this.state.bigDogeTrans, {
            toValue: {
                x : Dimensions.get('window').width/2,
                y : 100
            },
            duration: 2000,
            delay: 1000
        }).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.doges, {transform: this.state.bigDogeTrans.getTranslateTransform()}]} >
                    <Image source={require('../assets/holidays_img_loading1.png')}/>
                </Animated.View>

                <Animated.View style={[styles.grass, {transform: [{translateY: this.state.grassTransY}]}]}></Animated.View>

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