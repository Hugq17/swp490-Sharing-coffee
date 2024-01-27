import React, { useState } from 'react'
import Sidebar from '../../components/sidebar'

export default function Admin(props) {
    const [open, setOpen] = useState(true)
    return (
        <div className='flex h-full w-full'>
            <Sidebar open={open} onClose={() => setOpen(false)} />
        </div>
    )
}