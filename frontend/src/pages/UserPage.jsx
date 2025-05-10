import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Toast from '../components/Toast';

export default function UserPage() {

    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState('');

    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('');

    const fetchUser = async () => {
        const activeUser = localStorage.getItem("activeUser");

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${activeUser}`);

            if (data.status == true) {
                setUserName(data.data.signupFirstName +" "+ data.data.signupLastName);
                setAddress(data.data.address);
            }
        }
        catch (error) {
            console.log("System error", error);
        }
    }

    const updateUser = async (e) => {
        e.preventDefault();
        const { activeUser } = localStorage.getItem("activeUser");

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/update`, {
                userId: activeUser,
                name: userName,
                address: address,
            });

            if (data.status == true) {
                setToastMessage("Profile Updated Sucessfully");
                setToastType('success')
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                setToastMessage(data.message);
                setToastType('error')
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        }
        catch (error) {
            console.log("System error", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <div className='md:px-[40px] px-[20px]'>
            <div className='my-9 flex gap-5 flex-col md:flex-row'>
                <div className='md:w-1/2 w-full bg-white p-6 rounded-lg flex flex-col gap-3'>
                    <h3 className='font-bold text-lg'>Rental Details</h3>
                    <div>
                        <img src="./assets/look.png" alt="" className='rounded-lg' />
                    </div>
                    <div className='flex justify-between '>
                        <div className='lg:w-1/2 w-full flex gap-5 items-center'>
                            <img src="./assets/look.png" alt="" className='w-1/2 rounded-lg' />
                            <div>
                                <h3 className='font-bold lg:text-lg mb-2 text-sm'>Nissan GT-R</h3>
                                <p className='text-gray-500 lg:text-sm text-xs'>Sports Car</p>
                            </div>
                        </div>
                        <p className='text-gray-500 lg:text-xs text-[11px]'>#79798</p>
                    </div>
                    <div className='bg-white py-4  px-2 rounded-lg'>
                        <h2 className='mb-3 font-medium text-sm'><img src="/assets/icons/mark.svg" alt="" className='inline mr-1 w-3' /> Pick-Up</h2>
                        <div className='flex justify-center items-center gap-2 md:gap-9'>
                            <div className="relative inline-block text-left border-r-2 pr-2 md:pr-9 border-gray-100 w-full">
                                <h2 className='font-semibold mb-1'>Locations</h2>
                                <p className='text-sm text-gray-500'>Tindivanam</p>
                            </div>
                            <div className='w-1/2 md:w-full'>
                                <h2 className='font-semibold mb-1'>Date</h2>
                                <div className="">
                                    <p className='text-sm text-gray-500'>12.12.2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white py-4 px-2 rounded-lg'>
                        <h2 className='mb-3 font-medium text-sm'><img src="/assets/icons/mark.svg" alt="" className='inline mr-1 w-3' /> Drop-Off</h2>
                        <div className='flex justify-center items-center gap-2 md:gap-9'>
                            <div className="relative inline-block text-left border-r-2 pr-2 md:pr-9 border-gray-100 w-full">
                                <h2 className='font-semibold mb-1'>Locations</h2>
                                <p className='text-sm text-gray-500'>Tindivanam</p>
                            </div>
                            <div className='w-1/2 md:w-full'>
                                <h2 className='font-semibold mb-1'>Date</h2>
                                <div className="">
                                    <p className='text-sm text-gray-500'>12.12.2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center md:gap-2 lg:gap-0'>
                        <div>
                            <h3 className='font-bold text-lg'>Total Rental Price</h3>
                            <p className='text-gray-500 text-sm'>Overall price and includes rental discount</p>
                        </div>
                        <p className='font-bold text-xl'>$80.00</p>
                    </div>
                </div>

                <div className='md:w-1/2 w-full flex flex-col justify-between gap-3'>
                    <div className=' bg-white p-6 rounded-lg'>
                        <h3 className='font-bold text-lg'>Profile</h3>


                        <div className="w-full p-4 bg-white  sm:p-6 md:p-8">
                            <form className="space-y-6" onSubmit={updateUser}>
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                    <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5" required />
                                </div>
                                <div>
                                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                    <textarea value={address} onChange={(e)=> setAddress(e.target.value)} name="address" id="" className="bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[100px] p-2.5" placeholder="Address" required ></textarea>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                            </form>
                        </div>


                    </div>
                    <div className=' bg-white p-6 rounded-lg'>
                        <div className='flex justify-between mb-4'>
                            <h3 className='font-bold text-lg'>Recent Transaction</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div className='mb-4'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='md:w-1/2 w-full flex md:gap-2 lg:gap-5 gap-3 items-center'>
                                    <img src="./assets/look.png" alt="" className='w-1/2 rounded-lg' />
                                    <div>
                                        <h3 className='font-bold lg:text-lg mb-2 text-sm'>Nissan GT-R</h3>
                                        <p className='text-gray-500 lg:text-sm text-xs'>Sports Car</p>
                                    </div>
                                </div>
                                <div className='text-end'>
                                    <p className='text-gray-500 text-xs'>20-jul</p>
                                    <p className='font-bold lg:text-lg text-sm mt-2'>$80.00</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className='mb-4'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='md:w-1/2 w-full flex md:gap-2 lg:gap-5 gap-3 items-center'>
                                    <img src="./assets/look.png" alt="" className='w-1/2 rounded-lg' />
                                    <div>
                                        <h3 className='font-bold lg:text-lg mb-2 text-sm'>Nissan GT-R</h3>
                                        <p className='text-gray-500 lg:text-sm text-xs'>Sports Car</p>
                                    </div>
                                </div>
                                <div className='text-end'>
                                    <p className='text-gray-500 text-xs'>20-jul</p>
                                    <p className='font-bold lg:text-lg text-sm mt-2'>$80.00</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className=''>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='md:w-1/2 w-full flex md:gap-2 lg:gap-5 gap-3 items-center'>
                                    <img src="./assets/look.png" alt="" className='w-1/2 rounded-lg' />
                                    <div>
                                        <h3 className='font-bold lg:text-lg mb-2 text-sm'>Nissan GT-R</h3>
                                        <p className='text-gray-500 lg:text-sm text-xs'>Sports Car</p>
                                    </div>
                                </div>
                                <div className='text-end'>
                                    <p className='text-gray-500 text-xs'>20-jul</p>
                                    <p className='font-bold lg:text-lg text-sm mt-2'>$80.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Toast showToast={showToast} toastMessage={toastMessage} toastType={toastType} />

            </div>
        </div>
    )
}
