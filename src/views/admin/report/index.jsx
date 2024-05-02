import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReportTable from '../../../components/tableTest/ReportTable';
function Report() {
    const [reports, setReports] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/blogs/report');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };
        fetchReports();
    }, []);
    return (
        <div>
            <ReportTable reports={reports} />
        </div>
    )
}

export default Report
