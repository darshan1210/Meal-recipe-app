import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { errorTost, successTost } from '../../utils/utils';


const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [navPath, setNavPath] = useState();

    useEffect(() => {
        setNavPath(location.pathname);
    }, [location.pathname]);


    const handleLogout = () => {
        const auth = getAuth(app);

        signOut(auth)
            .then(() => {
                localStorage.removeItem('token')
                successTost('User signed out successfully');
                navigate('/')
            })
            .catch((error) => {
                errorTost('Error signing out:', error.message);
            });
    };

    return (
        <nav className="bg-gray-200 shadow shadow-gray-300 w-full px-8 md:px-auto">
            <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="text-indigo-500 md:order-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                    </svg>
                </div>
                <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        <ul className="flex gap-4 font-semibold justify-between">
                            <li className={`md:px-4 md:py-2 ${navPath === '/dashboard' ? 'text-indigo-500' : 'text-gray-500'}`}><Link to="/dashboard">Dashboard</Link></li>
                            <li className={`md:px-4 md:py-2 ${navPath === '/mealList' ? 'text-indigo-500' : 'text-gray-500'} hover:text-indigo-400`}><Link to="/mealList">Meal List</Link></li>
                        </ul>
                    </ul>
                </div>
                <div className="order-2 md:order-3">
                    <button className=' bg-transparent rounded-lg bg-blue-550 border-violet-700 font-semibold hover:bg-violet-50 text-violet-700 outline-2  px-2 py-1 border' onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
