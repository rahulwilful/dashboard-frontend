import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import { FileSpreadsheetFill, GraphUpArrow, PersonCircle, Sliders } from 'react-bootstrap-icons'

import axiosClient from './axiosClient'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Table Limits',
    to: '/limits',
    className: 'text-capitalize',
    icon: <FileSpreadsheetFill className="nav-icon text-light" />,
    items: [
      /* {
        component: CNavItem,
        name: 'Roulette',
        to: '/limits/roulette',
      }, */
    ],
  },
  {
    component: CNavGroup,
    name: 'Table Analysis',
    className: 'text-capitalize',
    to: '/table/analysis',
    icon: <GraphUpArrow className="nav-icon text-light" />,

    items: [
      /*  {
        component: CNavItem,
        name: 'Roulette',
        to: '/table/analysis/roulette',
      }, */
    ],
  },
  {
    component: CNavItem,
    name: 'Config',
    to: '/config',
    icon: <Sliders className="nav-icon text-light" />,
  },
  /*  {
    component: CNavItem,
    name: 'Account',
    to: '/dashboard',
    icon: <PersonCircle className="nav-icon text-light" />,
  }, */
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/settings',
    className: 'text-capitalize',
    icon: <i class="nav-icon bi bi-gear-fill me-2 text-light" />,
    items: [
      {
        component: CNavItem,
        name: ' Tabels',

        to: '/settings/update/table/limit',
      },
      {
        component: CNavItem,
        name: 'Themes',

        to: '/settings/update/themes',
      },
      {
        component: CNavItem,
        name: 'Background',

        to: '/settings/update/background',
      },
      {
        component: CNavItem,
        name: 'Language',

        to: '/settings/update/languages',
      },
      {
        component: CNavItem,
        name: 'Currency',

        to: '/settings/update/currency',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/all/users',
    icon: <i class="bi bi-people-fill nav-icon me-2 text-light"></i>,
  },
]

export default _nav
