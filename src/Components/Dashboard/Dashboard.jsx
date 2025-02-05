import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import Agent from './Agent/Agent';
import { IoCloseSharp, IoMenu } from 'react-icons/io5';
import CustomerDashboard from './Customer/Customer';
import { useSelector } from 'react-redux';

const Dashboard = () => {
       const navigate = useNavigate();
       const [menu, setMenu] = useState(false)
       const { userData } = useSelector(st => st.auth)
       return (
              <div>
                     <div className="">
                            <IoMenu className='text-2xl cursor-pointer mt-2 ml-2 lg:hidden' onClick={() => setMenu(prev => !prev)} />
                     </div>
                     {userData?.role === 'customer' && <CustomerDashboard />}
                     {userData?.role === 'agent' && <Agent />}

                     <div className={`fixed bg-white shadow-2xl h-full top-0 p-6 left-0 w-[260px] ${menu ? 'block' : 'hidden'} lg:hidden`}>
                            <IoCloseSharp className='text-2xl font-bold cursor-pointer ' onClick={() => setMenu(prev => !prev)} />
                            <Menu />
                     </div>
                     <div className="lg:block hidden fixed bg-white shadow-2xl h-full top-0 p-6 left-0 w-[260px]">
                            <Menu />
                     </div>
              </div>
       )
}

export default Dashboard

const Menu = () => {
       const { user, logout } = useContext(AuthContext)
       const { userData } = useSelector(st => st.auth)

       const navigate = useNavigate()
       console.log(userData)
       return (
              <div className=" flex justify-center items-center flex-col mt-10 ">
                     <h1 className='text-2xl font-bold mb-10'>Welcome</h1>
                     <p className='text-lg font-semibold font-serif mb-10'> {user?.email}</p>
                     {userData?.role === 'customer' ?
                            <div className="">
                                   <p className='text-xl font-semibold text-blue-500 border-2 p-2 rounded-lg hover:text-white hover:bg-blue-400 mb-10'>Ticket Page -></p>
                                   <p className='text-xl font-semibold text-blue-500 border-2 p-2 rounded-lg hover:text-white hover:bg-blue-400 mb-10'>My Tickets -></p>
                                   <button className='text-xl font-semibold text-blue-500 border-2 p-2 rounded-lg hover:text-white hover:bg-blue-400 mb-10'>Raise Ticket -></button>
                            </div> :
                            <div className="">
                                   <p className='text-xl font-semibold text-blue-500 border-2 p-2 rounded-lg hover:text-white hover:bg-blue-400 mb-10'>Support Page -></p>
                                   <p className='text-xl font-semibold text-blue-500 border-2 p-2 rounded-lg hover:text-white hover:bg-blue-400 mb-10'>view Tickets -></p>
                                   <button className='text-xl font-semibold text-blue-500 border-2 p-2 rounded-lg hover:text-white hover:bg-blue-400 mb-10'>Update Tickets -></button>
                            </div>
                     }
                     <button
                            onClick={() => {
                                   logout();
                                   navigate("/login");
                            }}
                            className="mt-10 bg-red-500 text-white p-2 rounded  cursor-pointer "
                     >
                            Logout
                     </button>
              </div>
       )
}