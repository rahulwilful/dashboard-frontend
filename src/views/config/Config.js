import React, { useEffect, useState } from 'react'
import s from './Config.module.css'
import { useSelector } from 'react-redux'
import gsap from 'gsap'

import showToast from '../../components/Notification/ShowToast.js'
import { useColorModes } from '@coreui/react'
import axiosClient from '../../axiosClient.js'

import { useNavigate } from 'react-router-dom'

import { GetCurrent } from '../../getCurrent.js'

const Config = () => {
  const theme = useSelector((state) => state.theme)
  const navigate = useNavigate()

  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [formData, setFormData] = useState({
    game_type_name: '',
    theme: '',
    language: '',
    background: '',
    currency:"",
  })

  useEffect(() => {
    getCurrent()
  }, [])

  const getCurrent = async () => {
    GetCurrent('config')
    return
  }

  useEffect(() => {
    console.log(theme)
  }, [theme])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddtheme = async () => {
    if (formData.theme == '') {
      showToast('Enter Theme', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/theme', formData)
      console.log(response)
      showToast('Theme added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding theme', 'error')
      console.error(error)
    }
  }

  const handleAddTableType = async () => {
    if (formData.game_type_name == '') {
      showToast('Enter Table Type', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/table/type', formData)
      console.log(response)
      showToast('Table Type added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Table Type', 'error')
      console.error(error)
    }
  }

  const handleAddBackground = async () => {
    if (formData.background == '') {
      showToast('Enter Background', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/background', formData)
      console.log(response)
      showToast('Background added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Background', 'error')
      console.error(error)
    }
  }

  const handleAddLanguage = async () => {
    if (formData.language == '') {
      showToast('Enter Language', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/language', formData)
      console.log(response)
      showToast('Language added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Language', 'error')
      console.error(error)
    }
  }

  const handleAddCurrency = async () => {
    if (formData.currency == '') {
      showToast('Enter Currency', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/currency', formData)
      console.log(response)
      showToast('Currency added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Currency', 'error')
      console.error(error)
    }
  }

  useEffect(() => {
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
    gsap.from('.animate', {
      delay: 0.2,
      opacity: 0,
      y: 50,
      duration: 0.2,
      ease: 'power1.out',
      stagger: 0.05,
    })
  }, [theme])

  return (
    <>
      <div
        className="modal fade"
        id="addTableModal"
        tabindex="-1"
        aria-labelledby="addTableModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="addTableModalLabel">
                Add Table Limit {formData.game_type_name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-footer border-0">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={handleAddTableType}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addTableModal"
                class="btn btn-primary btn-sm"
              >
                Add table
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addThemeModal"
        tabindex="-1"
        aria-labelledby="addThemeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="addThemeModalLabel">
                Add Theme {formData.theme}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-footer border-0">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={handleAddtheme}
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary btn-sm"
              >
                Add Theme
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addBackgroundModal"
        tabindex="-1"
        aria-labelledby="addBackgroundModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="addBackgroundModalLabel">
                Add Background {formData.background}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-footer border-0">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={handleAddBackground}
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary btn-sm"
              >
                Add Background
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addLanguageModal"
        tabindex="-1"
        aria-labelledby="addLanguageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="addLanguageModalLabel">
                Add Language {formData.language}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-footer border-0">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={handleAddLanguage}
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary btn-sm"
              >
                Add Language
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addCurrencyModal"
        tabindex="-1"
        aria-labelledby="addCurrencyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="addCurrencyModalLabel">
                Add Currency {formData.currency}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-footer border-0">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={handleAddCurrency}
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary btn-sm"
              >
                Add Currency
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ///////////////////////////////////////////////////////////////////////////////////// */}
      <div className={`py-3  ${theme === 'dark' ? 'text-light' : 'text-dark'} fade-in `}>
        <h1 className="text-center animate py-3">Configuration</h1>
        <div className={`${s.container}  d-flex justify-content-center `}>
          <div className={` w-100 d-flex justify-content-center align-items-center `}>
            <div
              className={`row ${s.form} border-bottom border-2 border-top py-3 py-md-5 ${
                theme === 'dark' ? 'border-primary' : 'border-dark'
              } rounded-4 p-4 shadow-lg`}
            >
              <div className="h-100 d-flex flex-column justify-content-evenly ">
                <div className={`row  w-100`}>
                  <div className="col-12 col-md-6  ">
                    <div className="mb-2  ">
                      <label className="animate form-label">Game Type</label>
                      <div className="d-flex   align-items-center gap-2 flex-md-row">
                        <input
                          type="text"
                          className={`form-control animate `}
                          placeholder="Enter"
                        
                          name="game_type_name"
                          value={formData.game_type_name}
                          onChange={handleChange}
                        />
                        <div className="my-1 px-1 ">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#addTableModal"
                            type="button"
                            className={`btn animate ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3 ${formData.game_type_name == '' ? 'disabled' : 'opacity-100'}`}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6  ">
                    <div className="mb-2  ">
                      <label className="animate form-label">Theme</label>
                      <div className="d-flex   align-items-center gap-2 flex-md-row">
                        <input
                          type="text"
                          className="form-control animate "
                          placeholder="Enter"
                          name="theme"
                          value={formData.theme}
                          onChange={handleChange}
                        />
                        <div className="my-1 px-1 ">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#addThemeModal"
                            type="button"
                            className={`btn animate ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3 ${formData.theme == '' ? 'disabled' : 'opacity-100'}`}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6  ">
                    <div className="mb-2  ">
                      <label className="animate form-label">Background</label>
                      <div className="d-flex   align-items-center gap-2 flex-md-row">
                        <input
                          type="text"
                          className="form-control animate "
                          placeholder="Enter"
                          name="background"
                          value={formData.background}
                          onChange={handleChange}
                        />
                        <div className="my-1 px-1 ">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#addBackgroundModal"
                            type="button"
                            className={`btn animate ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3 ${formData.background == '' ? 'disabled' : 'opacity-100'}`}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6  ">
                    <div className="mb-2  ">
                      <label className="animate form-label">Language</label>
                      <div className="d-flex   align-items-center gap-2 flex-md-row">
                        <input
                          type="text"
                          className="form-control animate "
                          placeholder="Enter"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                        />
                        <div className="my-1 px-1 ">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#addLanguageModal"
                            type="button"
                            className={`btn animate ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3 ${formData.language == '' ? 'disabled' : 'opacity-100'}`}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6  ">
                    <div className="mb-2  ">
                      <label className="animate form-label">Currency</label>
                      <div className="d-flex   align-items-center gap-2 flex-md-row">
                        <input
                          type="text"
                          className="form-control animate "
                          placeholder="Enter"
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                        />
                        <div className="my-1 px-1 ">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#addCurrencyModal"
                            type="button"
                            className={`btn animate ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3 ${formData.currency == '' ? 'disabled' : 'opacity-100'}`}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6  "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Config
