import { useParams } from 'react-router'
import './style.css'
import { useEffect, useState } from 'react'
import { PostData } from '../../components/Post/Post.interface'
import Loading from '../../components/Loading/Loading'

const SinglePage = () => {

    const [posts, setPosts] = useState<PostData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const params = useParams()

    const { id } = params
    const singlePost = posts.find((post: PostData) => post.id === Number(id))


    const getPosts = async () => {
        setLoading(true)
        try {
            const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
            const res = await posts.json()
            setPosts(res)
        } catch (error) {
            setError(true)
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className='single-page'>
            {
                loading ? <Loading /> : (
                    <>
                        <h1>SinglePage</h1>
                        <h2>Title: {singlePost?.title}</h2>
                    </>
                )
            }
        </div>
    )
}

export default SinglePage
