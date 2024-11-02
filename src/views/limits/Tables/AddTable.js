import React, { useEffect, useState, useRef } from 'react'
import s from './AddTable.module.css'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap' // Import Bootstrap components
import gsap from 'gsap'

import showToast from '../../../components/Notification/ShowToast.js'
import axiosClient from '../../../axiosClient.js'

const AddTable = (props) => {
  const theme = useSelector((state) => state.theme)
  const [languages, setLanguages] = useState([])
  const [themes, setThemes] = useState([])
  const [backgrounds, setBackgrounds] = useState([])
  const [showModal, setShowModal] = useState(false) // State to control modal visibility
  const modalRef = useRef(null) // Ref for modal

  const [formData, setFormData] = useState({
    table_limit_name: 'baccarat6',
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
  })

  // Fetch configurations for dropdowns
  const getConfigs = async () => {
    try {
      const response = await axiosClient.get('config/get/configs')
      const { languages, themes, backgrounds } = response.data
      setLanguages(languages)
      setThemes(themes)
      setBackgrounds(backgrounds)
    } catch (error) {
      console.error('Error fetching configs:', error)
    }
  }

  useEffect(() => {
    getConfigs()
    setFormData((prevFormData) => ({
      ...prevFormData,
      game_type_name: props.table,
      game_type_id: props.id,
    }))
  }, [props.id, props.table])

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
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.table_limit_name) return showToast('Enter Table Name', 'info')
    if (!formData.min_bet) return showToast('Enter Minimum Bet', 'info')
    if (!formData.theme_id) return showToast('Select Theme', 'info')
    if (!formData.max_bet) return showToast('Enter Maximum Bet', 'info')
    if (!formData.background_id) return showToast('Select Background', 'info')
    if (!formData.side_bet_min) return showToast('Enter Side Bet Minimum', 'info')
    if (!formData.language_id) return showToast('Select Language', 'info')
    if (!formData.side_bet_max) return showToast('Enter Side Bet Maximum', 'info')

    setShowModal(true) // Show modal
  }

  const handleSubmit = async () => {
    try {
      console.log(formData)
      const response = await axiosClient.post('table/limits/add', formData)
      showToast('Table limit added successfully!', 'success')
      setShowModal(false)
      props.toggleAddNew(false)
    } catch (error) {
      showToast('Error adding table limit', 'error')
      console.error('Error:', error)
      setShowModal(false)
    }
  }

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
      <div
        className={`${s.addtable_main} d-flex justify-content-center align-items-center ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
      >
        <div className="container">
          <div className="py-3 h-100 d-flex justify-content-center align-items-center">
            <div
              className={`${s.form} border-bottom border-2 border-top ${
                theme === 'dark' ? 'border-primary' : 'border-dark'
              } rounded-4 p-4 shadow-lg`}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <i
                    onClick={() => props.toggleAddNew(false)}
                    className="bi bi-arrow-left text-shadow fs-4 pointer"
                  ></i>
                </div>
                <div className="text-center w-100">
                  <h3 className="text-center pb-2 capitalize animate">{props.table}</h3>
                </div>
              </div>
              <div className="row">
                {/* Left Column */}
                <div className="col-12 col-md-6">
                  <div className="mb-2">
                    <label className="animate form-label">Table Name</label>
                    <input
                      className="animate form-control form-control-sm"
                      type="text"
                      placeholder="Enter Table Name"
                      name="table_limit_name"
                      value={formData.table_limit_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="animate form-label">Theme</label>
                    <select
                      className="animate form-select form-select-sm"
                      name="theme_id"
                      value={formData.theme_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Theme</option>
                      {themes.map((theme, i) => (
                        <option key={i} value={theme.theme_id}>
                          {theme.theme}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="animate form-label">Background</label>
                    <select
                      className="animate form-select form-select-sm"
                      name="background_id"
                      value={formData.background_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Background</option>
                      {backgrounds.map((bg) => (
                        <option key={bg.background_id} value={bg.background_id}>
                          {bg.background}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="animate form-label">Language</label>
                    <select
                      className="animate form-select form-select-sm"
                      name="language_id"
                      value={formData.language_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang.language_id} value={lang.language_id}>
                          {lang.language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-12 col-md-6">
                  <div className="mb-2">
                    <label className="animate form-label">Minimum Bet</label>
                    <input
                      className="animate form-control form-control-sm"
                      type="number"
                      placeholder="Enter Minimum Bet"
                      name="min_bet"
                      value={formData.min_bet}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="animate form-label">Maximum Bet</label>
                    <input
                      className="animate form-control form-control-sm"
                      type="number"
                      placeholder="Enter Maximum Bet"
                      name="max_bet"
                      value={formData.max_bet}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="animate form-label">Side Bet Minimum</label>
                    <input
                      className="animate form-control form-control-sm"
                      type="number"
                      placeholder="Enter Side Bet Minimum"
                      name="side_bet_min"
                      value={formData.side_bet_min}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="animate form-label">Side Bet Maximum</label>
                    <input
                      className="animate form-control form-control-sm"
                      type="number"
                      placeholder="Enter Side Bet Maximum"
                      name="side_bet_max"
                      value={formData.side_bet_max}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center pt-3">
                  <button
                    type="button"
                    onClick={validateForm}
                    className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} px-5 animate`}
                  >
                    Add Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTable
