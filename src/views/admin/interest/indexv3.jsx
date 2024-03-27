import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManageInterestTable from './ManageInterestTable';
import InterestV4 from './indexv4';

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
        // Create a FormData object to send data
        const formData = new FormData();
        formData.append('name', nameParent);
        formData.append('image', image);

        try {
            // Send a POST request to the API
            const response = await axios.post('https://sharing-coffee-be-capstone-com.onrender.com/api/interest', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle the response if needed
            console.log('New data:', response.data);

            // Update the state data by adding the new data to the existing array
            setData(prevData => [...prevData, response.data]);

            // Reset the image state by setting it to an empty string
            setImage("");
            console.log("Image after posting: " + image);
        } catch (error) {
            // Handle errors if any
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
        console.log(file.secure_url)
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
    //---------------------------------Xử lý và cập nhật hình ảnh-------------------------------------------------------//
    const handleUpdateImg = (interest_id) => {

    }


    const [showPopup, setShowPopup] = useState(false);
    const [interest_id, setInterest_id] = useState("")
    const handleUploadButton = (interestID) => {
        setShowPopup(true);
        console.log(interestID)
        setInterest_id(interestID)
    };

    // Định nghĩa hàm để cập nhật thông tin cho một mục quan tâm
    async function updateInterest() {
        try {
            const apiUrl = `https://sharing-coffee-be-capstone-com.onrender.com/api/interest/${interest_id}`;
            const newData = { image: image }; // Thông tin mới cần cập nhật

            // Gửi yêu cầu PUT để cập nhật thông tin
            const response = await axios.put(apiUrl, newData);

            // Kiểm tra nếu yêu cầu đã thành công
            if (response.status === 200) {
                console.log("Cập nhật thành công!");
            } else {
                console.log("Cập nhật không thành công.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    }

    // Gọi hàm để cập nhật mục quan tâm với interestId cụ thể


    const handleClosePopup = () => {
        setShowPopup(false);
    };
    //---------------------------------Xử lý interest dạng list-------------------------------------------------------//
    const [showCurrentCode, setShowCurrentCode] = useState(true);

    const toggleCodeVisibility = () => {
        setShowCurrentCode(!showCurrentCode);
    };

    return (
        <div>
            {/* <h1 className="text-2xl font-bold mb-4">Data from API:</h1> */}
            <div>
                <button className='mt-8 ml-10 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800' onClick={toggleCodeVisibility}>
                    {showCurrentCode ? 'Dạng thẻ' : 'Dạng bảng'}
                </button>
                {/* Hiển thị component mới nếu showCurrentCode là false */}
                {!showCurrentCode && <InterestV4 />}
                {showCurrentCode && (
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
                                <div className="flex items-center justify-between ml-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleSubmit}
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <h2 className="text-xl font-bold mb-2">Items with null parent_interest_id:</h2> */}
                        <div className="flex flex-wrap gap-5">
                            {itemsWithNullParentId.map((item, index) => (
                                <div key={index} className="relative flex flex-col justify-center items-center mt-8 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                                    {item.image ? (
                                        <div className='relative flex items-center justify-center h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40'>
                                            <img className='rounded-2xl w-2/3 object-cover' src={item.image} onClick={() => handleUpdateImg(item.interest_id)} />
                                        </div>
                                    ) : (
                                        <button onClick={() => handleUploadButton(item.interest_id)}>Upload ảnh</button>
                                    )}
                                    {showPopup && (
                                        <div className="popup">
                                            {/* Nội dung của popup ở đây */}
                                            <input
                                                type='file'
                                                name='file'
                                                id='fileInput'
                                                onChange={uploadImage}
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <button onClick={() => updateInterest()}>update hình nè</button>

                                            <button onClick={handleClosePopup}>Đóng</button>
                                        </div>
                                    )}
                                    <p className='text-2xl font-sans' onClick={() => toggleItem(item.interest_id)}>{item.name}</p>
                                    <br />
                                    {expandedItems[item.interest_id] && (
                                        <div>
                                            {showInput[item.interest_id] && (
                                                <div className="flex items-center mb-2">
                                                    <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nhập" onChange={(e) => setChildName(e.target.value)} />
                                                    <button onClick={() => addChildInterest(childName, item.interest_id)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Thêm</button>
                                                </div>
                                            )}
                                            <button onClick={() => setShowInput(prevState => ({ ...prevState, [item.interest_id]: !prevState[item.interest_id] }))}>
                                                {showInput[item.interest_id] ? 'Đóng' : 'Thêm chủ đề'}
                                            </button>
                                            <ul>
                                                {itemsWithNonNullParentId
                                                    .filter(childItem => childItem.parent_interest_id === item.interest_id)
                                                    .map((childItem, childIndex) => (
                                                        <li key={childIndex}>

                                                            <div className='font-sans flex'>
                                                                <div>{childIndex}.</div>
                                                                <div className='ml-2'>{childItem.name}</div>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
}

export default App;
