import { Button, View, Text } from "react-native";
import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { BottomNavigation } from "react-native-paper";

export type Props = {
  navigation: NavigationStackProp;
}

const route1 = () => <Text> route1  </Text>
const route2 = () => <Text> route2 </Text>
const route3 = () => <Text> route3 </Text>

const _navRoutes = [
  { key: 'route1', title: 'Music', icon: 'album' },
  { key: 'route2', title: 'Albums', icon: 'album' },
  { key: 'route3', title: 'Recents', icon: 'history' },
]

export function HomeScreen(props : Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navState = {
    index : activeIndex,
    routes: _navRoutes,
  }

  const _handleIndexChange = (index: number) => setActiveIndex(index)
  const _handleRenderScene = BottomNavigation.SceneMap({
    route1 : route1,
    route2 : route2,
    route3 : route3
  })

  return (
    <View>
      <BottomNavigation
        navigationState={navState}
        onIndexChange={_handleIndexChange}
        renderScene={_handleRenderScene}
      />
    </View>
  );
}