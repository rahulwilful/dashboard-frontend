import React, { useEffect, useState, useRef } from 'react'


import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const NoData = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [statistics, setStatistics] = useState('WinStatistics')

 



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
    >
      <div className={`fs-5 text-shadow poppins-600   `}> No Data </div>
    </div>
  )
}

export default NoData
