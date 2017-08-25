import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
    name: 'MyImg',
    propTypes: {
        src: PropTypes.int,
        ...View.propTypes // 包含默认的View的属性


    },
};

const AImg =requireNativeComponent("MyImg",iface);

module.exports =AImg;