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
    completedExercises : ActionableWorkoutExercise[],
    remainingExercises : ActionableWorkoutExercise[],
    currentExerciseIndex: number,
    completed: boolean
}

const initialState : State = {
    completedExercises: [],
    remainingExercises: [],
    currentExerciseIndex: 0,
    completed : false
}

function ActiveWorkoutScreen (props : Props) {
    const [state, setState] = useState(initialState)

    if (!state.activeWorkout) {
        const stronkContext = useContext(StronkContext);
        const activeWorkout = stronkContext.workoutRepo.retrieveWorkout()

        // initialize completed and remaining exercise maps
        const completedExercises = activeWorkout.workoutExercises.map(
            (exercise)=> new ActionableWorkoutExercise(exercise, [])
        );
        const remainingExercises = activeWorkout.workoutExercises.map((exercise)=> 
            new ActionableWorkoutExercise(exercise, [...exercise.exerciseSets])
        );

        setState({
            ...state,
            activeWorkout : activeWorkout,
            completedExercises: completedExercises,
            remainingExercises: remainingExercises
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
    // remove the set from the exercise in the list of remaining sets
    const currentRemainingExercise = state.remainingExercises[state.currentExerciseIndex]
    const completedSet = currentRemainingExercise.exercise.exerciseSets.shift()!

    // add the set to the exercise in the list of completed sets
    const currentCompletedExercise = state.completedExercises[state.currentExerciseIndex]
    currentCompletedExercise.exerciseSets.unshift(completedSet)

    setState({
        ...state,
        remainingExercises: [...state.remainingExercises],
        completedExercises: [...state.completedExercises],
    })

    // update the index of the current exercise if it has no more sets
    if (currentRemainingExercise.exerciseSets.length == 0) {
        if (state.currentExerciseIndex < state.remainingExercises.length) {
            setState({
                ...state,
                currentExerciseIndex : state.currentExerciseIndex + 1
            })
        } else {
            // complete exercise
            setState({
                ...state,
                completed : true
            })
        }
    }
}

function failExercise(state : State, setState : Dispatch<SetStateAction<State>>) {
    completeExercise 
}

class ActionableWorkoutExercise {
    exercise : WorkoutExercise
    exerciseSets: ExerciseSet[]

    constructor(
        exercise : WorkoutExercise,
        exerciseSets: ExerciseSet[]
    ) {
        this.exercise = exercise
        this.exerciseSets = exerciseSets
    }
}

export { ActiveWorkoutScreen, ActionableWorkoutExercise }
