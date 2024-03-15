import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Card, Typography } from "@material-tailwind/react";

const UserTable = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    // const [modalIsOpen, setModalIsOpen] = useState(false);

    const data = useMemo(() => users, [users]);

    const columns = useMemo(
        () => [
            {
                Header: ' ',
                accessor: (row, index) => index + 1,
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: 'Hình ảnh',
                accessor: 'profile_avatar',
                Cell: ({ cell: { value } }) => <img src={value} alt="Hình ảnh" className="mx-auto" style={{ maxWidth: '100px', maxHeight: '100px' }} />,
            },
            {
                Header: 'Người dùng',
                accessor: 'user_name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Số điện thoại',
                accessor: 'phone',
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

export default UserTable;
