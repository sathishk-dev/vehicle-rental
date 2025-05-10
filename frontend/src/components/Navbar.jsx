import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Toast from './Toast';
import { GoogleLogin } from '@react-oauth/google'

export default function Navbar({ toggleModal, isModalOpen }) {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  //get auth state
  const isAuth = localStorage.getItem('authToken');
  const isGoogleAuth = localStorage.getItem('googleAuthToken');

  // State for form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload
    axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, { loginEmail, loginPassword })
      .then(result => {
        if (result.data.message === "Success") {
          localStorage.setItem('authToken', true)
          localStorage.setItem('activeUser', result.data.user._id)
          toggleModal();
          navigate('/booking');
        }
        else if (result.data.message === 'error') {
          console.log(result.data.err);
        }
        else {
          setToastMessage(result.data);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      })
      .catch(err => console.log(err))

    // Clear the form fields
    // setLoginEmail('');
    // setLoginPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('activeUser');
    localStorage.removeItem('googleAuthToken')
    navigate('/');
  }

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent page reload
    axios.post(`${import.meta.env.VITE_SERVER_URL}/register_data`, { signupFirstName, signupLastName, signupEmail, signupPassword })
      .then(res => {
        if (res.data.message == true) {
          console.log(res.status)
          setToastMessage("Verification Link Sent to Email");
          setToastType('success')
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);

          // Clear the form fields
          setSignupFirstName('');
          setSignupLastName('');
          setSignupEmail('');
          setSignupPassword('');
          // setActiveTab('login');
        }
        else {
          setToastMessage(res.data.message);
          setToastType('error')
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      })
      .catch(err => console.log(err))

  };


  const handleGoogleLogin = async (res) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`, {
        token: res.credential,
      })
      localStorage.setItem('googleAuthToken', data.token);
      localStorage.setItem('authToken', true)
      localStorage.setItem('activeUser', data.userId)
      navigate('/booking');
      toggleModal();
    }
    catch (err) {
      console.log('Login failed:', err)
      setToastMessage(data.message);
      setToastType('error')
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }

  return (
    <div className='bg-white py-7 px-3 border-b border-[#dfe8f3] sticky top-0 z-10'>

      <div className='flex justify-around items-center '>
        <div className='flex items-center w-1/2 gap-3'>
          <h2 className='w-full md:w-[50%] lg:w-[20%]'>
            <a href="/" className='text-[#3563E9] font-bold text-lg'>KSS RENTAL</a>
          </h2>
          <form className="md:flex items-center max-w-lg mx-auto w-full hidden">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input type="text" id="voice-search" className="border border-gray-30 text-sm rounded-full block w-full ps-10 p-2.5 py-2" placeholder="Search Vehicles" required />
              <button type="button" onClick={toggleSidebar} className="absolute inset-y-0 end-0 flex items-center pe-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500 hover:text-gray-900 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className='flex gap-5 items-center'>
          <a href="/profile" className=''><i className="fa fa-heart text-[#596780] border border-gray-200 rounded-full p-2 hover:bg-gray-500 hover:text-white"></i></a>
          {
            isAuth || isGoogleAuth ? <button onClick={handleLogout} className='bg-blue-500 text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-blue-600'>Logout</button> : <button onClick={toggleModal} className='bg-blue-500 text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-blue-600'>Login</button>
          }
        </div>
      </div>
      <form className="flex items-center max-w-lg mx-auto mt-5 w-[90%] gap-3 md:hidden">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input type="text" id="voice-search2" className="border border-gray-30 text-sm rounded block w-full ps-10 p-2.5 py-2" placeholder="Search Vehicles" required />
        </div>
        <button type="button" onClick={toggleSidebar} className="flex items-center border border-gray-30 p-2.5 py-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-gray-900 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </form>

      {isModalOpen && (
        <div id="default-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="relative p-12 w-full max-w-2xl bg-white rounded-lg shadow  ">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex border-b border-gray-200 dark:border-gray-600">
              <button
                className={`w-1/2 py-3 text-center font-medium ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-400'}`}
                onClick={() => switchTab('login')}
              >
                Log In
              </button>
              <button
                className={`w-1/2 py-3 text-center font-medium ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-400'}`}
                onClick={() => switchTab('signup')}
              >
                Sign Up
              </button>
            </div>
            <div className="py-10">
              {/* Toast Message */}
              <Toast showToast={showToast} toastMessage={toastMessage} toastType={toastType} />

              {activeTab === 'login' ? (
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required />
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Log In</button>
                  <p className='text-center text-gray-400 font-light'>OR Login with</p>
                  <div className="flex justify-center gap-9 mt-8">
                    <button className="border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-400">
                      <i className="fa fa-google" aria-hidden="true"></i>&nbsp; &nbsp;Google
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-400">
                      <i className="fa fa-facebook" aria-hidden="true"></i>&nbsp; &nbsp;Facebook
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup}>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                    value={signupFirstName}
                    onChange={(e) => setSignupFirstName(e.target.value)}
                    required />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                    value={signupLastName}
                    onChange={(e) => setSignupLastName(e.target.value)}
                    required />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required />

                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
                  <p className='text-center text-gray-400 font-light'>OR SignUp with</p>
                  <div className="flex justify-center gap-9 mt-5">
                    {/* <button className="border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-400">
                      <i className="fa fa-google" aria-hidden="true"></i>&nbsp; &nbsp;Google
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-400">
                      <i className="fa fa-facebook" aria-hidden="true"></i>&nbsp; &nbsp;Facebook
                    </button> */}
                    <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log('Login Failed Try Another way !')} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Scrollable content container */}
            <div className="overflow-y-auto h-full mt-8 px-4">
              <ul>
                <li className="py-2 text-[#90A3BF] text-[12px]">Type</li>
                <div className="mt-7">
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">Sport</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-2" className="ms-2 text-sm font-medium text-gray-900">SUV</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-3" className="ms-2 text-sm font-medium text-gray-900">MPV</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-4" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-4" className="ms-2 text-sm font-medium text-gray-900">Sedan</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-5" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-5" className="ms-2 text-sm font-medium text-gray-900">Coupe</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-6" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-6" className="ms-2 text-sm font-medium text-gray-900">Hatchback</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-7" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-7" className="ms-2 text-sm font-medium text-gray-900">Cruiser</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-8" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-8" className="ms-2 text-sm font-medium text-gray-900">Sport Bike</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox-9" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox-9" className="ms-2 text-sm font-medium text-gray-900">Pickup Truck</label>
                  </div>
                </div>
                <li className="py-2 text-[#90A3BF] text-[12px]">Capacity</li>
                <div className="mt-7">
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-1" className="ms-2 text-sm font-medium text-gray-900">2 Seats</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-2" className="ms-2 text-sm font-medium text-gray-900">4 Seats</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-3" className="ms-2 text-sm font-medium text-gray-900">6 Seats</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-4" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-4" className="ms-2 text-sm font-medium text-gray-900">8 or more Seats</label>
                  </div>
                </div>
                <li className="py-2 text-[#90A3BF] text-[12px]">Price</li>

                <div className="mt-7">
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-1" className="ms-2 text-sm font-medium text-gray-900">Low</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-2" className="ms-2 text-sm font-medium text-gray-900">Medium</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-3" className="ms-2 text-sm font-medium text-gray-900">High</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="capacity-checkbox-4" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="capacity-checkbox-4" className="ms-2 text-sm font-medium text-gray-900">Very High</label>
                  </div>
                </div>




              </ul>
            </div>
          </div>
        </div >
      )
      }


    </div >
  );
}
