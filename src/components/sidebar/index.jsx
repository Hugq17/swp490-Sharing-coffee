import React, { useEffect } from 'react'
import routes from '../../routes.js'
import Links from './components/Links.jsx'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/auth/sign-in')
        }
    }, [])
    return (
        <div
            className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-[#B68271] pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
                }`}
        >
            <span
                className="absolute top-4 right-4 block cursor-pointer xl:hidden"
                onClick={onClose}
            >
                {/* <HiX /> */} <button>Close</button>
            </span>

            <div className={`mx-[56px] mt-[50px] flex items-center`}>
                <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold  text-navy-700 text-white">
                    Sharing <span className="font-medium">Café</span>
                </div>
            </div>
            <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
            {/* Nav item */}

            <ul className="mb-auto pt-1">
                <Links routes={routes} />
            </ul>

            {/* Free Horizon Card */}
            {/* <div className="flex justify-center">
                <SidebarCard />
            </div> */}

            {/* Nav item end */}
            <span className="flex justify-center cursor-pointer border-2">
                <button onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}>Logout</button>
            </span>
        </div>
    )
}

export default Sidebar
