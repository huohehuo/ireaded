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

// 新建表模型
const PersonSchema = {
    name: 'vera2',
    // primaryKey: 'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
    version:'2',
    properties: {
        id: 'int',
        name: 'string',
        tel_number: {type: 'string', default: '156xxxxxxxx'},   // 添加默认值的写法
        city: 'string' // 直接赋值的方式设置类型
    }
};

const realm = new Realm({schema: [PersonSchema]});
export default class MySetting extends Component {
    // static navigationOptions = {
    //     title: '主页',
    // };
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: '',
        };
    }


    render() {
        // 根据提供的表初始化 Realm，可同时往数组中放入多个表
        let realm = new Realm({schema: [PersonSchema]});

        let persons = realm.objects('vera2');
        return (
            <ScrollView>
                {/*<Text>'name:' + {persons[0].name} + 'city:' + {persons[0].city}</Text>*/}
                <Text>{this.state.data}</Text>
                <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                <Button
                    title="添加数据"
                    onPress={() => {
                        this.createData();
                    }}
                />
                <Button
                    title="查询所有"
                    onPress={() => {
                        this.findAll();
                    }}
                />
                <Button
                    title="查询指定数据：id=4"
                    onPress={() => {
                        this.findBy(4);
                    }}
                />
                    <View style={{margin:20}}>
                <Button

                    title="更新指定数据：id=4"
                    onPress={() => {
                        this.upData();
                    }}
                />
                    </View>
                </View>
            </ScrollView>
        );
    }

    // 增加
    createData() {
        realm.write(() => {
            realm.create('vera2', {id: 0, name: '孙悟空', tel_number: '137xxx', city: 'xx省x'});
            realm.create('vera2', {id: 1, name: '周星驰', tel_number: '137xxxxx', city: 'xx省xx'});
            realm.create('vera2', {id: 2, name: '雷克', tel_number: '137xxxxxx', city: 'xx省xxx'});
            realm.create('vera2', {id: 3, name: '巴基斯坦', tel_number: '137xxxx', city: 'xx省xx'});
            realm.create('vera2', {id: 4, name: '黑人问号', tel_number: '137xxxxx', city: 'xx省xxxx'});
        })
    }


    // 查询
    findAll() {
        let allData;
        // 获取Person对象
        let Persons = realm.objects('vera2');
        // 遍历表中所有数据
        for (let i = 0; i < Persons.length; i++) {
            let tempData = '第' + i + '个' + Persons[i].name + Persons[i].tel_number + Persons[i].city + '\n';
            allData += tempData
        }
        this.setState({
            data: allData
        })
    }

    // 根据条件查询
    findBy(id) {
        let allData;
        // 获取Person对象
        let Persons = realm.objects('vera2');
        // 设置筛选条件
        let person = Persons.filtered('id == '+id);

        if (person) {
            // 遍历表中所有数据
            for (let i = 0; i < person.length; i++) {
                let tempData = '第' + (person[i].id + 1) + '个数据:' + person[i].name + person[i].tel_number + person[i].city + '\n';
                allData += tempData
            }
        }
        this.setState({
            data: 'id为:'+id+'的数据：\n' + allData
        })
    }

    // 更新
    upData() {
        realm.write(() => {
            // 方式一在设置了主键的情况下，可以更新成功，否则会生成新的数据
            // realm.create('vera2', {id: 4, name: '皮皮虾,我们走', tel_number: '156xxxxxxxx', city: 'xx省xx市xxxxxx'}, true);

            // // 方式二:如果表中没有主键,那么可以通过直接赋值更新对象
            // // 获取Person对象
            // let Persons = realm.objects('vera2');
            // 设置筛选条件
            // let person = Persons.filtered('id == 4');
            // 更新数据
            // person.name = '皮皮虾,我们走'

        })
    }

// 删除
    removeData() {
        realm.write(() => {
            // 获取Person对象
            let Persons = realm.objects('vera2');
            // 删除
            realm.delete(Persons);
        })
    }

    componentWillMount() {
        this.removeData();//删除表对象
        this.createData();//新增数据
        this.findAll();//查询所有数据
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


