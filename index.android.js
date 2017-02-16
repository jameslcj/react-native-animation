/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect,Provider} from 'react-redux';
import {plus, deduct, add, dec} from './redux/action';
import {getStore} from './redux/configureStore';

const store=getStore();

class ReduxDemo02 extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Counter1 />
                    <Counter1 />
                    <Counter2 />
                    <Counter3 />
                    <Counter4 />
                    <Counter5 />
                </View>
            </Provider>
        );
    }
}

class __Counter1 extends Component {



    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, marginRight: 20 }}>计数器：{this.props.calculate.c}</Text>
                <Text style={{ fontSize: 20 }} onPress={this.addCounter.bind(this) }>点击我</Text>
            </View>
        );
    }

    addCounter() {
        //生成一个action 分发
        this.props.dispatch(plus(1));

    }
}

class __Counter2 extends Component {



    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, marginRight: 20 }}>计数器：{this.props.calculate.c}</Text>
                <Text style={{ fontSize: 20 }} onPress={this.addCounter.bind(this) }>点击我</Text>
            </View>
        );
    }

    addCounter() {
        //生成一个action 分发
        this.props.dispatch(plus(1));
    }
}

class __Counter3 extends Component {



    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, marginRight: 20 }}>计数器：{this.props.calculate.c}</Text>
                <Text style={{ fontSize: 20 }} onPress={this.addCounter.bind(this) }>点击我</Text>
            </View>
        );
    }

    addCounter() {
        //生成一个action 分发
        this.props.dispatch(deduct(1));
    }
}


class __Counter4 extends Component {



    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, marginRight: 20 }}>计数器：{this.props.res.num}</Text>
                <Text style={{ fontSize: 20, marginRight: 20 }} onPress={() => {
                    this.props.dispatch({type: 'ADD_ACTION', num: 2})
                }}>点我</Text>

            </View>
        );
    }
}

class __Counter5 extends Component {



    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, marginRight: 20 }}>计数器：{this.props.res2.num}</Text>
                <Text style={{ fontSize: 20, marginRight: 20 }} onPress={() => {
                    this.props.dispatch(dec(5))
                }}>点我</Text>

            </View>
        );
    }
}

//store (all)  结构
/*store={
 calculate:{c:13},
 navigator:{id: name: ..}
 ...
 }*/

//mapStateToProps(store)可以拿到自己关心的数据

//配置map映射表
const mapStateToProps=state=>{
    return {
        //state.XXX 必须与reducer同名
        calculate:state.calculate
    }
}

const mapState2Props2 = (state) => {
    return {
        res: state.myReducer,
        res2: state.myReducer2,
    }
}

let Counter1 = connect(mapStateToProps)(__Counter1);
let Counter2 = connect(mapStateToProps)(__Counter2);
let Counter3 = connect(mapStateToProps)(__Counter3);
let Counter4 = connect(mapState2Props2)(__Counter4);
let Counter5 = connect(mapState2Props2)(__Counter5);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('animation', () => ReduxDemo02);
