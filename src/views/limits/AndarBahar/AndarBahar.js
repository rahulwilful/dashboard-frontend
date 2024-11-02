import s from './AndarBahar.module.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import showToast from '../../../components/Notification/ShowToast.js'
import axiosClient from '../../../axiosClient.js'

const AndarBahar = () => {
  const theme = useSelector((state) => state.theme)

  const [formData, setFormData] = useState({
    table_name: '',
    min_bet: '',
    max_bet: '',
    side_bet_min: '',
    side_bet_max: '',
    s_message: '',
    table_type: 'Andar Bahar',
    theme: '',
    language: '',
    background: '',
  })

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

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post('table/limits/add', formData)
      console.log(response)
      showToast('Table limit added successfully!', 'success')
    } catch (error) {
      showToast('Error adding table limit', 'error')
      console.error(error)
    }
  }

  return (
    <div className="py-3">
      <h1 className="text-center py-3">Andar Bahar</h1>
      <div className="h-100 w-100 d-flex justify-content-center">
        <div
          className={`row ${s.form} border-bottom border-2 border-top ${
            theme === 'dark' ? 'border-primary' : 'border-dark'
          } rounded-4 p-4 shadow-lg`}
        >
          <div className="col-12 col-md-6">
            <div className="mb-2">
              <label className="form-label">Table Name</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Table Name"
                name="table_name"
                value={formData.table_name}
                onChange={handleChange}
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Theme</label>
              <select
                className="form-select form-select-sm"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value="">Select Theme</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Background</label>
              <select
                className="form-select form-select-sm"
                name="background"
                value={formData.background}
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value="">Select Background</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Language</label>
              <select
                className="form-select form-select-sm"
                name="language"
                value={formData.language}
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="chinese">Chinese</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-2">
              <label className="form-label">Minimum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Minimum"
                name="min_bet"
                value={formData.min_bet}
                onChange={handleChange}
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Maximum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Maximum"
                name="max_bet"
                value={formData.max_bet}
                onChange={handleChange}
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Side Bet Minimum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Side Bet Minimum"
                name="side_bet_min"
                value={formData.side_bet_min}
                onChange={handleChange}
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Side Bet Maximum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Side Bet Maximum"
                name="side_bet_max"
                value={formData.side_bet_max}
                onChange={handleChange}
                aria-label=".form-control-sm example"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center pt-3">
            <button
              type="button"
              onClick={handleSubmit}
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} d-none d-md-block px-5`}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} d-block d-md-none px-5`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AndarBahar
