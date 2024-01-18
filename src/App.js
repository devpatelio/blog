import React from "react";
import Home from "./Home";
import LoginCommand from "./Login";
import NewPost from "./Post";
import BlogShow from "./Blog";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { createClient } from '@supabase/supabase-js'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/d5oIQfpmBvyZLfIxONigsnoat6GtqCEq/" element={<LoginCommand keyType={"d5oIQfpmBvyZLfIxONigsnoat6GtqCEq"} blogID={""} />} />
        <Route path="/post/zPdpmSEsZG3XuiQqoe7FINlays80UvwA/:id" element={<LoginCommandWrapper keyType={"zPdpmSEsZG3XuiQqoe7FINlays80UvwA"} />} />
        <Route path="/post/f6tx5dAkKIIxQlc0ZU6clZNvdSrwRT9i/:id" element={<LoginCommandWrapper keyType={"f6tx5dAkKIIxQlc0ZU6clZNvdSrwRT9i"} />} />
        <Route path="/blog/:id" element={<BlogShow />} />
        <Route path="/d5oIQfpmBvyZLfIxONigsnoat6GtqCEq" element={<NewPost />} />
        <Route path="/zPdpmSEsZG3XuiQqoe7FINlays80UvwA/:id" element={<EditPost />} />
        <Route path="/f6tx5dAkKIIxQlc0ZU6clZNvdSrwRT9i/:id" element={<DeletePost />} />
      </Routes>
    </Router>
  );
}

// LoginCommandWrapper component to extract id from route parameters
function LoginCommandWrapper({ keyType }) {
  const { id } = useParams();
  return <LoginCommand keyType={keyType} blogID={id} />;
}

export default App;