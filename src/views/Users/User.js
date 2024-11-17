import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom'

import s from './AllUsers.module.css'

import { GetCurrent } from '../../getCurrent'
import axiosClient from '../../axiosClient'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const User = () => {
  const theme = useSelector((state) => state.theme)
  const [renderKey, setRenderKey] = useState(0)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [user, setUser] = useState({})
  const [userForm, setUserForm] = useState({})
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
    })
  }, [])

  const getUser = async () => {
    console.log('called getUser')

    try {
      const res = await axiosClient.get(`/user/get/${id}`)
      console.log('res: ', res.data.user)

      setUser(res.data.user)
      setUserForm(res.data.user)
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
                <div className={``}>Account Details</div>
                <div className={``}>
                  <Link to={`/update/user/${user.user_id}`}>
                    <i
                      className={`bi bi-pen-fill icon icon-hover pointer text-shadow icon-hover text-shadow ${theme == 'dark' ? 'text-light' : 'text-dark'}`}
                    ></i>
                  </Link>
                </div>
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
                          disabled
                          className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                          id="name"
                          type="text"
                          value={user.name}
                        />
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 col-xl-4`}>
                      <div className={``}>
                        <label className={`small mb-1`} htmlFor="Role">
                          User Name
                        </label>
                        <input
                          disabled
                          className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                          id="Role"
                          type="text"
                          name=""
                          value={user.user_name}
                        />
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 col-xl-4`}>
                      <div className={``}>
                        <label className={`small mb-1`} htmlFor="mobile_no">
                          Mobile Number
                        </label>
                        <input
                          disabled
                          className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                          id="mobile_no"
                          type="text"
                          value={user.phone_no}
                        />
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 col-xl-4`}>
                      <div className={``}>
                        <label className={`small mb-1`} htmlFor="Role">
                          Role
                        </label>
                        <input
                          disabled
                          className={`form-control ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                          id="Role"
                          type="text"
                          name=""
                          value={user.roleType}
                        />
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 col-xl-4`}></div>
                    <div className={`col-12 col-md-6 col-xl-4`}></div>{' '}
                    <div className={`col-12 col-md-6 col-xl-4`}></div>
                    <div className={`col-12 col-md-6 col-xl-4`}></div>
                    <div className={`col-12 col-md-6 col-xl-4`}></div>
                    <div className={`col-xl-12  `}>
                      <div className={`row mt-3 g-2`}>
                        <div className={`col-3`}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={user.limits ? true : false}
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
                              checked={user.analysis ? true : false}
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
                              checked={user.config ? true : false}
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
                              checked={user.settings ? true : false}
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
                              checked={user.users ? true : false}
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
            <div className={`row`}>
              <div className={`col`}></div>
              <div className={`col`}></div>
              <div className={`col`}></div>
              <div className={`col`}>
                <div className={`float-right`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
