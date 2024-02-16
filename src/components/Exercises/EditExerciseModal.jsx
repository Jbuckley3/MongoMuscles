import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ExerciseForm from '../shared/ExerciseForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditExerciseModal = (props) => {
    const { user, show, handleClose, updateExercise, msgAlert, triggerRefresh } = props
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
         .then(() => handleClose())
         .then(() => {
             msgAlert({
                 heading: 'Success!',
                 message: messages.updateExerciseSuccess,
                 variant: 'success'
             })
         })
         .then(() => triggerRefresh())
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