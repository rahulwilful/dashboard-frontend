import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
} from '@coreui/react'
import {
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/9.jpg'
import { useNavigate } from 'react-router-dom'
import { cilSpeedometer } from '@coreui/icons'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleNavigate = (route) => {
    navigate(`${route}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <CModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
       
        <CModalBody>Are you sure you want to log out?</CModalBody>
        <CModalFooter>
          <CButton size="sm" color="secondary" onClick={() => setIsModalVisible(false)}>
            Close
          </CButton>
          <CButton size="sm" color="primary" onClick={handleLogout}>
            Log Out
          </CButton>
        </CModalFooter>
      </CModal>

      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          {/* <CAvatar src={avatar8} size="md" /> */}
          <i class="bi bi-person-circle fs-3" ></i>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
            Account
          </CDropdownHeader>
          <CDropdownItem onClick={() => handleNavigate('/my/account')}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem onClick={() => setIsModalVisible(true)}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Log out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown


/* 
 {/*  <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
          42
          </CBadge>
          </CDropdownItem>
        <CDropdownItem href="#">
        <CIcon icon={cilEnvelopeOpen} className="me-2" />
        Messages
        <CBadge color="success" className="ms-2">
        42
          </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
          42
          </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
          42
          </CBadge>
          </CDropdownItem>
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
          </CDropdownItem>
          <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
          </CDropdownItem>
          <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
          42
          </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
          42
          </CBadge>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
          </CDropdownItem> */
