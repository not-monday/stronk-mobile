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
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen as HomeScreenProps, HomeScreen} from './src/presentation/home/home_screen';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { ActiveWorkoutScreen } from './src/presentation/active_workout/screen';
import { WorkoutRepository, WorkoutRepositoryImpl } from './src/api/workout_repo';

const mainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ActiveWorkout : {
    screen : ActiveWorkoutScreen
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

// region stronk appcontext
export type StronkContextProps = {
  workoutRepo: WorkoutRepository
}

export const stronkAppContext : StronkContextProps = {
  workoutRepo: new WorkoutRepositoryImpl()
}

export const StronkContext = React.createContext<StronkContextProps>(stronkAppContext)
// endregion stronk appcontext

const App = () => (
  <PaperProvider theme={theme}>
    <StronkContext.Provider value={stronkAppContext}>
      <AppContainer/>
    </StronkContext.Provider>
  </PaperProvider>
)

export default App;