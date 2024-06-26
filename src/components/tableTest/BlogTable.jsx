import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import Modal from 'react-modal';
import { Card, Typography, select } from "@material-tailwind/react";
import { format } from 'date-fns';
import { MdClose } from "react-icons/md";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { LiaUserTagSolid } from "react-icons/lia";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogTable = ({ blogs }) => {
    const notifySuccess = () => toast("Cập nhật trạng thái thành công");
    const notifyFail = () => toast("Cập nhật trạng thái thất bại");

    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    const [actionConfirmed, setActionConfirmed] = useState(false); // State để theo dõi xác nhận hành động
    const data = useMemo(() => blogs, [blogs]);
    const updateBlogAvailability = async (blogId, currentAvailability) => {
        try {
            const response = await axios.put(`https://sharing-coffee-be-capstone-com.onrender.com/api/admin/blog/${blogId}`, {
                is_approve: !currentAvailability
            });

            console.log('Cập nhật trạng thái thành công:', response.data);

            // Cập nhật trực tiếp trạng thái của blog trong mảng data
            const updatedBlog = response.data;
            const updatedData = data.map(blog => {
                if (blog.blog_id === updatedBlog.blog_id) {
                    return { ...blog, is_approve: updatedBlog.is_approve };
                }
                return blog;
            });
            if (response.status === 201) {
                notifyFail()
            } else {
                console.error("Failed to add topic");
                notifySuccess()
            }
            window.location.reload();

        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        }
    };

    const handleConfirmAction = () => {
        // Đặt lại state xác nhận và đóng modal
        setActionConfirmed(true);
        setModalConfirm(false);

        // Thực hiện hành động (cập nhật trạng thái)
        updateBlogAvailability(selectedBlog.blog_id, selectedBlog.is_approve);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span>{value}</span>,
            },
            // {
            //     Header: 'Id bài viết',
            //     accessor: 'blog_id',
            // },
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
                Header: 'Trạng thái',
                accessor: 'is_approve',
                Cell: ({ value }) => (
                    <span className={`font-sans p-2 rounded ${value ? 'bg-[#4AAF57] text-white' : 'bg-[#F54336] text-white'}`}>
                        {value ? 'Kích hoạt' : 'Vô hiệu hóa'}
                    </span>
                )
            },
            {
                Header: 'Tình trạng',
                accessor: 'is_visible',
                Cell: ({ cell: { value } }) => <span>{value ? 'Hiển thị' : 'Bị xóa bởi người dùng'}</span>,
            },
            {
                Header: 'Ngày tạo',
                accessor: 'created_at',
                Cell: ({ cell: { value } }) => <span>{format(new Date(value), 'dd-MM-yyyy HH:mm')}</span>, // Format the date
            },
            {
                Header: 'Thông tin',
                Cell: ({ row }) => (
                    <div className='flex'>
                        <div className='border border-[#246BFD] bg-[#246BFD] rounded w-fit p-1'>
                            <button
                                onClick={() => {
                                    setSelectedBlog(row.original);
                                    setModalIsOpen(true);
                                }}
                                type="button"
                                className="text-sm text-white p-1"
                            >
                                Chi tiết
                            </button>
                        </div>
                        <div
                            className={` rounded w-fit p-1 ml-2 ${row.original.is_approve ? 'bg-[#F75555]' : 'bg-green-500'}`}
                        >
                            <button
                                onClick={() => {
                                    // Mở modal xác nhận hành động
                                    setSelectedBlog(row.original);
                                    setModalConfirm(true);
                                    setActionConfirmed(false); // Đặt lại trạng thái xác nhận
                                }}
                                type="button"
                                className="text-sm text-white p-1"
                            >
                                {row.original.is_approve ? 'Vô hiệu hóa' : 'Kích hoạt'}
                            </button>
                            <ToastContainer />
                        </div>
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
                                                    className="leading-none opacity-70 font-bold text-base"
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
                                                    <Typography variant="small" className="font-sans text-black text-sm"> {cell.render('Cell')}</Typography>

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
                        <strong className="text-[#A4634D]">
                            {pageIndex + 1} trên {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <select
                        className=" p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-[#A4634D]"
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
                        className=" p-2 text-sm text-white bg-[#A4634D] rounded-md focus:outline-none focus:bg-[#A4634D]"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="p-2 text-sm text-white bg-[#A4634D] rounded-md focus:outline-none focus:bg-[#A4634D]"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>
                    {pageOptions.slice(0, Math.min(pageIndex + 5, pageOptions.length)).map((page, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-2 py-1 text-sm rounded-md focus:outline-none ${pageIndex === index ? 'bg-[#A4634D] text-white' : 'bg-white text-gray-700'
                                }`}
                            onClick={() => gotoPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="p-2 text-sm text-white bg-[#A4634D] rounded-md focus:outline-none focus:bg-[#A4634D]"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>
                    <button
                        className="p-2 text-sm text-white bg-[#A4634D] rounded-md focus:outline-none focus:bg-[#A4634D]"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </button>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal">
                    <div className=" w-4/5 bg-white rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-300">
                        {selectedBlog && (
                            <main className=" overflow-y-scroll h-[700px] w-full flex flex-col items-center">
                                <div className="mb-4">
                                    <div className="px-4">
                                        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                                            {selectedBlog.title}
                                        </h2>
                                        <div className='flex items-center'>
                                            <LiaUserTagSolid />
                                            <p className="font-semibold text-gray-700 text-[20px] ml-3"> {selectedBlog.user_name}</p>
                                        </div>
                                    </div>
                                    <img src={selectedBlog.image} className="w-fit h-[200px] mt-5" />
                                </div>
                                <div className="px-4 lg:px-0 mt-12 text-gray-700 text-xl leading-relaxed w-full lg:w-3/4">
                                    <p>{selectedBlog.content}</p>
                                </div>
                            </main>
                        )}
                        <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 mt-2 mr-2 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <MdClose />
                        </button>
                    </div>
                </Modal>
                <Modal className="w-fit flex justify-center items-center" isOpen={modalConfirm} onClose={() => setModalConfirm(false)}>
                    <div className="px-4 min-h-screen md:flex items-center justify-center ml-[700px]">
                        <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
                        <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                            <div class="md:flex items-center">
                                {/* <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                    <i class="bx bx-error text-3xl"></i>
                                </div> */}
                                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                    <p className='font-bold'>Bạn có chắc chắn muốn {selectedBlog && selectedBlog.is_approve ? 'vô hiệu hóa' : 'kích hoạt'} bài viết ?</p>
                                    {/* <p class="text-sm text-gray-700 mt-1">You will lose all of your data by deleting your account. This action cannot be undone.
                                    </p> */}
                                </div>
                            </div>
                            <div className="modal-actions text-center md:text-right mt-4 md:flex md:justify-end">
                                <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2" onClick={handleConfirmAction}>Xác nhận</button>
                                <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm" onClick={() => setModalConfirm(false)}>Hủy</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default BlogTable;
