import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);

    const [vehicleType, setVehicleType] = useState('All');
    const filteredVehicles = vehicles.filter(vehicle =>
        vehicleType === 'All' || vehicle.type === vehicleType
    );

    useEffect(() => {
        axios.post(`/vehicle/get`)
            .then(res => {
                setVehicles(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`/vehicle/delete/${id}`)
            .then(res => {
                // console.log(res);
                setVehicles(prevVehicle => prevVehicle.filter(vehicle => vehicle._id !== id));
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Available Vehicles</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700">Filter by Type</label>
                <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="mt-1 p-2 w-full border border-blue-300 rounded"
                >
                    <option value="All">All</option>
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Truck">Truck</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr className='text-left'>
                                <th className="p-4">Image</th>
                                <th className="p-4">Vehicle Name</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Mode</th>
                                <th className="p-4">OG Price</th>
                                <th className="p-4">Offer Price</th>
                                <th className="p-4">Fuel</th>
                                <th className="p-4">Capacity</th>
                                <th className="p-4">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredVehicles.map((vehicle, index) => (
                                <tr key={index} className='border-b-2'>
                                    <td className="p-4"> <img src={vehicle.imageUrl} className='w-20' alt="" /></td>
                                    <td className="p-4">{vehicle.vehicleName}</td>
                                    <td className="p-4">{vehicle.type}</td>
                                    <td className="p-4">{vehicle.mode}</td>
                                    <td className="p-4">{vehicle.actualPrice}</td>
                                    <td className="p-4">{vehicle.offerPrice}</td>
                                    <td className="p-4">{vehicle.fuelCapacity}</td>
                                    <td className="p-4">{vehicle.capacity}</td>
                                    <td className="p-4">
                                        <a href="" onClick={(e) => { e.preventDefault(); handleDelete(vehicle._id) }} className='inline-flex items-center justify-center p-2 flex-shrink-0 w-10 h-10 text-red-500 bg-red-100 rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>



                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
