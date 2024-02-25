import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { Checkbox } from './checkbox';

function Pagination() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy, usePagination)
    const { globalFilter, pageIndex, pageSize } = state
    return (
        <div className='text-black mt-[40px] w-[1100px]'>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className="checkbox-group">
                <div className="checkbox-container">
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {
                    allColumns.map(column => (
                        <div key={column.id} className="checkbox-container">
                            <label style={{ marginLeft: "30px" }}>
                                <input
                                    type='checkbox' {...column.getToggleHiddenProps()}
                                    className="mr-3"
                                />
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>

                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination-container">
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page: {' '}
                    <input type='number' defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        className="pagination-input"
                    />
                </span>
                <select className="pagination-select" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button className="pagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>

                <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button className="pagination-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </div>
    )
}

export default Pagination
