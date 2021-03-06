/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import OneTab from './OneTab';
import TwoTab from './TwoTab';
import React, {Component} from 'react';
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
    TouchableOpacity,
    View,
    Alert,
    DeviceEventEmitter,
    TouchableWithoutFeedback,
    AsyncStorage,
    ListView
} from 'react-native';
import {
    TabNavigator
} from 'react-navigation';

import Test from '../ui/Test'

const MainScreen = TabNavigator({
    One: {screen: OneTab},
    Two: {screen: TwoTab},
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63',//tab标题颜色
        style: {
            backgroundColor: '#002240'
        }
    },
});


export default class MainScreens extends Component {
    constructor(props) {

        super(props);
        thisview = this;
        this.state = {
            isHiddenTabBar: false,   // 是否隐藏tabbar
            getName: '',
            getPwd:'',
        };

    }

    // static navigationOptions = {
    //     title: '主页',
    // };

    //从登录页面进入时，用这里
    // static navigationOptions = ({navigation}) => ({
    // title: `Chat with ${navigation.state.params.name}`,
    // title: `Chat with `,

    // });
    static navigationOptions = ({navigation}) => ({
        title: `Chat with ${navigation.state.params.name}`,
        // title: `主页 `,
        headerTitleStyle: {color: '#aa3612', alignSelf: 'center'},
        headerStyle: {
            backgroundColor: '#11aa8e'
        },
        headerLeft:
            <TouchableOpacity
                style={{width: 40, height: 40}}
                onPress={
                    () => {
                        navigation.goBack()
                    }
                }>
                <Image source={require('../img/wenhao.png')}/>
            </TouchableOpacity>,
        headerRight:
            <TouchableOpacity
                style={{width: 40, height: 40}}
                onPress={
                    () => {
                        mLogin.gotoSetting()
                    }
                }>
                <Image source={require('../img/wenhao.png')}/>
            </TouchableOpacity>,

    });

    render() {
        // const {navigate} = this.props.navigation;
        // this.setState.getName=this.navigationOptions.navigation.state.params.name;
        return (
            <View style={{flex: 1}}>
                <TouchableWithoutFeedback

                >
                    <View>
                <Button
                    title="TESt this button "
                    onPress={() => {
                            // 发送通知
//                         DeviceEventEmitter.emit('isHiddenTabBar', false);
                        if (thisview.state.isHiddenTabBar) {
                            alert(this.state.getName+"对了")
                            // this.clear();
                        } else {
                            alert("没错了")
                        }
                        // navigate('MSet', { name: 'Jane' })
                        // Alert.alert(
                        //     'Alert Title',
                        //     'My Alert Msg',
                        //     [
                        //         {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        //         {text: 'OK', onPress: () => console.log('OK Pressed')},
                        //     ],
                        //     {cancelable: false}
                        // )
                    }}
                    onLongPress={()=>{
                        this.clear();
                    }}
                />
                    </View>
                </TouchableWithoutFeedback>

                <Text style={thisview.state.isHiddenTabBar  ? {backgroundColor: '#f2eef0'} : {
                    height: 0,
                    overflow: 'hidden',
                    backgroundColor: '#11aa22'
                }}>欢迎。。。。{this.state.getName}</Text>
                <MainScreen/>
            </View>
        );
    }
//清除数据
    clear() {
        var _that = this;
        AsyncStorage.clear(function(err){
            if(!err){
                _that.setState({
                    getName: "",
                    getPwd: ""
                });
                alert('存储的数据已清除完毕!');
            }
        });
    }
    componentDidMount() {
        let keys = ["name", "pwd"];
        AsyncStorage.multiGet(keys, function (errs, result) {
            if (errs) {
                console.log("get data error");
                return;
            } else {
                console.log("get data succeed");
                thisview.setState({
                    getName: (result[0][1] != null) ? result[0][1] : '',
                    getPwd: (result[1][1] != null) ? result[1][1] : '',
                })
                // 发送通知
                DeviceEventEmitter.emit('isHiddenTabBar', true);
            }
        });

    }

    componentWillMount() {
        // alert("dddddd")
        // 注册通知
        this.subscription = DeviceEventEmitter.addListener('isHiddenTabBar', (data) => {
            this.tongZhi(data)
        });
    }

    tongZhi(data) {
        // const {navigate} = this.props.navigation;
        // navigate("MSet")
        this.setState({
            isHiddenTabBar: data
        });
        if (data) {
            console.log("data == true"+this.state.getName);
            if(this.state.getName !==''){
                alert("欢迎" + this.state.getName + "来到IReaded")
            }else{
                console.log("data == false");
            }
        } else {
            alert("通知出错了")
        }
    }

    componentWillUnmount() {
        // 销毁
        this.subscription.remove();
    }


    //   static navigationOptions = {
    //       headerMode:'float',
    //       header:()=>{
    //           title:'主页'
    //       }
    //   };
    //   constructor(props){
    //   super(props);
    //   const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
    //   this.state={
    //       source: dataSource.cloneWithRows(['a','b'])
    //   };
    // }
    //   render() {
    //       const { navigate } = this.props.navigation;
    //       return (
    //           //
    //           //
    //           // <ScrollView>
    //           // <View>
    //           //     <View>
    //           //         <Text style={{height:200,backgroundColor:'white'}}>hahaha what is this aaaaa....{this.state.source.msg}</Text>
    //           //     </View>
    //           //        <TouchableHighlight
    //       		// 		onPress={() => globalFunction("输入")}
    //       		// 		underlayColor = '#ddd'
    //       		// 		style = {styles.container}
    //       		// 	>
    //       		// 		<Text style={styles.welcome}>{mainText}</Text>
    //     		// 		</TouchableHighlight>
    //           //     <Button
    //           //     title="TESt this button"
    //           //     onPress={() =>
    //           //         navigate('Profile', { name: 'Jane' })
    //           //     }
    //           //     />
    //           //
    //           // <Image source={require('./fimg/favicon.png')} style={{height:200,width:300}}/>
    //           //     <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
    //           //            style={{width: 400, height: 400}} />
    //           // <Button
    //           //     title="Go to Jane's profile wakaka"
    //           //     onPress={() =>
    //           //         navigate('Profile', { name: 'Jane' })
    //           //     }
    //           // />
    //           //
    //           //
    //           //
    //           //
    //           // </View>
    //           // </ScrollView>
    //           //
    //
    //           <ListView
    //       dataSource={this.state.source}
    //       renderRow={(rowData) => <Text>{rowData}</Text>}
    //   />
    //       );
    //   }
    //
    //   //组件渲染完毕时调用此方法
    // componentDidMount(){
    //  //get方法，只填写url参数
    //   fetch(jsonurl)
    //      //上面一行会返回响应对象，即response
    //     .then((response)=>response.json())
    //     //response.json()将返回一个json类型对象
    //     .then((json)=>{
    //     	console.log(json);
    //       this.setState({source:json.newslist});
    //     //注意我们在Promise调用链的最后调用了done() —— 这样可以抛出异常而不是简单忽略。
    //     })
    //     .catch((errir)=>{
    //     	console.log("出错了");
    //       	// alert('连接错误了');
    //
    //     })
    //     .done();
    // }
}

/*输出log*/
function globalFunction(input) {
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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
    pichead: {
        height: 100,
        width: 100,
        color: 'red',
    },
});


