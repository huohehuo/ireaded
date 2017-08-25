import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
    name: 'MyReactImg',
    propTypes: {
        src: PropTypes.int,
    },
};

const MABtn =requireNativeComponent("MyReactImg",iface);

module.exports =MABtn;