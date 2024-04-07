import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReportEventTable from '../../../../components/tableTest/ReportEventTable';
// import ReportTable from '../../../components/tableTest/ReportTable';
function ReportEvent() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/events/report');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };
        fetchReports();
    }, []);
    return (
        <div className=''>
            {/* <TableBlog /> */}
            <ReportEventTable reports={reports} />
        </div>
    )
}

export default ReportEvent