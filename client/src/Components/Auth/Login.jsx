import  { useState } from 'react';
import authAPI from '../../Services/auth';
import {Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await authAPI.login(formData);
    window.location='http://127.0.0.1:5173/profile';
    } catch (error) {
    console.error(error.response.data);
    }
};
  

  return (
    <div className="min-h-screen text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">
                        Sign In
                    </h1>
                    <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs">
                    <form onSubmit={handleSubmit}>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white"
                                type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white mt-5"
                                type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password" />
                            <button  type="submit"
                                className="mt-5 tracking-wide font-semibold bg-cyan-500 text-gray-100 w-full py-4 rounded-lg hover:bg-cyan-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <span className="ml-3">
                                    Sign In
                                </span>
                            </button>
                            </form>
                        </div>
                        <div className="my-8 border-b text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Don&apos;t have an account
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-cyan-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                <Link to="/register">
                                <span className="ml-4">
                                    Register
                                </span>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
