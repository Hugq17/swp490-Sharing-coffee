import React, { useState, useEffect, useRef } from 'react';

function ResizableInput({ factor }) {
    const [inputWidth, setInputWidth] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        const resize = () => {
            setInputWidth((inputRef.current.value.length + 1) * factor + 'px');
        };

        inputRef.current.addEventListener('keyup', resize);
        inputRef.current.addEventListener('keypress', resize);
        inputRef.current.addEventListener('focus', resize);
        inputRef.current.addEventListener('blur', resize);
        inputRef.current.addEventListener('change', resize);

        return () => {
            inputRef.current.removeEventListener('keyup', resize);
            inputRef.current.removeEventListener('keypress', resize);
            inputRef.current.removeEventListener('focus', resize);
            inputRef.current.removeEventListener('blur', resize);
            inputRef.current.removeEventListener('change', resize);
        };
    }, [factor]);

    return (
        <input
            id="txt"
            ref={inputRef}
            style={{ width: inputWidth }}
            className='bg-[#F4F7FE] border-none focus:outline-none text-[#A4634D]'
            type='text'
        />
    );
}

export default ResizableInput