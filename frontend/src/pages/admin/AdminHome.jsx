import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../../components/Toast';
import VehiclesList from './VehiclesList';

const AdminHome = () => {

  const [adminName, setAdminName] = useState()
  useEffect(() => {
    const name = localStorage.getItem('adminName')
    setAdminName(name)
    // console.log(name)
  }, [])

  const [adminEmail, setAdminEmail] = useState()
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER2_URL}/dashboard`)
      .then(res => {
        // console.log(res)
        if (!res.data.valid) {
          navigate('/admin');
        }
        else {
          setAdminEmail(res.data.email)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  const handleSignOut = () => {
    axios.get(`${import.meta.env.VITE_SERVER2_URL}/adminLogout`)
      .then(res => {
        if (res.data.logout) {
          navigate('/admin')
        }
      })
      .catch(err => console.log(err))
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [section, setSection] = useState('inventory'); // Track the current section
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // DB Store Logic
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleDetails,setVehicleDetails] = useState('');
  const [category,setCategory] = useState('');
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleMode, setVehicleMode] = useState("Manual");
  const [actualPrice, setActualPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [vehicleImage, setVehicleImage] = useState('');
  const [fuelCapacity, setFuelCapacity] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');

  const storeData = (e) => {
    e.preventDefault();
    // console.log(vehicleName, vehicleType, vehicleMode, actualPrice, offerPrice, vehicleImage, fuelCapacity, vehicleCapacity)
    axios.post(`${import.meta.env.VITE_SERVER_URL}/addVehicle`, { vehicleName,category, vehicleDetails, vehicleType, vehicleMode, actualPrice, offerPrice, vehicleImage, fuelCapacity, vehicleCapacity })
      .then(res => {
        console.log(res.data.message);

        setToastMessage(res.data.message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        setVehicleName('');
        setCategory('');
        setVehicleDetails('');
        setActualPrice('');
        setOfferPrice('');
        setVehicleImage('');
        setFuelCapacity('');
        setVehicleCapacity('');
      })
      .catch(err => console.log(err))
  }

  // Users List Get

  const [regUsers, setRegUsers] = useState([]);

  const getUsers = () => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/getUsers`)
      .then(res => {
        setRegUsers(res.data);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="min-h-screen flex flex-col">

      <Toast showToast={showToast} toastMessage={toastMessage} toastType={"success"} />

      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 px-7 flex justify-between items-center">
        <div className="text-xl font-bold"> <a href="/">KSS Rental</a> </div>
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 md:me-0 focus:ring-4 "
              type="button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKQcvmHvgciTlnwD21AR1C8g_GBM0ogm-7SA&s"
                alt="Profile"
              />
              <svg
                className="w-2.5 h-2.5 ms-3 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <div className="px-4 py-3 text-sm text-gray-900 ">
                  <div className="font-medium">{adminName}</div>
                  <div className="truncate">{adminEmail}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 ">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 "
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignOut();
                    }}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 w-64 bg-blue-700 text-white p-6 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 z-20 h-screen md:h-auto `}
        >
          <div className="text-xl font-bold">Admin Dashboard</div>
          <nav className="flex flex-col mt-4 space-y-2">
            <button
              onClick={() => {
                setSection('inventory');
                setSidebarOpen(false);
              }}
              className={`p-2 hover:bg-blue-800 rounded ${section === 'inventory' && 'bg-blue-800'}`}
            >
              Inventory Management
            </button>
            <button
              onClick={() => {
                setSection('users');
                setSidebarOpen(false);
                getUsers();
              }}
              className={`p-2 hover:bg-blue-800 rounded ${section === 'users' && 'bg-blue-800'}`}
            >
              User Management
            </button>
            <button
              onClick={() => {
                setSection('rental');
                setSidebarOpen(false);
              }}
              className={`p-2 hover:bg-blue-800 rounded ${section === 'rental' && 'bg-blue-800'}`}
            >
              Rental History
            </button>
            <button
              onClick={() => {
                setSection('availableVehicles');
                setSidebarOpen(false);
              }}
              className={`p-2 hover:bg-blue-800 rounded ${section === 'availableVehicles' && 'bg-blue-800'}`}
            >
              Available Vehicles
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 w-full  bg-blue-50 p-6 md:w-[50%] ">
          {section === 'inventory' && (
            <div> 
              <h1 className="text-2xl font-bold mb-6 text-blue-700">Add New Vehicle</h1>
              <form className="space-y-4" onSubmit={storeData}>
                <div className="flex gap-2">
                <div className='w-full'>
                  <label className="block text-sm font-medium text-blue-700">Vehicle Name</label>
                  <input type="text" className="mt-1 p-2 w-full border border-blue-300 rounded" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} placeholder='BMW m5cs' />
                </div>
                <div className='w-full'>
                  <label className="block text-sm font-medium text-blue-700">Category</label>
                  <input type="text" className="mt-1 p-2 w-full border border-blue-300 rounded" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Sports Car' />
                </div>
                </div>
                

                <div>
                  <label className="block text-sm font-medium text-blue-700">Vehicle Details</label>
                  <textarea name="" id="" className="mt-1 p-2 w-full border resize-none border-blue-300 rounded" value={vehicleDetails} onChange={(e) => setVehicleDetails(e.target.value)} placeholder='vehicle details'></textarea>
                  {/* <input type="text" className="mt-1 p-2 w-full border border-blue-300 rounded" value={vehicleDetails} onChange={(e) => setVehicleDetails(e.target.value)} placeholder='vehicle details' /> */}
                </div>

                <div className='flex gap-2'>
                  <div className='w-full'>
                    <label className="block text-sm font-medium text-blue-700">Type</label>
                    <select className="mt-1 p-2 w-full border border-blue-300 rounded" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
                      <option value="Car">Car</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Truck">Truck</option>
                    </select>
                  </div>
                  <div className='w-full'>
                    <label className="block text-sm font-medium text-blue-700">Mode</label>
                    <select className="mt-1 p-2 w-full border border-blue-300 rounded" value={vehicleMode} onChange={(e) => setVehicleMode(e.target.value)} required>
                      <option value="Manual">Manual</option>
                      <option value="Auto">Auto</option>
                    </select>
                  </div>
                </div>


                <div className='flex gap-2'>
                  <div className='w-full'>
                    <label className="block text-sm font-medium text-blue-700">Actual Price</label>
                    <input type="number" className="mt-1 p-2 w-full border border-blue-300 rounded" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} placeholder='100' required />
                  </div>
                  <div className='w-full'>
                    <label className="block text-sm font-medium text-blue-700">Offer Price</label>
                    <input type="number" className="mt-1 p-2 w-full border border-blue-300 rounded" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} placeholder='90' required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700">Image Link</label>
                  <input type="text" className="mt-1 p-2 w-full border border-blue-300 rounded" value={vehicleImage} onChange={(e) => setVehicleImage(e.target.value)} placeholder='Paste Image Link' />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-blue-700">Image</label>
                  <input type="file" className="mt-1 w-full border border-blue-300 rounded" required />
                </div> */}
                <div className='flex gap-2'>
                  <div className='w-full'>
                    <label className="block text-sm font-medium text-blue-700">Fuel Capacity</label>
                    <input type="number" className="mt-1 p-2 w-full border border-blue-300 rounded" value={fuelCapacity} onChange={(e) => setFuelCapacity(e.target.value)} placeholder='13' required />
                  </div>
                  <div className='w-full'>
                    <label className="block text-sm font-medium text-blue-700">Capacity</label>
                    <input type="number" className="mt-1 p-2 w-full border border-blue-300 rounded" value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} placeholder='4' required />
                  </div>
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 mb-2 rounded">Add Vehicle</button>
              </form>
            </div>
          )}

          {section === 'users' && (
            <div className='w-full'>
              <h1 className="text-2xl font-bold mb-6 text-blue-700">Registered Users</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left bg-white shadow rounded-lg">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-4">First name</th>
                      <th className="p-4">Last name</th>
                      <th className="p-4">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      regUsers.length == 0 ? (
                        <tr>
                          <td className="p-4">No Registered Users</td>
                        </tr>
                      ) : (
                        regUsers.map((user, index) => (
                          <tr key={index}>
                            <td className="p-4">{user.signupFirstName}</td>
                            <td className="p-4">{user.signupLastName}</td>
                            <td className="p-4">{user.signupEmail}</td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === 'rental' && (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-blue-700">Rental History</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Date Rented</th>
                      <th className="p-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4">Jane</td>
                      <td className="p-4">Toyota Camry</td>
                      <td className="p-4">2024-10-11</td>
                      <td className="p-4">14:30</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === 'availableVehicles' && (
            <VehiclesList />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
