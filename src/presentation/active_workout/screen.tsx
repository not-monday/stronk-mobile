import { NavigationStackProp } from "react-navigation-stack";
import { View, Text, ListRenderItemInfo } from "react-native";
import React, { useContext } from "react";
import { Button, Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { StronkContext } from "../../../App";


export type Props = {
  navigation: NavigationStackProp;
}

export function ActiveWorkoutScreen(props: Props) {
  const { navigate } = props.navigation;
  const stronkContext = useContext(StronkContext);

  const cardListStyle = {
    backgroundColor : '#fdf6e3'
  }

  const workout = stronkContext.workoutRepo.retrieveWorkout()
  
  return (
    <View style={cardListStyle}>
      <Text> Active Workout page </Text>
      <Header/>
      <FlatList
        data={workout.workoutExercises}
        renderItem={handleRenderCard}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}

function handleRenderCard (info : ListRenderItemInfo<WorkoutExercise>) {
  const {item} = info
  return <WorkoutExerciseCard exercise={item}/>
}

/**
 * component for rendering the "current" workout header
 */
function Header() {
  const viewStyle = {
    padding: 20,
    backgroundColor: '#eee8d5',
  }
  
  const cardStyle = {
    backgroundColor : '#fdf6e3'
  }

  return (
    <View style={viewStyle}>
      <Card style={cardStyle}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

type WorkoutExerciseProps = {
  exercise : WorkoutExercise
}

function WorkoutExerciseCard(props : WorkoutExerciseProps) {
  const cardStyle = {
    backgroundColor : '#fdf6e3'
  }

  const {name} = props.exercise 

  return (
    <Card style={cardStyle}>
      <Card.Title title={name} subtitle="Card Subtitle" />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  )
}

