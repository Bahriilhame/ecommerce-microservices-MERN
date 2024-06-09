// // Register.js

// import { useState } from 'react';
// import authAPI from '../../Services/auth';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     lname: '',
//     fname: '',
//     email: '',
//     password: '',
//     phone: '',
//     role: 'acheteur'
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await authAPI.register(formData);
//       console.log(response.data); // Handle successful registration response
//     } catch (error) {
//       console.error(error.response.data); // Handle registration error
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required />
//         <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required />
//         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;




import { useState } from 'react';
import authAPI from '../../Services/auth';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lname: '',
    fname: '',
    email: '',
    password: '',
    phone: '',
    address:'',
    role: 'acheteur'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.register(formData);
      console.log(response.data);
      navigate('/profile');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 mt-10 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white"
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white mt-5"
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white mt-5"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white mt-5"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white mt-5"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-cyan-500 text-gray-100 w-full py-4 rounded-lg hover:bg-cyan-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span>Register</span>
                  </button>
                </form>
              </div>
              <div className="my-8 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Already have an account?
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-cyan-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <Link to="/login">
                    <span className="ml-4">Sign In</span>
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

export default Register;

