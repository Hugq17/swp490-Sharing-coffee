import React from 'react'
import './GlobalFilter.css'
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className='mb-4'>
            <span className='search-container'>
                <span className='search-label'>Search:{''}</span>
                <input
                    className='search-input'
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </span>
        </div>
    )
}
