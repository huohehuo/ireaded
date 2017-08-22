/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    Image,
    TextInput,
    ScrollView,
    FlatList,
    TouchableHighlight,
    ImageBackground,

    View,
    ListView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
var mainText = "来自Leo的博客"
var jsonurl="http://api.tianapi.com/wxnew/?key=e389820925ea6e0ca99cc0ea58863e1f&num=3"

const restAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Profile'})
    ]
});



export default class Welcome extends Component {
    static navigationOptions = {
        header:null,
        // header:(navigation,defaultHeader)=>({
        //     // ...defaultHeader,//默认预设
        //     visibility:true,//覆盖预设中的此项
        // }),
        cardStack: {
            gesturesEnabled: true  // 是否可以右滑返回
        }
    };
    render() {
        // const splashImg = require('../fimg/splash.png');
        return (
            <ImageBackground style={{height: maxHeight, width: maxWidth}}
                             source={require('../ireaded/img/splash.png')}
                             resizeMode='cover'>
                <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',alignItems:'center'}}>
                <Text style={styles.weltxt}> 欢迎来到IREADED </Text>
                    <Image
                        source={require('../ireaded/img/wenhao.png')}
                        style={{height:80,width:80,justifyContent:'center'}}
                    />
                </View>
            </ImageBackground>
        );
    }


    componentDidMount() {
        const { navigate } = this.props.navigation;
        this.timer = setTimeout(
            () => {
                // navigate('Profile', { name: 'Jane' });
                this.props.navigation.dispatch(restAction)},
            1000
        );
    }
    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

}
 
 /*输出log*/
function globalFunction(input){
    console.log(input);
}
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
    weltxt: {
        fontSize: 30,
        textAlign: 'center',
        color: '#f2eef0',
        marginTop: 400,
    },

    mys: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
        item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    pichead:{
        height:100,
        width:100,
        color:'red',
    },
});


