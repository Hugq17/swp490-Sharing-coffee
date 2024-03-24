import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import CountUp from 'react-countup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const DashboardAdmin = () => {
    const [profitData, setProfitData] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    //----------------------------------Thông kế số blog, người dùng, events----------------------------------------------------//

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/statics');

                // Mapping entity counts to profitData
                const newData = response.data.map(entity => {
                    let icon = null;
                    switch (entity.entity_type) {
                        case 'Account':
                            icon = Icon.Users;
                            break;
                        case 'Event':
                            icon = Icon.Award;
                            break;
                        case 'Blog':
                            icon = Icon.Bold;
                            break;
                        default:
                            break;
                    }
                    return {
                        icon: icon,
                        title: entity.entity_type === 'Blog' ? `Tổng số bài viết` :
                            entity.entity_type === 'Account' ? `Tổng số tài khoản` :
                                entity.entity_type === 'Event' ? `Tổng số sự kiện` :
                                    `Tổng số ${entity.entity_type}s`,
                        amount: entity.entity_count
                    };
                });

                setProfitData(newData);
            } catch (error) {
                console.error("");
                // navigate()
            }
        }

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once after the initial render
    //----------------------------------Lấy events phổ biến----------------------------------------------------//
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/event/popular/events');
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                {profitData.map((item, index) => {
                    const Icons = item.icon;
                    return (
                        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900" key={index}>
                            <div className="p-5 flex items-center">
                                <span className="flex justify-center items-center rounded-md h-14 w-14 min-w-[56px] bg-indigo-600/5 dark:bg-indigo-600/10 shadow shadow-indigo-600/5 dark:shadow-indigo-600/10 text-indigo-600">
                                    <Icons className="h-5 w-5" />
                                </span>
                                <span className="ms-3">
                                    <span className="text-slate-400 font-semibold block">{item.title}</span>
                                    <span className="flex items-center justify-between mt-1">
                                        <span className="text-xl font-semibold"><span className="counter-value"><CountUp start={0} end={parseInt(item.amount)} /></span></span>
                                    </span>
                                </span>
                            </div>
                            <div className="px-5 py-4 bg-gray-50 dark:bg-slate-800 ">
                                <div href="#" className="mb-3 float-right relative inline-flex items-center font-sans tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-indigo-600 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white after:bg-indigo-600 dark:after:bg-white duration-500"
                                > Chi tiết
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="block font-sans font-bold leading-relaxed text-[30px] ml-5 mt-6">
                Sự kiện phổ biến
            </p>
            <div className="flex justify-center">
                {events.map(event => (
                    <div className="mt-12 mx-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                        <div className="relative h-56 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                            <img src={event.background_img} alt="Background" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex flex-col justify-center items-center">
                            <p className="block font-sans font-bold text-base leading-relaxed text-inherit ml-5">
                                {event.title}
                            </p>
                            <p className="block font-sans text-base leading-relaxed text-inherit ml-5" style={{ color: '#A4634D' }}>
                                {format(new Date(event.time_of_event), 'dd-MM-yyyy')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default DashboardAdmin;
