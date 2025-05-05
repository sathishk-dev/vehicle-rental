import React from 'react'
import Card from './Card'

export default function HeroSec() {
    return (
        <div className='md:px-[40px] px-[20px]'>
            <div className=' flex justify-between mt-9 gap-[50px] lg:h-[350px] h-[300px] '>
                <div className='rounded-lg h-full md:w-1/2 w-full left-ad border p-5 flex flex-col justify-between'>
                    <div className='text-white w-full lg:w-2/3 flex flex-col gap-3'>
                        <h3 className='font-semibold text-[23px] lg:text-[25px]'>The Best Platform for Vehicle Rental</h3>
                        <p className='text-[13px] lg:text-[16px]'>Ease of doing rental safely and reliably. Of course at a low price.</p>
                        <a href="/booking" className='bg-[#3563E9] hover:bg-blue-700 px-4 py-2 rounded w-fit text-sm lg:text-[16px]'>Rental Car</a>
                    </div>
                    <div className='w-full mx-auto'>
                        <img src="./assets/car1.png" alt="" className='w-full lg:w-[80%] mx-auto' />

                    </div>
                </div>
                <div className='rounded-lg h-full w-1/2 right-ad border p-5 hidden md:block flex flex-col justify-between'>
                    <div className='text-white w-full lg:w-2/3 flex flex-col gap-3'>
                        <h3 className='font-semibold text-[23px] lg:text-[25px]'>Easy way to rent a vehicle at a low price</h3>
                        <p className='text-[13px] lg:text-[16px]'>Providing cheap rental services and safe and comfortable facilities.</p>
                        <a href="/booking" className='bg-[#54A6FF] hover:bg-blue-400 px-4 py-2 rounded w-fit text-sm lg:text-[16px]'>Rental Car</a>
                    </div>
                    <div className='w-full mx-auto mt-5 lg:mt-0'>
                        <img src="./assets/car2.png" alt="" className='w-full lg:w-[65%] mx-auto' />

                    </div>
                </div>
            </div>


            {/* from to location */}
            <div className='flex my-6 justify-around items-center mx-auto flex-wrap lg:flex-nowrap w-full md:w-[80%] lg:w-full'>
                <div className='bg-white md:py-6 py-4 md:px-9 px-4 rounded-lg shadow-sm lg:w-1/2 w-full'>
                    <h2 className='mb-3 font-medium text-sm'><img src="/assets/icons/mark.svg" alt="" className='inline mr-1 w-3' /> Pick-Up</h2>
                    <div className='flex justify-center items-center gap-2 md:gap-9'>
                        <div className="relative inline-block text-left border-r-2 pr-2 md:pr-9 border-gray-100 w-full">
                            <h2 className='font-semibold mb-1'>Locations</h2>
                            <select className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Select Your City</option>
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>Chicago</option>
                            </select>
                        </div>
                        <div className='w-1/2 md:w-full'>
                            <h2 className='font-semibold mb-1'>Date</h2>
                            <div className="">
                                <input
                                    type="date"
                                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <a href='' className='bg-blue-500 p-3 rounded-lg shadow-lg mx-9 hover:bg-blue-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>

                </a>
                <div className='bg-white md:py-6 py-4 md:px-9 px-4 rounded-lg shadow-sm lg:w-1/2 w-full'>
                    <h2 className='mb-3 font-medium text-sm'><img src="/assets/icons/mark.svg" alt="" className='inline mr-1 w-3' /> Drop-Off</h2>
                    <div className='flex justify-center items-center gap-2 md:gap-9'>
                        <div className="relative inline-block text-left border-r-2 pr-2 md:pr-9 border-gray-100 w-full">
                            <h2 className='font-semibold mb-1'>Locations</h2>
                            <select className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Select Your City</option>
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>Chicago</option>
                            </select>
                        </div>
                        <div className='w-1/2 md:w-full'>
                            <h2 className='font-semibold mb-1'>Date</h2>
                            <div className="">
                                <input
                                    type="date"
                                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Card />
        </div>
    )
}
