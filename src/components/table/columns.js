import { format } from 'date-fns'

// Hàm tạo cột với giá trị tùy chỉnh cho Header và accessor
// const createCustomColumn = (header, accessor) => {
//     return {
//         Header: header,
//         accessor: accessor,
//     };
// };

// export const COLUMNS = [
//     createCustomColumn('Id', 'id'),
//     createCustomColumn('First Name', 'first_name'),
//     createCustomColumn('Last Name', 'last_name'),
//     createCustomColumn('Date of Birth', 'date_of_birth'),
//     createCustomColumn('Country', 'country'),
//     createCustomColumn('Phone', 'phone'),
// ];

function createCustomColumn(Header, accessor) {
    return {
        Header: Header === '#' ? Header : '', // Only show Header for the '#' column
        accessor: accessor,
        Cell: ({ row }) => {
            return Header === '#' ? <span>{row.index + 1}</span> : row.original[accessor]; // Display row number only for the '#' column
        }
    };
}


export const COLUMNS = [
    createCustomColumn('#', ),
    createCustomColumn('Id', 'blog_id'),
    createCustomColumn('Likes Count', 'likes_count'),
];