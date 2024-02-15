import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => (
    <div className='container-sn' style={{ textAlign: 'center'}}>
        <Spinner role="status" animation="border" variant="info"/>
    </div>
)

export default LoadingScreen