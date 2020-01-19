import { NavigationStackProp } from "react-navigation-stack/lib/typescript/types"
import { useState, useContext, Dispatch, SetStateAction } from "react"
import { StronkContext } from "../../../App"
import React from "react"
import { ActiveWorkoutScreenUI } from "./active_workout_screen_ui"

type Props = {
    navigation: NavigationStackProp;
}

interface State {
    workoutRef? : Workout
    exerciseRecords : Map<String, SetRecord[]>,
    currentExerciseIndex: number,
    currentSetIndex: number,
    completed: boolean
}

const initialState : State = {
    exerciseRecords: new Map(),
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    completed : false
}

function ActiveWorkoutScreen (props : Props) {
    const [state, setState] = useState(initialState)

    const completeExercise = () => {
        if (!state.workoutRef) return

        const exercise = state.workoutRef!.workoutExercises[state.currentExerciseIndex]
        const setRecords = state.exerciseRecords.get(exercise.id)!

        console.debug("exercise id " + exercise.exerciseId)
        console.debug("exercises " +  JSON.stringify(state.workoutRef.workoutExercises))
        console.debug("set record " +  JSON.stringify(setRecords))
        console.debug(state)

        // update set record with new status
        const currSetRecord = setRecords[state.currentSetIndex]
        const newSetRecord = {
            ...currSetRecord,
            status : Status.Passed
        }
        const newSetRecords = [...setRecords]
        newSetRecords[state.currentExerciseIndex] = newSetRecord
        state.exerciseRecords.set(exercise.exerciseId, newSetRecords)

        setState({
            ...state,
            exerciseRecords: {...state.exerciseRecords},
        })

        // update the index of the current exercise if it has no more sets
        if (state.currentSetIndex == newSetRecords.length - 1) {
            const newSetIndex = 0
            const newExerciseIndex = state.currentExerciseIndex + 1
            
            if (state.currentExerciseIndex <= state.exerciseRecords.keys.length) {
                setState({
                    ...state,
                    currentSetIndex: newSetIndex,
                    currentExerciseIndex : newExerciseIndex
                })
            } else {
                // complete exercise if all exercises have been completed
                setState({
                    ...state,
                    completed : true
                })
            }
        } else {
            setState({
                ...state,
                currentSetIndex: state.currentSetIndex + 1
            })
        }
        // console.debug("after " + JSON.stringify(state))
    }

    const failExercise = () => {
        // TODO
    }

    // initialize the workoutExercise
    if (!state.workoutRef) {
        const stronkContext = useContext(StronkContext);
        const activeWorkout = stronkContext.workoutRepo.retrieveWorkout()

        // initialize completed and remaining exercise lists
        const exerciseRecords = new Map()
        activeWorkout.workoutExercises.forEach(
            (exercise)=> {
                // create set record for each exercise set
                const setRecords = exercise.exerciseSets.map(()=> SetRecord(Status.Incomplete))
                exerciseRecords.set(exercise.id, setRecords)
            }
        );

        setState({
            ...state,
            workoutRef : activeWorkout,
            exerciseRecords: exerciseRecords
        })
    }

    // const remainingExercises : DisplaySet[][] = []
    // const completedExercises : DisplaySet[][] = []

    state.exerciseRecords.forEach((setRecords)=> {
        if (!state.workoutRef) return

        // const remainingSetRecords = state.workoutRef.workoutExercises
        //     .map(exercise=> {
        //         // get the set records associated with this exercise
        //         const setRecords = state.exerciseRecords.get(exercise.id)
        //     })
        //     .filter(setRecord => setRecord.status == Status.Incomplete)
        //     .map(setRecord => DisplaySet )

        // const completedSetRecords = setRecords.filter(setRecord => {
        //     setRecord.status != Status.Incomplete
        // })

        // if (remainingSetRecords.length > 0) {
        //     remainingExercises.
        // }

        // if (completedSetRecords.length > 0) {
            
        // }

    })

    return <ActiveWorkoutScreenUI 
        activeWorkout={state.workoutRef}
        workoutExercises={state.workoutRef.workoutExercises}
        remainingsets={state.exerciseRecords}
        completedSets={state.exerciseRecords}
        completeCurrentExercise={completeExercise}
        failCurrentExercise={failExercise}
    />
}

enum Status{
    Incomplete = 0,
    Passed = 1,
    Failed = 2
}

type SetRecord = ExerciseSet & {
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

export { ActiveWorkoutScreen, SetRecord, Status as SetRecordstatus }
