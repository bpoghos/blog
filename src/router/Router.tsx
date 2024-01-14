import { Route, Routes } from "react-router"
import PostsPage from "../pages/PostsPage/PostsPage"
import HomaPage from "../pages/HomePage/HomaPage"
import SinglePage from "../pages/SinglePage/SinglePage"



const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomaPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<SinglePage />} />
    </Routes>
  )
}

export default Router
