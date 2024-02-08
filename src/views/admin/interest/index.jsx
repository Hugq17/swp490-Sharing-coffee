import React, { useState } from 'react'
import '../../../views/admin/interest/styles.css'
const Index = () => {
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);

    const handleAddTopic = () => {
        if (topicInput.trim() !== '') {
            setTopics([...topics, topicInput]);
            setTopicInput(''); // Clear input field after adding topic
        }
    };

    const handleSelectTopic = (index) => {
        setSelectedTopicIndex(index);
        setTopicInput(topics[index]);
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
                <div className='border-[1px] rounded-xl border-pink-400 w-[350px] h-[52px] shadow-2xl mb-4'>
                    <input
                        value={topicInput}
                        onChange={handleInputChange}
                        className='w-full h-full rounded-xl p-[15px]'
                        placeholder='Nhập chủ đề'
                    />
                </div>
                <button onClick={handleAddTopic} className="bg-[#A4634D] w-[180px] h-[52px] rounded-[100px]">
                    Thêm chủ đề
                </button>
                <button onClick={handleUpdateTopic} className="bg-blue-300 w-[180px] h-[52px] rounded-[100px] mt-3">
                    Cập nhật chủ đề
                </button>
            </div>

            <div className='border-[1px] rounded-xl h-auto w-[500px] border-blue-900 p-3'>
                {topics.map((topic, index) => (
                    <p
                        style={{
                            borderWidth: '2px',
                            width: `${topic.length * 20}px`,
                            height: '40px',
                            textAlign: 'center',
                            justifyItems: 'center',
                            borderRadius: '120px',
                            borderColor: '#A4634D',
                            marginRight: '8px',
                            fontWeight: 'bold',
                            color: '#A4634D',
                            marginTop: '10px'
                        }} key={index} onClick={() => handleSelectTopic(index)}>{topic}</p>
                ))}
            </div>
        </div>
    );
}

export default Index