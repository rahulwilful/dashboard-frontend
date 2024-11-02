import React, { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { CPagination, CPaginationItem } from '@coreui/react'

import s from './DataTableComponent.module.css'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DataTableComponent = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)

  useEffect(() => {}, [theme])

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'UV',
      selector: (row) => row.uv,
    },
    {
      name: 'PV',
      selector: (row) => row.pv,
    },
    {
      name: 'Value',
      selector: (row) => row.val,
    },
    {
      name: 'Amount',
      selector: (row) => row.amt,
    },
    {
      name: 'Count',
      selector: (row) => row.cnt,
    },
    {
      name: 'Percent',
      selector: (row) => row.per,
    },
  ]

  const tempData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, cnt: 100, per: 20, val: 5000 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, cnt: 50, per: 15, val: 3000 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, cnt: 150, per: 18, val: 4500 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, cnt: 80, per: 22, val: 6000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, cnt: 120, per: 25, val: 7000 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, cnt: 100, per: 12, val: 4000 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page H', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page I', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page J', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page K', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page L', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page M', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page N', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
    { name: 'Page O', uv: 3490, pv: 4300, amt: 2100, cnt: 90, per: 10, val: 3000 },
  ]

  // Custom styles for DataTable
  const customStyles = {
    rows: {
      style: {
        minHeight: '14px', // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: '14px', // Set the font size for header cells
        fontWeight: 'semibold', // Set the font weight for header cells
      },
    },
    cells: {
      style: {
        fontSize: '12px', // Set the font size for table cells
      },
    },
    title: {
      style: {
        minHeight: '14px', // Set the font size for title
      },
    },
  }

  const handleRowClick = (row) => {
    console.log('Row clicked:', row)
  }

  return (
    <>
      <div
        className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} ${'bg-' + theme} bg-gradient poppins-500 w-100   rounded overflow-hidden shadow-s`}
      >
        <div className="w-100 px-1">
          <div className="border-bottom border-secondary border-opacity-50 border-primary px-3 d-flex align-items-center h-100">
            <div className=" ">Table</div>
          </div>
        </div>
        <DataTable
          className={`font8 text-dark text- pointer ${s.rdt_Pagination}`}
          columns={columns}
          data={tempData}
          fixedHeader
          fixedHeaderScrollHeight="300px"
          pagination
          theme={theme === 'light' ? 'light' : 'dark'}
          customStyles={customStyles}
          highlightOnHover
          onRowClicked={handleRowClick}
          paginationPerPage="7"
          paginationRowsPerPageOptions={[5, 7, 10, 15]}
        />
      </div>
    </>
  )
}

export default DataTableComponent
