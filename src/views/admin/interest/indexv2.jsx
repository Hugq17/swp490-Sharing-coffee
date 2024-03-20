import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Interestv2() {
    const [interests, setInterests] = useState([]);
    const [nameParent, setNameParent] = useState('');
    const [image, setImage] = useState("") //xử lý hình ảnh
    const [loading, setLoading] = useState(false) //xử lý hình ảnh
    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/interest');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                // Lọc các mục quan tâm có parent_interest_id là null
                const filteredInterests = data.filter(interest => interest.parent_interest_id === null);
                setInterests(filteredInterests);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInterests();
    }, []);

    const handleNameChange = (event) => {
        setNameParent(event.target.value);
    };

    const handleSubmit = async () => {
        // Tạo một FormData object để gửi dữ liệu
        const formData = new FormData();
        formData.append('name', nameParent);
        formData.append('image', image);

        try {
            // Gửi POST request đến API
            const response = await axios.post('https://sharing-coffee-be-capstone-com.onrender.com/api/interest', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Xử lý response nếu cần
            console.log(response.data);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error:', error);
        }
    };

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'dating')
        setLoading(true)
        const res = await fetch(
            "http://api.cloudinary.com/v1_1/durpvwfnl/image/upload",
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }

    const handleInterestClick = (interest) => {
        console.log('interest_parent_id:', interest);
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 py-6 flex">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
                            Tải ảnh
                        </label>
                        <input
                            type='file'
                            name='file'
                            id='fileInput'
                            onChange={uploadImage}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6 ml-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameInput">
                            Nhập chủ đề
                        </label>
                        <input
                            type='text'
                            name='name'
                            id='nameInput'
                            placeholder='Nhập chủ đề'
                            value={nameParent}
                            onChange={handleNameChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {console.log(interests)}
            <ul className="flex flex-wrap">
                {interests.map((interest, index) => (
                    <li key={index} className="w-1/5 h-[200px] p-4">
                        <div
                            className="border border-gray-300 p-4 rounded-xl flex flex-col items-center justify-center"
                            onClick={() => handleInterestClick(interest.interest_id)}
                        >
                            <img src={interest.image} alt="" className="w-fit h-fit mb-2" />
                            <h1 className="text-lg font-bold">{interest.name}</h1>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Interestv2;
