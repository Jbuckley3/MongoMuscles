
import { Form, Button, Container } from 'react-bootstrap'

const ExerciseForm = (props) => {
    
    const { exercise, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is your exercise name?"
                        id="name"
                        name="name"
                        value={ exercise.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control 
                        placeholder="What is your exercise's description?"
                        id="description"
                        name="description"
                        value={ exercise.type }
                        onChange={handleChange}
                    />

                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ExerciseForm 