/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
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



export default class MySetting extends Component {
    // static navigationOptions = {
    //     title: '主页',
    // };
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <Text>你好啊ss</Text>

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
    pichead:{
        height:100,
        width:100,
        color:'red',
    },
});


