import { useState, useEffect } from "react"
import { getAllExercises } from "../../api/exercise"
import LoadingScreen from "../shared/LoadingScreen"

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


//Styling object
const cardContainerLayout = {
    display: 'flex', 
    flexFlow: 'row wrap', 
    justifyContent: 'center'
}

const ExercisesIndex = (props) => {
    const [exercises, setExercises] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props


	useEffect(() => {
		getAllExercises()
			// .then(res => console.log('pets from axios call: \n', res.data.exercises))
			.then(res => {
				console.log('use Effect hook ran', res.data.exercises)
				setExercises(res.data.exercises)
			})
            .then(() => {
                msgAlert({
                    heading: 'Success!', 
                    message: 'Got all the exercises!', 
                    variant: 'success'
                })
               
            })
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!', 
                    message: 'something went wrong', 
                    variant: 'danger'
            })
            setError(true)
        });
	}, [])
    // console.log('the exercises in ExercisesIndex /n', exercises)

    if (error) {
        return <LoadingScreen />
    }

    if (!exercises) {
        return <LoadingScreen />
    }

    const exerciseCards = exercises.map(exercise => (
        <Card key={exercise.id} style={{ width: '30%', margin: 5}} >
            <Card.Header>{exercise.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/exercises/${exercise.id}`} className='btn btn-info'>
                        view
                    </Link>
                </Card.Text>
                { exercise.owner ?
                    <Card.Footer>owner: {exercise.owner.email} </Card.Footer>
                    :
                    null
                }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { exerciseCards }
        </div>
    )
 }

export default ExercisesIndex