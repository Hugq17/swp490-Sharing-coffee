import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'


const TABLE_HEAD = ["", "User Name", "Password", "Phone", "Email", "Profile Avatar", "Bio", "Registration", "Role Name"];

function Table() {
    const [userData, setUserData] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [search, setSearch] = useState("")

    // Handle search keyword change

    useEffect(() => {
        fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/users')
            .then(response => response.json())
            .then(data => setUserData(data));
    }, []);

    useEffect(() => {
        fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/user/6150886b-5920-4884-8e43-d4efb62f89d3')
            .then(response => response.json())
            .then(data => setUserDetails(data));
    }, []);

    return (
        <div className='mt-[50px] scroll-mt-64 overflow-hidden rounded-xl border border-blue-gray-50 bg-[#f8fafc] '>
            <Form>
                <InputGroup className='my-3'>
                    <Form.Control
                        placeholder='Search...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </Form>
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {userData.filter((user) => {
                            return search.toLowerCase() === '' ? user : user.user_name.toLowerCase().includes(search)
                        }).map((user, index) => (
                            <tr key={user.user_id} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.user_id === userDetails.user_id ? userDetails.user_name : user.user_name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.password}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.phone}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.email}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.profile_avatar}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.Bio}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.registration}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {user.role_name}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

export default Table;