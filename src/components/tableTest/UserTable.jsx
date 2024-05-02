import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Card, Typography } from "@material-tailwind/react";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Checkbox } from '../table/checkbox';
import { MdClose } from "react-icons/md";
import Modal from 'react-modal';
import coffeAvatar from '../../assets/img/coffe-avatar.jpg'
import axios from 'axios';
import { FaRegUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserTable = ({ users }) => {
    const notifySuccess = () => toast("Cập nhật trạng thái thành công");
    const notifyFail = () => toast("Cập nhật trạng thái thất bại");
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    const [actionConfirmed, setActionConfirmed] = useState(false); // State để theo dõi xác nhận hành động
    const data = useMemo(() => users, [users]);
    const updateUserAvailability = async (userId, currentAvailability) => {
        try {
            // Gọi API để cập nhật trạng thái is_available của người dùng
            const response = await axios.put(`https://sharing-coffee-be-capstone-com.onrender.com/api/admin/user/${userId}`, {
                is_available: !currentAvailability // Đảo ngược trạng thái hiện tại
            });

            // Xử lý phản hồi từ API nếu cần
            console.log('Cập nhật trạng thái thành công:', response.data);
            if (response.status === 201) {
                notifyFail()
            } else {
                console.error("Failed to add topic");
                notifySuccess()
            }
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
        updateUserAvailability(selectedUser.user_id, selectedUser.is_available);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            // {
            //     Header: 'Id người dùng',
            //     accessor: 'user_id',
            //     Cell: ({ value }) => <span className='text-sm'>{value}</span>
            // },
            {
                Header: 'Hình ảnh',
                accessor: 'profile_avatar',
                Cell: ({ cell: { value } }) => {
                    if (!value || value === '' || value === null) {
                        return <img src={coffeAvatar} style={{ maxWidth: '50px', maxHeight: '50px' }} />;
                    }
                    return <img src={value} alt="Hình ảnh" style={{ maxWidth: '50px', maxHeight: '50px' }} />;
                }
            },
            {
                Header: 'Người dùng',
                accessor: 'user_name',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Khoảng tuổi',
                accessor: 'age',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Trạng thái',
                accessor: 'is_available',
                Cell: ({ value }) => (
                    <span className={`text-sm font-sans p-1 rounded ${value ? 'bg-[#4AAF57] text-white' : 'bg-[#F54336] text-white'}`}>
                        {value ? 'Kích hoạt' : 'Vô hiệu hóa'}
                    </span>
                )
            },
            {
                Header: 'Ngày tạo',
                accessor: 'registration',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Thông tin',
                Cell: ({ row }) => (
                    <div className='flex'>
                        {/* Button "Xem hồ sơ người dùng" */}
                        <div className='border border-[#246BFD] bg-[#246BFD] rounded w-fit p-1'>
                            <button
                                onClick={() => {
                                    setSelectedUser(row.original);
                                    setModalIsOpen(true);
                                }}
                                type="button"
                                className="text-sm text-white p-1"
                            >
                                Xem hồ sơ người dùng
                            </button>
                        </div>
                        <div
                            className={` rounded w-fit p-1 ml-2 ${row.original.is_available ? 'bg-[#F75555]' : 'bg-green-500'}`}
                        >
                            <button
                                onClick={() => {
                                    // Mở modal xác nhận hành động
                                    setSelectedUser(row.original);
                                    setModalConfirm(true);
                                    setActionConfirmed(false); // Đặt lại trạng thái xác nhận
                                }}
                                type="button"
                                className="text-sm text-white p-1"
                            >
                                {row.original.is_available ? 'Vô hiệu hóa' : 'Kích hoạt'}
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

    return (
        <>
            <div className='mt-3'>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <Card className="">
                    <table {...getTableProps()} className="text-left">
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
                                                    className="p-4 "
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
                    <div className="w-4/5 h-fit  bg-white rounded-lg p-12 absolute overflow-y-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-300">
                        {selectedUser && (
                            <div className='flex flex-row items-center'>
                                <img src={selectedUser.profile_avatar} className='w-fit h-[350px] mr-8 rounded-lg' />
                                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                                    <h4 class="text-xl text-gray-900 font-bold">Thông tin cá nhân</h4>
                                    <ul class="mt-2 text-gray-700">
                                        <li class="flex border-y py-2 flex-row items-center">
                                            <FaRegUser />
                                            <span class="font-bold w-20 ml-2">Họ tên:</span>
                                            <span class="text-gray-700">{selectedUser.user_name}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Độ tuổi:</span>
                                            <span class="text-gray-700">{selectedUser.age}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Giới tính:</span>
                                            <span class="text-gray-700">{selectedUser.gender}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Ngày tham gia:</span>
                                            <span class="text-gray-700">{selectedUser.registration}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Số điện thoại:</span>
                                            <span class="text-gray-700">{selectedUser.phone}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Email:</span>
                                            <span class="text-gray-700">{selectedUser.email}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Địa chỉ:</span>
                                            <span class="text-gray-700">{selectedUser.address}</span>
                                        </li>
                                        {/* <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Ghép thành công:</span>
                                            <span class="text-gray-700">{selectedUser.matched_successed}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Ghép thất bại:</span>
                                            <span class="text-gray-700">{selectedUser.matched_failed}</span>
                                        </li> */}
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-20">Sở thích:</span>
                                            <span class="text-gray-700">
                                                {selectedUser.interest_list.map((interest, index) => (
                                                    <React.Fragment key={interest.interest_id}>
                                                        {interest.interest_name}
                                                        {index !== selectedUser.interest_list.length - 1 && ', '}
                                                    </React.Fragment>
                                                ))}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        )}
                        <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 mt-2 mr-2  hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
                                    <p className='font-bold'>Bạn có chắc chắn muốn {selectedUser && selectedUser.is_available ? 'vô hiệu hóa' : 'kích hoạt'} người dùng này?</p>
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

export default UserTable;
