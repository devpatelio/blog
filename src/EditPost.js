import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from "./createClient";

function EditPost() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const curr_date = currentDateTime.toLocaleString()

  useEffect(() => {
    const fetchBlogData = async () => {
      // Fetch the existing blog data from Supabase
      const { data, error } = await supabase
        .from('blog_entries')
        .select('*')
        .eq('resource_id', id);

      if (error) {
        console.error('Error fetching blog data:', error.message);
      } else if (data && data.length > 0) {
        setBlog(data[0]);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Update the blog entry in Supabase
    const { data, error } = await supabase
      .from('blog_entries')
      .update({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        post_date: curr_date,
      })
      .eq('resource_id', id);

    if (error) {
      console.error('Error updating blog entry:', error.message);
    } else {
      console.log('Blog entry updated successfully:', data);
      // Redirect to the blog details page after update
      navigate(`/blog/${id}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-2">Title:</label>
            <input
              required
              minLength="5"
              className="w-full border rounded-md py-2 px-3"
              type="text"
              value={blog.title || ''}
              onChange={(event) => setBlog({ ...blog, title: event.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descr" className="block text-sm font-semibold text-gray-600 mb-2">Description:</label>
            <input
              required
              minLength="5"
              className="w-full border rounded-md py-2 px-3"
              type="text"
              value={blog.description || ''}
              onChange={(event) => setBlog({ ...blog, description: event.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-2">Content:</label>
            <textarea
              required
              minLength="5"
              rows="8"
              className="w-full border rounded-md py-2 px-3 resize-y"
              value={blog.content || ''}
              onChange={(event) => setBlog({ ...blog, content: event.target.value })}
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
              value={curr_date}
            />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Update Post</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
