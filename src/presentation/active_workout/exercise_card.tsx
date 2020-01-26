import { Card, Button } from "react-native-paper"
import React from "react"
import { Text } from 'react-native';
import { View, FlatList, ListRenderItemInfo } from "react-native"
import { SetRecord } from "./active_workout_screen";

type ExerciseCardProps = {
    exercise : WorkoutExercise,
    setRecords: SetRecord[]
}
  
function WorkoutExerciseCard({exercise, setRecords}: ExerciseCardProps) {
    const cardStyle = {
        backgroundColor : '#fdf6e3',
        margin: 10,
    }

    const textStyle = {
        // fontWeight: 'bold',
    }

    return (
        <View style={cardStyle}>
            <Text style={textStyle}>{exercise.name}</Text>
            <FlatList
                horizontal={true}
                data={setRecords}
                renderItem={
                    ({item}) => SetRecordCard(item)
                }
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    )
}

function SetRecordCard(setRecord: SetRecord) {
    const cardStyle = {
        backgroundColor : '#fdf6e3',
        margin: 10,
        width: 80
    }
    
    const repCount = setRecord.repsBeforeFailure || setRecord.reps
    if (setRecord.repsBeforeFailure) {
        cardStyle.backgroundColor = "#cb4b16"
        // titleStyle.
    }
    return (
        <Card style={cardStyle}>
            <Card.Title title={setRecord.weight} subtitle={"x " + repCount} />
        </Card>
    )
}

export { ExerciseCardProps, WorkoutExerciseCard }