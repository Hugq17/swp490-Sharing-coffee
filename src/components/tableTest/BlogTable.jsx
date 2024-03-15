import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import Modal from 'react-modal';
import { Card, Typography } from "@material-tailwind/react";
import { format } from 'date-fns';
import { BsCalendarDay } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";
import { MdClose } from "react-icons/md";

const BlogTable = ({ blogs }) => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const data = useMemo(() => blogs, [blogs]);

    const columns = useMemo(
        () => [
            {
                Header: ' ',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: 'Hình ảnh',
                accessor: 'image',
                Cell: ({ cell: { value } }) => <img src={value} alt="Hình ảnh" className="mx-auto" style={{ maxWidth: '100px', maxHeight: '100px' }} />,
            },
            {
                Header: 'Bài viết',
                accessor: 'title',
            },
            {
                Header: 'Người tạo',
                accessor: 'user_name',
            },
            {
                Header: 'Ngày tạo',
                accessor: 'created_at',
                Cell: ({ cell: { value } }) => <span>{format(new Date(value), 'dd-MM-yyyy')}</span>, // Format the date
            },
            {
                Header: 'Trạng thái',
                Cell: ({ row }) => (
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setSelectedBlog(row.original);
                                setModalIsOpen(true);
                            }}
                            type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Chi tiết
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,

        gotoPage,
        pageOptions,
        state,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Start at page 0
        },
        usePagination
    );
    const { pageSize, pageIndex } = state

    return (
        <>
            <div className='mt-[40px] p-1'>
                <Card className="h-full w-full overflow-scroll">
                    <table {...getTableProps()} className="w-full min-w-max table-auto text-left">
                        <thead >
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="leading-none opacity-70 font-bold text-xl"
                                            >{column.render('Header')}
                                            </Typography>

                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="even:bg-blue-gray-50/50">
                                        {row.cells.map(cell => {
                                            return (

                                                <td
                                                    {...cell.getCellProps()}
                                                    className="p-4"
                                                >
                                                    <Typography variant="small" color="blue-gray" className="font-normal"> {cell.render('Cell')}</Typography>

                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                <div className='m-[40px] flex items-center justify-center space-x-4 '>
                    <span>
                        Trang{' '}
                        <strong className="text-blue-500">
                            {pageIndex + 1} trên {pageOptions.length}
                        </strong>{' '}
                    </span>

                    {/* <span className="flex items-center">
                        Đi tới trang:{' '}
                        <input
                            type='number'
                            value={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                            className="w-[100px] p-2 ml-3 text-center border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </span> */}
                    <select
                        className=" p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-indigo-500"
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
                    >
                        {
                            [5, 10, 15].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Hiển thị {pageSize}
                                </option>
                            ))
                        }
                    </select>

                    <button
                        className=" p-2 text-sm text-white bg-blue-500 rounded-md focus:outline-none focus:bg-blue-600"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="p-2 text-sm text-white bg-blue-500 rounded-md focus:outline-none focus:bg-blue-600"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>
                    {pageOptions.slice(0, Math.min(pageIndex + 5, pageOptions.length)).map((page, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-2 py-1 text-sm rounded-md focus:outline-none ${pageIndex === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                                }`}
                            onClick={() => gotoPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="p-2 text-sm text-white bg-blue-500 rounded-md focus:outline-none focus:bg-blue-600"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>
                    <button
                        className="p-2 text-sm text-white bg-blue-500 rounded-md focus:outline-none focus:bg-blue-600"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </button>
                </div>

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal">
                    <div className="bg-white rounded-lg p-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-300">
                        {selectedBlog && (
                            <div className="mb-4 flex">
                                <div>
                                    <img src={selectedBlog.image} alt="Blog Image" className="w-24 h-24 object-cover rounded-md mr-2" />
                                </div>
                                <div className='border-[1px] p-3'>
                                    <h2 className='text-2xl font-bold text-blue-500'>{selectedBlog.title}</h2>
                                    <div className='flex items-center mt-3'>
                                        <BsCalendarDay />
                                        <p className="ml-4">{format(new Date(selectedBlog.created_at), 'dd-MM-yyyy')}</p>
                                    </div>
                                    <div className='flex items-center mt-3'>
                                        <MdAccountBox />
                                        <p className="ml-4">{selectedBlog.user_name}</p>
                                    </div>
                                    {/* <div className='flex items-center mt-3'>
                                        <AiOutlineLike />
                                        <p className="ml-4">{selectedBlog.likes_count}</p>
                                    </div>
                                    <div className='flex items-center mt-3'>
                                        <FaRegComments />
                                        <p className="ml-4">{selectedBlog.comments_count}</p>
                                    </div> */}
                                    <div className='mt-3'>
                                        <p className='text-xl font-semibold'>Nội dung:</p><br />
                                        <p>{selectedBlog.content}</p>
                                    </div>
                                    <div className='mt-5'>
                                        <div className={`border-[1px] w-[90px] rounded-xl flex justify-center items-center h-[40px] ${selectedBlog.is_approve ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            <p className={selectedBlog.is_approve ? 'text-white' : 'text-black'}>
                                                {selectedBlog.is_approve ? 'Đã duyệt' : 'Chưa duyệt'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 mt-2 mr-2  hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <MdClose />
                        </button>
                    </div>
                </Modal>


            </div>
        </>
    );
};

export default BlogTable;
