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
import roulleteWheel from 'src/assets/brand/roulleteWheelBlack.png'

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
      // console.log('response', data)

      const newNavigation = navigation.map((navItem) => {
        if (navItem.name === 'Table Limits') {
          return {
            ...navItem,
            items: [
              ...navItem.items,
              ...data.game_types.map((tableType) => ({
                component: 'CNavItem',
                name: tableType.game_type_name,
                to: `/limits/${tableType.game_type_name}/${tableType.game_type_id}`,
              })),
            ],
          }
        }
        if (navItem.name === 'Table Analysis') {
          return {
            ...navItem,
            items: [
              ...navItem.items,
              ...data.game_types.map((tableType) => ({
                component: 'CNavItem',
                name: tableType.game_type_name,
                to: `/table/analysis/${tableType.game_type_name}/${tableType.game_type_id}`,
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
    //console.log('nav', navigation)
  }, [navigation])

  useEffect(() => {
    getLimits()
  }, [])

  return (
    <CSidebar
      // Force re-render when key changes
      className="border-end border-secondary "
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom border-secondary">
        <CSidebarBrand to="/" className=" d-flex justify-content-center w-100 ">
          <img src={roulleteWheel} className="  " style={{ width: '60px' }} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav key={key} items={navigation} />
      <CSidebarFooter className="border-top border-secondary d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
