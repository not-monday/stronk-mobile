import { View, Text, ListRenderItemInfo, PanResponderGestureState } from "react-native";
import React, { useContext } from "react";
import { Button, Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { WorkoutExerciseCard } from "./exercise_card";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ViewPager from '@react-native-community/viewpager';

interface Props {
  activeWorkout? : Workout,
  completedExercises : WorkoutExercise[],
  remainingExercises : WorkoutExercise[],
  completeCurrentExercise(): void,
  failCurrentExercise(): void
}

export function ActiveWorkoutScreenUI({activeWorkout} : Props) {

  const cardScreenStyle = {
    backgroundColor : '#fdf6e3',
    flex: 1,
  }
  
  if (activeWorkout) {
    return (
      <View style={cardScreenStyle}>
        <Text> Active Workout page </Text>
        <Header/>
        <ViewPager initialPage={0}>
          <View key="0">
            <WorkoutExercises exercises={activeWorkout.workoutExercises}/>
          </View>
          <View key="1">
          <WorkoutExercises exercises={activeWorkout.workoutExercises}/>
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

function handleRenderCard (info : ListRenderItemInfo<WorkoutExercise>) {
  const {item} = info
  return <WorkoutExerciseCard exercise={item}/>
}

function handleLeftSwipe(gestureState : PanResponderGestureState) {
  console.debug("left")
}

function handleRightSwipe(gestureState : PanResponderGestureState) {
  console.debug("right")
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
      <GestureRecognizer onSwipeLeft={handleLeftSwipe} onSwipeRight={handleRightSwipe}>
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
}

function WorkoutExercises({exercises} : WorkoutExercisesProps) { 
  return <FlatList
    data={exercises}
    renderItem={handleRenderCard}
    keyExtractor={(item, index) => String(index)}
  />
}