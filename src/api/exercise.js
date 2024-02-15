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
        url: `${apiUrl}/exercise`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newExercise }
    })
}

// UPDATE -> Adjust a exercise
// DELETE -> Set a pet exercise