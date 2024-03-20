import React, { useState, useEffect } from 'react'

function Profile() {
    const [userData, setUserData] = useState(null);
    const userId = 'b43cc80d-9c56-40c0-b170-4950b8cb702e'; // ID của người dùng bạn muốn lấy thông tin

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sharing-coffee-be-capstone-com.onrender.com/api/admin/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mt-[20px]'>
            <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-4">
                <img className="w-full" src={userData.profile_avatar} alt="Profile Avatar" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{userData.user_name}</div>
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">User ID:</span> {userData.user_id}
                    </p>
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">Email:</span> {userData.email}
                    </p>
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">Phone:</span> {userData.phone}
                    </p>
                    {/* <p className="text-gray-700 text-base">
                        <span className="font-semibold">Bio:</span> {userData.Bio || 'N/A'}
                    </p> */}
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">Registration:</span> {userData.registration || 'N/A'}
                    </p>
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">Role ID:</span> {userData.role_id}
                    </p>
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">Is Available:</span> {userData.is_available.toString()}
                    </p>
                </div>
            </div>
            {console.log(userData)}
        </div>
    );

}

export default Profile
