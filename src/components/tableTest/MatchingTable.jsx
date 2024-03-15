import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Card, Typography } from "@material-tailwind/react";

const MatchingTable = ({ matchings }) => {
    const [selectedmatchings, setSelectedmatchings] = useState(null);
    // const [modalIsOpen, setModalIsOpen] = useState(false);

    const data = useMemo(() => matchings, [matchings]);

    const columns = useMemo(
        () => [
            {
                Header: ' ',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: 'Thông tin người dùng 1',
                accessor: 'user1',
                Cell: ({ row }) => (
                    <div className='flex justify-center items-center w-[100px] ml-4'>
                        <img src={row.original.avatar1} alt="Hình ảnh" className="mx-auto ml-3" style={{ maxWidth: '50px', maxHeight: '100px' }} />
                        <span className='ml-[30px]'>{row.original.name1}</span>
                    </div>
                ),
            },
            {
                Header: 'Thông tin người dùng 2',
                accessor: 'user2',
                Cell: ({ row }) => (
                    <div className='flex justify-center items-center w-[100px] ml-4'>
                        <img src={row.original.avatar2} alt="Hình ảnh" className="mx-auto ml-3 rounded-xl" style={{ maxWidth: '50px', maxHeight: '100px' }} />
                        <span className='ml-[30px] w-[100px]'>{row.original.name2}</span>
                    </div>
                ),
            },
            {
                Header: 'Trạng thái',
                accessor: 'match',
                Cell: ({ row }) => {
                    let color = '';

                    switch (row.original.match) {
                        case 'Đang chờ':
                            color = 'blue';
                            break;
                        case 'Tương thích':
                            color = 'pink';
                            break;
                        case 'Từ chối':
                            color = 'red';
                            break;
                        default:
                            color = 'inherit'; // Màu mặc định
                    }

                    return <span style={{ color, border: '1px solid', borderRadius: '30px', padding: '7px' }}>{row.original.match}</span>;
                },
            }
            ,
            {
                Header: 'Lịch hẹn',
                accessor: 'appointment',
                Cell: ({ row }) => {
                    let color = '';

                    switch (row.original.appointment) {
                        case 'Đã lên hẹn':
                            color = 'green';
                            break;
                        case 'Chưa có cuộc hẹn':
                            color = 'black';
                            break;
                        case 'Đã gửi':
                            color = 'orange';
                            break;
                        default:
                            color = 'red'; // Màu mặc định
                    }

                    return <span style={{ color, border: '1px solid', borderRadius: '30px', padding: '7px' }}>{row.original.appointment}</span>;
                },
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
            </div >
        </>
    );
};

export default MatchingTable;
