import React, { useState } from 'react';
import '../../../views/admin/interest/styles.css'

function YourComponent() {
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');

    const handleAddTopic = () => {
        if (topicInput.trim() !== '') {
            setTopics([...topics, topicInput]);
            setTopicInput(''); // Reset input after adding
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setTopicInput(inputValue);
    };

    return (
        <div className='grid grid-cols-2 mt-4'>
            <div className='flex flex-col items-center mt-6'>
                <div className='border-[1px] rounded-xl border-pink-400 w-[350px] h-[52px] shadow-2xl mb-4'>
                    <input
                        value={topicInput}
                        onChange={handleInputChange}
                        className='w-full h-full rounded-xl p-[15px]'
                        placeholder='Nhập chủ đề'
                    />
                </div>
                <button
                    onClick={handleAddTopic}
                    className="bg-red-300 w-[350px] h-[52px] rounded-md">
                    Thêm chủ đề
                </button>
            </div>

            <div className='border-[1px] rounded-xl h-auto w-[500px] border-blue-900 p-3'>
                {topics.map((topic, index) => (
                    <input
                        key={index}
                        className="placeholder-color"
                        style={{
                            width: `${topic.length * 20}px`,
                            padding: '10px',
                            border: '2px solid #ccc',
                            borderRadius: '5px',
                            marginBottom: '10px', // Thêm khoảng cách giữa các ô input
                            outline: 'none', // Loại bỏ đường viền khi focus
                            transition: 'border-color 0.3s ease', // Hiệu ứng khi hover
                            color: '#A4634D', // Màu của văn bản trong ô input
                            marginRight: '10px',
                            borderColor: '#A4634D',
                            textAlign: 'center',
                        }}
                        placeholder={topic}
                    />

                ))}
            </div>
        </div>
    );
}

export default YourComponent;
