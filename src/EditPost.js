import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from "./createClient";

function EditPost() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [content, setContent] = useState(blog.content);
  const [post_date, setPostDate] = useState("");

  const [oldBlog, setoldBlog] = useState({});
  console.log(id);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const getResponse = await fetch(`http://localhost:1080/allblogs/${id}`);
        const data = await getResponse.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    // Set the state with blog data when available
    setTitle(blog.title || "");
    setDescription(blog.description || "");
    setContent(blog.content || "");
    setPostDate(blog.post_date || "");
  }, [blog]);

  const IMAGE_REGEX = /img\((https:\/\/\S+)\)/;

  const replaceImages = (content) => {
    return content.replace(IMAGE_REGEX, '<br><img src="$1" className="justify-center items-center" alt="Image" /><br>');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contentWithImages = replaceImages(content);
    const body = {
      title,
      description,
      content: replaceImages(contentWithImages),
      post_date,
    };

    try {
      const response = await fetch(`http://localhost:1080/allblogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Blog was updated.");
        navigate(`/blog/${id}`);
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-2">Title:</label>
            <input
              required
              minLength="5"
              className="w-full border rounded-md py-2 px-3"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descr" className="block text-sm font-semibold text-gray-600 mb-2">Description:</label>
            <input
              required
              minLength="5"
              className="w-full border rounded-md py-2 px-3"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-2">Content:</label>
            <textarea
              required
              minLength="5"
              rows="8"
              className="w-full border rounded-md py-2 px-3 resize-y"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="post_date" className="block text-sm font-semibold text-gray-600 mb-2">Date:</label>
            <input
              readOnly
              required
              minLength="5"
              maxLength="100"
              className="w-full border rounded-md py-2 px-3"
              type="text"
              value={post_date}
            />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
