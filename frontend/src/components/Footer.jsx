import React from 'react'

export default function Footer() {
    return (
        <div>


            <footer className="bg-white shadow">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-700">KSS RENTAL</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                            <li>
                                <a href="/" className="hover:underline me-4 md:me-6">Home</a>
                            </li>
                            <li>
                                <a href="/" className="hover:underline me-4 md:me-6">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center">© {new Date().getFullYear()} <a href="/" className="hover:underline">KSS Rental</a>. Developed by <a target='_blank' href="https://github.com/sathishk-dev">@sathishk-dev</a>.</span>
                </div>
            </footer>


        </div>
    )
}
