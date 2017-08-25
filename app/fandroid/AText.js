import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

let iface = {
    name: 'MyText',
    propTypes: {
        src: PropTypes.string,
        textSize:PropTypes.number,
        // textColor:PropTypes.number,

        ...View.propTypes // 包含默认的View的属性
    },
};

const  MMT=requireNativeComponent("MyText",iface);

module.exports =MMT;
