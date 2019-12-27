import { Button } from "react-native";
import React from "react";
import { NavigationStackProp } from "react-navigation-stack";

export type Props = {
    navigation: NavigationStackProp;
}

export function HomeScreen(props : Props) {
    const {navigate} = props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
    );
}