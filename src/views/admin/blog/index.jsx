import React, { useState, useEffect } from 'react'
import BlogTable from '../../../components/tableTest/BlogTable'
import axios from 'axios';

function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://sharing-coffee-be-capstone-com.onrender.com/api/blog');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);
    return (
        <div className=''>
            <BlogTable blogs={blogs} />
        </div>
    )
}

export default Blog
