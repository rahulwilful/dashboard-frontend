import React, { useEffect, useState, useRef } from 'react'
import s from './Rough.module.css'
import axiosClient from '../../axiosClient'
import cards from 'src/assets/images/dashboard/cards.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CChartLine } from '@coreui/react-chartjs'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import AreaChart from './components/AreaChartComponent'
import BarChartComponent from './components/BarChartComponent'
import PieChartComponent from './components/PieChartComponent'
import RadarChartComponent from './components/RadarChartComponent'
import CoreUiLineChart from './components/CoreUiLineChart'

import LineChartComponent from './components/LineChartComponent'
import roulleteWheel from 'src/assets/images/dashboard/roulleteWheel.png'
import DataTableComponent from './components/DataTableComponent.js'
import TableComponent from './components/TableComponent.js'
import { Table } from 'react-bootstrap-icons'
import DataTableComponent2 from './components/DataTableComponent2.js'
import DoughNutChartComonent from './components/DoughNutChartComonent.js'
import WheelPocketStatistics from './components/WheelPocketStatistics.js'
import DropZoneStatistics from './components/DropZoneStatistics.js'
import WinStatistics from './components/WinStatistics.js'
import { Loader } from '../../components/Loader.js'

const Rough = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [statistics, setStatistics] = useState('WinStatistics')

  const tempData1 = {
    labels: Array.from({ length: 7 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',

        fill: true,
        data: [78, 81, 80, 45, 34, 12, 40],
      },
    ],
  }
  const tempData2 = {
    labels: Array.from({ length: 7 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',

        fill: true,
        data: [81, 61, 84, 40, 33, 18, 40],
      },
    ],
  }

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark bg-gradient bg-opacity-25  text-light border-secondary  border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border border`,
    )
  }, [theme])

  const tempData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ]

  const temp = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,0,255,.55)',
        pointBackgroundColor: '#5856d6',
        data: [61, 59, 84, 80, 51, 40, 45],
      },
      {
        label: 'My 2nd dataset',
        backgroundColor: 'red',
        borderColor: 'rgba(0,255,255,.55)',
        pointBackgroundColor: '#5856d6',
        data: [65, 50, 80, 84, 51, 55, 40],
      },
    ],
  }

  useEffect(() => {
    setData(temp)
  }, [])

  /*   useGSAP(() => {
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
  }, [theme]) */

  const config = { threshold: 0.1 }

  let observer = new IntersectionObserver(function (entries, self) {
    let targets = entries.map((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target)
        return entry.target
      }
    })

    // Call our animation function
    fadeIn(targets)
  }, config)

  document.querySelectorAll('.box').forEach((box) => {
    observer.observe(box)
  })

  function fadeIn(targets) {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.2,
    })
  }

  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} d-flex justify-content-center align-items-center   pb-4`}
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <div className={`fs-1 text-shadow poppins-600   `}>
        <Loader />
      </div>
    </div>
  )
}

export default Rough
