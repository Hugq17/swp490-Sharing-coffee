import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReportTable from '../../../components/tableTest/ReportTable';
function Report() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/blogs/report');
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
            <ReportTable reports={reports} />
        </div>
    )
}

export default Report
