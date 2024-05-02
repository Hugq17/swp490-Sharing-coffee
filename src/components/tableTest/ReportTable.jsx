import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Card, Typography } from "@material-tailwind/react";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Modal from 'react-modal';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowForward } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReportTable = ({ reports }) => {
    const notifySuccess = () => toast("Cập nhật trạng thái thành công");
    const notifyFail = () => toast("Cập nhật trạng thái thất bại");
    const [selectedReport, setselectedReport] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const navigate = useNavigate();

    const [actionConfirmed, setActionConfirmed] = useState(false); // State để theo dõi xác nhận hành động
    const data = useMemo(() => reports, [reports]);
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
            // Xử lý lỗi nếu có
        }
    };
    const handleConfirmAction = () => {
        // Đặt lại state xác nhận và đóng modal
        setActionConfirmed(true);
        setModalConfirm(false);

        // Thực hiện hành động (cập nhật trạng thái)
        updateBlogAvailability(selectedReport.blog_id, selectedReport.is_approve);
    };
    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Hình ảnh',
                accessor: 'image',
                Cell: ({ cell: { value } }) => <img src={value} alt="Hình ảnh" style={{ maxWidth: '50px', maxHeight: '50px' }} />,
            },
            {
                Header: 'Bài viết',
                accessor: 'title',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
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
                Header: 'Thông tin',
                Cell: ({ row }) => (
                    <div className='flex'>
                        <div className='border border-[#246BFD] bg-[#246BFD] rounded w-fit p-1'>
                            <button
                                onClick={() => {
                                    setselectedReport(row.original);
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
                                    setselectedReport(row.original);
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
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps,
        gotoPage,
        pageOptions,
        state,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useSortBy, // Place useSortBy before usePagination
        usePagination
    );
    const { globalFilter, pageSize, pageIndex } = state;

    //-------------------------Update status blog-----------------------------------//

    const [blogId, setBlogId] = useState("")
    const token = localStorage.getItem('token');


    //-----------------------------Điều hướng---------------------------------------//
    const handleClickReportUser = () => {
        // Điều hướng đến một đường dẫn cụ thể khi người dùng click vào button
        navigate('/admin/report/reportUser');
    };
    const handleClickReportEvent = () => {
        // Điều hướng đến một đường dẫn cụ thể khi người dùng click vào button
        navigate('/admin/report/reportEvent');
    };
    return (
        <>
            <div className='mt-[40px] p-1'>
                <div className='flex'>
                    <button
                        className='py-2 px-4 bg-[#F6EFED] rounded flex items-center justify-center transition duration-300 ease-in-out hover:bg-[#A4634D] hover:text-white'
                        onClick={handleClickReportUser}
                    >
                        <p>Bảng báo cáo người dùng</p>
                        <IoArrowForward className='ml-2 mt-1' />
                    </button>
                    <button
                        className='py-2 px-4 ml-4 bg-[#F6EFED] rounded flex items-center justify-center transition duration-300 ease-in-out hover:bg-[#A4634D]'
                        onClick={handleClickReportEvent}
                    >
                        <p>Bảng báo cáo sự kiện</p>
                        <IoArrowForward className='ml-2 mt-1' />
                    </button>
                </div>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                {/* <div className="checkbox-group flex  justify-center">
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
                </div> */}
                <Card className="h-full w-full overflow-scroll">
                    <h2 className='font-sans text-2xl mb-3 font-medium'>Bảng báo cáo các bài viết</h2>
                    <table {...getTableProps()} className="w-full min-w-max table-auto text-left">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())} // Thêm vào đây
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
                                                    <Typography> {cell.render('Cell')}</Typography>
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
                    <div className="w-4/5 h-2/3 bg-white rounded-lg p-12 absolute overflow-y-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-300">
                        {selectedReport && (
                            <div>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th></th>
                                            <th className="border border-gray-300 px-4 py-2">Người báo cáo</th>
                                            <th className="border border-gray-300 px-4 py-2">Ngày báo cáo</th>
                                            <th className="border border-gray-300 px-4 py-2">Nội dung báo cáo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedReport.user_report.map((report, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                                <td>{index + 1}</td>
                                                <td className="border border-gray-300 px-4 py-2">{report.reporter}</td>
                                                <td className="border border-gray-300 px-4 py-2">{format(new Date(report.created_at), 'dd-MM-yyyy HH:mm')}</td>
                                                <td className="border border-gray-300 px-4 py-2">{report.report_status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
                                    <p className='font-bold'>Bạn có chắc chắn muốn {selectedReport && selectedReport.is_approve ? 'vô hiệu hóa' : 'kích hoạt'} bài viết ?</p>
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
            </div >
        </>
    );
};

export default ReportTable;
