/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import mycss from '../css/styles'
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
    DeviceEventEmitter,
    View,
    AsyncStorage,
    ListView
} from 'react-native';
import {Animated} from 'react-native';
import Animation from 'lottie-react-native';
// import mytoast from '../fandroid/mytoast'
import MABtna from '../fandroid/MABtn'
import AWave from '../fandroid/AWave'
import AImg from '../fandroid/AImg'
import AText from '../fandroid/AText'
const MMT =require('../fandroid/AText');
export default class MLogin extends Component {
    constructor(props) {
        super(props);
        mLogin = this;
        this.state = {
            lname: '',
            pwd: '',
        };


    }

    // static navigationOptions = {
    //     title: '登录',
    // };
    static navigationOptions = ({navigation}) => ({
        // title: `Chat with ${navigation.state.params.name}`,
        title: `Login `,
        headerTitleStyle: {color: '#aa3612', alignSelf: 'center'},
        headerStyle: {
            backgroundColor: '#11aa8e'
        },
        // headerLeft:
        //     <TouchableOpacity
        //         style={{width:40,height:40}}
        //         onPress={
        //             ()=>{
        //                 navigation.goBack()
        //             }
        //         }>
        // <Image source={require('../ireaded/img/wenhao.png')}/>
        //     </TouchableOpacity>,
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
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>

                <TextInput
                    style={mycss.mlog_input_name}
                    placeholder="Type here to translate!"
                    // value="工号9627"
                    onChangeText={(text) => this.setState({lname: text})}
                />
                <TextInput
                    style={mycss.mlog_input_pwd}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({pwd: text})}
                />
                {/*<Text style={{padding: 10, fontSize: 42}}>*/}
                {/*{this.state.text.split(' ').map((word) => '🍕').join(' ')}*/}
                {/*</Text>*/}

                <View style={{height: 50, margin: 20}}>

                    <Button
                        title="Sigin in"
                        onPress={() => {
                            // mytoast.show('登录中',mytoast.SHORT);
                            if (this.state.lname !== null && this.state.lname !== '') {
                                let keys = [['name', this.state.lname], ['pwd', this.state.pwd]];
                                // AsyncStorage.multiSet(keys,function (errs) {
                                //     if (errs){
                                //         console.log("save----error");
                                //         return;
                                //     }else{
                                //         console.log("save ---yes");
                                //     }
                                // });
                                AsyncStorage.setItem('name', this.state.lname);
                                AsyncStorage.setItem('pwd', this.state.pwd);
                            }

                            navigate('MMain', {name: this.state.lname + ' pwd:' + this.state.pwd})
                        }
                        }
                    />
                </View>

                <View style={{height: 250, marginTop: 20}}>
                    <Button
                        title="Clear Data"
                        onPress={() => {
                            // Animated.timing(this.state.progress, {
                            //     toValue: 1,
                            //     duration: 5000,
                            // }).start();
                            this.clear();
                            // this.animation.play();

                        }
                        }
                    />
                    <View style={{height: 300, marginTop: 10,backgroundColor:'#aaaaaa'}}>
                    {/*<MABtna*/}
                        {/*src={100}*/}
                    {/*/>*/}
                        {/*<AWave*/}
                            {/*src={20}*/}
                        {/*/>*/}
                        <AImg
                            src={200}
                        />

                        <AText
                            src={"啊哈哈哈哈哈哈哈"}
                            textSize={25}
                        />
                        <MMT
                            style={{height:20,width:220}}
                            src={"啊哈哈哈哈哈哈哈"}
                            textSize={25}
                        />
                    </View>
                </View>



            </View>


        );

    }


    componentDidMount() {
        const { navigate } = this.props.navigation;
        this.timer = setTimeout(
            () => {
                // navigate('MMain', { name: 'Jane' });
                },
            1000
        );

    }


    componentWillMount() {
        // let keys = ["name", "pwd"];
        // AsyncStorage.multiGet(keys, function (errs, result) {
        //     if (errs) {
        //         console.log("get data error");
        //         return;
        //     } else {
        //         console.log("get data succeed");
        //         btnss.setState({
        //             getName: (result[0][1] != null) ? result[0][1] : '',
        //             getPwd: (result[1][1] != null) ? result[1][1] : '',
        //         })
        //         // 发送通知
        //         DeviceEventEmitter.emit('isHiddenTabBar', true);
        //     }
        // });
        // 发送通知
        // DeviceEventEmitter.emit('isHiddenTabBar', false);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);

        // 发送通知
        // DeviceEventEmitter.emit('isHiddenTabBar', true);
    }

    // 返回每一行cell的样式
    gotoSetting() {
        const {navigate} = this.props.navigation;
        return (
            navigate('MSet')
        );
    }

    //清除数据
    clear() {
        // var _that = this;
        AsyncStorage.clear(function (err) {
            if (!err) {
                // _that.setState({
                //     lname: "",
                //     pwd: ""
                // });
                alert('存储的数据已清除完毕!');
            }
        });
    }
}

