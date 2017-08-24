/**
 * Created by yeshaojian on 17/3/22.
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

export default class AsyData extends Component {


    static getData(key){
        let keys = [key];
        AsyncStorage.multiGet(keys, function (errs, result) {
            if (errs) {
                console.log("get data error");
                return;
            } else {
                console.log("get data succeed");
                thisview.setState({
                    getName: (result[0][1] != null) ? result[0][1] : '',
                    getPwd: (result[1][1] != null) ? result[1][1] : '',
                })
                // 发送通知
                DeviceEventEmitter.emit('isHiddenTabBar', true);
            }
        });
    }
    /**
     *
     * GET请求
     *
     * @param url
     * @param params {}包装
     * @param headers
     *
     * @return {Promise}
     *
     * */
    static toGet(url, params, headers) {
        if (params) {

            let paramsArray = [];

            // 获取 params 内所有的 key
            let paramsKeyArray = Object.keys(params);
            // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
            paramsKeyArray.forEach(key => paramsArray.push(key + '=' + params[key]));

            if (url ===null){
                return;
            }
            // 网址拼接
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += paramsArray.join('&');
            }
            console.log("http:url" + url);
        }

        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then((response) => response.json())
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject({status: -1})
                })
                .done();
        })
    }


    /**
     *
     * POST请求
     *
     * @param url
     * @param params {}包装
     * @param headers
     *
     * @return {Promise}
     *
     * */
    static toPost(url, params, headers) {
        if (params) {
            // 初始化FormData
            var formData = new FormData();

            // 获取 params 内所有的 key
            let paramsKeyArray = Object.keys(params);
            // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
            paramsKeyArray.forEach(key => formData.append(key, params[key]));
        }

        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject({status: -1})
                })
                .done();
        })
    }
}
