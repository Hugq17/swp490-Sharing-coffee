import React, { useState, useEffect } from 'react'
import TableEvent from '../../../components/table/TableEvent'
import axios from 'axios';
import EventTable from '../../../components/tableTest/EventTable';

function ManageEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/event');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchEvents();
    }, []);
    return (
        <div className=''>
            {/* <TableBlog /> */}
            <EventTable events={events} />
        </div>
    )
}

export default ManageEvent
