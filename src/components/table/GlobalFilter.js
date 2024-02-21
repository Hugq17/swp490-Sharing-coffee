import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className='mb-4'>
            <span className='border-[1px] rounded-xl w-[350px] h-[52px] shadow-xl'>
                Search:{''}
                <input className='w-[100px] h-full rounded-xl p-[15px] ml-[20px]' value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
            </span>
        </div>
    )
}
