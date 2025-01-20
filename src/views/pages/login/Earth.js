import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import showToast from '../../../components/Notification/ShowToast'

const Earth = () => {
  const splineRef = useRef()

  useEffect(() => {
    const splineElement = splineRef.current
    if (splineElement) {
      splineElement.addEventListener('load', (event) => {
        // Disable mouse interactions
        event.target.scene.disableControls()
      })
    }
  }, [])

  return (
    <div className=" text-light vh-100 w-100 overflow-hidden d-flex justify-content-center align-items-center position-relative ">
      <div ref={splineRef} className="" style={{ width: '120%', height: '120%' }}>
        <Spline scene="https://prod.spline.design/aoJRebMkHJCnYi06/scene.splinecode" />
        {/* <Spline scene="https://prod.spline.design/GB2x-9TAJo8Tyk2R/scene.splinecode" /> */}
      </div>
      {/* <div className="  w-100 h-100 position-absolute"></div> */}
    </div>
  )
}

export default Earth
