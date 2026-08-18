import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    dispatch(login(userData)).then((res) => {
      if(res.type === 'auth/login/fulfilled') {
         navigate('/dashboard');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light px-4">
      <div className="clay-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-8 font-['Outfit']">Login to GKSphere</h2>
        {isError && <p className="text-danger text-center mb-4">{message}</p>}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="clay-input"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="clay-input"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="clay-btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Don't have an account? <a href="/signup" className="text-primary font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
