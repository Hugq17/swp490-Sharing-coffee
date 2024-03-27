import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManageInterestTable from './ManageInterestTable';

function InterestV4() {
    const [data, setData] = useState([]);
    const [itemsWithNullParentId, setItemsWithNullParentId] = useState([]);
    const [itemsWithNonNullParentId, setItemsWithNonNullParentId] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [nameParent, setNameParent] = useState('');
    const [showInput, setShowInput] = useState({});
    const [childName, setChildName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [interest_id, setInterest_id] = useState("");
    const [showCurrentCode, setShowCurrentCode] = useState(true); // Thêm biến showCurrentCode

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', nameParent);
        formData.append('image', image);

        try {
            const response = await axios.post('https://sharing-coffee-be-capstone-com.onrender.com/api/interest', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setData(prevData => [...prevData, response.data]);
            setImage("");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNameChange = (event) => {
        setNameParent(event.target.value);
    };

    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'dating');
        setLoading(true);
        const res = await fetch(
            "http://api.cloudinary.com/v1_1/durpvwfnl/image/upload",
            {
                method: "POST",
                body: data
            }
        );
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false);
    };

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
        const itemsNullParentId = data.filter(item => item.parent_interest_id === null);
        setItemsWithNullParentId(itemsNullParentId);
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
            const newItem = response.data;
            setData(prevData => [...prevData, newItem]);
            setItemsWithNullParentId(prevItems => [...prevItems, newItem]);
        } catch (error) {
            console.error('Error adding child interest:', error);
        }
    };

    const handleUploadButton = (interestID) => {
        setShowPopup(true);
        setInterest_id(interestID);
    };

    async function updateInterest() {
        try {
            const apiUrl = `https://sharing-coffee-be-capstone-com.onrender.com/api/interest/${interest_id}`;
            const newData = { image: image };
            const response = await axios.put(apiUrl, newData);
            if (response.status === 200) {
                console.log("Cập nhật thành công!");
            } else {
                console.log("Cập nhật không thành công.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const toggleCodeVisibility = () => {
        setShowCurrentCode(!showCurrentCode);
    };

    const renderTableData = (items) => {
        return items.map((item, index) => (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.image ? <img src={item.image} alt={item.name} /> : 'No Image'}</td>
                <td>
                    {item.parent_interest_id === null ? 'Parent' : 'Child of ' + item.parent_interest_id}
                </td>
                <td>
                    <button onClick={() => handleUploadButton(item.interest_id)}>Upload Image</button>
                </td>
            </tr>
        ));
    };

    return (
        <div>
            <div>
                <button onClick={toggleCodeVisibility}>
                    {showCurrentCode ? 'Ẩn' : 'Hiện'} Mã Hiện Tại
                </button>
                {!showCurrentCode && <ManageInterestTable />}
                {showCurrentCode && (
                    <div>
                        <div>
                            <div>
                                <label htmlFor="fileInput">Tải ảnh</label>
                                <input
                                    type='file'
                                    name='file'
                                    id='fileInput'
                                    onChange={uploadImage}
                                />
                            </div>
                            <div>
                                <label htmlFor="nameInput">Nhập chủ đề</label>
                                <input
                                    type='text'
                                    name='name'
                                    id='nameInput'
                                    placeholder='Nhập chủ đề'
                                    value={nameParent}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Parent/Child</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsWithNullParentId.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.image ? <img src={item.image} alt={item.name} className='w-[150px] h-[150px]' /> : 'No Image'}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {itemsWithNonNullParentId
                                                .filter(childItem => childItem.parent_interest_id === item.interest_id)
                                                .map((childItem, childIndex) => (
                                                    <tr key={childIndex}>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <span className="bullet">  </span>
                                                            <strong>{childItem.name}</strong>
                                                            <br />
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                ))}
                                        </td>
                                        <td><button onClick={() => handleUploadButton(item.interest_id)}>Upload Image</button></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div >
        </div >
    );
}

export default InterestV4;
