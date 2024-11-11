import React, { useEffect, useState, useRef } from 'react'



import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const NoDataFull = () => {
 
  const theme = useSelector((state) => state.theme)


 

 

  

  const config = { threshold: 0.1 }

  let observer = new IntersectionObserver(function (entries, self) {
    let targets = entries.map((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target)
        return entry.target
      }
    })

 
    fadeIn(targets)
  }, config)

  document.querySelectorAll('.box').forEach((box) => {
    observer.observe(box)
  })

  function fadeIn(targets) {
    gsap.to(targets, {
        delay: 1,
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
    })
  }

  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} d-flex justify-content-center align-items-center   pb-4`}
      style={{ height: 'calc(100vh - 300px)' }}
    >
      <div className={`fs-1 text-shadow poppins-600  box  `}>Opp's No Data Found</div>
    </div>
  )
}

export default NoDataFull
