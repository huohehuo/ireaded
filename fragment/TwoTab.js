/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    Image,
    TextInput,
    ScrollView,
    FlatList,
    ListView,
    View
} from 'react-native';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
var mainText = "来自Leo的博客"
var jsonurl = "http://api.tianapi.com/wxnew/?key=e389820925ea6e0ca99cc0ea58863e1f&num=3"
export default class TwoTab extends Component {

    static navigationOptions = {
        title: '列表',

    };

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: dataSource.cloneWithRows(['星期一：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：'])
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            //
            //
            // <ScrollView>
            // <View>
            //     <View>
            //         <Text style={{height:200,backgroundColor:'white'}}>hahaha what is this aaaaa....{this.state.source.msg}</Text>
            //     </View>
            //        <TouchableHighlight
            // 		onPress={() => globalFunction("输入")}
            // 		underlayColor = '#ddd'
            // 		style = {styles.container}
            // 	>
            // 		<Text style={styles.welcome}>{mainText}</Text>
            // 		</TouchableHighlight>
            //     <Button
            //     title="TESt this button"
            //     onPress={() =>
            //         navigate('Profile', { name: 'Jane' })
            //     }
            //     />
            //
            // <Image source={require('./fimg/favicon.png')} style={{height:200,width:300}}/>
            //     <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            //            style={{width: 400, height: 400}} />
            // <Button
            //     title="Go to Jane's profile wakaka"
            //     onPress={() =>
            //         navigate('Profile', { name: 'Jane' })
            //     }
            // />
            //
            //
            //
            //
            // </View>
            // </ScrollView>
            //

            <View style={mycss.all}>



                {/*<View style={[mycss.ivview,{position:'absolute'}]}>*/}
                    {/*<Image*/}
                        {/*source={require('../img/about_logo.png')}*/}
                        {/*style={[mycss.ivbtn,{position:'absolute',top:maxHeight-180}]}*/}
                    {/*/>*/}
                {/*</View>*/}



                <ListView style={{height: maxHeight, width: maxWidth}}
                          dataSource={this.state.source}
                          renderRow={(rowData) =>
                              <View style={{backgroundColor: '#33dcff', flexDirection: 'column'}}>
                                  <View style={mycss.itemlist}>
                                      <Text>{rowData}</Text>
                                      <Text>周口店山顶洞人</Text>
                                  </View>
                                  <View style={mycss.timeitem}>
                                      <Text style={mycss.timetxt}>2012.12.25</Text>
                                  </View>
                                  <Text style={mycss.dline}></Text>
                              </View>
                          }
                />

            </View>
        );
    }

    //组件渲染完毕时调用此方法
    componentDidMount() {
        //get方法，只填写url参数
        fetch(jsonurl)
        //上面一行会返回响应对象，即response
            .then((response) => response.json())
            //response.json()将返回一个json类型对象
            .then((json) => {
                console.log(json);
                this.setState({source: json.newslist});
                //注意我们在Promise调用链的最后调用了done() —— 这样可以抛出异常而不是简单忽略。
            })
            .catch((errir) => {
                console.log("出错了");
                // alert('连接错误了');

            })
            .done();
    }
}

const mycss = StyleSheet.create({
    all: {
        flex: 1,
    },
    itemlist: {
        flex: 1,
        height: 70,
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    timeitem: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#49f2ff',
        // alignItems:'flex-end',
        justifyContent: 'flex-end',

    },
    timetxt: {
        // alignItems: 'center',
        backgroundColor: '#49f2ff',
        alignItems: 'flex-end',
    },

    ivview: {
        height: maxHeight,
        width: maxWidth,
        flexDirection: 'row',
        // alignItems:'flex-end',
        justifyContent: 'flex-end',

    },
    ivbtn: {
        height: 50,
        width: 50,
        alignItems: 'flex-end',
    },

    dline: {
        height: 2,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ff000c',
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

    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

