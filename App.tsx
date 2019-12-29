/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator, NavigationStackProp} from 'react-navigation-stack';
import {HomeScreen, Props as HomeScreenProps} from './src/home/home_screen';
import { ActiveWorkoutScreen } from './src/active_workout/screen';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const mainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ActiveWorkout: {
    screen: ActiveWorkoutScreen
  }
})

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const AppContainer = createAppContainer(mainNavigator);

const App = () => (
  <PaperProvider theme={theme}>
    <AppContainer/>
  </PaperProvider>
)

export default App;