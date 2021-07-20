import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export function TouchableItem(props) {
  return (
    <TouchableOpacity
      disabled={props.disable || false}
      style={props.style}
      onPress={props.onPress}
      activeOpacity={props.opacity || 0.8}>
      {props.children}
    </TouchableOpacity>
  );
}

TouchableItem.propTypes = {
  opacity: PropTypes.number,
};
