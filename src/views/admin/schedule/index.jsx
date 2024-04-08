import React, { useState, useEffect } from 'react'
import ScheduleTable from '../../../components/tableTest/ScheduleTable';
import axios from 'axios';

function Schedule() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/schedule-list');
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchSchedules();
    }, []);
    return (
        <div className=''>
            <ScheduleTable schedule={schedule} />
        </div>
    )
}

export default Schedule
