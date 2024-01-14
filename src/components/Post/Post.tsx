import { useNavigate } from 'react-router'
import { PostData } from './Post.interface'
import './style.css'


const Post = ({ post }: { post: PostData }) => {


    const navigate = useNavigate()

    const handleClick = (id: number | string) => {
        navigate(`/posts/${id}`)
    }

    // const deletePost = async (id: number) => {
    //     const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })

    // }



    return (
        <div className="post" onClick={() => handleClick(post.id)}>
            <h1>{post.title}</h1>
            <button>Delete</button>
        </div>
    )
}

export default Post
