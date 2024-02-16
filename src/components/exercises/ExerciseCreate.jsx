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
        description: '',
    })

    const onChange = (e) => {
        e.persist();
        setExercise(prevExercise => {
            const updatedName = e.target.name;
            const updatedValue = e.target.value;
            const updatedExercise = { [updatedName]: updatedValue };
    
            return {
                ...prevExercise,
                ...updatedExercise
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault()

        createExercise(user, exercise)
            .then(res => { navigate(`/Exercises/${res.data.exercise._id}`)})
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