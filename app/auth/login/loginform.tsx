"use client";

import { useState } from 'react';

export const LoginFormNew: React.FC = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    'Email': '',
    'Password': ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    'Email': null,
    'Password': null
  });

  const handleFocus = (label: string) => {
    setFocusedInput(label);
  };

  const handleBlur = (label: string) => {
    setFocusedInput(null);

    // Perform validation on blur
    if (label === 'Email' && inputValues['Email']) {
      validateEmail();
    }
  };

  const handleChange = (label: string, value: string) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [label]: value
    }));

    // Clear error when user starts typing again
    setErrors(prevErrors => ({
      ...prevErrors,
      [label]: null
    }));
  };

  const validateEmail = () => {
    const email = inputValues['Email'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        'Email': "That's not a valid email. Please try again."
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        'Email': null
      }));
    }
  };

  return (
    <div className="justify-center items-center h-3/4 bg-gray-800 w-1/2">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 p-4 text-white">Log In</h2>
        <p className="mb-8 text-cyan-500 font-semibold text-base md:text-lg">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline font-semibold">
            Sign Up
          </a>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden max-w-7xl w-full">
        {/* Left side - Log in form */}
        <div className="md:p-8">
          <form>
            {['Email', 'Password'].map((label, index) => (
              <div key={index} className="relative mb-6">
                <input
                  type={label === 'Password' ? 'password' : 'email'}
                  id={label}
                  value={inputValues[label]}
                  onChange={(e) => handleChange(label, e.target.value)}
                  onFocus={() => handleFocus(label)}
                  onBlur={() => handleBlur(label)}
                  className={`w-full px-4 pt-4 pb-2 border-b-2 transition-all bg-gray-800 text-white ${
                    focusedInput === label || inputValues[label]
                      ? errors[label] ? 'border-red-500' : 'border-blue-500'
                      : 'border-gray-100/10'
                  } focus:border-blue-500 outline-none`}
                  required
                />
                <label
                  htmlFor={label}
                  className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
                    focusedInput === label || inputValues[label] ? '-top-2 text-xs' : 'top-4'
                  } ${errors[label] ? 'text-red-500' : ''}`}
                >
                  {label}
                </label>
                {errors[label] && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>{errors[label]}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-end mb-6">
              <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-700 text-white rounded hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right side - Social login */}
        <div className="bg-gray-800 flex flex-col justify-center items-center">
          <p className="mb-4 text-white/80 font-bold md:text-lg">or</p>
          <button className="flex items-center w-3/4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Continue with Google
          </button>
          <button className="flex items-center w-3/4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition">
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
