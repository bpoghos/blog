import { useNavigate } from 'react-router'
import { PostData } from './Post.interface'
import './style.css'
import { ChangeEvent, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'




const Post = ({ post, posts, setPosts }: { post: PostData, posts: PostData[], setPosts: any }) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [clicked, setClicked] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(post.title)



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

    const handleEditClick = () => {
        setClicked(true)
        console.log(clicked);

    }

    const handleEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const editPost = async (id: number | string) => {

        try {
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 1,
                    body: 'string',
                    title: title
                })
            })

            const res = await data.json()

            // const index = (post: PostData) => {
            //     return post.id === Number(id)
            // }
            // const postIndex = posts.findIndex(index)

            // const finily = posts.splice(postIndex, 1, res)
            // console.log(finily);

            // setPosts(finily)

            const updatedPosts = posts.map((post) => {
                return post.id === Number(id) ? res : post;
            });

            setPosts(updatedPosts);
            setClicked(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>
            {
                loading ? <Loading /> : (
                    <div className="post" onClick={() => handleClick(post.id)}>
                        {
                            clicked ? (
                                <input type='text' onChange={handleEditTitle} value={title} onClick={(e) => e.stopPropagation()} />
                            ) : (
                                <h1>{post.title}</h1>
                            )
                        }
                        <div>
                            <button onClick={(e) => { e.stopPropagation(); deletePost(post.id) }}>Delete</button>
                            <button
                                onClick={(e) => { e.stopPropagation(); clicked ? editPost(post.id) : handleEditClick(); }}>
                                {clicked ? 'Save' : 'Edit'}
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Post
