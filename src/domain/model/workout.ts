class Exercise {
    constructor(
        readonly id: String,
        readonly description: String
    ) {}  
}

class Program {
    constructor(
        readonly name: String,
        readonly workouts: Workout
    ){}
}

class Workout {
    constructor(
        readonly id: String,
        readonly name: String,
        readonly description: String,
        readonly workoutExercises: [WorkoutExercise],
    ) {}
   
}

class WorkoutExercise {
    constructor(
        readonly id: String, // id uniquely identifies the exercise with context to this workout
        readonly name: String,
        readonly exerciseId: String,
        readonly exerciseSets: ExerciseSet[], // each set of the exercise
        readonly supersets: WorkoutExercise[], // exercises being superset with this one
    ) {}
}

class ExerciseSet {
    constructor (
        readonly weight : number,
        readonly reps: number,
    ) {}
}