import React, { useState, useEffect } from 'react'
import '../../../views/admin/interest/styles.css'
const Index = () => {
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');
    const [topicPopup, setTopicPopup] = useState('')
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Thêm state mới để quản lý popup
    const [selectedTopicId, setSelectedTopicId] = useState(null);

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


    return (
        <div className='grid grid-cols-2 mt-4 '>
            <div className='flex flex-col items-center mt-6 justify-center'>
                <div className='border-[1px] rounded-xl w-[350px] h-[52px] shadow-xl mb-4'>
                    <input
                        value={topicPopup}
                        onChange={handleInputChange1}
                        className='w-full h-full rounded-xl p-[15px]'
                        placeholder='Nhập chủ đề'
                    />
                </div>

                <div>
                    <button onClick={handleAddTopic} className="bg-[#A4634D] w-[120px] h-[52px] rounded-[60px] mr-5 text-white font-semibold">
                        Thêm
                    </button>
                </div>
            </div>

            <div className='border-[1px] rounded-xl h-auto w-[500px] border-[#A4634D] p-3 '>
                {topics.map((topic, index) => (
                    <p
                        style={{
                            borderWidth: '2px',
                            width: `${topic.name.length * 17}px`,
                            height: '40px',
                            textAlign: 'center',
                            borderRadius: '120px',
                            borderColor: '#A4634D',
                            marginRight: '8px',
                            fontWeight: 'bold',
                            color: '#A4634D',
                            marginTop: '10px',
                            display: 'inline-flex', // Sử dụng inline-flex thay vì flex
                            alignItems: 'center',
                            justifyContent: 'center' // Căn giữa nội dung ngang
                        }} key={index} onClick={() => handleSelectTopic(index, topic.name, topic.interest_id)}>{topic.name}</p>
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