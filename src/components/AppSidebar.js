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

import { GetCurrent } from '../getCurrent'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navigation, setNavigation] = useState(nav)
  const [key, setKey] = useState(0) // Key to force re-render
  let tempNav = nav
  let user = ''

  const getLimits = async () => {
    try {
      const { data } = await axiosClient.get('/config/get/table/type')
      // console.log('response', data)

      const tempNavigation = tempNav.map((navItem) => {
        if(user.limits == true && navItem.name === 'Table Limits'){

         
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
        if (user.analysis == true && navItem.name === 'Table Analysis') {
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

      console.log("newNavigation: ", tempNavigation)

    
      let newNavigation = []
      newNavigation.push(tempNavigation[0])
      if(user.limits== true || user.roleType=='super_admin') newNavigation.push(tempNavigation[1])
        if(user.analysis== true || user.roleType=='super_admin') newNavigation.push(tempNavigation[2])
          if(user.config== true || user.roleType=='super_admin') newNavigation.push(tempNavigation[3])
            if(user.settings== true || user.roleType=='super_admin') newNavigation.push(tempNavigation[4])
              if(user.users== true || user.roleType=='super_admin') newNavigation.push(tempNavigation[5])
      

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
    getCurrent()
  }, [])

  const getCurrent = async() => {
    const tempUser = await GetCurrent()
    user = tempUser
    console.log("tempUser: ", user) 
    await  getLimits()
   
  }

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
