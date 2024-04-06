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

const UserTable = ({ users }) => {
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

            // Cập nhật lại danh sách người dùng hoặc xử lý các thay đổi liên quan
            // Ví dụ: gọi lại API để lấy danh sách người dùng mới
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
                Cell: ({ value }) => <span className='text-xl'>{value}</span>
            },
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
                Cell: ({ value }) => <span className='text-xl'>{value}</span>
            },
            {
                Header: 'Số điện thoại',
                accessor: 'phone',
                Cell: ({ value }) => <span className='text-xl'>{value}</span>
            },
            {
                Header: 'Trạng thái',
                accessor: 'is_available',
                Cell: ({ value }) => (
                    <span className={`text-xl ${value ? 'text-green-500' : 'text-red-500'}`}>
                        {value ? 'Kích hoạt' : 'Vô hiệu hóa'}
                    </span>
                )
            },
            {
                Header: 'Ngày tạo',
                accessor: 'registration',
                Cell: ({ value }) => <span className='text-xl'>{value}</span>
            },
            {
                Header: 'Thông tin',
                Cell: ({ row }) => (
                    <div className='flex'>
                        {/* Button "Xem hồ sơ người dùng" */}
                        <div className='border border-blue-500 rounded w-fit p-1'>
                            <button
                                onClick={() => {
                                    setSelectedUser(row.original);
                                    setModalIsOpen(true);
                                }}
                                type="button"
                                className="text-xl text-blue-500 p-2"
                            >
                                Xem hồ sơ người dùng
                            </button>
                        </div>
                        {/* Button "Vô hiệu hóa" */}
                        <div
                            className={`border border-red-500 rounded w-fit p-1 ml-2 ${row.original.is_available ? 'bg-red-500' : 'bg-green-500'}`}
                        >
                            <button
                                onClick={() => {
                                    // Mở modal xác nhận hành động
                                    setSelectedUser(row.original);
                                    setModalConfirm(true);
                                    setActionConfirmed(false); // Đặt lại trạng thái xác nhận
                                }}
                                type="button"
                                className="text-xl text-white p-2"
                            // disabled={!row.original.is_available}
                            >
                                {row.original.is_available ? 'Vô hiệu hóa' : 'Kích hoạt'}
                            </button>
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
            <div className='mt-[40px] p-1'>
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
                                                    <Typography variant="small" className="font-sans"> {cell.render('Cell')}</Typography>
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
                    <div className="w-4/5 h-fit  bg-white rounded-lg p-12 absolute overflow-y-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-300">
                        {selectedUser && (
                            <div className='flex flex-row items-center'>
                                <img src={selectedUser.profile_avatar} className='w-fit h-[350px] mr-8 rounded-lg' />
                                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                                    <h4 class="text-xl text-gray-900 font-bold">Thông tin cá nhân</h4>
                                    <ul class="mt-2 text-gray-700">
                                        <li class="flex border-y py-2">
                                            <span class="font-bold w-24">Họ tên:</span>
                                            <span class="text-gray-700">{selectedUser.user_name}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Độ tuổi:</span>
                                            <span class="text-gray-700">{selectedUser.age}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Giới tính:</span>
                                            <span class="text-gray-700">{selectedUser.gender}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Ngày tham gia:</span>
                                            <span class="text-gray-700">{selectedUser.registration}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Số điện thoại:</span>
                                            <span class="text-gray-700">{selectedUser.phone}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Email:</span>
                                            <span class="text-gray-700">{selectedUser.email}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Địa chỉ:</span>
                                            <span class="text-gray-700">{selectedUser.address}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Ghép thành công:</span>
                                            <span class="text-gray-700">{selectedUser.matched_successed}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Ghép thất bại:</span>
                                            <span class="text-gray-700">{selectedUser.matched_failed}</span>
                                        </li>
                                        <li class="flex border-b py-2">
                                            <span class="font-bold w-24">Sở thích:</span>
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
                <Modal isOpen={modalConfirm} onClose={() => setModalConfirm(false)}>
                    <div className="modal-content">
                        <h2>Xác nhận hành động</h2>
                        <p>Bạn có chắc chắn muốn {selectedUser && selectedUser.is_available ? 'vô hiệu hóa' : 'kích hoạt'} người dùng này?</p>
                        <div className="modal-actions">
                            <button onClick={handleConfirmAction}>Xác nhận</button>
                            <button onClick={() => setModalConfirm(false)}>Hủy</button>
                        </div>
                    </div>
                </Modal>
            </div >
        </>
    );
};

export default UserTable;
