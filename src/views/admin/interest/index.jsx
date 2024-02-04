import React, { useState } from 'react'

function Index() {
    const [inputList, setInputList] = useState([]);

    const handleAddInput = () => {
        // Thêm một ô input mới vào mảng inputList
        setInputList([...inputList, { id: inputList.length }]);
    };
    return (
        <>
            <div className='float-right rounded-[100px] mt-5 w-[100px] h-[50px] bg-[#A4634D] flex justify-center items-center'>
                <button>Gửi</button>
            </div>
            <div onClick={handleAddInput} className='float-right rounded-[100px] mt-5 w-[100px] h-[50px] bg-[#A4634D] flex justify-center items-center'>
                <button>Thêm component</button>
            </div>
            <div className=' w-full mt-[100px] border-[0.1px] border-[#B5ADAD] rounded-[10px]'>
                <div className="grid grid-cols-4 gap-4 pt-2 px-[10px] pb-3">
                    {inputList.map((input, index) => (
                        <div className="p-2 rounded-[100px] border-[#A4634D] border-[1.6px]  mt-3 mr-2 flex justify-center items-center" key={index}>
                            <input className='bg-[#F4F7FE] border-none focus:outline-none text-[#A4634D]' type="text" placeholder={`Nhập chủ đề ${index + 1}`} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Index
