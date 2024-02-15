import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneExercise } from '../../api/exercise'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'

const ExerciseShow = (props) => {
    const { exerciseId } = useParams()
    const { user, msgAlert } = props
    // console.log('these are props in petShow', props)
    // console.log('this is the id param in ExerciseShow', exerciseId)
   
   const [exercise, setExercise] = useState(null)

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
                        exercise.owner ? `owner: ${exercise.owner.email}` : null
                    }
                </Card.Footer>
            </Card>
        </Container>
    </>    )
}

export default ExerciseShow