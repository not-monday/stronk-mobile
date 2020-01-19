import { View, Text, ListRenderItemInfo, PanResponderGestureState } from "react-native";
import React, { useContext, Component } from "react";
import { Button, Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { WorkoutExerciseCard } from "./exercise_card";
import GestureRecognizer from 'react-native-swipe-gestures';
import ViewPager from '@react-native-community/viewpager';
import { SetRecord, SetRecordstatus, ExerciseRecord } from "./active_workout_screen";

interface Props {
  activeWorkout? : Workout,
  exerciseRecords: ExerciseRecord[],
  setRecords  :SetRecord[][],
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
            <RemainingExercisesPage exercises={props.exerciseRecords} sets={props.setRecords }/>
          </View>
          <View key="1">
            <CompletedExercisesPage exercises={props.exerciseRecords} sets={props.setRecords }/>
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
            <Button onPress={props.handleFailure}>FAIL</Button>
            <Button onPress={props.handleSuccess}>SUCCESS</Button>
          </Card.Actions>
        </Card>
      </GestureRecognizer>
    </View>
  )
}

type WorkoutExercisesProps = {
  exercises : ExerciseRecord[]
  sets : SetRecord[][]
}


function RemainingExercisesPage({exercises, sets} : WorkoutExercisesProps) {
  return (
    <View>
      <FlatList
        data={exercises}
        renderItem={({item, index}) => {
          const remainingSets= sets[index].filter(setRecord=>setRecord.status == SetRecordstatus.Incomplete)
          return  <WorkoutExerciseCard exercise={item} setRecords={remainingSets}/>          
        }}
        keyExtractor={(_, index) => String(index)}
    />
    </View>
  )
}

function CompletedExercisesPage({exercises, sets} : WorkoutExercisesProps) {
  return (
    <View>
      <FlatList
        data={exercises}
        renderItem={({item, index}) => {
          const remainingSets= sets[index].filter(setRecord=>setRecord.status != SetRecordstatus.Incomplete)
          return  <WorkoutExerciseCard exercise={item} setRecords={remainingSets}/>          
        }}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  )
}