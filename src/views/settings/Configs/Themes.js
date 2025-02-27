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

const UpdateThemes = (props) => {
  const theme = useSelector((state) => state?.theme)
  const navigate = useNavigate()
  const [themes, setThemes] = useState([])
  const [originalThemes, setOriginalThemes] = useState([])
  const [form, setForm] = useState({ theme_id: '', theme: '' })
  const [display, setDisplay] = useState('loading')

  const getThemes = async () => {
    const { data } = await axiosClient.get(`/config/get/theme`)
    console.log(data)
    if (data?.themes) {
      setDisplay('data')
    } else {
      setDisplay('nodata')
    }
    setThemes(data?.themes ?? [])
    setOriginalThemes(data?.themes ?? [])
  }

  const handleSetForm = (theme) => {
    setForm({ theme_id: theme?.theme_id ?? '', theme: theme?.theme ?? '' })
  }

  const updateTheme = async () => {
    try {
      const { data } = await axiosClient.put(`/config/update/theme/${form?.theme_id}`, form)
      console.log(data)
      showToast('Theme updated successfully!', 'success')
      const temp = themes ?? []
      for (let i in temp) {
        if (temp[i]?.theme_id == form?.theme_id) {
          temp[i].theme = form?.theme ?? ''
        }
      }
      setThemes(temp)
    } catch (error) {
      console.error(error)
      showToast('Error while updating Theme', 'error')
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
    await GetCurrent('settings')
    getThemes()
    console.log('user ', user)
    return
  }

  const handleSearch = (e) => {
    console.log('handleSearch called')
    if (e?.target?.value === '') {
      setThemes(originalThemes ?? [])
    } else {
      const value = e?.target?.value?.toLowerCase()
      const filtered = themes?.filter((theme) => theme?.theme?.toLowerCase()?.includes(value)) ?? []
      setThemes(filtered)
      setSearch(value)
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
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
                  Theme Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="theme"
                  value={form?.theme ?? ''}
                  onChange={(e) => setForm({ ...form, theme: e?.target?.value ?? '' })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateTheme}
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
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
        <h2 className="text-center my-2">Themes</h2>
        <div className={` `}>
          <div class="mb-3">
            <input
              type="input"
              class="form-control"
              placeholder="Search Themes"
              onChange={handleSearch}
              id="search"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div className={`row gap-0 w-100 px-3 ${display == 'data' ? '' : 'd-none'}`}>
          {themes?.map((theme, i) => (
            <div key={i} className={`col-12 col-sm-3 mb-3 mb-sm-0 mt-2`}>
              <div className={`card card-hover shadow border-0 p-0`}>
                <div className={`card-body m-0 d-flex`}>
                  <div>
                    <img src={roulleteWheel} className="" style={{ width: '100px' }} />
                  </div>
                  <div className={`w-100`}>
                    <div>
                      <h5 className={`card-title capitalize`}>{theme?.theme}</h5>
                      <p className={`card-text capitalize`}></p>
                    </div>
                    <div className={`d-flex justify-content-end`}>
                      <i
                        onClick={() => handleSetForm(theme)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className={`bi bi-pen-fill icon-size font-size icon pointer text-shadow icon-hover`}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${display == 'nodata' ? '' : 'd-none'}`}>
          <NoDataFull />
        </div>
      </div>
    </>
  )
}

export default UpdateThemes

