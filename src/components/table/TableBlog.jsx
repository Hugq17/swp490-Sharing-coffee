import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
// import { COLUMNS } from './columns'
import { format } from 'date-fns';
// import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { Checkbox } from './checkbox';
import { Card, Typography } from "@material-tailwind/react";

// Define a function to create a custom column with blog_id value from API response
// Updated createCustomColumn function to include columns for blog_id and likes_count
// Define a function to create a custom column with row number
function createCustomColumn(Header, accessor) {
    return {
        Header: Header, // Keep the header title for all columns
        accessor: accessor,
        Cell: ({ row }) => {
            if (Header === 'Ngày tạo') {
                return <span>{format(new Date(row.original[accessor]), 'dd-MM-yyyy')}</span>;
            } else if (Header === '#') {
                return <span>{row.index + 1}</span>;
            } else if (Header === 'Hình ảnh') {
                return <img src={row.original[accessor]} alt="Hình ảnh" style={{ width: '100px' }} />;
            } else if (Header === 'Trạng thái') {
                return <button>Click me</button>;
            }
            else {
                return row.original[accessor];
            }
        }
    };
}

export const COLUMNS = [
    createCustomColumn('#', '#'), // Use '#' as both Header and accessor for row numbers
    createCustomColumn('Hình ảnh', 'image'),
    createCustomColumn('Tên bài viết', 'title'),
    createCustomColumn('Người tạo', 'user_id'),
    createCustomColumn('Ngày tạo', 'created_at'),
    createCustomColumn('Trạng thái', 'is_approve'),
];

function TableBlog() {
    const columns = useMemo(() => COLUMNS, [])
    const [data, setData] = useState([]);
    const [userDetails, setUserDetails] = useState({});


    useEffect(() => { // lay data tu bang blog
        fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/blog')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    useEffect(() => {
        fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/user/6150886b-5920-4884-8e43-d4efb62f89d3')
            .then(response => response.json())
            .then(data => setUserDetails(data));
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable({
        columns,
        data,
        userDetails
    }, useGlobalFilter, useSortBy, usePagination)
    const { globalFilter, pageIndex, pageSize } = state
    return (
        <div className='text-black mt-[40px] w-full'>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className="checkbox-group">
                <div className="checkbox-container">
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {
                    allColumns.map(column => (
                        <div key={column.id} className="checkbox-container">
                            <label style={{ marginLeft: "30px" }}>
                                <input
                                    type='checkbox' {...column.getToggleHiddenProps()}
                                    className="mr-3"
                                />
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
            </div>
            <table className="w-full min-w-max table-auto text-left" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">

                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {column.render('Header')}
                                        </Typography>
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="even:bg-blue-gray-50/50">
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">{cell.render('Cell')} </Typography>
                                    </td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination-container">
                <span>
                    Trang{' '}
                    <strong>
                        {pageIndex + 1} trên {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Đi tới tới page: {' '}
                    <input type='number' defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        className="pagination-input"
                    />
                </span>
                <select className="pagination-select" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Hiển thị {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button className="pagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>Trước</button>

                <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>Sau</button>
                <button className="pagination-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </div>
    )
}

export default TableBlog

// import React, { useState, useEffect } from 'react';
// import { Card, Typography } from "@material-tailwind/react";
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup'


// const TABLE_HEAD = ["", "User Name", "content"];

// function TableBlog() {
//     const [userData, setUserData] = useState([]);
//     const [userDetails, setUserDetails] = useState({});
//     const [search, setSearch] = useState("")

//     // Handle search keyword change

//     useEffect(() => {
//         fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/blog')
//             .then(response => response.json())
//             .then(data => setUserData(data));

//     }, []);

//     useEffect(() => {
//         fetch('https://sharing-coffee-be-capstone-com.onrender.com/api/admin/user/6150886b-5920-4884-8e43-d4efb62f89d3')
//             .then(response => response.json())
//             .then(data => setUserDetails(data));
//     }, []);

//     return (
//         <div className='mt-[50px] scroll-mt-64 overflow-hidden rounded-xl border border-blue-gray-50 bg-[#f8fafc] '>
//             <Form>
//                 <InputGroup className='my-3'>
//                     <Form.Control
//                         placeholder='Search...'
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 </InputGroup>
//             </Form>
//             <Card className="h-full w-full overflow-scroll">
//                 <table className="w-full min-w-max table-auto text-left">
//                     <thead>
//                         <tr>
//                             {TABLE_HEAD.map((head) => (
//                                 <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                     <Typography
//                                         variant="small"
//                                         color="blue-gray"
//                                         className="font-normal leading-none opacity-70"
//                                     >
//                                         {head}
//                                     </Typography>
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {userData.filter((user) => {
//                             return search.toLowerCase() === '' ? user : user.content.toLowerCase().includes(search)
//                         }).map((user, index) => (
//                             <tr key={user.user_id} className="even:bg-blue-gray-50/50">
//                                 <td className="p-4">
//                                     <Typography variant="small" color="blue-gray" className="font-normal">
//                                         {index + 1}
//                                     </Typography>
//                                 </td>
//                                 <td className="p-4">
//                                     <Typography variant="small" color="blue-gray" className="font-normal">
//                                         {user.user_id === userDetails.user_id ? userDetails.user_name : user.user_name}
//                                     </Typography>
//                                 </td>
//                                 <td className="p-4">
//                                     <Typography variant="small" color="blue-gray" className="font-normal">
//                                         {user.content}
//                                     </Typography>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </Card>
//         </div>
//     );
// }

// export default TableBlog;