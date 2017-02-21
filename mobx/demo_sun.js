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
    Dimensions,
    ListView,
    ScrollView,
    ART,
} from 'react-native';
var ReactART = require('ReactNativeART');
// var {
//     Group,
//     Shape,
//     Surface,
//     Transform
// } = ReactART;

const width = Dimensions.get('window').width;

export default class Demo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <AwesomeProject > </AwesomeProject>
            </ScrollView>
        )
    }
}

const gridWidth = 20;
let offset = 0;
let rowDataLength = 0;
let ds;

class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.image = null;
        ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 - r2;
            }
        });
        rowsData[0].borderWidth = 5;
        this.state = {
            cloudArr: this._getCloud(),
            circleArr: this._getCircleComp(),
            dataSource: ds.cloneWithRows(rowsData),
            followerLeft: 0,
        }
        this.animationState = {
            cloudPostionX: new Animated.Value(0),
            circle: new Animated.Value(0),
            circleY: new Animated.Value(0),
            circleOpacity: new Animated.Value(0),
            light: new Animated.Value(0),
        }
        rowDataLength = rowsData.length
        offset = rowDataLength * gridWidth - width;
    }

    componentWillMount() {
    }

    componentDidMount() {
        this._lightRollBack();
        this._circleRollBack();
        this._rollBack();

    }

    _lightRollBack() {
        this.animationState.light.setValue(0);
        Animated.timing(
            this.animationState.light,
            {
                toValue: 1,
                duration: 10000,
            }
        ).start(() => {
            this._lightRollBack();
        })
    }

    _circleRollBack() {
        this.animationState.circle.setValue(0);
        this.animationState.circleY.setValue(0);
        this.animationState.circleOpacity.setValue(0);
        Animated.sequence([
            Animated.timing(
                this.animationState.circleOpacity,
                {
                    duration: 3000,
                    toValue: 1,
                    Easing: Easing.bezier(0.15, 0.93, 0.5, 0.2),
                }
            ),
            Animated.timing(
                this.animationState.circle,
                {
                    duration: 5000,
                    toValue: 50,
                    Easing: Easing.bezier(0.15, 0.93, 0.5, 0.2),
                }
            ),
            Animated.timing(
                this.animationState.circleOpacity,
                {
                    duration: 3000,
                    toValue: 0,
                    Easing: Easing.bezier(0.15, 0.93, 0.5, 0.2),
                }
            ),
        ]).start(() => {
            this.setState({
                circleArr: this._getCircleComp()
            });
            this._circleRollBack();
        })

    }

    _rollBack() {
        this.animationState.cloudPostionX.setValue(0);
        Animated.timing(
            this.animationState.cloudPostionX,
            {
                duration: 15000,
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
                {this.getSunComp()}
                {this.getCircleComp()}
                {this.getCloudComp()}
                {this.getListView()}
                {this.getFollower()}
            </View>
        );
    }

    getListView() {
        return (
            <ListView
                style={{
                    borderWidth: 0,
                    height: 50,
                    marginTop: 550,
                }}
                contentContainerStyle={{
                    alignItems: 'flex-end',
                    height: 50,
                }}
                bounces={false}
                horizontal={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                scrollEventThrottle={1}
                onScroll={this._onScroll.bind(this)}
            ></ListView>
        );
    }

    _onScroll(param) {
        let x = param.nativeEvent.contentOffset.x;
        let left = 360 * x / 225;
        let num = Math.floor(30 * x / 225)
        num = num == 30 ? 29 : num;
        let newDataArr = this._cloneData();
        newDataArr[0].borderWidth = 0;
        newDataArr[num].borderWidth = 5;
        this.setState({
            dataSource: ds.cloneWithRows(newDataArr),
            followerLeft: left
        })
        console.log(param.nativeEvent.contentOffset, left)
    }

    _cloneData() {
        let newArr = [];
        rowsData.forEach((obj) => {
            let newObj = {};
            for (let key in obj) {
                newObj[key] = obj[key];
            }
            newArr.push(newObj);
        })

        return newArr;
    }

    _renderRow(rowData) {
        // console.log(rowData)
        return (
            <View style={[styles.rowStyle, rowData]}>

            </View>
        )
    }

    getFollower() {
        return (
            <View style={[styles.followerStyle, {left: this.state.followerLeft}]}>
                <Text>个</Text>
            </View>
        );
    }

    getSunComp() {
        return (
            <Animated.View style={[styles.lightViewStyle,{transform: [{
                    rotateZ: this.animationState.light.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                    })
            }]}]}>
                <Image style={[styles.lightStyle]} source={require('../assets/light.png')}/>
            </Animated.View>
        );
    }

    getCircleComp() {
        return (
            <Animated.View
                style={[{opacity: this.animationState.circleOpacity, position: 'absolute', left: this.animationState.circle, top: this.animationState.circle}]}>
                {this.state.circleArr}
            </Animated.View>
        );
    }

    _getCircleComp() {
        let resArr = [];
        let len = 5;
        while (len--) {
            let comp = (<View key={len} style={[styles.circleStyle, this.getCircleStyle()]}/>);
            resArr.push(comp)
        }

        return resArr;
    }


    getCircleStyle() {
        let sizeRange = [10, 50];
        let posRange = [5, 100];
        let pos = this.getRandom(posRange);
        let opacity = Math.random();
        let size = this.getRandom(sizeRange);
        let objStyle = {
            width: size,
            height: size,
            left: pos,
            top: pos,
            borderRadius: size,
            opacity: opacity > 0.6 ? 0.6 : opacity,
        }
        console.log(objStyle)
        return objStyle;
    }

    getCloudComp() {
        return (
            <Animated.View style={[{transform: [{
                    translateX: this.animationState.cloudPostionX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-400, 350],
                    }),
                }]}]}>
                {this.state.cloudArr}
            </Animated.View>
        )
    }

    _getCloud() {
        let resArr = [];
        let len = 3;
        while (len--) {
            let comp = (<Image key={len} style={[styles.imageStyle, this._getCloudStyle()]} source={this.getImage()}/>);
            resArr.push(comp)
        }

        return resArr;
    }

    getImage() {
        if (!this.image) {
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
        // flex: 1,
        height: 1000,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#73B9FF'
    },
    imageStyle: {
        position: 'absolute',
    },
    circleStyle: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: '#fff',
        position: 'absolute',
    },
    lightStyle: {
        width: 100,
        height: 100,
        opacity: 0.3,
        marginLeft: -30,
    },
    rowStyle: {
        width: gridWidth,
    },
    followerStyle: {
        position: 'absolute',
        left: 226,
        top: 600,
    },
    lightViewStyle: {
        position: 'absolute',
        left: -50,
        top: -50,
    }
});
let rowsData = [
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
    {
        height: 50,
        backgroundColor: 'green',
    },
    {
        height: 30,
        backgroundColor: 'red',
    },
    {
        height: 40,
        backgroundColor: 'blue',
    },
];