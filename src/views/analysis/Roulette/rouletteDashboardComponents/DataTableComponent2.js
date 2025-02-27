import React, { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { CPagination, CPaginationItem, CWidgetStatsB } from '@coreui/react'

import s from './DataTableComponent.module.css'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DataTableComponent2 = (props) => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state?.theme)
  const [rowsPerPage, setRowsPerPage] = useState(15)

  useEffect(() => {}, [theme])

  useEffect(() => {
    if (props?.data) {
      setData(props?.data)
    } else {
      setData(tempData)
    }
  }, [theme, props?.data])

  const columns = [
    {
      name: 'Date',
      selector: (row) => row?.date_time,
      sortable: true,
    },
    {
      name: 'Winning Number',
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
      name: 'Wheel Direction',

      cell: (row) => (
        <div className={``}>
          <div className="">
            <span
              className={`rounded-1 bg-gradient ${row?.wheel_direction == 0 ? 'bg-primary' : 'bg-danger'}  px-3 text-light border-0 bg-gradient px-1 shadow-xs `}
            >
              {row?.wheel_direction}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: 'Wheel Speed',
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
    {
      name: 'Warning Flag',
      cell: (row) => (
        <div className={s.percentage}>
          <div className="">
            {row?.warning_flags == 0 ? (
              <span
                className={`rounded-1 bg-gradient bg-dark  px-2 text-light border-0 bg-gradient px-1 shadow-xs `}
              >
                {row?.warning_flags}
              </span>
            ) : (
              <span
                className={`rounded-1 bg-gradient bg-warning  px-2 text-light border-0 bg-gradient px-1 shadow-xs `}
              >
                {row?.warning_flags}
              </span>
            )}
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
        fontSize: '14px', // Set the font size for table cells
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
        className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} ${'bg-' + theme} bg-gradient poppins-500 w-100  rounded overflow-hidden shadow-s `}
      >
        <div className="w-100 px-1 ">
          <div className="border-bottom py-2 border-secondary border-opacity-50 border-primary px-3 d-flex align-items-center justify-content-between h-100">
            <div className=" ">Table2</div>
            <div className={`d-flex align-items-center mt-2`}>
              <div className="me-auto ">
                <select
                  className={`form-select form-select-sm ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}  shadow-none border-0 border-secondary`}
                  placeholder="Rows per page"
                  defaultValue={15}
                  onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                  style={{ height: '25px' }}
                >
                  <option
                    className={` ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                    value={5}
                  >
                    5
                  </option>
                  <option
                    className={` ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                    value={10}
                  >
                    10
                  </option>
                  <option
                    className={` ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                    value={15}
                  >
                    15
                  </option>
                  <option
                    className={` ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                    value={20}
                  >
                    20
                  </option>
                  <option
                    className={` ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                    value={25}
                  >
                    25
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={``} key={rowsPerPage}>
          <DataTable
            className={`font8 text-dark text- pointer ${s.rdt_Pagination}`}
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
      </div>
    </>
  )
}

export default DataTableComponent2
