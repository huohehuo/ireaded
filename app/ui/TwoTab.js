/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import CONF from '../Config'
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
    AsyncStorage,
    ListView,
    View
} from 'react-native';
import {
    PullList
} from 'react-native-pull';
import NoDataView from "./NoDataView";
import HBase from "../http/HTTPBase"
// const maxHeight = Dimensions.get('window').height;
// const maxWidth = Dimensions.get('window').width;

const {maxWidth, maxHeight} = Dimensions.get('window');

var mainText = "来自Leo的博客"
var jsonurl = "http://api.tianapi.com/wxnew/?key=e389820925ea6e0ca99cc0ea58863e1f&num=3"
export default class TwoTab extends Component {

    static navigationOptions = {
        title: '列表',

    };

    constructor(props) {
        super(props);
        tab2=this;
        // const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {
        //     source: dataSource.cloneWithRows(['星期一：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：'])
        // };
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            newsSum:2,
        };
        // 绑定
        this.newslist = [];
        this.fetchData = this.fetchData.bind(this);
    }

    //判断是否有数据，有数据就显示ListView
    HasDataListView() {
        if (this.state.loaded) {
            return <PullList style={{height: maxHeight, width: maxWidth}}
                             onPullRelease={(resolve) => this.fetchData(resolve)}
                             dataSource={this.state.dataSource}
                             showsHorizontalScrollIndicator={false}
                             initialListSize={5}
                             onEndReached={(resolve) => this.fetchData(resolve)}
                             onEndReachedThreshold={60}
                             renderHeader={this.renderHeader}
                             renderRow={(rowData) =>
                                 <View style={{backgroundColor: '#33dcff', flexDirection: 'column'}}>
                                     {/*<Image source={{uri: rowData.image}} style={{width: maxWidth, height: 400}} />*/}

                                     <Image
                                         source={{uri: rowData.picUrl === '' ? 'https://facebook.github.io/react/img/logo_og.png' : rowData.picUrl}}
                                         style={{width: maxWidth, height: 400}}/>
                                     <View style={mycss.itemlist}>
                                         <Text>{rowData.title}</Text>
                                     </View>
                                     <View style={mycss.timeitem}>
                                         <Text style={mycss.timetxt}>2012.12.25</Text>
                                     </View>
                                     <Text style={mycss.dline}/>
                                 </View>
                             }
            />
        } else {
            <NoDataView style={{height: maxHeight, width: maxWidth}}/>
        }
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
                <PullList style={{height: maxHeight, width: maxWidth}}
                          onPullRelease={(resolve) => this.fetchData(resolve)}
                          dataSource={this.state.dataSource}
                          showsHorizontalScrollIndicator={false}
                          initialListSize={5}// 优化:一次渲染几条数据
                          renderHeader={this.renderHeader}
                          onEndReached={this.fetchDatab()}
                          onEndReachedThreshold={6}
                          renderFooter={this.renderFooter}
                          renderRow={(rowData) =>
                              <View style={{backgroundColor: '#33dcff', flexDirection: 'column'}}>
                                  {/*<Image source={{uri: rowData.image}} style={{width: maxWidth, height: 400}} />*/}
                                  <Image
                                      source={{uri: rowData.picUrl === '' ? 'https://facebook.github.io/react/img/logo_og.png' : rowData.picUrl}}
                                      style={{width: maxWidth, height: 400}}/>
                                  <View style={mycss.itemlist}>
                                      <Text>{rowData.title}</Text>
                                  </View>
                                  <View style={mycss.timeitem}>
                                      <Text style={mycss.timetxt}>2012.12.25</Text>
                                  </View>
                                  <Text style={mycss.dline}/>
                              </View>
                          }
                />
            </View>
        );
    }

    // //组件渲染完毕时调用此方法
    // componentDidMount() {
    //     //get方法，只填写url参数
    //     fetch(jsonurl)
    //     //上面一行会返回响应对象，即response
    //         .then((response) => response.json())
    //         //response.json()将返回一个json类型对象
    //         .then((json) => {
    //             console.log(json);
    //             this.setState({source: json.newslist});
    //             //注意我们在Promise调用链的最后调用了done() —— 这样可以抛出异常而不是简单忽略。
    //         })
    //         .catch((errir) => {
    //             console.log("出错了");
    //             // alert('连接错误了');
    //
    //         })
    //         .done();
    // }
