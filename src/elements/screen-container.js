import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR} from '../constants';

export function ScreenContainer(props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black,
  },
});
