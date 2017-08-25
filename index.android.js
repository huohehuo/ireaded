/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Welcome from './app/ui/Welcome';
import MainScreen from './app/ui/MainScreen';
import MySetting from './app/ui/MySetting';
import MLogin from './app/ui/MLogin';
import MModal from './app/ui/MyModal';


import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';

const ireaded = StackNavigator({
        SpView: {screen: Welcome},//1
        MLog: {screen: MLogin},//2
        MMain: {screen: MainScreen},//3
        MSet: {screen: MySetting},
        MMdl: {screen: MModal},

        // Home: { screen: Tabs },
        // HomeTwo: {
        //     screen: HomeTwo,  // 必须, 其他都是非必须
        //     path:'app/homeTwo', 使用url导航时用到, 如 web app 和 Deep Linking
        //     navigationOptions: {}  // 此处设置了, 会覆盖组件内的`static navigationOptions`设置. 具体参数详见下文
        // },
        // HomeThree: { screen: HomeThree },
        // HomeFour: { screen: HomeFour }
    }


// , {
//     initialRouteName: 'Main', // 默认显示界面
//     navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
//         header: {  // 导航栏相关设置项
//             backTitle: '返回',  // 左上角返回键文字
//             style: {
//                 backgroundColor: '#fff'
//             },
//             titleStyle: {
//                 color: 'green'
//             }
//         },
//         cardStack: {
//             gesturesEnabled: true
//         }
//     },
//     mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
//     headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
//     // onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
//     // onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
//
// }
);


export default class ireadeda extends Component {


    render() {
        return (


            <Text>
                this is navigation
            </Text>

            /*            // let pic ={
                        // 	uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
                        // };
                        // return	 (<Image source = {pic} style={{width:193, height:110}}/>)
                        //
                        //
                        // <View style={styles.container}>
                        //     <Text style={styles.welcome}>
                        //         Welcome to React Native!{'\n'}
                        //         Just Write code there!!!ha?!````````
                        //     </Text>
                        //     <Text style={styles.instructions}>
                        //         Lins To get started, edit index.android.js
                        //     </Text>
                        //     <Text style={styles.instructions}>
                        //         Double tap R on your keyboard to reload,{'\n'}
                        //         Shake or press menu button for dev menu
                        //     </Text>
                        // </View>
                        //
                        // <View>
                        //     <Blink text='Ilove to bink'/>
                        //     <Blink text='yes me too '/>
                        //     <Blink text='wow!~ lets go to look look'/>
                        // </View>
                        //
                        // <View style={styles.welcome}>
                        // <Greeting name='Rexxar' />
                        //   <Greeting name='Jaina' />
                        //   <Greeting name='Valeera' />
                        // </View>
                        //
                        //
                        // <View style={styles.container}>
                        //     <Text style={styles.mys}>
                        //         I just do this.
                        //     </Text>
                        //     <Text style={[styles.mys,styles.red]}>
                        //         I just do this,How about you?
                        //     </Text>
                        //     <Text style={{width:100,height:80,backgroundColor:'skyblue'}}>
                        //         I just do this,How about you?
                        //     </Text>
                        //
                        //
                        //     <View style={{
                        //         flex:1,
                        //         flexDirection:'column',
                        //         jsutityContent:'center',
                        //         alignItems:'center',
                        //     }}>
                        //         <View style={{width: 50, height: 50,backgroundColor:'powderblue'}}>
                        //
                        //         </View>
                        //         <View style={{width: 50, height: 50,backgroundColor:'skyblue'}}>
                        //
                        //         </View>
                        //         <View style={{width: 50, height: 50,backgroundColor:'steelblue'}}>
                        //
                        //         </View>
                        //
                        //     </View>
                        // </View>
                        //
                        // <View style={{padding: 10}}>
                        //     <TextInput
                        //         style={{height: 40}}
                        //         placeholder="Type here to translate!"
                        //         onChangeText={(text) => this.setState({text})}
                        //     />
                        //     <Text style={{padding: 10, fontSize: 42}}>
                        //         {this.state.text.split(' ').map((word) => word && '&&').join('')}
                        //     </Text>
                        // </View>
                        //
                        // <ScrollView>
                        //     <Text style={{fontSize:56}}>Scroll me plz</Text>
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Text style={{fontSize:56}}>If you like</Text>
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Image style={{width:100,height:100,}} source={require('./fimg/favicon.png')} />
                        //     <Text style={{fontSize:56}}>Scrolling down</Text>
                        // </ScrollView>
                        //
                        //
                        // <View style={styles.container}>
                        //     <FlatList
                        //         data={[
                        //             {key:'alis'},
                        //             {key:'mike'},
                        //             {key:'cows'},
                        //             {key:'dog'},
                        //             {key:'cat'},
                        //             {key:'cats'},
                        //             {key:'catz'},
                        //             {key:'catb'},
                        //             {key:'catx'},
                        //             {key:'catc'},
                        //             {key:'catb'},
                        //             {key:'catq'},
                        //             {key:'catw'},
                        //             {key:'cate'},
                        //             {key:'catr'},
                        //             {key:'catt'},
                        //             {key:'caty'},
                        //             {key:'catu'},
                        //             {key:'cati'},
                        //             {key:'catj'},
                        //             {key:'catm'},
                        //         ]}
                        //         renderItem={({item}) =>
                        //             <Text style={styles.item}>{item.key}</Text>
                        //         }
                        //     />
                        //
                        // </View>*/

        );
    }


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
        fontSize: 30,
        textAlign: 'center',
        color: '#F5FCFF',
        marginTop: 435,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
});

AppRegistry.registerComponent('ireaded', () => ireaded);
