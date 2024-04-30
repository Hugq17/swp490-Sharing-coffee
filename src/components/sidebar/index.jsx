import React, { useEffect } from 'react';
import routes from '../../routes.js';
import Links from './components/Links.jsx';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/auth/sign-in');
        }
    }, []);

    return (
        <div
            className={`sm:none duration-175 linear fixed z-50 flex flex-col min-h-full bg-gradient-to-b from-[#BE9A88] to-[#E6CCAF] pb-10 shadow-2xl shadow-white/5 transition-all dark:bg-navy-800 dark:text-white md:z-50 lg:z-50 xl:z-0 ${open ? "translate-x-0" : "-translate-x-96"
                }`}
            style={{ width: "200px" }}
        >
            <span
                className="absolute top-4 right-4 block cursor-pointer xl:hidden"
                onClick={onClose}
            >
                <button>Close</button>
            </span>

            <div className="mx-4 mt-8 mb-4 flex items-center justify-center">
                <div className="text-xl font-bold text-navy-700 text-white ">
                    Sharing Café
                </div>
            </div>
            <div className="my-4 h-px bg-gray-300 dark:bg-white/30" />

            {/* Nav items */}
            <ul className="flex flex-col items-start mb-auto py-2">
                <Links routes={routes} />
            </ul>

            {/* Đăng xuất */}
            <div className="flex justify-center mt-4">
                <button className="px-4 py-1 text-base  bg-[#F6EFED] hover:bg-[#A4634D] text-[#A4634D] hover:text-[#F6EFED] rounded-xl  focus:outline-none focus:shadow-outline" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}>Đăng xuất</button>
            </div>
        </div>
    );
};

export default Sidebar;
