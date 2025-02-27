import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DataTable, { createTheme } from 'react-data-table-component'
import { GetCurrent } from '../../getCurrent'
import axiosClient from '../../axiosClient'
import s from './AllUsers.module.css'
import { Link, useNavigate } from 'react-router-dom'

import showToast from '../../components/Notification/ShowToast'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Define a custom dark theme for DataTable
createTheme('customDark', {
  text: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
  },
  background: {
    default: '#1d222b',
    hover: '#4a4a4a',
    header: '#333131',
    footer: '#333131',
    contextual: '#333131',
  },
  context: {
    background: '#2a2a2a',
    text: '#FFFFFF',
  },
  divider: {
    default: '#3a3a3a',
  },
  button: {
    default: '#FFFFFF',
    hover: '#1a7cb8',
    focus: '#1a7cb8',
    disabled: '#2a2a2a',
  },
  sortFocus: {
    default: '#2a9fd1',
  },
  actionButton: {
    default: '#FFFFFF',
    hover: '#1a7cb8',
  },
  highlightOnHover: {
    default: '#4a4a4a',
  },
  dropdown: {
    background: '#4a4a4a',
    text: '#FFFFFF',
    option: {
      background: '#2b2b2b',
      text: '#FFFFFF',
      hoverBackground: '#3a3a3a',
    },
  },
})

const AllUsers = () => {
  const theme = useSelector((state) => state?.theme)
  const [users, setUsers] = useState([])
  const [renderKey, setRenderKey] = useState(0)
  const [toggleUser, setTuggleUser] = useState({})
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(15)

  let originalUsers = []

  useEffect(() => {
    getCurrent()
  }, [])

  const handleUpdateUser = (id) => {
    console.log('user: ', user)
    console.log('users: ', users)
    console.log('id: ', id)
    for (let i = 0; i < users?.length; i++) {
      if (users[i]?.user_id == id) {
        if (users[i]?.roleType == 'super_admin' && user?.roleType != 'super_admin') {
          console.log('user to update: ', users[i])
          showToast('Unauthorized', 'error')
          return
        }
      }
    }

    navigate(`/update/user/${id}`)
  }

  const getCurrent = async () => {
    console.log('called getCurrent')
    const res = await GetCurrent('users')
    setUser(res)
    console.log('res: ', user)
    getUsers()
    return
  }

  const getUsers = async () => {
    const res = await axiosClient.get('/user/get/users')
    let users = res?.data?.users
    users = users?.filter((u) => u?.user_id !== user?.user_id)
    setUsers(users)
  }

  const handleToggleUser = async (id) => {
    console.log('id: ', id)
    for (let i = 0; i < users?.length; i++) {
      if (users[i]?.user_id == id && users[i]?.roleType == 'super_admin') {
        showToast('Unauthorized', 'error')
        return
      }
    }

    try {
      const res = await axiosClient.put(`/user/toggle/active/${id}`)

      console.log('res: ', res)
      showToast('User updated successfully!', 'success')
      let tempUsers = [...users]
      console.log('tempUsers: ', tempUsers)
      for (let i = 0; i < tempUsers?.length; i++) {
        if (tempUsers[i]?.user_id == id) {
          console.log('tempUsers: ', tempUsers[i]?.active)
          tempUsers[i].active = !tempUsers[i]?.active
          console.log('tempUsers: ', tempUsers[i]?.active)
        }
      }
      setUsers(tempUsers)
      setRenderKey(renderKey + 1)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row?.name,
      sortable: true,
      minWidth: '100px',
    },
    {
      name: 'User Name',
      selector: (row) => row?.user_name,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row?.roleType,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className={``}>
          <div className="">
            <span
              className={`rounded-1 text-light border-0  px-1  d-flex justify-content-center align-items-center gap-4 ${theme == 'dark' ? 'text-light' : 'text-dark'} `}
            >
              <Link to={`/user/${row?.user_id}`}>
                <i
                  className={`bi bi-eye-fill drop_shadow pointer icon-hover ${theme == 'dark' ? 'text-light' : 'text-dark'} `}
                ></i>
              </Link>

              <i
                onClick={() => {
                  handleUpdateUser(row?.user_id)
                }}
                className={`bi bi-pen-fill drop_shadow pointer icon-hover ${theme == 'dark' ? 'text-light' : 'text-dark'}`}
              ></i>

              <i
                data-bs-toggle="modal"
                data-bs-target="#toggleUserModel"
                onClick={() => {
                  setTuggleUser(row)
                }}
                className={`bi bi-hand-thumbs-up-fill text-success drop_shadow pointer ${row?.active == true ? '' : 'd-none'}`}
              ></i>
              <i
                data-bs-toggle="modal"
                data-bs-target="#toggleUserModel"
                onClick={() => {
                  setTuggleUser(row)
                }}
                className={`bi bi-hand-thumbs-down-fill text-danger drop_shadow pointer ${row?.active == false ? '' : 'd-none'}`}
              ></i>
            </span>
          </div>
        </div>
      ),
    },
  ]

  useGSAP(() => {
    gsap.fromTo(
      '.fade-in',
      {
        delay: 0.5,
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
      },
    )
  }, [])

  return (
    <>
      <div className={`bootstrapModal`}>
        <div
          className={`modal fade`}
          id="toggleUserModel"
          tabindex="-1"
          aria-labelledby="toggleUserModelLabel"
          aria-hidden="true"
        >
          <div className={`modal-dialog`}>
            <div className={`modal-content`}>
              <div className={`modal-header`}>
                <h1 className={`modal-title fs-5`} id="toggleUserModelLabel">
                  {toggleUser?.active == true
                    ? 'Deactivate ' + toggleUser?.name
                    : 'Activate ' + toggleUser?.name}
                </h1>
                <button
                  type="button"
                  className={`btn-close`}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className={`modal-footer`}>
                <button type="button" className={`btn btn-secondary`} data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className={`btn  ${toggleUser?.active == true ? 'btn-danger' : 'btn-primary'} `}
                  data-bs-toggle="modal"
                  data-bs-target="#toggleUserModel"
                  onClick={() => {
                    handleToggleUser(toggleUser?.user_id)
                  }}
                >
                  {toggleUser?.active == true ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 fade-in`}>
        <div className={`w-100 px-3 d-flex justify-content-end`}>
          <Link to="/add/user">
            <button
              type="button"
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} btn-sm px-3 bg-gradient capitalize`}
            >
              Add User
            </button>
          </Link>
        </div>

        <div className="w-100" key={renderKey}>
          <div className={`d-flex align-items-center justify-content-end mt-2 px-2`}>
            <div className="d-flex gap-2">
              <label className="d-flex text-nowrap" htmlFor="rowsPerPage">
                Select Rows
              </label>
              <select
                className={`form-select form-select-sm ${theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} border-0 shadow-none`}
                id="rowsPerPage"
                aria-label="Rows per page"
                defaultValue={15}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                style={{ height: '25px' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
          </div>
          <div className={``} key={rowsPerPage}>
            <DataTable
              className=""
              columns={columns}
              data={users}
              fixedHeaderScrollHeight="300px"
              theme={theme === 'dark' ? 'customDark' : 'light'}
              selectableRows
              pagination
              highlightOnHover
              paginationPerPage={rowsPerPage}
              paginationRowsPerPageOptions={[rowsPerPage]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllUsers
