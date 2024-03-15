import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MatchingTable from '../../../components/tableTest/MatchingTable';
function Matching() {
    const [matchings, setMatchings] = useState([]);

    useEffect(() => {
        const fetchMatching = async () => {
            try {
                const response = await axios.get('https://65e9f0dbc9bf92ae3d3aafab.mockapi.io/matching');
                setMatchings(response.data);
            } catch (error) {
                console.error('Error fetching matching:', error);
            }
        };

        fetchMatching();
    }, []);
    return (
        <div className='mt-10'>
            <div className='flex'>
                <div class="relative flex flex-col mt-1 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div
                        class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                        <img
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                            alt="card-image" />
                    </div>
                    <div class="p-6 flex justify-center items-center">
                        <h5 class="block  font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Số cuộc hẹn thành công:
                        </h5>
                        <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                            4
                        </p>
                    </div>
                </div>
                <div class="relative flex flex-col mt-1 ml-10 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div
                        class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                        <img
                            src="https://images.unsplash.com/photo-1518171802599-4cd16785f93a?q=80&w=2125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="card-image" />
                    </div>
                    <div class="p-6 flex justify-center items-center">
                        <h5 class="block  font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Số lượt tương thích:
                        </h5>
                        <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                            2
                        </p>
                    </div>
                </div>
            </div>
            <MatchingTable matchings={matchings} />
        </div>
    )
}

export default Matching
