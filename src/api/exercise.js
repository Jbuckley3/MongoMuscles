import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllExercises = () => {
    return axios(`${apiUrl}/exercises`)
}

// READ -> Show 
export const getOneExercise = (id) => {
    return axios(`${apiUrl}/exercises/${id}`)

}

// CREATE -> Add a exercise
export const createExercise = (user, newExercise) => {
    return axios({
        url: `${apiUrl}/exercises`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { exercise: newExercise }
    })
}

// UPDATE -> Adjust a exercise
export const updateExercise = (user, updatedExercise) => {
    return axios({
        url: `${apiUrl}/exercises/${updatedExercise._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { exercise: updatedExercise }
    })
}
// DELETE -> Delete a exercise
export const removeExercise = (user, id) => {
    return axios({
        url: `${apiUrl}/exercises/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}