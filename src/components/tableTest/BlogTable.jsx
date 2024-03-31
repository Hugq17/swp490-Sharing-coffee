import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import Modal from 'react-modal';
import { Card, Typography, select } from "@material-tailwind/react";
import { format } from 'date-fns';
import { MdClose } from "react-icons/md";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Checkbox } from '../table/checkbox';
import { LiaUserTagSolid } from "react-icons/lia";

const BlogTable = ({ blogs }) => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const data = useMemo(() => blogs, [blogs]);

    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: 'Hình ảnh',
                accessor: 'image',
                Cell: ({ cell: { value } }) => <img src={value} alt="Hình ảnh" style={{ maxWidth: '100px', maxHeight: '100px' }} />,
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
                Cell: ({ cell: { value } }) => <span>{format(new Date(value), 'dd-MM-yyyy HH:mm')}</span>, // Format the date
            },
            {
                Header: 'Trạng thái',
                accessor: 'is_approve',
                Cell: ({ cell: { value } }) => <span>{value ? 'Đang hoạt động' : 'Bị từ chối'}</span>,
            },
            {
                Header: 'Tình trạng',
                accessor: 'is_visible',
                Cell: ({ cell: { value } }) => <span>{value ? 'Hiển thị' : 'Bị xóa bởi người dùng'}</span>,
            },
            {
                Header: 'Thông tin',
                Cell: ({ row }) => (
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setSelectedBlog(row.original);
                                setModalIsOpen(true);
                            }}
                            type="button"
                            className="text-xl text-[#2579f2]"
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
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        pageOptions,
        allColumns,
        getToggleHideAllColumnsProps,
        state,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Start at page 0
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const { globalFilter, pageSize, pageIndex } = state
    return (
        <>
            <div className='mt-[40px] p-1'>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <div className="checkbox-group flex  justify-center">
                    <div className="checkbox-container">
                        <Checkbox {...getToggleHideAllColumnsProps()} /><p className='text-xl font-sans'>Tất cả</p>
                    </div>
                    {
                        allColumns.map(column => (
                            <div key={column.id} className="checkbox-container">
                                <label style={{ marginLeft: "30px" }}>
                                    <input
                                        type='checkbox' {...column.getToggleHiddenProps()}
                                        className="mr-3"
                                    />
                                    <p className='text-xl font-sans'>{column.Header}</p>
                                </label>
                            </div>
                        ))
                    }
                </div>
                <Card className="h-full w-full overflow-scroll">
                    <table {...getTableProps()} className="w-full min-w-max table-auto text-left">
                        <thead >
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <div className='flex items-center'>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="leading-none opacity-70 font-bold text-2xl"
                                                >{column.render('Header')}
                                                </Typography>
                                                <span className='ml-5'>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? <FaArrowDown />
                                                            : <FaArrowUp />
                                                        : ''}
                                                </span>
                                            </div>
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
                                                    <Typography variant="small" className="font-sans text-black text-xl"> {cell.render('Cell')}</Typography>

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
                    <div className=" w-4/5 bg-white rounded-lg p-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-300">
                        {selectedBlog && (
                            <main className="mt-10 overflow-y-scroll h-[700px] w-full">
                                <div className="mb-4 md:mb-0 w-full mx-auto relative">
                                    <div className="px-4 lg:px-0">
                                        <h2 className="text-4xl font-semibold text-gray-800 leading-tight mb-4">
                                            {selectedBlog.title}
                                        </h2>
                                        <div className='flex items-center'>
                                            <LiaUserTagSolid />
                                            <p className="font-semibold text-gray-700 text-[20px] ml-3"> {selectedBlog.user_name}</p>
                                        </div>
                                    </div>
                                    <img src={selectedBlog.image} className="w-fit h-fit object-cover lg:rounded mt-5" />
                                </div>
                                <div class="flex flex-col lg:flex-row lg:space-x-12">
                                    <div className="px-4 lg:px-0 mt-12 text-gray-700 text-xl leading-relaxed w-full lg:w-3/4">
                                        <p>{selectedBlog.content}</p>
                                    </div>
                                </div>
                            </main>
                        )}
                        <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 mt-2 mr-2 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <MdClose />
                        </button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default BlogTable;
