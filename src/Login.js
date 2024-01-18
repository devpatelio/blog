import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCommand = ({ keyType, blogID }) => {
  const [username, setUsername] = useState('if you can hack this page I will give you $100');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUserName = process.env.REACT_APP_LOGIN_USERNAME;
  const loginUserPass = process.env.REACT_APP_LOGIN_PASSWORD;
  // console.log('Username:', loginUserName);
  // console.log('Password:', loginUserPass);

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace the condition with actual authentication logic
    if (username === loginUserName && password === loginUserPass) {
      // Redirect to the special URL after successful login
      navigate(`/${keyType}/${blogID}`);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Login Page</h1>
        <form onSubmit={handleLogin}>
          <label className="block mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCommand;
