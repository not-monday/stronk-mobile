import { NavigationStackProp } from "react-navigation-stack/lib/typescript/types"
import { useState, useContext } from "react"
import { StronkContext } from "../../../App"
import React from "react"
import { ActiveWorkoutScreenUI } from "./active_workout_screen_ui"

type Props = {
    navigation: NavigationStackProp;
}

interface State {
    activeWorkout? : Workout
    completedExercises : WorkoutExercise[],
    remainingExercises : WorkoutExercise[]
}

const initialState : State = {
    completedExercises : [],
    remainingExercises : []
}

function ActiveWorkoutScreen (props : Props) {
    const [state, setState] = useState(initialState)

    if (!state.activeWorkout) {
        const stronkContext = useContext(StronkContext);
        const activeWorkout = stronkContext.workoutRepo.retrieveWorkout()
        setState({
            ...state,
            activeWorkout : activeWorkout,
            remainingExercises: [...activeWorkout.workoutExercises]
        })
    }

    return <ActiveWorkoutScreenUI 
        activeWorkout={state.activeWorkout}
        completedExercises={state.completedExercises}
        remainingExercises={state.remainingExercises}
        completeCurrentExercise={()=>{
            setState({
                ...state,
            })
        }}
        failCurrentExercise={()=>{
            setState({
                ...state
            })
        }}
    />
}

export { ActiveWorkoutScreen}