import React, { useState, useEffect } from 'react'
import '../../../views/admin/interest/styles.css'
import Dropdown from '../../../components/dropdown';

const Index = () => {
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');
    const [topicPopup, setTopicPopup] = useState('')
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Thêm state mới để quản lý popup
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null); // Thêm state mới để lưu trữ giá trị của setTimeout
    const [selectedColors, setSelectedColors] = useState({}); // Object to store color state for each topic.interest_id
    const [selectedTopicIds, setSelectedTopicIds] = useState([]);
    const options = [
        { value: 'option1', label: 'Tùy chọn 1' },
        { value: 'option2', label: 'Tùy chọn 2' },
        { value: 'option3', label: 'Tùy chọn 3' },
    ];
    const reloadPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        fetchInterests();
    }, []);

    const fetchInterests = async () => { //get all interests
        try {
            const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/interest');
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const handleAddTopic = async () => {
        if (topicPopup.trim() !== '') {
            // Kiểm tra xem topic đã tồn tại chưa
            const isTopicExists = topics.some(topic => topic.name === topicPopup);

            if (isTopicExists) {
                alert('Chủ đề đã tồn tại. Vui lòng nhập một chủ đề khác.');
                return; // Không thêm chủ đề nếu đã tồn tại
            }

            try {
                const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/interest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: topicPopup })
                });

                if (response.ok) {
                    const data = await response.json();
                    setTopics([...topics, data]);
                    setTopicPopup(''); // Clear input field after adding topic
                    console.log(topicPopup)
                } else {
                    console.error('Failed to add topic');
                }
            } catch (error) {
                console.error('Error adding topic:', error);
            }
        }
    };


    const handleSelectTopic = (index, topicName, topicId) => {
        setSelectedTopicIndex(index);
        setTopicInput(topicName);
        setIsPopupOpen(true); // Mở popup khi một topic được chọn
        setSelectedTopicId(topicId);
    };


    const handleInputChange = (e) => {
        setTopicInput(e.target.value);
    };
    const handleInputChange1 = (e) => {
        setTopicPopup(e.target.value);
    };


    const handleUpdateTopic = async () => {
        if (selectedTopicId && topicInput.trim() !== '') {
            try {
                const response = await fetch(`https://sharing-coffee-be-capstone-com.onrender.com/api/interest/${selectedTopicId}`, {
                    method: 'PUT', // Hoặc 'PATCH' tùy vào API của bạn
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: topicInput }),
                });

                if (response.ok) {
                    let updatedTopic;
                    try {
                        updatedTopic = await response.json();
                    } catch (error) {
                        // console.error('Error parsing JSON:', error);
                        // Xử lý trường hợp không có JSON trả về hoặc JSON không hợp lệ
                        // Có thể bạn chỉ cần cập nhật UI mà không cần dữ liệu trả về
                        updatedTopic = { interest_id: selectedTopicId, name: topicInput }; // Giả sử cập nhật thành công
                    }
                    // Cập nhật state của topics để phản ánh sự thay đổi
                    setTopics(topics.map(topic => topic.interest_id === selectedTopicId ? updatedTopic : topic));
                    setIsPopupOpen(false); // Đóng popup sau khi cập nhật thành công
                    setTopicInput(''); // Xóa nội dung của ô input sau khi cập nhật
                } else {
                    console.error('Failed to update topic');
                }
            } catch (error) {
                console.error('Error updating topic:', error);
            }
        }
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false); // Hàm để đóng popup
    };
    //-------------------------------------------------------------------//
    // Select and delete

    const handleMouseDown = (index, topicName, topicId) => {
        // Thiết lập timeout khi nhấn giữ
        const id = setTimeout(() => {
            handleSelectTopic(index, topicName, topicId);
        }, 1000); // 2000ms = 2 giây
        setTimeoutId(id);
    };

    const handleMouseUp = () => {
        // Hủy timeout nếu thả chuột trước 2 giây
        clearTimeout(timeoutId);
    };
    const handleColorChange = (interestId) => {
        setSelectedColors(prevColors => ({
            ...prevColors,
            [interestId]: !prevColors[interestId] // Toggle color state for the selected interest_id
        }));

        setSelectedTopicIds(prevIds => {
            if (prevIds.includes(interestId)) {
                return prevIds.filter(id => id !== interestId); // Remove interestId if already selected
            } else {
                return [...prevIds, interestId]; // Add interestId if not selected
            }
        });
    };
    const handleDeleteSelectedTopics = async () => {
        try {
            const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/interest', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedTopicIds)
            });

            if (response.ok) {
                // Xử lý khi xóa thành công
                console.log('Đã xóa các chủ đề thành công');
                reloadPage(); // Load lại trang sau khi xóa thành công
            } else {
                console.error('Lỗi khi xóa chủ đề');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API xóa chủ đề:', error);
        }
    };
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
    };
    return (
        <div className='grid grid-cols-2 mt-4 '>
            <div className='flex flex-col items-center mt-6 justify-center'>
                <h1>Dropdown Example</h1>
                <Dropdown options={options} onSelect={handleSelect} />
                {/* <p>Selected Option: {selectedOption ? selectedOption.label : 'None'}</p> */}
                <div className='border-[1px] rounded-xl w-[350px] h-[52px] shadow-xl mb-4'>
                    <input
                        value={topicPopup}
                        onChange={handleInputChange1}
                        className='w-full h-full rounded-xl p-[15px]'
                        placeholder='Nhập chủ đề'
                    />
                </div>

                <div>
                    <button onClick={handleAddTopic} className="bg-[#8ACF62] w-[120px] h-[52px] rounded-[60px] mr-5 text-white font-semibold">
                        Thêm
                    </button>
                    <button onClick={handleDeleteSelectedTopics} className="bg-[#DB3236] w-[120px] h-[52px] rounded-[60px] mr-5 text-white font-semibold">Xóa</button>
                </div>
            </div>

            <div className='h-auto w-[500px]'>
                {topics.map((topic, index) => (
                    <p
                        style={{
                            borderWidth: '2px',
                            width: `${topic.name.length * 17}px`,
                            height: '40px',
                            textAlign: 'center',
                            borderRadius: '120px',
                            borderColor: selectedColors[topic.interest_id] ? '#FFFFFF' : '#A4634D', // Change color based on selection
                            backgroundColor: selectedColors[topic.interest_id] ? '#A4634D' : '#FFFFFF',
                            marginRight: '8px',
                            fontWeight: 'bold',
                            color: selectedColors[topic.interest_id] ? '#FFFFFF' : '#A4634D', // Change text color based on selection
                            marginTop: '10px',
                            display: 'inline-flex', // Sử dụng inline-flex thay vì flex
                            alignItems: 'center',
                            justifyContent: 'center' // Căn giữa nội dung ngang
                        }} key={index} onMouseDown={() => handleMouseDown(index, topic.name, topic.interest_id)}
                        onMouseUp={handleMouseUp}
                        onClick={() => handleColorChange(topic.interest_id)} // Add onClick event to change color for this specific <p>
                    >
                        {topic.name}
                    </p>
                ))}
            </div>
            {isPopupOpen && (
                <div class="popup-background">
                    <div class="popup-content">
                        <span onClick={handleClosePopup} class="close-btn">&times;</span>
                        <h2 className='font-bold text-xl'>Chỉnh Sửa Chủ Đề</h2>

                        <div className="form-container">
                            <input
                                value={topicInput}
                                onChange={handleInputChange}
                                placeholder='Nhập chủ đề'
                                className="input-style"
                            />
                            <button onClick={handleUpdateTopic} className="button">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Index