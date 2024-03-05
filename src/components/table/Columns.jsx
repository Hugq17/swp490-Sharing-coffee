import React from 'react'


function createCustomColumn(Header, accessor) {

    return {
        Header: Header, // Keep the header title for all columns
        accessor: accessor,
        Cell: ({ row }) => {
            if (Header === 'Ngày tạo') {
                return <span>{format(new Date(row.original[accessor]), 'dd-MM-yyyy')}</span>;
            } else if (Header === '#') {
                return <span>{row.index + 1}</span>;
            } else if (Header === 'Hình ảnh') {
                return <img src={row.original[accessor]} alt="Hình ảnh" style={{ width: '100px' }} />;
            } else if (Header === 'Trạng thái') {
                return <button>Detail</button>
            }
            else {
                return row.original[accessor];
            }
        }
    };
}
function Columns() {
    return {
        Header: Header, // Keep the header title for all columns
        accessor: accessor,
        Cell: ({ row }) => {
            if (Header === 'Ngày tạo') {
                return <span>{format(new Date(row.original[accessor]), 'dd-MM-yyyy')}</span>;
            } else if (Header === '#') {
                return <span>{row.index + 1}</span>;
            } else if (Header === 'Hình ảnh') {
                return <img src={row.original[accessor]} alt="Hình ảnh" style={{ width: '100px' }} />;
            } else if (Header === 'Trạng thái') {
                return <button>Detail</button>
            }
            else {
                return row.original[accessor];
            }
        }
    };
}

export default Columns
