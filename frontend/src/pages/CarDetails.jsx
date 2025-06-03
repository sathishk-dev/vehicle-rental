import React, { useState } from 'react';
import Card from '../components/Card';
import { Link, useLocation } from 'react-router-dom';

export default function CarDetails() {
    const location = useLocation();
    const { vehicle } = location.state || {};

    const [mainImage, setMainImage] = useState(vehicle.imageUrl);

    const handleImageClick = (src) => {
        setMainImage(src);
    };



    return (
        <div className='md:px-[40px] px-[20px]'>
            <div className='my-9  flex md:flex-row gap-7 flex-col'>
                <div className='flex md:w-1/2 w-full mb-4 md:mb-0'>
                    <div className="grid gap-4">
                        {/* Main Image */}
                        <div>
                            <img className="w-full h-[350px] rounded-lg object-cover" src={mainImage} alt="Main Image" />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <img
                                    onClick={() => handleImageClick("https://www.motortrend.com/uploads/sites/10/2020/01/2020-chevrolet-bolt-ev-lt-5door-hatchback-angular-front.png")}
                                    className="h-auto max-w-full rounded-lg cursor-pointer"
                                    src="https://www.motortrend.com/uploads/sites/10/2020/01/2020-chevrolet-bolt-ev-lt-5door-hatchback-angular-front.png"
                                    alt="Thumbnail 1"
                                />
                            </div>
                            <div>
                                <img
                                    onClick={() => handleImageClick(vehicle.imageUrl)}
                                    className="h-auto max-w-full rounded-lg cursor-pointer"
                                    src={vehicle.imageUrl}
                                    alt="Thumbnail 2"
                                />
                            </div>
                            <div>
                                <img
                                    onClick={() => handleImageClick("https://th.bing.com/th/id/OIP.rpytaEiWRDXzl6_TzEm44wHaE8?pid=ImgDet&w=474&h=316&rs=1")}
                                    className="h-auto max-w-full rounded-lg cursor-pointer"
                                    src="https://th.bing.com/th/id/OIP.rpytaEiWRDXzl6_TzEm44wHaE8?pid=ImgDet&w=474&h=316&rs=1"
                                    alt="Thumbnail 3"
                                />
                            </div>
                            <div>
                                <img
                                    onClick={() => handleImageClick("https://th.bing.com/th/id/OIP.K6-rsGY3CaI1tx1yGkLKDQHaEK?pid=ImgDet&w=474&h=266&rs=1")}
                                    className="h-auto max-w-full rounded-lg cursor-pointer"
                                    src="https://th.bing.com/th/id/OIP.K6-rsGY3CaI1tx1yGkLKDQHaEK?pid=ImgDet&w=474&h=266&rs=1"
                                    alt="Thumbnail 4"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 w-full bg-white border border-gray-200 rounded-lg shadow lg:p-[50px] lg:px-[70px] p-5 flex flex-col justify-between gap-5 md:gap-0">
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='font-semibold md:text-2xl text-lg'>{vehicle.vehicleName}</h3>
                            <p className='text-green-400 text-sm lg:text-base'>{vehicle.category}</p>


                        </div>
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-500">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </a>

                        {/* Disabled like */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hidden">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <p className='text-gray-500 lg:text-lg text-xs md:text-base '>{vehicle.details}</p>
                    <div className='text-xs md:text-base'>
                        <div className='flex justify-between'>
                            <h2 className='text-gray-400'>Type Car</h2>
                            <p className='font-bold'>{vehicle.category}</p>
                            <h2 className='text-gray-400'>Capacity</h2>
                            <p className='font-bold'>{vehicle.capacity} Person</p>
                        </div>
                        <div className='flex justify-between mt-1 md:mt-5'>
                            <h2 className='text-gray-400'>Steering</h2>
                            <p className='font-bold'>{vehicle.mode}</p>
                            <h2 className='text-gray-400'>Gasoline</h2>
                            <p className='font-bold'>{vehicle.fuelCapacity}L</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className=" font-bold text-gray-900 md:text-2xl text-lg">${vehicle.offerPrice}.00/<span className='text-gray-500 text-xs'>day</span> </span>
                                <p className='text-gray-500 md:mt-1 md:text-sm text-xs font-semibold line-through'>${vehicle.actualPrice}.00</p>
                            </div>
                            <Link to="/booking" state={{ vehicle }} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm md:px-8 md:py-4 px-4 py-2 text-center ">Rent Now</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Card />
        </div>
    );
}
