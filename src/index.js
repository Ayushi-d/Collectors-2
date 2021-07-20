import React from 'react';
import {View, StatusBar} from 'react-native';
import Routes from './navigation';
import {COLOR} from './constants';

function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={COLOR.black} barStyle={'light-content'} />
      <Routes />
    </View>
  );
}

export default App;
