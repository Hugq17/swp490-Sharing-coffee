import { format } from 'date-fns'

// Hàm tạo cột với giá trị tùy chỉnh cho Header và accessor
const createCustomColumn = (header, accessor) => {
    return {
        Header: header,
        accessor: accessor,
    };
};

export const COLUMNS = [
    createCustomColumn('Id', 'id'),
    createCustomColumn('First Name', 'first_name'),
    createCustomColumn('Last Name', 'last_name'),
    createCustomColumn('Date of Birth', 'date_of_birth'),
    createCustomColumn('Country', 'country'),
    createCustomColumn('Phone', 'phone'),
];