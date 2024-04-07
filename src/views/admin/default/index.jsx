import React, { useState, useEffect, useRef } from 'react';
import * as Icon from 'react-feather';
import CountUp from 'react-countup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MdOutlineLocalCafe } from "react-icons/md";
import * as d3 from 'd3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const DashboardAdmin = () => {
    const [profitData, setProfitData] = useState([]);
    const [events, setEvents] = useState([]);
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
                            icon = <Icon.Users />;
                            break;
                        case 'Event':
                            icon = <Icon.Award />;
                            break;
                        case 'Blog':
                            icon = <Icon.Bold />;
                            break;
                        case 'Total Matched':
                            icon = <MdOutlineLocalCafe />;
                            break;
                        default:
                            break;
                    }
                    return {
                        icon: icon,
                        title: entity.entity_type === 'Blog' ? `Tổng số bài viết` :
                            entity.entity_type === 'Account' ? `Tổng số tài khoản` :
                                entity.entity_type === 'Event' ? `Tổng số sự kiện` :
                                    entity.entity_type === 'Total Matched' ? `Tổng số lượt ghép thành công` :
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
    //----------------------------------Thông kế số sự kiện----------------------------------------------------//
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [years, setYears] = useState([]);
    const [maxEventCount, setMaxEventCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/event-statics');
                const eventData = await response.json();
                setData(eventData);

                // Extract unique years from the data
                const uniqueYears = [...new Set(eventData.map(item => item.event_year))];
                setYears(uniqueYears);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            // Calculate maximum event count for the selected year
            const filteredYearData = data.filter(d => d.event_year === selectedYear);
            const maxCount = Math.max(...filteredYearData.map(d => +d.event_count));
            setMaxEventCount(maxCount + 10); // Add 10 to the maximum event count
        }
    }, [selectedYear, data]);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
    };

    const filteredData = selectedYear ? data.filter(d => d.event_year === selectedYear) : data;

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`${label} (${payload[0].value} sự kiện)`}</p>
                </div>
            );
        }
        return null;
    };

    const formatXAxis = (month) => {
        const monthNames = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        return monthNames[parseInt(month) - 1]; // Chuyển đổi số tháng thành tên tháng
    };
    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                {profitData.map((item, index) => (
                    <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900" key={index}>
                        <div className="p-5 flex items-center">
                            <span className="flex justify-center items-center rounded-md h-14 w-14 min-w-[56px] bg-indigo-600/5 dark:bg-indigo-600/10 shadow shadow-indigo-600/5 dark:shadow-indigo-600/10 text-indigo-600">
                                {item.icon}
                            </span>
                            <span className="ms-3">
                                <span className="text-slate-400 font-semibold block">{item.title}</span>
                                <span className="flex items-center justify-between mt-1">
                                    <span className="text-xl font-semibold"><span className="counter-value"><CountUp start={0} end={parseInt(item.amount)} /></span></span>
                                </span>
                            </span>
                        </div>
                        <div className="px-5 py-4 bg-gray-50 dark:bg-slate-800 ">
                            <div href="#" className="mb-3 float-right relative inline-flex items-center font-sans tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-indigo-600 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white after:bg-indigo-600 dark:after:bg-white duration-500">
                                Chi tiết
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-2/3 mt-4'>
                <h2 className='font-bold mb-3'>Thống kê các sự kiện theo tháng</h2>
                <select onChange={handleYearChange} value={selectedYear}>
                    <option value="">All Years</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <BarChart
                    width={800}
                    height={400}
                    data={filteredData}
                    margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="event_month" tickFormatter={formatXAxis} />
                    <YAxis
                        label={{ value: 'Số sự kiện', angle: -90, position: 'insideLeft', offset: -10 }}
                        domain={[0, maxEventCount]}
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                    <Bar dataKey="event_count" fill="#A4634D" name="Sự kiện" />
                </BarChart>
            </div>
        </div>
    );
};

export default DashboardAdmin;
