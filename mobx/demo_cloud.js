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
        this.image = null;
        this.state = {
            cloudPostionX: new Animated.Value(0),
            cloudArr: this._getCloud(),
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        // Animated.parallel(

        // ).start()

        this._rollBack();
    }

    _rollBack() {
        this.state.cloudPostionX.setValue(0);
        Animated.timing(
            this.state.cloudPostionX,
            {
                duration: 5000,
                toValue: 1,
                Easing: Easing.bezier(0.15, 0.93, 0.5, 0.2),
            }
        ).start(() => {
            this.setState({
                cloudArr: this._getCloud(),
            })
            this._rollBack();
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[{transform: [{
                    translateX: this.state.cloudPostionX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-350, 350],
                    }),
                }]}]}>
                    {this.state.cloudArr}
                </Animated.View>
            </View>
        );
    }

    _getCloud() {
        let resArr = [];
        let len = 3;
        while( len --) {
            let comp = (<Image key={len} style={[styles.imageStyle, this._getCloudStyle()]} source={this.getImage()} />);
            resArr.push(comp)
        }

        return resArr;
    }

    getImage() {
        if (! this.image) {
            this.image = require('../assets/cloud.png');
        }

        return this.image;
    }

    _getCloudStyle() {
        const widthRange = [300, 350];
        const heightRange = [150, 280];
        const leftRange = [20, 100];
        const topRange = [200, 330];
        let height = this.getRandom(heightRange);
        let styleObj = {
            height: height,
            width: height * 1.4,
            left: this.getRandom(leftRange),
            top: this.getRandom(topRange),
        }
        console.log(styleObj)

        return styleObj;
    }

    getRandom(range) {
        return (Math.ceil(Math.random() * (range[1] - range[0])) + range[0]);
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#73B9FF'
    },
    imageStyle: {
        position: 'absolute',
    }
});