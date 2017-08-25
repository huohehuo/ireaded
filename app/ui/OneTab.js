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
    Button,
    Text,
    Image,
    TextInput,
    ScrollView,
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

export default class OneTab extends Component {
    static navigationOptions = {
        title: '图片',
        // header:()=>{
        //     title:'主页'
        // }
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/wenhao.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };


    render() {
        const {navigate} = thisview.props.navigation;
        // const { params } = this.props.navigation.state;
        return (

            <ScrollView>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    <Button
                        title="Go to list"
                        onPress={() => this.props.navigation.navigate('Two')}
                    />
                    <Button
                        title="go to setting "
                        onPress={() =>
                            navigate('MMdl')
                        }
                    />
                </View>
                {/*<Image source={require('../ireaded/img/favicon.png')} style={{height:200,width:300}}/>*/}
                <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                       style={{width: maxWidth, height: 400}}/>
            </ScrollView>



        );
    }
}


const mycss = StyleSheet.create({


    butview: {
        backgroundColor: '#00e3e0',
        flex: 1,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    but: {
        justifyContent: 'center'
    },
    btntext: {
        height: 50,
        backgroundColor: '#aaaaaa',
    },

    btnstyle: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});


