import React from 'react'

const index = () => {
    return (
        <>
            <div className='grid grid-cols-2 mt-4'>
                <div class='flex flex-col items-center mt-6'>
                    <div class='border-[1px] rounded-xl border-pink-400 w-[350px] h-[52px] shadow-2xl mb-4'>
                        <input class='w-full h-full rounded-xl p-[15px]' placeholder='Nhập chủ đề' />
                    </div>
                    <button class="bg-red-300 w-[350px] h-[52px] rounded-md">
                        Thêm chủ đề
                    </button>
                </div>

                <div className='border-[1px] rounded-xl h-auto w-[500px] border-blue-900'>
                    <h1>Hell1</h1>

                </div>
            </div>
        </>
    )
}

export default index