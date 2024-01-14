import { useNavigate } from 'react-router'
import { PostData } from './Post.interface'
import './style.css'
import { useState } from 'react'
import Loading from '../Loading/Loading'




const Post = ({ post, posts, setPosts }: { post: PostData, posts: PostData[], setPosts: any }) => {

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleClick = (id: number | string) => {
        navigate(`/posts/${id}`)
    }


    const deletePost = async (id: number | string) => {
        setLoading(true)
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE'
            })


            let filtered = posts.filter((post) => post.id !== id)
            setPosts(filtered)

        } catch (error) {
            setLoading(false)
            throw error
        }
        finally {
            setLoading(false)
        }

    }



    return (

        <>
            {
                loading ? <Loading /> : (
                    <div className="post" onClick={() => handleClick(post.id)}>
                        <h1>{post.title}</h1>
                        <button onClick={(e) => { e.stopPropagation(); deletePost(post.id) }}>Delete</button>
                    </div>
                )
            }

        </>
    )
}

export default Post
