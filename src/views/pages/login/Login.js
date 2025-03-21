import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import showToast from '../../../components/Notification/ShowToast'

import s from './Login.module.css'

import axiosClient from '../../../axiosClient'
import LOGO from 'src/assets/brand/LOGO.png'
import Earth from './Earth'

const Login = () => {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const [user_name, setUser_name] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!navigator?.onLine) {
      //showToast('error', 'No internet connection')
    } else {
      //showToast('success', 'Internet connection')
    }
  }, [])

  useEffect(() => {
    getCurrent()
  }, [])

  const getCurrent = async () => {
    console.log('called getCurrent')

    try {
      const res = await axiosClient.get(`/user/get/current`)
      if (res?.data) {
        // navigate('/')
      }
    } catch (err) {}
    return
  }

  const varify = () => {
    if (user_name == '') {
      showToast('Please enter username', 'info')
      return false
    }
    if (password == '') {
      showToast('Please enter password', 'info')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!varify()) return
    setIsLoading(true)
    console.log('handleSubmit called')
    console.log('user_name: ', user_name, 'password: ', password)
    try {
      const response = await axiosClient.post('user/login', {
        user_name,
        password,
      })
      console.log('Login successful, response: ', response)
      localStorage.setItem('token', response?.data?.token)
      console.log('Token stored in localStorage')
      showToast('Login successful', 'success')
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
      //
    } catch (err) {
      console.error('Error during login: ', err)
      setError(err?.response?.data?.message)
      if (err?.response?.data?.message) {
        showToast(err?.response?.data?.message, 'error')
        console.log('Forbidden error toast shown')
      } else {
        showToast('Something went wrong', 'error')
      }
      console.log('error: ', err)
    }
    setIsLoading(false)
  }

  const handleShowLoginForm = () => {
    setShowForm(!showForm)
    gsap.from('.card-group ', {
      delay: 0.5,
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power1.out',
    })
  }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center position-relative">
      <Earth />
      <div
        className={`position-absolute ${showForm ? 'd-block' : 'd-none'}   ${s.card_container}   `}
      >
        <div className={`container d-flex justify-content-center align-items-center h-100`}>
          <div className={`row justify-content-center`}>
            <div className={`col-12`}>
              <div className={`card-group `}>
                <div className={`card p-4 bg-black bg-gradient bg-opacity-75 text-white`}>
                  <div className={`card-body`}>
                    <form onSubmit={handleSubmit} className={`d-flex flex-column gap-3`}>
                      <h1 className={`text-center poppins-500`}>Login</h1>

                      <div className={``}>
                        <div className={`input-group mb-3`}>
                          <div className={`input-group-text`}>
                            <i className="bi bi-person"></i>
                          </div>
                          <input
                            type="text"
                            className={`form-control`}
                            placeholder="Username"
                            autoComplete="username"
                            value={user_name}
                            onChange={(e) => setUser_name(e.target.value)}
                          />
                        </div>
                        <div className={`input-group mt-3 mb-4`}>
                          <div className={`input-group-text`}>
                            <i className="bi bi-key"></i>
                          </div>
                          <input
                            type="password"
                            className={`form-control`}
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={`row`}>
                        <div className={`col-xs-6 d-flex justify-content-center`}>
                          {isLoading ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <button
                              type="submit"
                              className={`btn text-light poppins-500 bg-primary bg-gradient px-4`}
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`position-absolute top-50 start-50 translate-middle ${
          !showForm ? 'd-block' : 'd-none'
        }`}
      >
        <button
          type="button"
          onClick={() => handleShowLoginForm()}
          className="btn btn-lg shadow-s text-light poppins-500 btn-outline-primary px-4"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
