/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator, NavigationStackProp} from 'react-navigation-stack';
import {HomeScreen, Props as HomeScreenProps} from './src/home/home_screen';

const mainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
})

const AppContainer = createAppContainer(mainNavigator);

const App = () => <AppContainer/>

export default App;