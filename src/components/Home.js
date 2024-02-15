import { useState, useEffect } from "react"
import { getAllExercises } from "../api/exercise"
import ExercisesIndex from "./exercises/ExercisesIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	//	console.log('props in home', props)

	// const [exercises, setExercises] = useState(null)


	return (
		<>
			<h2>Home Page</h2>
	{/* 		{ user !== null ? <h5>Hello {user.email}</h5> : null}
			{pets == null ? <LoadingScreen /> : <p>{exercises[0].name}</p>} */}
			<ExercisesIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
