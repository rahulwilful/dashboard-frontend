import React, { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { CPagination, CPaginationItem } from '@coreui/react'

import s from './DataTableComponent.module.css'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DataTableComponent = (props) => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state?.theme)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  useEffect(() => {
    if (props?.data) {
      setData(props?.data)
    } else {
      setData(tempData)
    }
  }, [theme, props?.data])

  const columns = [
    /*  {
      name: 'Table',
      selector: (row) => row?.table_Name,
      sortable: true,
      minWidth: '100px',
    }, */
    {
      name: 'Date',
      selector: (row) => row?.date_time,
      sortable: true,
    },
    {
      name: 'Winning No',
      cell: (row) => (
        <div className={``}>
          <div className="">
            <span
              className={`rounded-1 bg-gradient bg-success px-3 text-light border-0 bg-gradient px-1 shadow-xs `}
            >
              {row?.winning_number}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: ' Direction',
      selector: (row) => row?.wheel_direction,
    },
    {
      name: ' Speed',
      cell: (row) => (
        <div className={s.percentage}>
          <div className="">
            <span
              className={`rounded-1 bg-gradient bg-primary text-light border-0 bg-gradient px-1 shadow-xs `}
            >
              {row?.wheel_speed}
            </span>
          </div>
        </div>
      ),
    },
  ]

  const tempData = [
    {
      table_Name: 'Page A',
      date_time: 4000,
      winning_number: 2400,
      wheel_direction: 2400,
      wheel_speed: 100,
      per: 20,
      val: 5000,
    },
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
          <div className="border-bottom border-secondary border-opacity-50 border-primary px-3 d-flex py-1 justify-content-between align-items-center h-100">
            <div className=" ">History</div>
            <div className={`d-flex align-items-center mt-2`}>
              <div className="me-auto">
                <select
                  className={`form-select form-select-sm ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}  border-0`}
                  aria-label="Rows per page"
                  defaultValue={7}
                  onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                  style={{ height: '25px' }}
                >
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                  <option value={13}>13</option>
                  <option value={15}>15</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <DataTable
          key={rowsPerPage}
          className={`font8 text-dark overflow-x-scroll pointer ${s.rdt_Pagination}`}
          columns={columns}
          data={data}
          fixedHeader
          fixedHeaderScrollHeight="300px"
          pagination
          theme={theme === 'light' ? 'light' : 'dark'}
          customStyles={customStyles}
          highlightOnHover
          onRowClicked={handleRowClick}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[rowsPerPage]}
        />
      </div>
    </>
  )
}

export default DataTableComponent
