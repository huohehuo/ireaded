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
    ActivityIndicator,
    ListView,
    View
} from 'react-native';
import {
    PullList
} from 'react-native-pull';
import {Animated} from 'react-native';
import Animation from 'lottie-react-native';
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
        tab2 = this;
        // const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {
        //     source: dataSource.cloneWithRows(['星期一：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：', '星期八：'])
        // };
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            newsSum: 5,
            progress: new Animated.Value(0),
            animotion1:this.animation,
            animotion2:this.animation,
        };
        // 绑定
        this.newslist = [];
        this.upToLoad = this.upToLoad.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    //判断是否有数据，有数据就显示ListView
    HasDataListView() {
        if (this.state.loaded) {
            return <PullList style={{height: maxHeight, width: maxWidth}}
                             onPullRelease={(resolve) => this.upToLoad(resolve)}
                             dataSource={this.state.dataSource}
                             showsHorizontalScrollIndicator={false}
                             initialListSize={5}
                             onEndReached={(resolve) => this.downToLoad(resolve)}
                             onEndReachedThreshold={6}
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
                          onPullRelease={(resolve) => this.upToLoad(resolve)}
                    // topIndicatorRender={(pulling,pullok,pullrelease)=>this.topIndicatorRender(pulling,pullok,pullrelease)}
                          dataSource={this.state.dataSource}
                          showsHorizontalScrollIndicator={false}
                          initialListSize={5}// 优化:一次渲染几条数据
                          renderHeader={this.renderHeader}
                          onEndReached={(downresolve) => this.downToLoad(downresolve)}
                          onEndReachedThreshold={100}// 当接近底部100时调用
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

// 返回 listview 头部
    renderHeader() {
        return (
            <View style={{flex: 1, flexDirection: 'row', width: maxWidth, height: 120,backgroundColor:'#060013'}}>
                {/*<Animation*/}
                    {/*ref={animation => {*/}
                        {/*this.state.animation = animation;*/}
                    {/*}}*/}
                    {/*style={{*/}
                        {/*flex: 1,*/}
                        {/*height: 120,*/}
                    {/*}}*/}
                    {/*source={require('../img/permission.json')}*/}
                {/*/>*/}
                <Animation
                    ref={animation => {
                        this.state.animation2 = animation;
                    }}
                    style={{
                        flex: 1,
                        height: 120,
                    }}
                    source={require('../img/empty_status.json')}
                />


            </View>
        );
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (
            <View style={{flex: 1, width: maxWidth, height: 200}}>
                <ActivityIndicator size="large" color="gray"/>
                {/*{pulling ? <Text>请继续拉。。。。</Text> : <Text>哈？。</Text>}*/}
                {/*{pullok ? <Text>放手啊。。。。</Text> : <Text>咩啊？。</Text>}*/}
                {/*{pullrelease ? <Text>loading。。。。</Text> : null}*/}
            </View>
        );

    }


    // ListView尾部
    renderFooter() {
        return (
            <View style={{width: maxWidth, height: 30}}>
                <Text>更新多一条</Text>
                <Animation
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={require('../img/money.json')}
                    progress={tab2.state.progress}
                />
            </View>
        );
    }

    componentDidMount() {
        this.upToLoad();
    }

    // 网络请求下拉加载更多
    upToLoad(resolve) {
        // this.state.animation.play();
        this.state.animation2.play();
        AsyncStorage.multiGet(['newsSum'], function (errs, result) {
            if (errs) {
                console.log("get data error");
                return;
            } else {
                console.log("get data succeed");
                tab2.setState({
                    newsSum: (result[0][1] != null) ? result[0][1] : '5',
                });

                console.log("the uploading num:" + tab2.state.newsSum);

                let params = {
                    "key": 'e389820925ea6e0ca99cc0ea58863e1f',
                    "num": tab2.state.newsSum,
                };
                HBase.toGet(CONF.website, params)
                    .then((responseData) => {
                        console.log("loading......");
                        // 清空数组
                        tab2.newslist = [],
                            // 拼接数据
                            tab2.newslist = tab2.newslist.concat(responseData.newslist);
                        tab2.setState({
                            dataSource: tab2.state.dataSource.cloneWithRows(responseData.newslist),
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


            }
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

    // 网络请求
    downToLoad(downresolve) {
        AsyncStorage.multiGet(['newsSum'], function (errs, result) {
            if (errs) {
                console.log("get data error");
                return;
            } else {
                console.log("get data succeed");
                tab2.setState({
                    newsSum: (result[0][1] != null) ? result[0][1] : '5',
                });

                console.log("the downloading num:" + tab2.state.newsSum);

                let params = {
                    "key": 'e389820925ea6e0ca99cc0ea58863e1f',
                    "num": tab2.state.newsSum,
                };
                HBase.toGet(CONF.website, params)
                    .then((responseData) => {
                        console.log("loading......");
                        // 清空数组
                        tab2.newslist = [],
                            // 拼接数据
                            tab2.newslist = tab2.newslist.concat(responseData.newslist);
                        tab2.setState({
                            dataSource: tab2.state.dataSource.cloneWithRows(responseData.newslist),
                            loaded: true,
                        });
                        if (downresolve !== undefined) {
                            setTimeout(() => {
                                // downresolve();
                                tab2.getNum();
                            }, 1000);
                        }
                    })
                    .catch((error) => {
                        alert("net error。。。" + error.toString())
                    })


            }
        });


        // // 读取id
        // AsyncStorage.getItem('newsSum')
        //     .then((value) => {
        //         // 加载更多数据
        //         // this.loadMoreData(value);
        //
        //
        //     });


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

    getNum() {
        AsyncStorage.setItem('newsSum', parseInt(this.state.newsSum) + 1 + "");
        // console.log("the loading num:"+tab2.state.newsSum);
        console.log("the loading num:" + this.state.newsSum);
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

