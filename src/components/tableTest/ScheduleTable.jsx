import React, { useState, useMemo, useEffect } from 'react'
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Card, Typography } from "@material-tailwind/react";
import { GlobalFilter } from '../table/GlobalFilter';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { format } from 'date-fns';

function ScheduleTable({ schedule }) {
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const data = useMemo(() => schedule, [schedule]);

    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span className='text-sm'>{value}</span>,
            },
            {
                Header: 'Id cuộc hẹn',
                accessor: 'schedule_id',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Người gửi',
                accessor: 'sender',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Người nhận',
                accessor: 'receiver',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Lịch hẹn',
                accessor: 'schedule_time',
                Cell: ({ cell: { value } }) => <span className='text-sm'>{format(new Date(value), 'dd-MM-yyyy HH:mm')}</span>, // Format the date
            },
            {
                Header: 'Địa điểm',
                accessor: 'location',
                Cell: ({ value }) => <span className='text-sm'>{value}</span>
            },
            {
                Header: 'Trạng thái',
                accessor: 'is_accept',
                Cell: ({ value }) => {
                    if (value === true) {
                        return <span className='text-white bg-[#8BC255] rounded p-1 text-sm'>Thành công</span>;
                    } else if (value === false) {
                        return <span className='text-white bg-[#FF5726] rounded p-1 text-sm'>Từ chối</span>;
                    } else {
                        return <span className='text-white bg-[#FF981F] rounded p-1 text-sm'>Đang chờ</span>;
                    }
                }
            }

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
            </div>
        </>
    );
}

export default ScheduleTable
