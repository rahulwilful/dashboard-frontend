import React from 'react'
import s from './Loader.module.css'
import { useSelector } from 'react-redux'

export const Loader = ({ display }) => {
  const theme = useSelector((state) => state.theme)
  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} d-flex justify-content-center align-items-center   pb-4 ${display == 'loading' ? 'd-block' : 'd-none'}`}
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <div className={`${s.loader} `}>
        <span className={`${s.bar} ${theme == 'dark' ? 'bg-light' : 'bg-dark'}`}></span>
        <span className={`${s.bar}  ${theme == 'dark' ? 'bg-light' : 'bg-dark'}`}></span>
        <span className={`${s.bar}  ${theme == 'dark' ? 'bg-light' : 'bg-dark'}`}></span>
      </div>
    </div>
  )
}
