class Exercise {
    constructor(
        readonly id: String,
        readonly description: String
    ) {}  
}

class Program {
    constructor(
        readonly name: String,
        readonly workouts: Workout[]
    ){}
}

/**
 * represents an entire workout 
 */
class Workout {
    constructor(
        readonly id: String,
        readonly name: String,
        readonly description: String | null,
        readonly workoutExercises: WorkoutExercise[],
    ) {}
}

/**
 * represents each exercise in a workout
 */
class WorkoutExercise {
    constructor(
        readonly id: String, // id uniquely identifies the exercise with context to this workout
        readonly name: String,
        readonly exerciseId: String, // id of the "global" exercise, null if custom
        readonly exerciseSets: ExerciseSet[], // each set of the exercise
        readonly supersets: WorkoutExercise[], // exercises being superset with this one
    ) {}
}

/**
 * represents each "set" for a specific exercise with a weight and rep value
 */
class ExerciseSet {
    constructor (
        readonly weight : number,
        readonly reps: number,
    ) {}
}