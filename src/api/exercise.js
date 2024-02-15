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