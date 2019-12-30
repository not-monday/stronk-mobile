import { View, Text } from "react-native";
import React, { useState } from "react";
import { BottomNavigation, Appbar } from "react-native-paper";
import { OverviewScreen } from "../overview/screen";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const _navRoutes = [
  { key: 'overview', title: 'Overview', icon: 'album' },
  { key: 'search', title: 'Search', icon: 'album' },
  { key: 'profile', title: 'Profile', icon: 'history' },
]

export function HomeScreen(props: Props) {
  const overviewRoute = () => <OverviewScreen navigation={props.navigation} />
  const searchRoute = () => <Text> route2 </Text>
  const profileRoute = () => <Text> route3 </Text>

  const [state, setState] = useState({
    index: 0,
    routes: _navRoutes,
  });

  const handleIndexChange = (selectedIndex: number) => setState({
    ...state,
    index: selectedIndex
  })

  const handleRenderScene = BottomNavigation.SceneMap({
    overview: overviewRoute,
    search: searchRoute,
    profile: profileRoute,
  })

  return (
    <BottomNavigation
      navigationState={state}
      onIndexChange={handleIndexChange}
      renderScene={handleRenderScene}
    />
  );
}