import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
    name: 'MyWave',
    propTypes: {
        src: PropTypes.int,
    },
};

const AWave =requireNativeComponent("MyWave",iface);

module.exports =AWave;