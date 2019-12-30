import { View, StyleSheet } from "react-native";
import React from "react";
import { FAB } from "react-native-paper";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

const style = {
    flex: 1,
    padding: 20,
    backgroundColor: "red"
}

type Props = {
    navigation : NavigationScreenProp<NavigationState, NavigationParams>
}

export function OverviewScreen(props : Props) {
    return (
        <View style={style}>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => props.navigation.navigate('ActiveWorkout')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        padding: 10,
        right: 0,
        bottom: 0,
    },
})
