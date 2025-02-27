import React, { useEffect, useState, useRef } from 'react'
import s from './AddTable.module.css'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap' // Import Bootstrap components
import gsap from 'gsap'

import showToast from '../../../components/Notification/ShowToast.js'
import axiosClient from '../../../axiosClient.js'

import { GetCurrent } from '../../../getCurrent.js'

const AddTable = (props) => {
  const theme = useSelector((state) => state?.theme)
  const [languages, setLanguages] = useState([])
  const [themes, setThemes] = useState([])
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [backgrounds, setBackgrounds] = useState([])
  const [currencys, setCurrencys] = useState([])
  const [showModal, setShowModal] = useState(false) // State to control modal visibility
  const modalRef = useRef(null) // Ref for modal

  const [formData, setFormData] = useState({
    table_limit_name: '',
    table: '',
    game_type_name: '',
    game_type_id: '',
    min_bet: '2',
    max_bet: '3',
    side_bet_min: '4',
    side_bet_max: '5',
    s_message: '',
    theme_id: '',
    language_id: '',
    background_id: '',
    currency_id: '',
    commission: false,
  })

  // Fetch configurations for dropdowns
  const getConfigs = async () => {
    try {
      await GetCurrent('limits')
      const response = await axiosClient.get('config/get/configs')
      const { languages, themes, backgrounds, currencys } = response?.data || {}
      setLanguages(languages || [])
      setThemes(themes || [])
      setBackgrounds(backgrounds || [])
      setCurrencys(currencys || [])
    } catch (error) {
      console.error('Error fetching configs:', error)
    }
  }

  useEffect(() => {
    getConfigs()
    setFormData((prevFormData) => ({
      ...prevFormData,
      game_type_name: props?.table,
      game_type_id: props?.id,
    }))
  }, [props?.id, props?.table])

  useEffect(() => {
    gsap.from('.animate', {
      delay: 0.2,
      opacity: 0,
      y: 50,
      duration: 0.2,
      ease: 'power1.out',
      stagger: 0.05,
    })
  }, [theme])

  const handleChange = (e) => {
    const { name, value } = e?.target || {}
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData?.table_limit_name) return showToast('Enter Table Name', 'info')
    if (!formData?.min_bet) return showToast('Enter Minimum Bet', 'info')
    if (!formData?.theme_id) return showToast('Select Theme', 'info')
    if (!formData?.max_bet) return showToast('Enter Maximum Bet', 'info')
    if (!formData?.background_id) return showToast('Select Background', 'info')
    if (!formData?.side_bet_min) return showToast('Enter Side Bet Minimum', 'info')
    if (!formData?.language_id) return showToast('Select Language', 'info')
    if (!formData?.side_bet_max) return showToast('Enter Side Bet Maximum', 'info')
    if (!formData?.currency_id) return showToast('Select Currency', 'info')
    if (formData?.min_bet > formData?.max_bet)
      return showToast('Minimum Bet should be less than Maximum Bet', 'info', 3000)
    if (formData?.side_bet_min > formData?.side_bet_max)
      return showToast('Side Bet Minimum should be less than Side Bet Maximum', 'info', 3000)

    setShowModal(true) // Show modal
  }

  const handleSubmit = async () => {
    try {
      console.log(formData)

      const response = await axiosClient.post('table/limits/add', formData)
      showToast('Table limit added successfully!', 'success')
      setShowModal(false)
      props?.toggleAddNew?.(false)
    } catch (error) {
      showToast('Error adding table limit', 'error')
      console.error('Error:', error)
      setShowModal(false)
    }
  }

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs ${s?.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark text-light border-secondary  border-opacity-50  ${s?.placeholder_grey}`
        : `text-dark bg-light bg-gradient border `,
    )
  }, [theme])

  return (
    <>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} ref={modalRef}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Confirm Add Table</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Table
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Form */}

      <div className={`container-xl px-4 mt-4 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
        <div className="d-flex justify-content-between">
          <div>
            <i
              onClick={() => props?.toggleAddNew?.(false)}
              className={`bi bi-arrow-left text-shadow fs-4 pointer  ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
            ></i>
          </div>
          <div className="text-center w-100">
            <h3 className="text-center pb-2 capitalize animate">{props?.table}</h3>
          </div>
        </div>
        <div className={`row `}></div>
        <div className={`col-xl-12  `}>
          {/* Account details card */}
          <div
            className={`card mb-4 border border-secondary border-opacity-50 shadow-xs  text-bg-${theme}`}
          >
            <div
              className={`card-header border-bottom border-secondary border-opacity-25 d-flex justify-content-between`}
            >
              <div className={``}>Add User</div>
            </div>
            <div className={`card-body`}>
              <div>
                {/* Form Group (username) */}

                {/* Form Row */}
                <div className={`row gx-3 mb3`}>
                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Table Name</label>
                      <input
                        className={`form-control animate ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        type="text"
                        placeholder="Enter Table Name"
                        name="table_limit_name"
                        value={formData?.table_limit_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Minimum Bet</label>
                      <input
                        className={`form-control animate ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        type="number"
                        placeholder="Enter Minimum Bet"
                        name="min_bet"
                        value={formData?.min_bet}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Maximum Bet</label>
                      <input
                        className={`form-control animate ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        type="number"
                        placeholder="Enter Maximum Bet"
                        name="max_bet"
                        value={formData?.max_bet}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Side Bet Minimum</label>
                      <input
                        className={`form-control animate ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        type="number"
                        placeholder="Enter Side Bet Minimum"
                        name="side_bet_min"
                        value={formData?.side_bet_min}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Side Bet Maximum</label>
                      <input
                        className={`form-control animate ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        type="number"
                        placeholder="Enter Side Bet Maximum"
                        name="side_bet_max"
                        value={formData?.side_bet_max}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Theme</label>
                      <select
                        className={`animate form-select form-select-sm ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        name="theme_id"
                        value={formData?.theme_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Theme</option>
                        {themes?.map((theme, i) => (
                          <option key={i} value={theme?.theme_id}>
                            {theme?.theme}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Background</label>
                      <select
                        className={`animate form-select form-select-sm ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        name="background_id"
                        value={formData?.background_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Background</option>
                        {backgrounds?.map((bg) => (
                          <option key={bg?.background_id} value={bg?.background_id}>
                            {bg?.background}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Language</label>
                      <select
                        className={`animate form-select form-select-sm ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        name="language_id"
                        value={formData?.language_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Language</option>
                        {languages?.map((lang) => (
                          <option key={lang?.language_id} value={lang?.language_id}>
                            {lang?.language}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <label className="animate form-label">Currency</label>
                      <select
                        className={`animate form-select form-select-sm ${s?.placeholder_grey} bg-${theme} ${themeBorder} `}
                        name="currency_id"
                        value={formData?.currency_id}
                        onChange={handleChange}
                      >
                        <option value="">Select currency</option>
                        {currencys?.map((curr) => (
                          <option key={curr?.currency_id} value={curr?.currency_id}>
                            {curr?.currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`col-12 col-md-6 col-xl-4`}>
                    <div className="mb-3">
                      <div
                        className={` mt-0 mt-md-4 mt-xl-0 ${props?.table == 'baccarat' ? 'd-block' : 'd-none'}`}
                      >
                        <div className="form-check ">
                          <input
                            className="form-check-input animate"
                            type="checkbox"
                            name="commission"
                            checked={formData?.commission}
                            onChange={() =>
                              setFormData({ ...formData, commission: !formData?.commission })
                            }
                          />
                          <label className="form-check-label animate">Commission</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={` px-3 d-flex justify-content-end gap-2`}>
            <button
              type="button"
              onClick={validateForm}
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} px-3 animate`}
            >
              Add Table
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTable
