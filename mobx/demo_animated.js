/**
 * Created by lichen on 2017/2/9.
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
} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 0.8,
                friction: 1,
                tension: 10
            }
        ).start((flag) => console.log(flag));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Animated.Image
                    source={require('../assets/holidays_img_loading1.png')}
                    style={{
           width: 200,
           height: 200,
          transform: [                        // `transform`是一个有序数组（动画按顺序执行）
            {scale: this.state.bounceValue},  // 将`bounceValue`赋值给 `scale`
          ]
        }}>
                </Animated.Image>
                <ChangeSizeCmp store={storer}></ChangeSizeCmp>
            </View>
        );
    }
}

const storer = observable({
    height: 50,
    width: 50,
    flag: true,
})

storer.plus = (num) => {
     storer.height += num;
    storer.width += num;
}

storer.dec = (num) => {
    storer.height -= num;
    storer.width -= num;
}
storer.changFlag = () => {
    storer.flag = ! storer.flag;
}
class ChangeSize extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        //创建动画
        // LayoutAnimation.spring();
    }

    _onPress() {
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext({
            duration: 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity',
                springDamping: 0.1
            },
            update: {
                type: 'spring',
                springDamping: 0.1
            }
        });
        if (this.props.store.flag) {
            this.props.store.plus(100)
        } else {
            this.props.store.dec(50)
        }
        this.props.store.changFlag()
    }

    _onPressDec() {
        LayoutAnimation.spring();
        this.props.store.dec(50);
    }

    render() {
        return (
          <View style={{}}>
              <TouchableHighlight underlayColor={null} onPress={() => {this._onPress()}}>
                  <View style={{width: this.props.store.width, height: this.props.store.height, backgroundColor: '#bbb'}}>
                      <Text >Press me!</Text>
                  </View>
              </TouchableHighlight>
              {!this.props.store.flag ? (<View style={{width: this.props.store.width, height: this.props.store.height, backgroundColor: '#bbb'}}>
                  <Text >New One!</Text>
              </View>) : null}
          </View>
        );
    }

}

const ChangeSizeCmp = observer(ChangeSize);


