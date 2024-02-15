import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneExercise, removeExercise } from '../../api/exercise'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ExerciseShow = (props) => {
    const { exerciseId } = useParams()
    const { user, msgAlert } = props
    // console.log('these are props in ExerciseShow', props)
    // console.log('this is the id param in ExerciseShow', exerciseId)
   
   const [exercise, setExercise] = useState(null)
    // this gives us a function we can use to navigate via react-router
    const navigate = useNavigate()

   useEffect(() => {
    getOneExercise(exerciseId)
        .then(res => setExercise(res.data.exercise))
        .catch(err => {
            msgAlert({
                heading: 'Oh no!', 
                message: 'something went wrong', 
                variant: 'danger'
        })
        })
   }, [])
   // console.log('the exercise in showExercise', exercise)

    // this is an api call function, which means we'll need to handle the promise chain.
    // this means sending appropriate messages, as well as navigating upon success
    const deleteExercise = () => {
        // we want to remove the pet
        removeExercise(user, exercise._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'We deleted the exercises!',
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })
    }
   if (!exercise) {
    return <LoadingScreen />
   }

    return (
        <>
        <Container className='m-2'>
            <Card>
                <Card.Header>
                    { exercise.fullTitle }
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Name: {exercise.name}</small><br/>
                        <small>Description: {exercise.description}</small><br/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {
                        exercise.owner && user && exercise.owner._id === user._id
                        ?
                        <>
                            <Button>
                                Edit Exercise
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={() => deleteExercise()}
                            >
                                Delete Exercise
                            </Button>
                        </>
                        :
                        null
                    }
                    <br/>
                    {
                        exercise.owner ? `owner: ${exercise.owner.email}` : null
                    }
                </Card.Footer>
            </Card>
        </Container>
    </>    )
}

export default ExerciseShow