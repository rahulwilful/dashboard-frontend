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
import LOGO from 'src/assets/brand/LOGO.png'

// sidebar nav config
import nav from '../_nav'
import axiosClient from '../axiosClient'

import { GetCurrent } from '../getCurrent'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navigation, setNavigation] = useState(nav)
  const [key, setKey] = useState(0) // Key to force re-render
  let tempNav = nav
  let user = ''

  /**
   * Function to get game types from the database
   * and update the navigation items dynamically
   * @param {void} no params
   * @returns {Promise<void>}
   */
  const getLimits = async () => {
    try {
      // Get the game types from the database
      const { data } = await axiosClient.get('/config/get/table/type')
      console.log('side bar data: ', data)

      // Filter only the active game types
      let analysisData = []
      let tableLimitData = data?.game_types

      for (let i in data?.game_types) {
        if (data?.game_types[i]?.active == true) {
          analysisData.push(data?.game_types[i])
        }
      }

      // Update the navigation items based on the user's permissions
      const tempNavigation = tempNav.map((navItem) => {
        if (user?.limits == true && navItem?.name === 'Table Limits') {
          // Add the game types to the navigation items Table Limits
          return {
            ...navItem,
            items: [
              ...navItem?.items,
              ...tableLimitData?.map((tableType) => ({
                component: 'CNavItem',
                name: tableType?.game_type_name,
                to: `/limits/${tableType?.game_type_name}/${tableType?.game_type_id}`,
              })),
            ],
          }
        }
        if (user?.analysis == true && navItem?.name === 'Table Analysis') {
          // Add the game types to the navigation items ,Table Analysis'
          return {
            ...navItem,
            items: [
              ...navItem?.items,
              ...analysisData?.map((tableType) => ({
                component: 'CNavItem',
                name: tableType?.game_type_name,
                to: `/table/analysis/${tableType?.game_type_name}/${tableType?.game_type_id}`,
              })),
            ],
          }
        }
        return navItem
      })

      // Add the manage data item to the settings item if the user is a super admin
      if (user?.roleType == 'super_admin') {
        tempNavigation[4]?.items.push({
          component: 'CNavItem',
          name: 'Manage Data',

          to: '/settings/update/manage/data',
        })
      }

      // Filter the navigation items based on the user's permissions
      let newNavigation = []
      newNavigation.push(tempNavigation[0])
      if (user?.limits == true || user?.roleType == 'super_admin')
        newNavigation.push(tempNavigation[1])
      if (user?.analysis == true || user?.roleType == 'super_admin')
        newNavigation.push(tempNavigation[2])
      if (user?.config == true || user?.roleType == 'super_admin')
        newNavigation.push(tempNavigation[3])
      if (user?.settings == true || user?.roleType == 'super_admin') {
        newNavigation.push(tempNavigation[4])
        console.log('Settings', tempNavigation[4])
      }
      if (user?.users == true || user?.roleType == 'super_admin')
        newNavigation.push(tempNavigation[5])

      // Update the navigation state
      setNavigation(newNavigation)
      setKey((prevKey) => prevKey + 1)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Function to check if the navigation items have changed
   * and update the key if they have
   */
  useEffect(() => {
    //console.log('nav', navigation)
  }, [navigation])

  /**
   * Function to get the current user's data
   * and call the getLimits function
   */
  const getCurrent = async () => {
    const tempUser = await GetCurrent()
    user = tempUser
    console.log('tempUser: ', user)
    await getLimits()
  }

  /**
   * Function to call the getCurrent function
   * when the component mounts
   */
  useEffect(() => {
    getCurrent()
  }, [])

  return (
    <CSidebar
      // Force re-render when key changes
      className="border-end border-secondary "
      colorScheme="dark"
      position="fixed"
      unfoldable={!unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom border-secondary">
        <CSidebarBrand to="/" className=" d-flex justify-content-center w-100 ">
          <img src={LOGO} className="  " style={{ width: '42%', minWidth: '40px' }} />
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
