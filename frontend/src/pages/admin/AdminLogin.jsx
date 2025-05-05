import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import Toast from '../../components/Toast';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_SERVER2_URL}/adminLogin`, { email, password })
            .then(res => {
                if (res.data.login) {
                    localStorage.setItem('adminName',res.data.name)
                    navigate('/admin/dashboard');
                }
                else {
                    setToastMessage(res.data.message);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='bg-black'>
            <section className="relative bg-[url(https://images.stockcake.com/public/e/8/c/e8cc259b-c2c8-406d-bf71-1a5de2c097e7_large/office-work-environment-stockcake.jpg)] bg-no-repeat bg-center bg-cover min-h-screen">

                {/* Toast Message */}
                <Toast showToast={showToast} toastMessage={toastMessage} toastType={"error"} />


                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

                {/* Flex container for the login form */}
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 relative z-20">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Admin Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
