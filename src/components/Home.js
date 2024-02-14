import { useState, useEffect } from "react"
import { getAllExercises } from "../api/exercise"
import LoadingScreen from "./shared/LoadingScreen"

const Home = (props) => {
	const { msgAlert, user } = props
	//	console.log('props in home', props)

	const [exercises, setExercises] = useState(null)

	useEffect(() => {
		getAllExercises()
			// .then(res => console.log('pets from axios call: \n', res.data.exercises))
			.then(res => {
				console.log('use Effect hook ran')
				setExercises(res.data.exercises)
			})
			.catch(error => console.error)

	}, [])

	return (
		<>
			<h2>Home Page</h2>
			{ user !== null ? <h5>Hello {user.email}</h5> : null}
			{pets == null ? <LoadingScreen /> : <p>{exercises[0].name}</p>}
		</>
	)
}

export default Home
