/** @format */

import { Route, Routes } from "react-router-dom";

import Posts from "./pages/Posts/Posts";
import Post from "./pages/Post/Post";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
