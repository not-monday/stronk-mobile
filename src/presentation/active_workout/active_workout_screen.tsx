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
    workoutExercises: WorkoutExercise[]
    completedExercises : Map<String, SetRecord[]>,
    remainingExercises : Map<String, SetRecord[]>,
    currentExerciseIndex: number,
    completed: boolean
}

const initialState : State = {
    workoutExercises: [],
    completedExercises: new Map(),
    remainingExercises: new Map(),
    currentExerciseIndex: 0,
    completed : false
}

function ActiveWorkoutScreen (props : Props) {
    const [state, setState] = useState(initialState)

    const completeExercise = () => {
        const exercise = state.workoutExercises[state.currentExerciseIndex]
        const remainingSets = state.remainingExercises.get(exercise.exerciseId)!
        const completedSets = state.completedExercises.get(exercise.exerciseId)!

        // remove the set from the exercise in the list of remaining sets and add it to the list of completed ones
        const completedSet = remainingSets.shift()!

        state.remainingExercises.set(exercise.exerciseId, [...remainingSets])
        state.completedExercises.set(exercise.exerciseId, [completedSet, ...completedSets])

        setState({
            ...state,
            remainingExercises: {...state.remainingExercises},
            completedExercises: {...state.completedExercises},
        })

        // // update the index of the current exercise if it has no more sets
        // if (currentRemainingExercise.exerciseSets.length == 0) {
        //     if (state.currentExerciseIndex < state.remainingExercises.length) {
        //         setState({
        //             ...state,
        //             currentExerciseIndex : state.currentExerciseIndex + 1
        //         })
        //     } else {
        //         // complete exercise
        //         setState({
        //             ...state,
        //             completed : true
        //         })
        //     }
        // }
        // // console.debug("after " + JSON.stringify(state))
    }

    const failExercise = () => {
        // TODO
    }

    if (!state.activeWorkout) {
        const stronkContext = useContext(StronkContext);
        const activeWorkout = stronkContext.workoutRepo.retrieveWorkout()

        // initialize completed and remaining exercise lists
        const remaining = new Map()
        const completed = new Map()

        const completedExercises = activeWorkout.workoutExercises.forEach(
            (exercise)=> {
                remaining.set(exercise.id, [])
                completed.set(exercise.id, [])
            }
        );

        setState({
            ...state,
            workoutExercises: activeWorkout.workoutExercises,
            activeWorkout : activeWorkout,
            completedExercises: completed,
            remainingExercises: remaining
        })
    }

    return <ActiveWorkoutScreenUI 
        activeWorkout={state.activeWorkout}
        workoutExercises={state.workoutExercises}
        completedExercises={state.completedExercises}
        remainingExercises={state.remainingExercises}
        completeCurrentExercise={completeExercise}
        failCurrentExercise={failExercise}
    />
}

enum Status{
    Incomplete = 0,
    Passed = 1,
    Failed = 2
}

interface SetRecord {
    status : Status
}

// class ActionableWorkoutExercise {
//     exercise : WorkoutExercise
//     exerciseSets: ExerciseSet[]

//     constructor(
//         exercise : WorkoutExercise,
//         exerciseSets: ExerciseSet[]
//     ) {
//         this.exercise = exercise
//         this.exerciseSets = exerciseSets
//     }
// }

export { ActiveWorkoutScreen, SetRecord }
