import { View, Text, ListRenderItemInfo, PanResponderGestureState } from "react-native";
import React, { useContext } from "react";
import { Button, Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { WorkoutExerciseCard } from "./exercise_card";
import GestureRecognizer from 'react-native-swipe-gestures';
import ViewPager from '@react-native-community/viewpager';
import { SetRecord } from "./active_workout_screen";

interface Props {
  activeWorkout? : Workout,
  workoutExercises: WorkoutExercise[],
  completedExercises : Map<String, SetRecord[]>,
  remainingExercises : Map<String, SetRecord[]>,
  completeCurrentExercise(): void,
  failCurrentExercise(): void
}

export function ActiveWorkoutScreenUI(props : Props) {

  const cardScreenStyle = {
    backgroundColor : '#fdf6e3',
    flex: 1,
    viewpagerStyle: {
      flex : 1
    }
  }

  if (props.activeWorkout) {
    return (
      <View style={cardScreenStyle}>
        <Text> Active Workout page </Text>
        <Header
          handleSuccess={props.completeCurrentExercise}
          handleFailure={props.failCurrentExercise}
        />
        <ViewPager style={cardScreenStyle.viewpagerStyle} initialPage={0}>
          <View key="0">
            <WorkoutExercises exercises={props.workoutExercises} sets={props.remainingExercises}/>
          </View>
          <View key="1">
            <WorkoutExercises exercises={props.workoutExercises} sets={props.completedExercises}/>
          </View>
        </ViewPager>
      </View>
    )  
  } else {
    return (
      <View>
        Loading!
      </View>
    )
  }
}

type HeaderProps = {
  handleSuccess: ()=>void,
  handleFailure: ()=>void,
}

/**
 * component for rendering the "current" workout header
 */
function Header(props : HeaderProps) {
  const viewStyle = {
    padding: 20,
    backgroundColor: '#eee8d5',
  }
  
  const cardStyle = {
    backgroundColor : '#fdf6e3'
  }

  return (
    <View style={viewStyle}>
      <GestureRecognizer 
      onSwipeLeft={props.handleSuccess} onSwipeRight={props.handleFailure}>
        <Card style={cardStyle}>
          <Card.Title title="Card Title" subtitle="Card Subtitle" />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </GestureRecognizer>
    </View>
  )
}

type WorkoutExercisesProps = {
  exercises : WorkoutExercise[]
  sets : Map<String, SetRecord[]>
}

function WorkoutExercises({exercises, sets} : WorkoutExercisesProps) {
  return <FlatList
    data={exercises}
    renderItem={({item}) => 
      <WorkoutExerciseCard exercise={item} setRecords={sets.get(item.exerciseId)!}/>
    }
    keyExtractor={(item, index) => String(index)}
  />
}