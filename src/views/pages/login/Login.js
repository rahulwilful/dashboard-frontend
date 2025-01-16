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

import showToast from '../../../components/Notification/ShowToast'

import axiosClient from '../../../axiosClient'
import LOGO from 'src/assets/brand/LOGO.png'

const Login = () => {
  const navigate = useNavigate()
  const [user_name, setUser_name] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    getCurrent()
  }, [])

  const getCurrent = async () => {
    console.log('called getCurrent')

    try {
      const res = await axiosClient.get(`/user/get/current`)
      //  console.log('res.data.result: ', res)
      if (res) {
        // navigate('/')
      }
    } catch (err) {}
    return
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handleSubmit called')
    console.log('user_name: ', user_name, 'password: ', password)
    try {
      const response = await axiosClient.post('user/login', {
        user_name,
        password,
      })
      console.log('Login successful, response: ', response)
      localStorage.setItem('token', response.data.token)
      console.log('Token stored in localStorage')
      window.location.href = '/'
    } catch (err) {
      console.error('Error during login: ', err)
      setError(err.response.data.message)
      if (err.status == 403) {
        showToast('Forbidden , please contact admin', 'error')
        console.log('Forbidden error toast shown')
      }
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <div className="  d-flex justify-content-center mb-3">
              <div className=" bg-dark p-1 rounded">
                <div>
                  <CImage src={LOGO} style={{ width: '120px' }} />
                  {/*  <image src={LOGO}  style={{ width: '90px',height: '90px' }}/> */}
                </div>
              </div>
            </div>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    {/* <div>
                      <image src={LOGO}  style={{ width: '90px' }}/>
                    </div> */}

                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="User Name"
                        autoComplete="user_name"
                        value={user_name}
                        x
                        onChange={(e) => setUser_name(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {error && <div className="text-danger">{error}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/*  <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
           
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
