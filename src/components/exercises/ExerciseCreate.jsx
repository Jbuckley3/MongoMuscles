import { useState } from 'react'
import ExerciseForm from '../shared/ExerciseForm'
import { useNavigate } from 'react-router-dom'
import { createExercise } from '../../api/exercise'
import messages  from '../shared/AutoDismissAlert/messages'


const ExerciseCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    const navigate = useNavigate()
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

    const onSubmit = (e) => {
        e.preventDefault()

        createExercise(user, exercise)
            .then(res => { navigate(`/exercises/${res.data.exerciseid}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createExerciseSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }


    console.log('the exercise inside create', exercise)

    return (
        <ExerciseForm
            exercise={exercise}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new exercise!"
        />
    )
}

export default ExerciseCreate