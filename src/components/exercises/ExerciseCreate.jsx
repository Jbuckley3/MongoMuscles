import { useState } from 'react'

const ExerciseCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // build our state object
    const [exercise, setExercise] = useState({
        name: '',
        descripton: '',
        duration: '',
        date: '',
    })

    return (
        <h1>Create Exercise Component</h1>
    )
}

export default ExerciseCreate