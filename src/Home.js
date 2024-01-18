import React from "react";
import './App.css';
import "./pages/bigCard.css";
import ListBlogs from "./pages/ListBlogs";
import bigCardStyle from "./pages/bigCard";

function Home() {
  const userName = process.env.REACT_APP_LOGIN_USERNAME;
  const userPass = process.env.REACT_APP_LOGIN_PASSWORD;
  console.log('Username:', userName);
  console.log('Password:', userPass);
    return (
        <div className="App flex flex-col min-h-screen">
          <header className="bg-gray-900 text-white p-4 flex justify-between items-center whitespace-no-wrap">
            <h1 className='text-3xl ml-40'><a href="/">Terminal.</a></h1>
            <div className="flex space-x-2 items-right">
              <a href="/post/d5oIQfpmBvyZLfIxONigsnoat6GtqCEq" className="text-gray-500 text-sm hover:text-white mr-40">Publish New Post</a>
            </div>
          </header>
    
          <div className='mx-auto text-left p-4 flex-grow'>
            <p className="text-2xl max-w text-gray-600 mb-4 mt-8 text-center" style={{ width: 1000 }}>A repository of open-sourced knowledge and models.</p>
            <ListBlogs></ListBlogs>
          </div>
    
          <footer className="bg-gray-900 text-white mt-10 p-4 flex justify-between items-center">
            <p className="ml-40">Produced by Dev Patel. <a className='text-lg'>♗</a></p>
            <div className="flex space-x-2 mr-40">
              <a href="https://github.com/devpatelio" className="text-gray-500 text-sm hover:text-white">Github</a>
              <a href="https://x.com/devpatelio" className="text-gray-500 text-sm hover:text-white">X</a>
              <a href="https://www.linkedin.com/in/dev-patel-25456219a/" className="text-gray-500 text-sm hover:text-white">LinkedIn</a>
            </div>
          </footer>
        </div>
      );
};

export default Home;
