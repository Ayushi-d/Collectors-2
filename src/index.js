import React from 'react';
import {View, StatusBar} from 'react-native';
import Routes from './navigation';
import {Provider} from 'react-redux';
import configureStore from './store';
import {COLOR} from './constants';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={COLOR.black} barStyle={'light-content'} />
        <Routes />
      </View>
    </Provider>
  );
}

export default App;
