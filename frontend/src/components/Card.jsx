import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Toast from './Toast';

export default function Card() {

    const [vehicles, setVehicles] = useState([]);

    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const userId = localStorage.getItem('activeUser');

    // const [vehicleType, setVehicleType] = useState('All');
    // const filteredVehicles = vehicles.filter(vehicle =>
    //     vehicleType === 'All' || vehicle.type === vehicleType
    // );

    useEffect(() => {
        axios.post(`/vehicle/get`,{userId})
            .then(res => {
                setVehicles(res.data);
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleLike = async(id,index)=>{
        // console.log(id)
        try{
            if(!localStorage.getItem('authToken')){
                setToastMessage('Please Login !');
                setToastType('error')
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                return;
            }
            const toggleLike = !vehicles[index].isLiked;
            const {data} = await axios.put(`/vehicle/updateFav/${id}`,{toggleLike,userId});

            toggleLike ? setToastMessage('Added to Favourite'):setToastMessage('Removed from favourite')
            setToastType('success')
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

            const updateVehicles = [...vehicles];
            updateVehicles[index].isLiked = toggleLike;
            setVehicles(updateVehicles);
        }
        catch(err){
            console.log('vehicle update error: ',err);
            setToastMessage('Sorry Server Error');
            setToastType('error')
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

        }

    }

    return (
        <div>
            {/* Toast Message */}
            <Toast showToast={showToast} toastMessage={toastMessage} toastType={toastType} />
            <div className='my-9'>
                <h5 className='text-gray-500 text-xs font-semibold ml-6'>Popular Car</h5>
                <div className='flex flex-wrap justify-between'>


                    <div className="lg:w-[calc(25%-1rem)] md:w-[calc(33%)] w-full bg-white border border-gray-200 rounded-lg shadow px-5 py-5 my-5 flex flex-col justify-between">
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='font-bold'>Vehicle Name</h3>
                                <p className='text-xs text-gray-500 font-semibold'>Category</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer text-red-500">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>

                            {/* Disabled like */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>


                        </div>
                        <a href="/details">
                            <img className="p-5 my-6 rounded-t-lg" src="./assets/car2.png" alt="vehicle image" />
                        </a>
                        <div>
                            <div className="flex items-center mt-2.5 mb-5 justify-center">
                                <div className="flex justify-between w-full text-gray-500">
                                    <div className='flex gap-1 items-center'>
                                        <img src="/assets/icons/gas-station.svg" alt="" className='w-3' />
                                        <p className='text-xs'>90L</p>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <img src="/assets/icons/car.svg" alt="" className='w-3' />
                                        <p className='text-xs'>Manual</p>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <img src="/assets/icons/user.svg" alt="" className='w-3' />
                                        <p className='text-xs'>2 People</p>
                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className=" font-bold text-gray-900 text-[14px] ">$99.00/<span className='text-gray-500 text-xs'>day</span> </span>
                                <a href="/booking" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-xs px-3 py-2 text-center ">Rent Now</a>
                            </div>
                        </div>
                    </div>

                    {
                        vehicles.map((vehicle, index) => (
                            <div key={index} className="lg:w-[calc(25%-1rem)] md:w-[calc(33%)] w-full bg-white border border-gray-200 rounded-lg shadow px-5 py-5 my-5 flex flex-col justify-between">
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='font-bold'>{vehicle.vehicleName}</h3>
                                        <p className='text-xs text-gray-500 font-semibold'>{vehicle.category}</p>
                                    </div>
                                    <div onClick={()=>handleLike(vehicle._id,index)}>
                                        {
                                            vehicle.isLiked ?(
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer text-red-500">
                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                </svg>
                                            ):(
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg> 
                                            )
                                        }
                                    </div>
                                </div>
                                <a href="/details">
                                    <img className="p-5 my-6 rounded-t-lg" src={vehicle.imageUrl} alt="vehicle image" />
                                </a>
                                <div>
                                    <div className="flex items-center mt-2.5 mb-5 justify-center">
                                        <div className="flex justify-between w-full text-gray-500">
                                            <div className='flex gap-1 items-center'>
                                                <img src="/assets/icons/gas-station.svg" alt="" className='w-3' />
                                                <p className='text-xs'>{vehicle.fuelCapacity}L</p>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <img src="/assets/icons/car.svg" alt="" className='w-3' />
                                                <p className='text-xs'>{vehicle.mode}</p>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <img src="/assets/icons/user.svg" alt="" className='w-3' />
                                                <p className='text-xs'>{vehicle.capacity} People</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className=" font-bold text-gray-900 text-[14px] ">${vehicle.offerPrice}.00/<span className='text-gray-500 text-xs'>day</span> </span>
                                        <a href="/booking" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-xs px-3 py-2 text-center ">Rent Now</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>

            </div>

        </div>
    )
}
