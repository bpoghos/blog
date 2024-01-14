import { Link } from 'react-router-dom'
import './style.css'

const HomaPage = () => {
    return (
        <div className='home-page'>
            <h1>HomePage</h1>
            <Link to={"/posts"}>
                <button>Posts</button>
            </Link>
        </div>
    )
}

export default HomaPage
