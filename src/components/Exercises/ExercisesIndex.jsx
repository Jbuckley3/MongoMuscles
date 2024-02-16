import React, { useState, useEffect } from "react";
import { getAllExercises } from "../../api/exercise";
import LoadingScreen from "../shared/LoadingScreen";

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import messages from '../shared/AutoDismissAlert/messages';
import '../../global.css'

// Styling object
const cardContainerLayout = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
};

const ExercisesIndex = (props) => {
  const [exercises, setExercises] = useState(null);
  const [error, setError] = useState(false);

  const { msgAlert } = props;

  useEffect(() => {
    getAllExercises()
      .then(res => {
        setExercises(res.data.exercises);
      })
      .catch(error => {
        msgAlert({
          heading: 'Oh no!',
          message: messages.generalError,
          variant: 'danger'
        });
        setError(true);
      });
  }, []);

  if (error) {
    return <LoadingScreen />;
  }

  if (!exercises) {
    return <LoadingScreen />;
  }

  const exerciseCards = exercises.map(exercise => (
    <Card key={exercise._id} style={{ width: '30%', margin: 5 }}>
      <Card.Header className="centered-text">{exercise.name}</Card.Header>
      <Card.Body>
        <Card.Text className="centered-text">
          <Link to={`/exercises/${exercise._id}`} className='btn btn-info'>
            view
          </Link>
        </Card.Text>
        {exercise.owner ?
          <Card.Footer className="centered-text">owner: {exercise.owner.email} </Card.Footer>
          :
          null
        }
      </Card.Body>
    </Card>
  ));

  return (
    <div className="container-md" style={cardContainerLayout}>
      {exerciseCards}
    </div>
  );
};

export default ExercisesIndex;
