/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import mycss from '../css/styles'
import MABtn from '../fandroid/MABtn'
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    Modal,
    TouchableHighlight,
    Image,
    TextInput,
    ScrollView,
    FlatList,
    requireNativeComponent,
    View,
    ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

export default class MyModel extends Component {
    // static navigationOptions = {
    //     title: '主页',
    // };
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: '',
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }


    render() {
        return (
            <View>
                <Modal
                    style={{margin: 20, backgroundColor: '#aa1d04', height: 250, width: 350}}
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed")
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text style={{margin: 20, backgroundColor: '#aa8613', height: 50}}>Hello World!</Text>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                <Text style={{margin: 20, backgroundColor: '#aaaaaa', height: 50}}>Hide Modal</Text>

                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true)
                    }}>
                    <Text style={{margin: 20, backgroundColor: '#aaaaaa', height: 50}}>Show Modal</Text>
                </TouchableHighlight>

            </View>
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
    tabbarIconStyle: {
        // width:Platform.OS === 'ios' ? 30 : 25,
        // height:Platform.OS === 'ios' ? 30 : 25,
    }
});


