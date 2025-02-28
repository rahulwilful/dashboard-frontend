import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import showToast from '../../components/Notification/ShowToast'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './AllUsers.module.css'

import { GetCurrent } from '../../getCurrent'
import axiosClient from '../../axiosClient'

const UpdateUser = () => {
  const navigate = useNavigate()
  const theme = useSelector((state) => state?.theme)
  const [renderKey, setRenderKey] = useState(0)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [user, setUser] = useState({})
  const [userForm, setUserForm] = useState({
    name: '',
    user_name: '',
    phone_no: '',
    roleType: '',
    limits: false,
    analysis: false,
    config: false,
    settings: false,
    users: false,
  })
  const [roles, setRoles] = useState([])
  const { id } = useParams()

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark text-light border-secondary  border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border `,
    )
  }, [theme])

  useEffect(() => {
    getCurrent().then(() => {
      getUser()
      getRoles()
    })
  }, [])

  const getUser = async () => {
    try {
      const res = await axiosClient.get(`/user/get/${id}`)
      console.log('res: ', res?.data?.user)

      setUser(res?.data?.user)
      setUserForm(res?.data?.user)
    } catch (err) {
      console.log('error: ', err)
    }
    return
  }

  const getRoles = async () => {
    console.log('called Roles')

    try {
      const res = await axiosClient.get(`/role/get/all`)
      console.log('role: ', res)
      setRoles(res?.data?.roles)
    } catch (err) {
      console.log('error: ', err)
    }
    return
  }

  const getCurrent = async () => {
    console.log('called getCurrent')
    const user = await GetCurrent('users')
    console.log('user ', user)
  }

  const handleUserUpdate = async () => {
    console.log('called handleUserUpdate')
    try {
      const res = await axiosClient.put(`/user/update/by/super/admin/${id}`, userForm)
      console.log('res: ', res?.data?.user)

      showToast('User updated successfully!', 'success')
      setTimeout(() => {
        navigate('/all/users')
      }, 1500)
    } catch (err) {
      console.log('error: ', err)
      showToast('Error while updating user', 'error')
    }
    return
  }

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
      <div
        className={`${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 d-flex justify-content-center fade-in`}
      >
        <div className={`w-100`}>
          <div className={`container-xl px-4 mt-4 `}>
            <div className={`row `}></div>
            <div className={`col-xl-12  `}>
              {/* Account details card */}
              <div
                className={`card mb-4 border border-secondary border-opacity-50 shadow-xs  text-bg-${theme}`}
              >
                <div
                  className={`card-header border-bottom border-secondary border-opacity-25 d-flex justify-content-between`}
                >
                  <div className={``}>Update Account</div>
                </div>
                <div className={`card-body`}>
                  <div>
                    {/* Form Group (username) */}

                    {/* Form Row */}
                    <div className={`row gx-3 mb3`}>
                      <div className={`col-12 col-md-6 col-xl-4`}>
                        <div className={`mb-3`}>
                          <label className={`small mb-1`} htmlFor="name">
                            Name
                          </label>
                          <input
                            className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                            id="name"
                            type="text"
                            value={userForm?.name}
                            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className={`col-12 col-md-6 col-xl-4`}>
                        <div className={`opacity-75`}>
                          <label className={`small mb-1`} htmlFor="Role">
                            User Name
                          </label>
                          <input
                            disabled
                            className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                            id="Role"
                            type="text"
                            name=""
                            value={userForm?.user_name}
                          />
                        </div>
                      </div>
                      <div className={`col-12 col-md-6 col-xl-4`}>
                        <div className={``}>
                          <label className={`small mb-1`} htmlFor="mobile_no">
                            Mobile Number
                          </label>
                          <input
                            className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                            id="mobile_no"
                            type="text"
                            value={userForm?.phone_no}
                            onChange={(e) => setUserForm({ ...userForm, phone_no: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className={`col-12 col-md-6 col-xl-4`}>
                        <div className={``}>
                          <label className={`small mb-1`} htmlFor="Role">
                            Role
                          </label>
                          <select
                            className={`form-select ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                            id="Role"
                            value={userForm?.roleType}
                            onChange={(e) => setUserForm({ ...userForm, roleType: e.target.value })}
                          >
                            {roles?.map((role, i) => (
                              <option key={i} value={role?.type}>
                                {role?.role_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className={`col-xl-12  `}>
                        <div className={`row mt-3 g-2`}>
                          <div className={`col-3`}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                onClick={() =>
                                  setUserForm({ ...userForm, limits: !userForm?.limits })
                                }
                                checked={userForm?.limits ?? false}
                                id="flexCheckDefault"
                              />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Limits
                              </label>
                            </div>
                          </div>
                          <div className={`col-3`}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={() =>
                                  setUserForm({ ...userForm, analysis: !userForm?.analysis })
                                }
                                checked={userForm?.analysis ?? false}
                                value=""
                                id="flexCheckDefault1"
                              />
                              <label className="form-check-label" htmlFor="flexCheckDefault1">
                                Analysis
                              </label>
                            </div>
                          </div>
                          <div className={`col-3`}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={() =>
                                  setUserForm({ ...userForm, config: !userForm?.config })
                                }
                                checked={userForm?.config ?? false}
                                value=""
                                id="flexCheckDefault2"
                              />
                              <label className="form-check-label" htmlFor="flexCheckDefault2">
                                Config
                              </label>
                            </div>
                          </div>
                          <div className={`col-3`}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={() =>
                                  setUserForm({ ...userForm, settings: !userForm?.settings })
                                }
                                checked={userForm?.settings ?? false}
                                value=""
                                id="flexCheckDefault3"
                              />
                              <label className="form-check-label" htmlFor="flexCheckDefault3">
                                Settings
                              </label>
                            </div>
                          </div>
                          <div className={`col-3`}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={() =>
                                  setUserForm({ ...userForm, users: !userForm?.users })
                                }
                                checked={userForm?.users ?? false}
                                value=""
                                id="flexCheckDefault3"
                              />
                              <label className="form-check-label" htmlFor="flexCheckDefault3">
                                Users
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={` px-3 d-flex justify-content-end gap-2`}>
                <button
                  type="button"
                  onClick={() => handleUserUpdate()}
                  className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} btn-sm px-3 bg-gradient capitalize`}
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateUser
