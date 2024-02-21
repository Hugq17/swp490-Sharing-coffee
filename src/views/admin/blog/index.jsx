import React from 'react'
import Table from '../../../components/table/Table'
import SortingTable from '../../../components/table/SortingTable'
import FilteringTable from '../../../components/table/FilteringTable'
import Pagination from '../../../components/table/Pagination'

function Blog() {
    return (
        <div className='p-2 max-w-5xl mx-auto text-white fill-gray-400'>
            {/* <Table /> */}
            {/* <SortingTable /> */}
            {/* <FilteringTable /> */}
            <Pagination />
        </div>
    )
}

export default Blog
