import { useState, useEffect } from "react"
import { getAllExercises } from "../api/exercise"

const Home = (props) => {
	const { msgAlert, user } = props
	//	console.log('props in home', props)

	const [exercises, setExercises] = useState(null)

	useEffect(() => {
		getAllExercises()
			.then(res => console.log('pets: \n', res.data.exercises))
			.catch(error => console.error)
	}, [])

	return (
		<>
			<h2>Home Page</h2>
		</>
	)
}

export default Home
