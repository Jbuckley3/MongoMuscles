import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ExerciseForm from '../shared/ExerciseForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditExerciseModal = (props) => {
    // pull the important things from our props
    const { user, show, handleClose, updateExercise, msgAlert, triggerRefresh } = props
    // we're bringing in the exercise from props, but only for the initial state
    // by using the original exercise as our initial state for a NEW piece of state, specific to this component (called exercise), we'll be able to modify the exercise we are updating without affecting the original state in the parent component
    const [exercise, setExercise] = useState(props.exercise)


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
         // make the API call
         updateExercise(user, exercise)
         // close the modal
         .then(() => handleClose())
         .then(() => {
             msgAlert({
                 heading: 'Oh Yeah!',
                 message: messages.updateExerciseSuccess,
                 variant: 'success'
             })
         })
         .then(() => triggerRefresh())
         // send error message if applicable
         .catch(() => {
             msgAlert({
                 heading: 'Oh no!',
                 message: messages.generalError,
                 variant: 'danger'
             })
         })
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ExerciseForm 
                    exercise={exercise}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Exercise"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditExerciseModal