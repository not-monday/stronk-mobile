interface WorkoutRepository {
    retrieveProgram() : Program
    retrieveWorkout() : Workout
}

class WorkoutRepositoryImpl implements WorkoutRepository {
    retrieveProgram() : Program {
        return this.mockProgram()
    }  

    retrieveWorkout() : Workout {
        return this.mockWorkout()
    }

    mockWorkoutExercise() : WorkoutExercise {

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

    mockWorkout() : Workout {
        const mockWorkoutExercises = [
            this.mockWorkoutExercise(),
            this.mockWorkoutExercise(),
            this.mockWorkoutExercise(),
        ]

        const mockWorkout = {
            id : "mock_id",
            name: "mock workout",
            description: "mock description",
            workoutExercises: mockWorkoutExercises
        }

        return mockWorkout
    }

    mockProgram() : Program {
        const mockWorkouts = [
            this.mockWorkout(),
            this.mockWorkout(),
            this.mockWorkout(),
        ]

        return {
            name: "mock program name",
            workouts: mockWorkouts
        }
    }

}

export { WorkoutRepository, WorkoutRepositoryImpl } 