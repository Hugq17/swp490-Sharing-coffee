import React, { useState, useEffect } from 'react'
import '../../../views/admin/interest/styles.css'
const Index = () => {
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);

    useEffect(() => {
        fetchInterests();
    }, []);

    const fetchInterests = async () => {
        try {
            const response = await fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/interest');
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddTopic = () => {
        if (topicInput.trim() !== '') {
            setTopics([...topics, topicInput]);
            setTopicInput(''); // Clear input field after adding topic
        }
    };

    const handleSelectTopic = (index, topicName) => {
        setSelectedTopicIndex(index);
        setTopicInput(topicName);
    };

    const handleInputChange = (e) => {
        setTopicInput(e.target.value);
    };

    const handleUpdateTopic = () => {
        if (selectedTopicIndex !== null) {
            const updatedTopics = [...topics];
            updatedTopics[selectedTopicIndex] = topicInput;
            setTopics(updatedTopics);
            setSelectedTopicIndex(null);
            setTopicInput('');
        }
    };

    return (
        <div className='grid grid-cols-2 mt-4'>
            <div className='flex flex-col items-center mt-6'>
                <div className='border-[1px] rounded-xl w-[350px] h-[52px] shadow-xl mb-4'>
                    <input
                        value={topicInput}
                        onChange={handleInputChange}
                        className='w-full h-full rounded-xl p-[15px]'
                        placeholder='Nhập chủ đề'
                    />
                </div>

                <div>
                    <button onClick={handleAddTopic} className="bg-[#A4634D] w-[120px] h-[52px] rounded-[60px] mr-5 text-white font-semibold">
                        Thêm
                    </button>
                    <button onClick={handleUpdateTopic} className="bg-[#5766E5] w-[150px] h-[52px] rounded-[60px] mt-3 text-white font-semibold">
                        Cập nhật
                    </button>
                </div>
            </div>

            <div className='border-[1px] rounded-xl h-auto w-[500px] border-[#A4634D] p-3 '>
                {topics.map((topic, index) => (
                    <p
                        style={{
                            borderWidth: '2px',
                            width: `${topic.name.length * 25}px`,
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
                        }} key={index} onClick={() => handleSelectTopic(index, topic.name)}>{topic.name}</p>
                ))}
            </div>
        </div>
    );
}

export default Index