// 返回 listview 头部
    renderHeader() {
        return (
            <View style={{width: maxWidth, height: 30}}>
                <Text>根据每条折扣的点击进行统计,每5分钟更新一次</Text>
            </View>
        );
    }
    // ListView尾部
    renderFooter() {
        return (
            <View style={{width: maxWidth, height: 30}}>
                <Text>更新多一条</Text>
            </View>
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    // 网络请求
    fetchData(resolve) {
        // 读取id
        AsyncStorage.getItem('newsSum')
            .then((value) => {
                // 加载更多数据
                this.loadMoreData(value);
            })
        let params = {
            "key": 'e389820925ea6e0ca99cc0ea58863e1f',
            "num": ''+this.state.newsSum,
        };
        HBase.toGet(CONF.website, params)
            .then((responseData) => {
                console.log("loading......");
                    // 清空数组
                    this.newslist=[],
                // 拼接数据
                    this.newslist = this.newslist.concat(responseData.newslist),
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.newslist),
                    loaded: true,
                });
                if (resolve !== undefined) {
                    setTimeout(() => {
                        resolve();
                        tab2.getNum();
                    }, 1000);
                }
            })
            .catch((error) => {
                alert("net error。。。" + error.toString())
            })


        //http://api.tianapi.com/vr/?key=e389820925ea6e0ca99cc0ea58863e1f&num=10
        // fetch('http://api.tianapi.com/wxnew/?key=e389820925ea6e0ca99cc0ea58863e1f&num=3',{method:'GET'})
        // fetch('http://api.tianapi.com/vr/?key=e389820925ea6e0ca99cc0ea58863e1f&num=10')
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //     console.log("加载网络数据")
        //         this.setState({
        //             dataSource: this.state.dataSource.cloneWithRows(responseData.newslist),
        //             loaded: true,
        //         });
        //         if (resolve !== undefined) {
        //             setTimeout(() => {
        //                 resolve();//关闭动画
        //             }, 1000);
        //         }
        //     }).catch((error) => {
        //     alert("网络加载错误。。。" + error.toString())
        // })
        //     .done()
    }
    // 网络请求
    fetchDatab() {

        // 读取id
        AsyncStorage.getItem('newsSum')
            .then((value) => {
                // 加载更多数据
                // this.loadMoreData(value);
        let params = {
            "key": 'e389820925ea6e0ca99cc0ea58863e1f',
            "num": value,
        };
        HBase.toGet(CONF.website, params)
            .then((responseData) => {
                console.log("loading......");
                    // 清空数组
                    this.newslist=[],
                // 拼接数据
                    this.newslist = this.newslist.concat(responseData.newslist),
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.newslist),
                    loaded: true,
                });
                if (resolve !== undefined) {
                    setTimeout(() => {
                        resolve();
                        tab2.getNum();
                    }, 1000);
                }
            })
            .catch((error) => {
                alert("net error。。。" + error.toString())
            })
            });


        //http://api.tianapi.com/vr/?key=e389820925ea6e0ca99cc0ea58863e1f&num=10
        // fetch('http://api.tianapi.com/wxnew/?key=e389820925ea6e0ca99cc0ea58863e1f&num=3',{method:'GET'})
        // fetch('http://api.tianapi.com/vr/?key=e389820925ea6e0ca99cc0ea58863e1f&num=10')
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //     console.log("加载网络数据")
        //         this.setState({
        //             dataSource: this.state.dataSource.cloneWithRows(responseData.newslist),
        //             loaded: true,
        //         });
        //         if (resolve !== undefined) {
        //             setTimeout(() => {
        //                 resolve();//关闭动画
        //             }, 1000);
        //         }
        //     }).catch((error) => {
        //     alert("网络加载错误。。。" + error.toString())
        // })
        //     .done()
    }

    getNum(){
        AsyncStorage.setItem('newsSum',parseInt(this.state.newsSum)+1+"");
        // console.log("the loading num:"+tab2.state.newsSum);
        console.log("the loading num:"+this.state.newsSum);
        // AsyncStorage.multiGet(['newsSum'], function (errs, result) {
        //     if (errs) {
        //         console.log("get data error");
        //         return;
        //     } else {
        //         console.log("get data succeed");
        //         tab2.setState({
        //         newsSum: (result[0][1] != null) ? result[0][1] : 2,
        //         })
        //     }
        // });
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

