import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FadeInAnimation = (selector) => {
  useGSAP(() => {
    gsap.fromTo(
      selector,
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
  }, [])
}

export default FadeInAnimation
