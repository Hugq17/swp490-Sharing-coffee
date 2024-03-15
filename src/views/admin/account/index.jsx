import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UserTable from '../../../components/tableTest/UserTable';
function ManageAccount() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div className=''>
            {/* <TableBlog /> */}
            <UserTable users={users} />
        </div>
    )
}

export default ManageAccount
