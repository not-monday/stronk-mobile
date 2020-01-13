import { NavigationStackProp } from "react-navigation-stack/lib/typescript/types"
import { useState, useContext, Dispatch, SetStateAction } from "react"
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

        
        // add each exercise (without any sets) to the completed exercises
        const completedExercises = activeWorkout.workoutExercises.map((workoutExercise) => {
           return {
               ...workoutExercise,
               exerciseSets: []
            }
        })

        setState({
            ...state,
            activeWorkout : activeWorkout,
            completedExercises: completedExercises,
            remainingExercises: [...activeWorkout.workoutExercises]
        })
    }

    return <ActiveWorkoutScreenUI 
        activeWorkout={state.activeWorkout}
        completedExercises={state.completedExercises}
        remainingExercises={state.remainingExercises}
        completeCurrentExercise={()=>completeExercise(state, setState)}
        failCurrentExercise={()=>completeExercise}
    />
}

function completeExercise(state : State, setState : Dispatch<SetStateAction<State>>) {
    // current exercise set will always be the first set of the first exercise in the current workout
    const currentExercise = state.remainingExercises[0]
    const completedSet = currentExercise.exerciseSets.shift()

    // find the exercise in the completed exercise list and add the set to it
    const accociatedExercise = state.completedExercises.filter((workoutExercise)=> {
        workoutExercise.exerciseId == currentExercise.id
    })[0]
    
    const newCompletedExercise = {
        ...accociatedExercise,
        exerciseSets : [...accociatedExercise.exerciseSets, completedSet!]
    }

    setState({
        ...state,
        remainingExercises : newRemainingExercises
    })

    //remove the current exercise set if it is empty
    if (currentExercise.exerciseSets.length == 0) {
        // remove the (first) exercise from remaining exercises if the completed set was the last set in the exercise
        const newRemainingExercises = [...state.completedExercises]
        newRemainingExercises.shift()

        setState({
            ...state,
            remainingExercises : newRemainingExercises
        }) 
    }

}

function failExercise() {

}

export { ActiveWorkoutScreen}