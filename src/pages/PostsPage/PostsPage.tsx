import { useEffect, useState } from "react"
import Post from "../../components/Post/Post"

import './style.css'
import { PostData } from "../../components/Post/Post.interface"
import Loading from "../../components/Loading/Loading"

const PostsPage = () => {

    const [posts, setPosts] = useState<PostData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')


    const getPosts = async () => {
        setLoading(true)
        try {
            const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
            const res = await posts.json()
            setPosts(res)
        } catch (error) {
            setError(`Error: ${error}, `)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])





    return (
        <div className="posts">
            {
                error ||
                    loading ? <Loading /> :
                    posts.map((post: PostData) => {
                        return <Post key={post.id} post={post} />
                    })
            }
        </div>
    )
}

export default PostsPage
