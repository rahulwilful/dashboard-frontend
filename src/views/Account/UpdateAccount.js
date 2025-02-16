import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GetCurrent } from '../../getCurrent'
import axiosClient from '../../axiosClient'
import showToast from '../../components/Notification/ShowToast'

import s from './MyAccount.module.css'
import { Link } from 'react-router-dom'

const UpdateAccount = () => {
  const theme = useSelector((state) => state.theme)
  const [renderKey, setRenderKey] = useState(0)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [user, setUser] = useState({})
  const [userForm, setUserForm] = useState({})
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  })

  useEffect(() => {
    getCurrent()
  }, [])

  const getCurrent = async () => {
    const user = await GetCurrent()
    //console.log('user ', user)
    user && setUser(user)
    user && setUserForm(user)

    /* user = {
       active: 1,
       analysis: 1,
       config: 1,
       created: '2024-10-27T10:58:22.000Z',
       email: 'rahul@gmail.com',
       limits: 1,
       name: 'rahul',
       password: '$2a$10$1q.hw3.n5gx97DyrYzeTXukR93Rx/stDBbyY8j9JrDoF1gGawybVS',
       phone_no: 2147483647,
       roleType: 'super_admin',
       settings: 1,
       user_id: 1,
     }  */
  }

  const handleUserUpdate = async () => {
    console.log('userForm: ', userForm)
    try {
      const { data } = await axiosClient.put(`/user/update/${user.user_id}`, userForm)
      console.log(data)
      if (!data) {
        showToast('Error while updating details', 'error')
        return
      }
      showToast('Details updated successfully!', 'success')
      setRenderKey(renderKey + 1)
      getCurrent()
    } catch (error) {
      console.error(error)
      showToast('Error while updating details', 'error')
    }
  }

  const handlePasswordUpdate = async () => {
    console.log('passwordForm: ', passwordForm)
    try {
      const { data } = await axiosClient.put(`/user/update/password/${user?.user_id}`, passwordForm)
      console.log(data)

      if (!data) {
        showToast('Error while updating password', 'error')
        return
      }
      showToast('Password updated successfully!', 'success')
      setRenderKey(renderKey + 1)
      getCurrent()
    } catch (error) {
      console.error(error)
      if (error.status === 401) {
        showToast('Current password is incorrect', 'error')
      } else {
        showToast('Error while updating password', 'error')
      }
    }
  }

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

  return (
    <>
      <div className={`bootstrapModal`}>
        <div
          className="modal fade"
          id="changePasswordModal"
          tabindex="-1"
          aria-labelledby="changePasswordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="changePasswordModalLabel">
                  Change Password
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 ">
                  <div className={``}>
                    <input
                      type="password"
                      className={`form-control `}
                      placeholder="Current Password"
                      required=""
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, current_password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 ">
                  <div className={``}>
                    <input
                      type="password"
                      className={`form-control `}
                      placeholder="New Password"
                      required=""
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, new_password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 ">
                  <div className={``}>
                    <input
                      type="password"
                      className={`form-control `}
                      placeholder="Confirm Password"
                      required=""
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirm_password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordModal"
                  onClick={handlePasswordUpdate}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div
        className={`${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 d-flex justify-content-center`}
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
                        <div className={`opacity-75`}>
                          <label className={`small mb-1`} htmlFor="Role">
                            Role
                          </label>
                          <input
                            disabled
                            className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                            id="Role"
                            type="text"
                            name=""
                            value={userForm?.roleType}
                          />
                        </div>
                      </div>

                      <div className={`col-xl-12  `}>
                        <div className={`row mt-3`}>
                          <div className={`col-3`}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled
                                value=""
                                onClick={() =>
                                  setUserForm({ ...userForm, limits: !userForm.limits })
                                }
                                checked={userForm?.limits ? true : false}
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
                                disabled
                                onClick={() =>
                                  setUserForm({ ...userForm, analysis: !userForm.analysis })
                                }
                                checked={userForm?.analysis ? true : false}
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
                                disabled
                                onClick={() =>
                                  setUserForm({ ...userForm, config: !userForm.config })
                                }
                                checked={userForm?.config ? true : false}
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
                                disabled
                                onClick={() =>
                                  setUserForm({ ...userForm, settings: !userForm.settings })
                                }
                                checked={userForm?.settings ? true : false}
                                value=""
                                id="flexCheckDefault3"
                              />
                              <label className="form-check-label" htmlFor="flexCheckDefault3">
                                Settings
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
                  Update Account
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordModal"
                  className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} btn-sm px-3 bg-gradient capitalize`}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateAccount
