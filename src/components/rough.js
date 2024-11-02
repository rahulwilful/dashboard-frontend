import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/brand/Dashboard.png'

// sidebar nav config
import nav from '../_nav'
import axiosClient from '../axiosClient'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navigation, setNavigation] = useState(nav)
  const [key, setKey] = useState(0) // Key to force re-render

  const getLimits = async () => {
    try {
      const { data } = await axiosClient.get('/config/get/table/type')
      console.log('response', data)

      const newNavigation = navigation.map((navItem) => {
        if (navItem.name === 'Table Limits') {
          return {
            ...navItem,
            items: [
              ...navItem.items,
              ...data.table_types.map((tableType) => ({
                component: 'CNavItem',
                name: tableType.table_type,
                to: `/limits/${tableType.table_type}`,
              })),
            ],
          }
        }
        return navItem
      })

      setNavigation(newNavigation)
      setKey((prevKey) => prevKey + 1) // Update key to force re-render
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('nav', navigation)
  }, [navigation])

  useEffect(() => {
    getLimits()
  }, [])

  return (
    <CSidebar
      // Force re-render when key changes
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" className=" d-flex justify-content-center w-100 ">
          <img src={logo} className="  " style={{ height: '70px' }} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav key={key} items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
