import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);
    const [itemsWithNullParentId, setItemsWithNullParentId] = useState([]);
    const [itemsWithNonNullParentId, setItemsWithNonNullParentId] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});
    const [image, setImage] = useState("") //xử lý hình ảnh
    const [loading, setLoading] = useState(false) //xử lý hình ảnh
    const [nameParent, setNameParent] = useState('');
    const [showInput, setShowInput] = useState({}); // Trạng thái hiển thị input
    const [childName, setChildName] = useState('');


    //--------------------------------------------Thêm một parent interest-----------------------------------//
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
            console.log('New data:', response.data);

            // Cập nhật state data bằng cách thêm dữ liệu mới vào mảng data hiện tại
            setData(prevData => [...prevData, response.data]);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error:', error);
        }
    };


    const handleNameChange = (event) => {
        setNameParent(event.target.value);
    };
    //-------------------------------------------------xử lý hình ảnh--------------------------------------//
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

    //---------------------------------------------------------------------------------------------------------//
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/interest');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter items with null parent_interest_id
        const itemsNullParentId = data.filter(item => item.parent_interest_id === null);
        setItemsWithNullParentId(itemsNullParentId);

        // Filter items with non-null parent_interest_id
        const itemsNonNullParentId = data.filter(item => item.parent_interest_id !== null);
        setItemsWithNonNullParentId(itemsNonNullParentId);
    }, [data]);

    const toggleItem = (interestId) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [interestId]: !prevState[interestId]
        }));
    };


    const addChildInterest = async (childName, parentId) => {
        try {
            const response = await axios.post(
                'https://sharing-coffee-be-capstone-com.onrender.com/api/interest',
                {
                    name: childName,
                    parent_interest_id: parentId
                }
            );
            console.log('Child interest added:', response.data);

            // Cập nhật danh sách dữ liệu với phần tử mới
            const newItem = response.data;
            setData(prevData => [...prevData, newItem]);

            // Cập nhật state để hiển thị phần tử mới
            setItemsWithNullParentId(prevItems => [...prevItems, newItem]);

        } catch (error) {
            console.error('Error adding child interest:', error);
        }
    };


    return (
        <div>

            <h1 className="text-2xl font-bold mb-4">Data from API:</h1>
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
                <h2 className="text-xl font-bold mb-2">Items with null parent_interest_id:</h2>
                <ul className="flex flex-wrap">
                    {itemsWithNullParentId.map((item, index) => (
                        <div key={index} className="w-1/5 p-4 cursor-pointer border border-gray-300 rounded-xl flex flex-col items-center justify-center m-5">
                            <img src={item.image} className='w-fit h-fit' />
                            <strong className='text-2xl' onClick={() => toggleItem(item.interest_id)}>{item.name}</strong>
                            <br />
                            {expandedItems[item.interest_id] && (
                                <div>
                                    {showInput[item.interest_id] && (
                                        <div className="flex items-center mb-2">
                                            <input type="text" placeholder="Enter child name" onChange={(e) => setChildName(e.target.value)} />
                                            <button onClick={() => addChildInterest(childName, item.interest_id)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
                                        </div>
                                    )}
                                    <button onClick={() => setShowInput(prevState => ({ ...prevState, [item.interest_id]: !prevState[item.interest_id] }))}>
                                        {showInput[item.interest_id] ? 'Hide Input' : 'Show Input'}
                                    </button>
                                    <ul>
                                        {itemsWithNonNullParentId
                                            .filter(childItem => childItem.parent_interest_id === item.interest_id)
                                            .map((childItem, childIndex) => (
                                                <li key={childIndex}>
                                                    <span className="bullet">&#8226;  </span>
                                                    <strong>{childItem.name}</strong>
                                                    <br />
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </ul>

            </div >
        </div >
    );
}

export default App;
