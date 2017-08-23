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
    ListView
} from 'react-native';


export default class MLogin extends Component {
    constructor(props) {
        super(props);
        mviod=this;
        this.state = {
            lname: '',
            pwd: '',
            // isHiddenTabBar:false,   // 是否隐藏tabbar
        };
    }
    // static navigationOptions = {
    //     title: '登录',
    // };
    static navigationOptions = ({navigation}) => ({
        // title: `Chat with ${navigation.state.params.name}`,
        title: `Login `,
        headerTitleStyle:{color:'#aa3612',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'#11aa8e'
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
                style={{width:40,height:40}}
                onPress={
                    ()=>{
                        mviod.gotoSetting()
                    }
                }>
                <Image source={require('../img/wenhao.png')}/>
            </TouchableOpacity>,

    });



    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TextInput
                    style={mycss.mlog_input_name}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({lname:text})}
                />
                <TextInput
                    style={mycss.mlog_input_pwd}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({pwd:text})}
                />
                {/*<Text style={{padding: 10, fontSize: 42}}>*/}
                    {/*{this.state.text.split(' ').map((word) => '🍕').join(' ')}*/}
                {/*</Text>*/}
                <Button
                    title="Sigin in"
                    onPress={() =>
                        navigate('MMain', { name: this.state.lname+' pwd:'+this.state.pwd })
                    }
                />


            </View>


        );

    }


    componentWillMount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }

    componentWillUnmount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', true);
    }

    // 返回每一行cell的样式
    gotoSetting() {
        const { navigate } = this.props.navigation;
        return(
            navigate('MSet')
        );
    }

}

