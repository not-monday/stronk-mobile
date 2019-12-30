type Exercise = {
    id: String
    description: String
}

type Program = {
    name: String
    workouts: Workout
}

type Workout = {
    id: String
    name: String
    description: String
    workoutExercises: [WorkoutExercise]
    completed: Boolean
}

type WorkoutExercise = {
    id: String; // id uniquely identifies the exercise with context to this workout
    name: String
    exerciseId: String
    exerciseSets: [ExerciseSet] // each set of the exercise
    supersets: [WorkoutExercise] // exercises being superset with this one
    completed: Boolean;
}

type ExerciseSet = {
    weight : number
    reps: number
    completed: Boolean
    failed: Boolean
}