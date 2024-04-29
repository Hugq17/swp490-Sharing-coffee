import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import Modal from 'react-modal';
import { Card, Typography } from "@material-tailwind/react";
import { format } from 'date-fns';
import { MdClose } from "react-icons/md";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Checkbox } from '../table/checkbox';
import { LiaUserTagSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import axios from 'axios';


const EventTable = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    const [actionConfirmed, setActionConfirmed] = useState(false); // State để theo dõi xác nhận hành động
    const data = useMemo(() => events, [events]);

    const updateEventAvailability = async (eventId, currentAvailability) => {
        try {
            const response = await axios.put(`https://sharing-coffee-be-capstone-com.onrender.com/api/admin/event/${eventId}`, {
                is_approve: !currentAvailability
            });

            console.log('Cập nhật trạng thái thành công:', response.data);

            // Cập nhật trực tiếp trạng thái của blog trong mảng data
            const updatedEvent = response.data;
            const updatedData = data.map(event => {
                if (event.event_id === updatedEvent.event_id) {
                    return { ...event, is_approve: updatedEvent.is_approve };
                }
                return event;
            });

            // Không cần cập nhật state, dữ liệu được cập nhật trực tiếp trong useMemo

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
        updateEventAvailability(selectedEvent.event_id, selectedEvent.is_approve);
    };
    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: 'Id sự kiện',
                accessor: 'event_id',
            },
            {
                Header: 'Hình ảnh',
                accessor: 'background_img',
                Cell: ({ cell: { value } }) => <img src={value} alt="Hình ảnh" style={{ maxWidth: '100px', maxHeight: '100px' }} />,
            },
            {
                Header: 'Sự kiện',
                accessor: 'title',
            },
            {
                Header: 'Người tạo',
                accessor: 'user_name',
            },

            {
                Header: 'Ngày bắt đầu',
                accessor: 'time_of_event',
                Cell: ({ cell: { value } }) => <span>{format(new Date(value), 'dd-MM-yyyy HH:mm')}</span>, // Format the date
            },
            {
                Header: 'Ngày kết thúc',
                accessor: 'end_of_event',
                Cell: ({ cell: { value } }) => <span>{format(new Date(value), 'dd-MM-yyyy HH:mm')}</span>, // Format the date
            },
            {
                Header: 'Trạng thái',
                accessor: 'is_approve',
                Cell: ({ value }) => (
                    <span className={`text-xl font-sans p-2 rounded ${value ? 'bg-[#4AAF57] text-white' : 'bg-[#F54336] text-white'}`}>
                        {value ? 'Kích hoạt' : 'Vô hiệu hóa'}
                    </span>
                )
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
                                    setSelectedEvent(row.original);
                                    setModalIsOpen(true);
                                }}
                                type="button"
                                className="text-xl text-white p-2"
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
                                    setSelectedEvent(row.original);
                                    setModalConfirm(true);
                                    setActionConfirmed(false); // Đặt lại trạng thái xác nhận
                                }}
                                type="button"
                                className="text-xl text-white p-2"
                            >
                                {row.original.is_approve ? 'Vô hiệu hóa' : 'Kích hoạt'}
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
                        {selectedEvent && (
                            <main className="mt-10 overflow-y-scroll h-[700px] w-full flex flex-col items-center">
                                <div className="mb-4">
                                    <div className="px-4">
                                        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                                            {selectedEvent.title}
                                        </h2>
                                        <div className='flex items-center'>
                                            <LiaUserTagSolid />
                                            <p className="font-semibold text-gray-700 text-[20px] ml-3"> {selectedEvent.user_name}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <IoLocationOutline />
                                            <p className="font-semibold text-gray-700 text-[20px] ml-3"> {selectedEvent.location}</p>
                                        </div>
                                    </div>
                                    <img src={selectedEvent.background_img} className="w-fit h-fit mt-5" />
                                </div>
                                <div class="flex flex-col lg:flex-row lg:space-x-12">
                                    <div className="px-4 lg:px-0 mt-12 text-gray-700 text-xl leading-relaxed w-full lg:w-3/4">
                                        <p>{selectedEvent.description}</p>
                                    </div>
                                </div>
                            </main>
                        )}
                        <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 mt-2 mr-2  hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <MdClose />
                        </button>
                    </div>
                </Modal >
                <Modal className="w-fit flex justify-center items-center" isOpen={modalConfirm} onClose={() => setModalConfirm(false)}>
                    <div className="px-4 min-h-screen md:flex items-center justify-center ml-[700px]">
                        <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
                        <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                            <div class="md:flex items-center">
                                {/* <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                    <i class="bx bx-error text-3xl"></i>
                                </div> */}
                                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                    <p className='font-bold'>Bạn có chắc chắn muốn {selectedEvent && selectedEvent.is_approve ? 'vô hiệu hóa' : 'kích hoạt'} sự kiện ?</p>
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

export default EventTable;
