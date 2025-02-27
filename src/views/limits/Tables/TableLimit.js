import React, { useEffect, useState } from 'react'
import s from './TableLimit.module.css'
import { useSelector } from 'react-redux'

import AddTable from './AddTable.js'
import Tables from './Tables.js'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FadeInAnimation from '../../../animations/FadeInAnimation.js'

import showToast from '../../../components/Notification/ShowToast.js'
import { useColorModes } from '@coreui/react'
import axiosClient from '../../../axiosClient.js'
import { useNavigate, useParams } from 'react-router-dom'

import { GetCurrent } from '../../../getCurrent.js'

const TableLimits = () => {
  const navigate = useNavigate()
  const { game, id } = useParams()
  const [count, setCount] = useState(0)
  const theme = useSelector((state) => state.theme)
  const [addNew, setAddNew] = useState(false)
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const toggleAddNew = async (set) => {
    await getCurrent()
    setAddNew(set)
    setCount(count + 1)
  }

  const getCurrent = async () => {
    console.log('called getCurrent')

    const user = await GetCurrent('limits')
    return
  }

  useEffect(() => {
    //console.log('roullete', theme)

    /*  getCurrent().then(() => {
      
    }) */
    setAddNew(false)

    console.log('game', game)
    console.log('id', id)
  }, [id])

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    const res = await axiosClient.get(
      `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${limit}`,
    )
    processData(res?.data?.result)
    setRenderKey(renderKey + 1)
    localStorage.setItem('callOnTimeInterval', true)
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
  }, [addNew, theme, game, id])

  return (
    <>
      <div className="  h-100" key={id}>
        <div className="w-100 h-100  fade-in">
          <div className={`w-100 h-100 ${addNew == true ? 'd-block' : 'd-none'} `}>
            <AddTable
              key={addNew ? 'add' : 'close'}
              table={game}
              id={id}
              toggleAddNew={toggleAddNew}
              className="h-100"
            />
          </div>

          <div className={`w-100 ${addNew == false ? 'd-block' : 'd-none'}  `}>
            <Tables
              key={addNew ? 'add' : 'close'}
              table={game}
              id={id}
              toggleAddNew={toggleAddNew}
              addNew={addNew}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TableLimits
