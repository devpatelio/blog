import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from './createClient';

function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const post_date = currentDateTime.toLocaleString()

  const IMAGE_REGEX = /img\((https:\/\/\S+)\)/;

  const replaceImages = (content) => {
    return content.replace(IMAGE_REGEX, '<img src="$1" alt="Image" /><br>');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contentWithImages = replaceImages(content);

    const body = {
      title: title,
      description: description,
      content: replaceImages(contentWithImages), 
      post_date: post_date,
    };

    // const response = await fetch("http://localhost:1080/postblog", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // });

    const response = await supabase.from('blog_entries').insert(body);
    console.log(JSON.stringify(body));
    navigate("/");

    if (response.ok) {
      const data = await JSON.stringify(response);
      console.log("New resource added:", data);
    } else {
      console.error("Failed to add new resource");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">Create a new resource</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-2">Title:</label>
            <input required minLength="5" className="w-full border rounded-md py-2 px-3" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="descr" className="block text-sm font-semibold text-gray-600 mb-2">Description:</label>
            <input required minLength="5" className="w-full border rounded-md py-2 px-3" type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-2">Content:</label>
            <textarea required minLength="5" rows="8" className="w-full border rounded-md py-2 px-3 resize-y" value={content} onChange={(event) => setContent(event.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="post_date" className="block text-sm font-semibold text-gray-600 mb-2">Date:</label>
            <input readOnly required minLength="5" maxLength="100" className="w-full border rounded-md py-2 px-3" type="text" value={post_date} />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
