import React, { useState, useEffect, useRef } from 'react';
import * as Icon from 'react-feather';
import CountUp from 'react-countup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MdOutlineLocalCafe } from "react-icons/md";
import * as d3 from 'd3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { MdOutlineSmsFailed } from "react-icons/md";
import { GrSchedule } from "react-icons/gr";

const DashboardAdmin = () => {
    const [profitData, setProfitData] = useState([]);


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
                        case 'Matched Succeed':
                            icon = <MdOutlineLocalCafe />;
                            break;
                        case 'Matched Failed':
                            icon = <MdOutlineSmsFailed />
                            break;
                        case 'Schedule':
                            icon = <GrSchedule />
                            break;
                        default:
                            break;
                    }
                    return {
                        icon: icon,
                        title: entity.entity_type === 'Blog' ? `Tổng số bài viết` :
                            entity.entity_type === 'Account' ? `Tổng số tài khoản` :
                                entity.entity_type === 'Event' ? `Tổng số sự kiện` :
                                    entity.entity_type === 'Matched Succeed' ? `Tổng số lượt ghép thành công` :
                                        entity.entity_type === 'Matched Failed' ? `Tổng số lượt ghép thất bại` :
                                            entity.entity_type === 'Schedule' ? `Tổng số lịch hẹn` :
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
    const [eventData, setEventData] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [years, setYears] = useState([]);
    const [maxEventCount, setMaxEventCount] = useState(0);
    const [maxBlogCount, setMaxBlogCount] = useState(0);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/event-statics');
                const eventData = await response.json();
                setEventData(eventData);

                const uniqueYears = [...new Set(eventData.map(item => item.event_year))];
                setYears(uniqueYears);

                const maxCount = Math.max(...eventData.map(item => +item.event_count));
                setMaxEventCount(maxCount + 10);
                setSelectedYear(uniqueYears[0]); // Chọn năm đầu tiên mặc định
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        const fetchBlogData = async () => {
            try {
                const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/blog-statics');
                const blogData = await response.json();
                setBlogData(blogData);

                const maxCount = Math.max(...blogData.map(item => +item.blog_count));
                setMaxBlogCount(maxCount + 10);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchEventData();
        fetchBlogData();
    }, []);

    useEffect(() => {
        if (selectedYear && eventData.length > 0 && blogData.length > 0) {
            const filteredEventData = eventData.filter(item => item.event_year === selectedYear);
            const filteredBlogData = blogData.filter(item => item.blog_year === selectedYear);
            const combinedData = [];

            for (let i = 1; i <= 12; i++) {
                const eventItem = filteredEventData.find(item => parseInt(item.event_month) === i);
                const blogItem = filteredBlogData.find(item => parseInt(item.blog_month) === i);

                combinedData.push({
                    month: i,
                    event_count: eventItem ? parseInt(eventItem.event_count) : 0,
                    blog_count: blogItem ? parseInt(blogItem.blog_count) : 0
                });
            }

            setCombinedData(combinedData);

            const maxCount = Math.max(...filteredEventData.map(item => parseInt(item.event_count)));
            const maxBlogCount = Math.max(...filteredBlogData.map(item => parseInt(item.blog_count)));
            setMaxEventCount(maxCount + 10);
            setMaxBlogCount(maxBlogCount + 10);
        }
    }, [selectedYear, eventData, blogData]);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
    };

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`${label} (${payload[0].value} sự kiện, ${payload[1].value} bài viết)`}</p>
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
        return monthNames[parseInt(month) - 1];
    };
    //----------------------------------Thông kế số matching----------------------------------------------------//
    const [entityData, setEntityData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/statics');
                const data = await response.json();
                setEntityData(data); // Đổi tên biến data thành entityData
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter data for "Matched Succeed" and "Matched Failed" entities
    const matchedSucceedData = entityData.find(item => item.entity_type === 'Matched Succeed');
    const matchedFailedData = entityData.find(item => item.entity_type === 'Matched Failed');

    // Prepare data for pie chart
    const pieData = [
        { name: 'Ghép thành công', value: matchedSucceedData ? parseInt(matchedSucceedData.entity_count) : 0 },
        { name: 'Ghép thất bại', value: matchedFailedData ? parseInt(matchedFailedData.entity_count) : 0 }
    ];

    // Custom colors for pie chart sectors
    const colors = ['#7A5548', '#607D8A'];

    return (
        <div className="ml-150px">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-3 gap-3"> {/* Điều chỉnh khoảng cách giữa các phần tử và số cột */}
                {profitData.map((item, index) => (
                    <div className="relative overflow-hidden rounded-md shadow bg-white p-3" key={index}> {/* Điều chỉnh padding */}
                        <div className="flex items-center">
                            <span className="flex justify-center items-center rounded-md h-8 w-8 min-w-[32px] bg-indigo-600/5 shadow shadow-indigo-600/5 text-[#AD735F]"> {/* Điều chỉnh kích thước */}
                                {item.icon}
                            </span>
                            <span className="ms-2"> {/* Điều chỉnh khoảng cách */}
                                <span className="text-slate-400 font-semibold block">{item.title}</span>
                                <span className="flex items-center justify-between mt-1">
                                    <span className="text-base font-semibold"><span className="counter-value"><CountUp start={0} end={parseInt(item.amount)} /></span></span> {/* Điều chỉnh kích thước */}
                                </span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex'> {/* Thay đổi layout sang flex-wrap và căn giữa */}
                <div className='w-[calc(50% - 10px)] mt-5 px-2'> {/* Điều chỉnh kích thước và padding */}
                    <h2 className='font-bold text-base mb-4'>Thống kê sự kiện và bài viết</h2>
                    <div style={{ width: '800px', margin: 'auto' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="year-select">Chọn năm:</label>
                            <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <BarChart
                            width={800}
                            height={400}
                            data={combinedData}
                            margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickFormatter={formatXAxis} />
                            <YAxis
                                label={{ value: 'Số lượng', angle: -90, position: 'insideLeft', offset: -10 }}
                                domain={[0, Math.max(maxEventCount, maxBlogCount)]}
                            />
                            <Tooltip content={customTooltip} />
                            <Legend />
                            <Bar dataKey="event_count" fill="#8884d8" name="Sự kiện" />
                            <Bar dataKey="blog_count" fill="#82ca9d" name="Bài viết" />
                        </BarChart>
                    </div>
                </div>
                {/* //-----------------------------------------// */}
                <div style={{ width: 'calc(50% - 10px)' }} className='mt-5 px-2 ml-[150px]'> {/* Điều chỉnh kích thước và padding */}
                    <h2 className='font-bold text-base mb-4'>Thống kê tỉ lệ matching</h2>
                    <PieChart width={300} height={300}> {/* Giảm kích thước */}
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>


        </div>
    );
};

export default DashboardAdmin;
