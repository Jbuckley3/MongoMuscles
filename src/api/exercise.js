import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllExercises = () => {
    return axios(`${apiUrl}/exercises`)
}