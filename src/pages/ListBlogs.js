import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import EditPost from "../EditPost";
import DeletePost from "../DeletePost";

function ListBlogs() {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const response = await fetch("http://localhost:1080/allblogs");
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setBlogs(jsonResponse);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <a key={blog.resource_id} href={`/blog/${blog.resource_id}`}>
          {/* Adjust max-width and margin styles as needed */}
          <div key={blog.resource_id} className="mx-auto mt-8 bg-white border-t border-gray-300 pt-5" style={{ width: 560 }}>
            <div className="text-2xl font-bold mb-4 mt-1">{blog.title}</div>
            <div className="text-gray-700 mb-4">{blog.description}</div>
            <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Published on: {new Date(blog.post_date).toLocaleDateString()}</div>
            <div className="flex items-center" style={{ marginLeft: 330 }}>
              <Link to={`/post/zPdpmSEsZG3XuiQqoe7FINlays80UvwA/${blog.resource_id}`} className="text-blue-800 text-sm hover:underline mr-2">Edit</Link>
              <Link to={`/post/f6tx5dAkKIIxQlc0ZU6clZNvdSrwRT9i/${blog.resource_id}`} className="text-red-800 text-sm hover:underline">Delete</Link>
            </div>
          </div>
          </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ListBlogs;
