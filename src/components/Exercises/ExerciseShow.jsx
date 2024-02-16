import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneExercise, removeExercise, updateExercise } from '../../api/exercise'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditExerciseModal from './EditExerciseModal'


const ExerciseShow = (props) => {
    const { exerciseId } = useParams()
    const { user, msgAlert } = props
   
   const [exercise, setExercise] = useState(null)
   const [editModalShow, setEditModalShow] = useState(false)
   // this is a boolean, that we can switch between to trigger a page re-render
   const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

   useEffect(() => {
    getOneExercise(exerciseId)
        .then(res => setExercise(res.data.exercise))
        .catch(err => {
            msgAlert({
                heading: 'Oh no!', 
                message: 'messages.generalError', 
                variant: 'danger'
        })
        })
   }, [updated])

    const deleteExercise = () => {
    
        removeExercise(user, exercise._id)
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.deleteExerciseSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
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
                            <Button
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}
                            >
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
        <EditExerciseModal 
                user={user}
                show={editModalShow}
                updateExercise={updateExercise}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                exercise={exercise}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />             
    </>    
    )
}

export default ExerciseShow