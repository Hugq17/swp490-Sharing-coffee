import React, { useState, useEffect } from 'react';

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/user/b43cc80d-9c56-40c0-b170-4950b8cb702e');
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    const {
        user_id,
        user_name,
        phone,
        email,
        profile_avatar,
        story,
        registration,
        purpose,
        favorite_location,
        role_id,
        gender,
        age,
        address,
    } = userData;

    return (
        <div className="bg-gray-100 min-h-screen py-8">

            <div className="container mx-auto px-4 mt-8 max-w-4xl">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <img className="w-32 h-32 rounded-full mx-auto mb-4" src={profile_avatar} alt="Profile" />
                    <h2 className="text-2xl font-bold text-center">{user_name}</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <div className="flex flex-col">
                                <p><span className="font-bold">Số điện thoại:</span> {phone}</p>
                                <p><span className="font-bold">Email:</span> {email}</p>
                                {/* <p><span className="font-bold">Gender:</span> {gender}</p> */}
                                <p><span className="font-bold">Tuổi:</span> {age}</p>
                                <p><span className="font-bold">Địa chỉ:</span> {address}</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="flex flex-col">
                                <p><span className="font-bold">Câu chuyện:</span> {story}</p>
                                <p><span className="font-bold">Ngày đăng ký:</span> {registration}</p>
                                <p><span className="font-bold">Mục đích:</span> {purpose}</p>
                                <p><span className="font-bold">Địa điểm yêu thích:</span> {favorite_location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
