import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReportUserTable from '../../../../components/tableTest/ReportUserTable';
// import ReportTable from '../../../components/tableTest/ReportTable';
function ReportUser() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/users/report');
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
            <ReportUserTable reports={reports} />
        </div>
    )
}

export default ReportUser