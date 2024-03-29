import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Card, Typography } from "@material-tailwind/react";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Checkbox } from '../table/checkbox';
import { MdClose } from "react-icons/md";
import Modal from 'react-modal';


const UserTable = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const data = useMemo(() => users, [users]);

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
                Cell: ({ cell: { value } }) => <img src={value} alt="Hình ảnh" style={{ maxWidth: '50px', maxHeight: '50px' }} />,
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
                        {value ? 'Đang hoạt động' : 'Vô hiệu hóa'}
                    </span>
                )
            },
            {
                Header: 'Thông tin',
                Cell: ({ row }) => (
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setSelectedUser(row.original);
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
            </div >
        </>
    );
};

export default UserTable;
