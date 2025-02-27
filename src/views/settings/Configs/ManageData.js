import React, { useEffect, useState } from 'react'
//import s from './UpdateTableLimits.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'
import { useSelector } from 'react-redux'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

import { GetCurrent } from '../../../getCurrent'
import NoDataFull from '../../NoData/NoDataFull'

const ManageData = (props) => {
  const theme = useSelector((state) => state?.theme)
  const navigate = useNavigate()
  const [themes, setThemes] = useState([])
  const [originalThemes, setOriginalThemes] = useState([])
  const [form, setForm] = useState({ deletDays: '' })
  const [inputDeletDays, setInputDeletDays] = useState([])
  const [deletDays, setDeleDays] = useState([])
  const [display, setDisplay] = useState('loading')

  const getDeletDays = async () => {
    const res = await axiosClient.get(`/config/get/delete/days`)
    console.log('res', res)
    if (res?.data?.result) {
      setDisplay('data')
    } else {
      setDisplay('nodata')
    }
    setDeleDays(res?.data?.result ?? [])
    setInputDeletDays(res?.data?.result ?? [])
  }

  const handleSetForm = (theme) => {
    setForm({ theme_id: theme?.theme_id, theme: theme?.theme })
  }

  const updateDeletDays = async () => {
    if (inputDeletDays == undefined || inputDeletDays == null || inputDeletDays == '') {
      showToast('Enter Delet Days', 'info')
      return
    }
    if (inputDeletDays <= 1) {
      showToast('Delet days should be greater than 1', 'info', 3000)
      return
    }
    try {
      const res = await axiosClient.put(`/config/update/delete/days`, {
        delete_days: inputDeletDays,
      })

      showToast('Delet days updated successfully!', 'success')
      getDeletDays()
    } catch (error) {
      console.log('error: ', error)
      setInputDeletDays(deletDays)
    }
  }

  useEffect(() => {
    console.log('Themes', themes)
    console.log('form after setting', form)
  }, [themes, form])

  useEffect(() => {
    getCurrent()
  }, [])

  const getCurrent = async () => {
    console.log('called getCurrent')
    await GetCurrent('super_admin')
    getDeletDays()
    console.log('user ', user)
    return
  }

  return (
    <>
      <div
        className="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel"></h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="theme" className="form-label">
                  Delet Data In
                </label>
                <input
                  type="number"
                  className="form-control"
                  id=""
                  value={inputDeletDays ?? ''}
                  onChange={(e) => setInputDeletDays(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateDeletDays}
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ///////////////////////////////////////////////////////////////////////// */}
      <div
        className={`table-main  py-2 container ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
      >
        <h2 className={`text-center my-2 poppins-500`}>Manage Data</h2>

        <div className={`row gap-0 w-100 px-3 ${display == 'data' ? '' : 'd-none'}`}>
          <div
            className={`card shadow-s bg-primary bg-gradient text-light p-3`}
            style={{ width: ' 18rem' }}
          >
            <div className={`card-body`}>
              <h5 className={`card-title poppins-500`}>Delet Data In</h5>
              <div className={`d-flex justify-content-between align-items-center  py-1`}>
                <h2 className={`card-subtitle mb-2 `}>{deletDays} Days</h2>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  className={`bi bi-pen-fill icon-size font-size icon icon-hover pointer text-shadow icon-hover ${theme === 'light' ? 'text-light' : 'text-light'}`}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className={`${display == 'nodata' ? '' : 'd-none'}`}>
          <NoDataFull />
        </div>
      </div>
    </>
  )
}

export default ManageData
