import { ChangeEvent, useEffect, useState } from "react"
import Post from "../../components/Post/Post"

import './style.css'
import { PostData } from "../../components/Post/Post.interface"
import Loading from "../../components/Loading/Loading"

const PostsPage = () => {

    const [posts, setPosts] = useState<PostData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [title, setTitle] = useState<string>('')


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

    console.log(posts);

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }


    const handleAddPost = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    body: 'Your Body',
                    userId: 1
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPosts([data, ...posts])
        } catch (error) {
            console.error('Error during post creation:', error);
        }
    };



    return (
        <div className="posts">
            <input type="text" placeholder="enter your title..." onChange={handleTitle} value={title} />
            <button onClick={handleAddPost}>add post</button>
            {
                error ||
                    loading ? <Loading /> :
                    posts.map((post: PostData) => {
                        return <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                    })
            }
        </div>
    )
}

export default PostsPage
