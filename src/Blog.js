import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { supabase } from './createClient';

function BlogShow() {
  const [blogs, setBlog] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // const response = await fetch(`http://localhost:1080/allblogs/${id}`);
        // const data = await response.json();
        // setBlog(data);

        const {data, error} = await supabase.from('blog_entries').select().eq('resource_id', id);
        console.log(data);
        const response_data = JSON.stringify(data);
        setBlog(JSON.parse(response_data));
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen text-black items-center"> {/* Center content vertically */}
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center whitespace-no-wrap w-full">
        <h1 className='text-3xl ml-10'>
        <a href="/">Terminal.</a>
        </h1>
        <div className="flex space-x-2 items-right">
        <a href="/post/d5oIQfpmBvyZLfIxONigsnoat6GtqCEq" className="text-gray-500 text-sm hover:text-white">Publish New Post</a>
        </div>
    </header>
    {blogs.slice().reverse().map((blog) => (
       <div className="flex-grow p-4 pt-10 mt-14" style={{ width: 700 }}> {/* Adjust max-width here */}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-900 mb-2">{blog.description}</p>
        <div className="flex items-center mb-4">
        <p className="text-gray-600 mt-3">Author: Dev Patel</p>
        <div className="border-r border-gray-500 mx-4 mt-3 h-6"></div> {/* Vertical divider */}
        <p className="text-gray-500 mt-3">Published on: {new Date(blog.post_date).toLocaleDateString()}</p>
        <div className="flex items-center mt-4" style={{ marginLeft: 250 }}>
              <Link to={`/post/zPdpmSEsZG3XuiQqoe7FINlays80UvwA/${blog.resource_id}`} className="text-blue-800 text-sm hover:underline mr-2">Edit</Link>
              <Link to={`/post/f6tx5dAkKIIxQlc0ZU6clZNvdSrwRT9i/${blog.resource_id}`} className="text-red-800 text-sm hover:underline">Delete</Link>
        </div>
        </div>
        <div className="border-b border-gray-500 mb-4"></div> {/* Horizontal divider */}
        <div className="text-black mb-4" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div> ))}
    <footer className="bg-gray-900 text-white p-4 flex justify-between items-center w-full mt-10">
        <p className="ml-10 flex-grow">Produced by Dev Patel. <a className='text-lg'>♗</a></p>
        <div className="flex space-x-2">
        <a href="https://github.com/devpatelio" className="text-gray-500 text-sm hover:text-white">Github</a>
        <a href="https://x.com/devpatelio" className="text-gray-500 text-sm hover:text-white">X</a>
        <a href="https://www.linkedin.com/in/dev-patel-25456219a/" className="text-gray-500 text-sm hover:text-white">LinkedIn</a>
        </div>
    </footer>
    </div>

  );
}

export default BlogShow;
