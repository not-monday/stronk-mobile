import { NavigationStackProp } from "react-navigation-stack";
import { Button, View, Text } from "react-native";
import React from "react";


export type Props = {
  navigation: NavigationStackProp;
}

export function ActiveWorkoutScreen(props: Props) {
  const { navigate } = props.navigation;
  return (
    <View>
      <Text> Active Workout page </Text>
    </View>

  );
}