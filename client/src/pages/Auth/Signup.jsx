import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const [localError, setLocalError] = useState('');

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    const userData = { username, password };
    dispatch(register(userData)).then((res) => {
      if(res.type === 'auth/register/fulfilled') {
         navigate('/dashboard');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light px-4">
      <div className="clay-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-8 font-['Outfit']">Join GKSphere</h2>
        {(isError || localError) && <p className="text-danger text-center mb-4">{localError || message}</p>}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="clay-input"
              placeholder="Choose a username"
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
              placeholder="Create a password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="clay-input"
              placeholder="Confirm password"
              required
            />
          </div>
          <button type="submit" className="clay-btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Already have an account? <a href="/login" className="text-primary font-medium hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
