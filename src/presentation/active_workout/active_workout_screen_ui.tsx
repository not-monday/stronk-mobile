import { View, Text, ListRenderItemInfo, PanResponderGestureState, Modal } from "react-native";
import React, { useContext, Component, useState } from "react";
import { Button, Card, Portal, TextInput, Dialog } from "react-native-paper";
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
  failCurrentExercise(reps: number): void
}

interface State {
  showFailureInput : boolean,
  showInvalidFailureRepCount: boolean,
  failedRepCount : string,
}

const initialState : State = {
  showFailureInput: false,
  showInvalidFailureRepCount: false,
  failedRepCount: '0'
}

export function ActiveWorkoutScreenUI(props : Props) {

  const [state, setState] = useState(initialState)
  const showFailureDialog = ()=>{
    setState({...state, showFailureInput : true})
  }
  const cancelFailure = ()=>{
    setState({...state, showFailureInput : false})
  }

  const submitFailure = ()=>{
    const failedRepCount = state.failedRepCount as unknown as number
    props.failCurrentExercise(failedRepCount)
    setState({...state, showFailureInput: false, failedRepCount : '0'})
  }

  const updateFailedRepCount = (failedRepInput : string)=>{
    const input = failedRepInput as unknown as number
    if (failedRepInput.length != 0 && !isNaN(input)) {
      setState({...state, failedRepCount: failedRepInput, showInvalidFailureRepCount: false})
    } else {
      setState({...state,  failedRepCount: failedRepInput, showInvalidFailureRepCount: true})
    }
  }

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
          handleFailure={showFailureDialog}
        />
        <ViewPager style={cardScreenStyle.viewpagerStyle} initialPage={0}>
          <View key="0">
            <RemainingExercisesPage exercises={props.exerciseRecords} sets={props.setRecords }/>
          </View>
          <View key="1">
            <CompletedExercisesPage exercises={props.exerciseRecords} sets={props.setRecords }/>
          </View>
        </ViewPager>
        
        <Portal>
           <Dialog visible={state.showFailureInput} onDismiss={cancelFailure}>
              <Dialog.Title>Rep count</Dialog.Title>
              <Dialog.Content>
                {state.showInvalidFailureRepCount &&
                  <Text>Invalid input</Text> 
                }
                <TextInput
                  label='Rep count'
                  value={state.failedRepCount}
                  onChange={ (e) =>  updateFailedRepCount(e.nativeEvent.text) } 
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button disabled={state.showInvalidFailureRepCount} onPress={submitFailure}>Done</Button>
                <Button onPress={cancelFailure}>Cancel</Button>
              </Dialog.Actions>
           </Dialog>
         </Portal>
         
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
      <GestureRecognizer onSwipeLeft={props.handleSuccess} onSwipeRight={props.handleFailure}>
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