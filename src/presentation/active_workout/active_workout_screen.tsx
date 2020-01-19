import { NavigationStackProp } from "react-navigation-stack/lib/typescript/types"
import { useState, useContext, Dispatch, SetStateAction } from "react"
import { StronkContext } from "../../../App"
import React from "react"
import { ActiveWorkoutScreenUI } from "./active_workout_screen_ui"

type Props = {
    navigation: NavigationStackProp;
}

interface State {
    workoutRef?: Workout
    exerciseRecords: ExerciseRecord[],
    setRecords: SetRecord[][],
    currentExerciseIndex: number,
    currentSetIndex: number,
    completed: boolean
}

const initialState : State = {
    exerciseRecords: [],
    setRecords: [],
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    completed : false
}

function ActiveWorkoutScreen (props : Props) {
    const [state, setState] = useState(initialState)

    const completeExercise = () => {
        console.debug("complete exercise " + state.currentExerciseIndex + ", " + state.currentSetIndex)
        if (!state.workoutRef) return

        const setRecords = state.setRecords[state.currentExerciseIndex]

        // update set record with new status
        const currSetRecord = setRecords[state.currentSetIndex]
        const newSetRecord = {
            ...currSetRecord,
            status : Status.Passed
        }
        const newExerciseSetRecords = [...setRecords]
        newExerciseSetRecords[state.currentSetIndex] = newSetRecord
        const newSetRecords = [...state.setRecords]
        newSetRecords[state.currentExerciseIndex] = newExerciseSetRecords

        var newSetIndex = state.currentSetIndex + 1
        var newExerciseRecords = state.exerciseRecords
        var newExerciseIndex = state.currentExerciseIndex
        var completedWorkout = state.completed
        
        // update the index of the current exercise if it has no more sets
        if (state.currentSetIndex == newSetRecords.length - 1) {
            // update the exercises to reflect the completion of current exercise
            const currExerciseRecord = state.exerciseRecords[state.currentExerciseIndex]
            newExerciseRecords = [...state.exerciseRecords]
            newExerciseRecords[state.currentExerciseIndex] = { ...currExerciseRecord, status: Status.Passed}

            newSetIndex = 0
            newExerciseIndex = state.currentExerciseIndex + 1
            
            if (state.currentExerciseIndex == state.setRecords.length) {
                // complete workout if all exercises have been completed
                completedWorkout = true
            }
        }

        setState({
            ...state,
            currentSetIndex: newSetIndex,
            currentExerciseIndex : newExerciseIndex,
            exerciseRecords: newExerciseRecords,
            setRecords: newSetRecords,
            completed: completedWorkout
        })

        console.debug(state)
    }

    const failExercise = () => {
        // TODO
    }

    // initialize the workoutExercise
    if (!state.workoutRef) {
        const stronkContext = useContext(StronkContext);
        const activeWorkout = stronkContext.workoutRepo.retrieveWorkout()

        const exerciseRecords =  activeWorkout.workoutExercises.map(exercise=> {
            const exerciseRecord : ExerciseRecord = { 
                ...exercise,
                status : Status.Incomplete
            }
            return exerciseRecord
        })
        
        const setRecords = activeWorkout.workoutExercises.map(exercise=> 
            // create set record for each exercise set
            exercise.exerciseSets.map(exerciseSet=> {
                const setRecord : SetRecord = { 
                    ...exerciseSet,
                    status : Status.Incomplete
                }
                return setRecord
            })
        )

        setState({
            ...state,
            workoutRef : activeWorkout,
            exerciseRecords: exerciseRecords,
            setRecords: setRecords
        })
    }

    return <ActiveWorkoutScreenUI 
        activeWorkout={state.workoutRef}
        exerciseRecords={state.exerciseRecords}
        setRecords={state.setRecords}
        completeCurrentExercise={completeExercise}
        failCurrentExercise={failExercise}
    />
}

enum Status{
    Incomplete = 0,
    Passed = 1,
    Failed = 2
}

type ExerciseRecord = WorkoutExercise & {
    status : Status
}

type SetRecord = ExerciseSet & {
    status : Status
}

export { ActiveWorkoutScreen, SetRecord, ExerciseRecord, Status as SetRecordstatus }
