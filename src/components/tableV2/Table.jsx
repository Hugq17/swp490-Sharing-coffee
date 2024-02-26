import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import './table.css'

function Table() {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowData) => {
        setSelectedRow(rowData);
    };



    useEffect(() => {
        fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/event')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const displayData = data
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
                <td>{index + 1 + pagesVisited}</td>
                {Object.entries(item)
                    .filter(([key]) => key !== 'event_id' && key !== 'organizer_id' && key !== 'description' && key !== 'location' && key !== 'time_of_event')
                    .sort(([key1], [key2]) => key1 === 'background_img' ? -1 : key2 === 'background_img' ? 1 : 0) // Sắp xếp cột background_img lên đầu
                    .sort(([key1], [key2]) => key1 === 'is_approve' ? 1 : key2 === 'is_approve' ? -1 : 0) // Đưa cột is_approve xuống cuối cùng
                    .map(([key, value]) => (
                        <td key={key} className={key === 'background_img' ? 'center-image' : key === 'participants_count' ? 'center-content' : ''}>
                            {key === 'time_of_event' || key === 'created_at' ? format(new Date(value), 'dd-MM-yyyy') :
                                key === 'background_img' ? <img src={value} alt="background" style={{ width: '100px' }} /> : value}
                        </td>
                    ))}
            </tr>
        ));

    const pageCount = Math.ceil(data.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className='mt-[20px]'>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {data.length > 0 && ['background_img', ...Object.keys(data[0])
                            .filter(key => key !== 'event_id' && key !== 'organizer_id' && key !== 'description' && key !== 'background_img' && key !== 'location' && key !== 'time_of_event' && key !== 'is_approve')]
                            .concat('is_approve')
                            .map((key, index) => (
                                <th key={index}>
                                    {key === 'background_img' ? '  ' :
                                        key === 'is_approve' ? 'Trạng thái' :
                                            key === 'title' ? 'Sự kiện ' :
                                                key === 'participants_count' ? 'Số người tham gia' :
                                                    key === 'created_at' ? 'Ngày tạo' : key
                                    }
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>
            {selectedRow && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg w-1/2"> {/* Điều chỉnh chiều rộng ở đây */}
                        <h2 className="text-lg font-bold mb-4">{selectedRow.title}</h2>
                        <p className="mb-2">{selectedRow.description}</p>
                        {/* <p className="mb-2">{selectedRow.location}</p> */}
                        {/* Thêm các trường thông tin khác tương ứng */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedRow(null)}>Close</button>
                    </div>
                </div>
            )}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Table;