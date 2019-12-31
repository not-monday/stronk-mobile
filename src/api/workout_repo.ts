export class WorkoutRepository {
    retrieveProgram() {

    }  

    retrieveWorkoutExercise() : WorkoutExercise {

        const mockExerciseSets = [
            this._mockExerciseSetparams(),
            this._mockExerciseSetparams(),
            this._mockExerciseSetparams(),
        ]

        const mockWorkoutExercise = {
            id : "1",
            name: "workout name",
            exerciseId: "1",
            exerciseSets: mockExerciseSets,
            supersets: [],
        }

        return (mockWorkoutExercise)
    }


    _mockExerciseSetparams() : ExerciseSet {
        return {
            weight : 20,
            reps: 6
        }
    }

}