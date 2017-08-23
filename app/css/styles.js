import React from 'react';
import {
    StyleSheet
} from 'react-native';

let mycss = StyleSheet.create(
    {
        mlog_input_name:{
            height: 40,margin:40,
            backgroundColor:'#aa2b07'
        },
        mlog_input_pwd:{
            height: 40,marginLeft:40,marginRight:40
        },
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

module.exports = mycss;