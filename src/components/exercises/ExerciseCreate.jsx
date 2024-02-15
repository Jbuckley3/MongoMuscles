import { useState } from 'react'
import ExerciseForm from '../shared/ExerciseForm'

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

    const onChange = (e) => {
        e.persist()

        setExercise(prevExercise => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            // this will actually buiild our exercise object
            // we grab an attribute name, and assign the respective value
            const updatedExercise = { [updatedName] : updatedValue }

            // to keep all the old stuff, and add newly typed letter/numbers etc
            return {
                ...prevExercise, ...updatedExercise
            }
        })
    }
    console.log('the exercise inside create', exercise)

    return (
        <ExerciseForm
            exercise={exercise}
            handleChange={onChange}
            handleSubmit={() => {console.log('handles submit')}}
            heading="Add a new exercise!"
        />
    )
}

export default ExerciseCreate