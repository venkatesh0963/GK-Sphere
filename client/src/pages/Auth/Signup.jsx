import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
    <div className="flex items-center justify-center min-h-screen bg-background-light px-4 py-8">
      <div className="clay-card p-6 sm:p-8 w-full max-w-md">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6 sm:mb-8 font-['Outfit']">Join GKSphere</h2>
        {(isError || localError) && <p className="text-danger text-center mb-4 text-sm font-medium">{localError || message}</p>}
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="clay-input w-full text-sm sm:text-base"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="clay-input w-full text-sm sm:text-base"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="clay-input w-full text-sm sm:text-base"
              placeholder="Confirm password"
              required
            />
          </div>
          <button type="submit" className="clay-btn-primary w-full mt-2" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
