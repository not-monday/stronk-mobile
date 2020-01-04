type StronkState = {
    user? : User,
    activeWorkout? : Workout
}

const initialState : StronkState = {
}

export {StronkState, initialState}