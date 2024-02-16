import ExercisesIndex from "./Exercises/ExercisesIndex"

const Home = (props) => {
	const { msgAlert } = props
	//	console.log('props in home', props)

	// const [exercises, setExercises] = useState(null)


	return (
		<>
			<h2  className="centered-text">All Exercises</h2>

			<ExercisesIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
