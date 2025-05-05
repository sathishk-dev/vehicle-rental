import { useState } from 'react';

export default function BookingForm() {
    // State hooks for form inputs
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        town: '',
        pickupLocation: '',
        pickupTime: '',
        pickupDate: '',
        dropoffLocation: '',
        dropoffTime: '',
        dropoffDate: '',
        paymentMethod: '',
        marketingConsent: false,
        termsConsent: false,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <div className="bg-[#F6F7F9]">
                {/* Rental Summary */}
                <div className="my-8 mx-6 bg-white rounded-lg">
                    <div className="p-4">
                        <h1 className="text-[#1A202C] font-bold">Rental Summary</h1>
                        <p className="text-[#90A3BF] text-[12px]">Prices may change depending on the length of the rental and the price of your rental car.</p>
                    </div>
                    <div className="p-4 flex items-center">
                        <div className="h-[80px] w-[116px] left-ad rounded-lg flex items-center justify-center">
                            <img src="./assets/car1.png" alt="Car" className='w-full lg:w-[80%]' />
                        </div>
                        <div className="pl-4">
                            <h1 className="text-[#1A202C] font-bold">Nissan GT - R</h1>
                        </div>
                    </div>
                    <div className="p-4">
                        <hr></hr>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-[12px] text-[#90A3BF] font-semibold">Subtotal</h1>
                            <p className="text-[16px] text-[#1A202C] font-bold flex-end">$80.00</p>
                        </div>
                        <div>
                            <h1 className="text-[12px] text-[#90A3BF] font-semibold">Tax</h1>
                            <p className="text-[16px] text-[#1A202C] font-bold flex-end">$0</p>
                        </div>
                    </div>
                    <div className="bg-slate-100 rounded-2xl m-4 p-4 flex items-center justify-between">
                        <h1 className="text-[12px] text-[#90A3BF] font-semibold">Apply Promo Code</h1>
                        <a href='' className="text-[16px] text-[#1A202C] font-semibold flex-end">Apply Now</a>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <div>
                            <h1 className="text-[16px] text-[#90A3BF] font-semibold">Total Rental Price</h1>
                            <p className="text-[12px] text-[#1A202C] font-normal flex-end">Overall Price Rental</p>
                        </div>
                        <div>
                            <p className="text-[16px] text-[#1A202C] font-bold flex-end">$80.00</p>
                        </div>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="my-8 mx-6 bg-white rounded-lg">
                    <div className="flex items-center justify-between p-4">
                        <div>
                            <h1 className="text-[16px] text-[#1A202C] font-semibold">Billing Info</h1>
                            <p className="text-[12px] text-[#90A3BF] font-normal flex-end">Please Enter your Billing Info</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-[#90A3BF] font-normal flex-end">Step 1 of 4</p>
                        </div>
                    </div>
                    <div className="pt-6 px-4">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                            <input type="text" id="address" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-5 pb-4">
                            <label htmlFor="town" className="block mb-2 text-sm font-medium text-gray-900">Town/City</label>
                            <input type="text" id="town" name="town" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Town/City" value={formData.town} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                {/* Rental Info */}
                <div className="my-8 mx-6 bg-white rounded-lg">
                    <div className="flex items-center justify-between p-4">
                        <div>
                            <h1 className="text-[16px] text-[#1A202C] font-semibold">Rental Info</h1>
                            <p className="text-[12px] text-[#90A3BF] font-normal flex-end">Please Enter your Rental Date</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-[#90A3BF] font-normal flex-end">Step 2 of 4</p>
                        </div>
                    </div>
                    <h2 className="text-[16px] text-[#1A202C] font-bold p-4">Pick Off</h2>
                    <div className="px-4 mb-5 relative">
                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Locations</label>
                        <select id="pickupLocation" name="pickupLocation" className="mt-1 block text-gray-900 w-full bg-gray-50 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={formData.pickupLocation} onChange={handleChange}>
                            <option>Select your Location</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                        </select>
                    </div>
                    <div className="px-4 mb-5 relative">
                        <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Select Time</label>
                        <select id="pickupTime" name="pickupTime" className="mt-1 block text-gray-900 w-full bg-gray-50 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={formData.pickupTime} onChange={handleChange}>
                            <option>Select Time</option>
                            <option>08:00 AM</option>
                            <option>09:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>12:00 PM</option>
                        </select>
                    </div>
                    <div className="px-4 mb-5 relative">
                        <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Select Date</label>
                        <input type="date" id="pickupDate" name="pickupDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.pickupDate} onChange={handleChange} required />
                    </div>
                    <h2 className="text-[16px] text-[#1A202C] font-bold p-4">Drop Off</h2>
                    <div className="px-4 mb-5 relative">
                        <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">Locations</label>
                        <select id="dropoffLocation" name="dropoffLocation" className="mt-1 block text-gray-900 w-full bg-gray-50 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={formData.dropoffLocation} onChange={handleChange}>
                            <option>Select your Location</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                        </select>
                    </div>
                    <div className="px-4 mb-5 relative">
                        <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700">Select Time</label>
                        <select id="dropoffTime" name="dropoffTime" className="mt-1 block text-gray-900 w-full bg-gray-50 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={formData.dropoffTime} onChange={handleChange}>
                            <option>Select Time</option>
                            <option>08:00 AM</option>
                            <option>09:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>12:00 PM</option>
                        </select>
                    </div>
                    <div className="px-4 mb-5 relative">
                        <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700">Select Date</label>
                        <input type="date" id="dropoffDate" name="dropoffDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.dropoffDate} onChange={handleChange} required />
                    </div>
                </div>

                {/* Payment Info */}
                <div className="my-8 mx-6 bg-white rounded-lg">
                    <div className="flex items-center justify-between p-4">
                        <div>
                            <h1 className="text-[16px] text-[#1A202C] font-semibold">Payment Info</h1>
                            <p className="text-[12px] text-[#90A3BF] font-normal flex-end">Choose Your Payment Method</p>
                        </div>
                        <div>
                            <p className="text-[12px] text-[#90A3BF] font-normal flex-end">Step 3 of 4</p>
                        </div>
                    </div>
                    <div className="px-4 mb-5">
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select id="paymentMethod" name="paymentMethod" className="mt-1 block text-gray-900 w-full bg-gray-50 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="">Select Payment Method</option>
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bankTransfer">Bank Transfer</option>
                        </select>
                    </div>
                </div>

                {/* Consent and Submit */}
                <div className="my-8 mx-6 bg-white rounded-lg">
                    <div className="flex items-center justify-between p-4">
                        <div>
                            <h1 className="text-[16px] text-[#1A202C] font-semibold">Consent</h1>
                        </div>
                    </div>
                    <div className="px-4 mb-5 flex items-center">
                        <input type="checkbox" id="marketingConsent" name="marketingConsent" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={formData.marketingConsent} onChange={handleChange} />
                        <label htmlFor="marketingConsent" className="ml-2 text-sm text-gray-900">I agree to receive marketing communications.</label>
                    </div>
                    <div className="px-4 mb-5 flex items-center">
                        <input type="checkbox" id="termsConsent" name="termsConsent" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={formData.termsConsent} onChange={handleChange} />
                        <label htmlFor="termsConsent" className="ml-2 text-sm text-gray-900">I agree to the terms and conditions.</label>
                    </div>
                    <div className="p-4">
                        <button type="submit" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Rent Now</button>
                    </div>
                </div>
            </div>
        </>
    );
}
