import { Card, Button } from "react-native-paper"
import React from "react"
import { Text } from 'react-native';
import { View, FlatList, ListRenderItemInfo } from "react-native"

type ExerciseCardProps = {
    exercise : WorkoutExercise
}
  
function WorkoutExerciseCard(props: ExerciseCardProps) {
    const cardStyle = {
        backgroundColor : '#fdf6e3',
        margin: 10,
    }

    const textStyle = {
        fontWeight: 'bold',
        marginStart: 10,
    }

    const {name, exerciseSets} = props.exercise 

    return (
        <View style={cardStyle}>
            <Text style={textStyle}>{name}</Text>
            <FlatList
                horizontal={true}
                data={exerciseSets}
                renderItem={
                    ({item} : ListRenderItemInfo<ExerciseSet>) => {
                    return ExerciseSet(item)
                    }
                }
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    )
}

function ExerciseSet(exerciseSet: ExerciseSet) {
    const cardStyle = {
        backgroundColor : '#fdf6e3',
        margin: 10,
        width: 80
    }

    return (
        <Card style={cardStyle}>
            <Card.Title title={exerciseSet.weight} subtitle={"x " + exerciseSet.reps} />
        </Card>
    )
}

export { ExerciseCardProps, WorkoutExerciseCard }