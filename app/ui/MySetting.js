/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import mycss from '../css/styles'
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

    View,
    ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import OneTab from "./OneTab";
import TwoTab from "./TwoTab";


export default class MySetting extends Component {
    // static navigationOptions = {
    //     title: '主页',
    // };
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab:'home',
            selectedTabw:'profile',
        };
    }

    // 返回TabBar的Item
    renderTabBarItem(title, selectedTab, image, selectedImage, component) {
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{color:'black'}}
                renderIcon={() => <Image source={require('../img/wenhao.png')}/>}
                renderSelectedIcon={() => <Image source={require('../img/wenhao.png')}/>}
                onPress={() => this.setState({ selectedTab: selectedTab })}>
                // 添加导航功能
                <Navigator
                    // 设置路由
                    initialRoute={{
                        name:selectedTab,
                        component:component
                    }}

                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }}
                />
            </TabNavigator.Item>
        );
    }

    render() {
        return (

        <Text/>
        );
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabbarIconStyle: {
        // width:Platform.OS === 'ios' ? 30 : 25,
        // height:Platform.OS === 'ios' ? 30 : 25,
    }
});


