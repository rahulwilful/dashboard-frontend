import React, { useEffect, useState } from 'react'
import s from './Backgrounds.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useSelector } from 'react-redux'

import gsap from 'gsap'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

import { GetCurrent } from '../../../getCurrent'
import NoDataFull from '../../NoData/NoDataFull'

const Currency = () => {
  const [parent, animateParent] = useAutoAnimate()
  const theme = useSelector((state) => state?.theme)

  const navigate = useNavigate()
  const [originalBackgrounds, setOriginalBackgrounds] = useState([])
  const [backgrounds, setBackgrounds] = useState([])
  const [currencys, setCurrencys] = useState([])
  const [originalCurrencys, setOriginalCurrencys] = useState([])

  const [form, setForm] = useState({ currency_id: '', currency: '' })
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState('loading')

  const getCurrency = async () => {
    const { data } = await axiosClient.get(`/config/get/currency`)
    // console.log('Data: ', data)
    if (data) {
      setDisplay('data')
    } else {
      setDisplay('nodata')
    }
    setCurrencys(data?.currencies)
    setOriginalCurrencys(data?.currencies)
  }

  const handleSetForm = (currency) => {
    setForm({ currency_id: currency?.currency_id, currency: currency?.currency })
  }

  const updateCurrency = async () => {
    let tempForm = { currency: form?.currency?.toUpperCase() }

    try {
      const { data } = await axiosClient.put(
        `/config/update/currency/${form?.currency_id}`,
        tempForm,
      )
      console.log(data)
      showToast('Currency updated successfully!', 'success')
      const temp = currencys.map((currency) =>
        currency?.currency_id === form?.currency_id
          ? { ...currency, currency: tempForm?.currency }
          : currency,
      )
      setCurrencys(temp)
      setOriginalCurrencys(temp)
    } catch (error) {
      console.error(error)
      showToast('Error while updating Currency', 'error')
    }
  }

  useEffect(() => {
    console.log('Backgrounds', backgrounds)
    console.log('form after setting', form)
  }, [backgrounds, form])

  useEffect(() => {
    getCurrent()
  }, [])

  const getCurrent = async () => {
    console.log('called getCurrent')
    await GetCurrent('settings')
    const { data } = await axiosClient.get(`/config/get/currency`)
    console.log('currencys: ', data)
    getCurrency()
    console.log('user ', user)
    return
  }

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setCurrencys(originalCurrencys)
    } else {
      const value = e.target.value.toLowerCase()
      const filtered = currencys.filter((currency) =>
        currency?.currency?.toLowerCase().includes(value),
      )
      setCurrencys(filtered)
      setSearch(value)
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
      duration: 0.4,
      ease: 'power1.out',
      stagger: 0.5,
    })
  }, [theme])

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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Currency
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 ">
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    value={form?.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateCurrency}
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
      <div className={`mb-3  ${theme === 'dark' ? 'text-light' : 'text-dark'} fade-in`}>
        <label htmlFor="search" className="form-label animate">
          Search
        </label>
        <input type="text" className="form-control " id="search" onChange={handleSearch} />
      </div>
      <div
        className={`
        table-responsive animate ${display == 'data' ? '' : 'd-none'}
      `}
      >
        <table
          className={`
            table 
            table-striped 
            ${theme === 'dark' ? 'table-dark' : 'table-light'} 
            table-hover 
            table-bordered 
            table-sm 
            rounded
          `}
        >
          <thead>
            <tr>
              <th scope="col">Background</th>

              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody ref={parent}>
            {currencys &&
              currencys.map((currency, i) => (
                <tr key={i}>
                  <td>{currency?.currency}</td>

                  <td>
                    <i
                      onClick={() => handleSetForm(currency)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className={`
                        bi 
                        bi-pen-fill 
                        icon-size 
                        font-size 
                        icon 
                        pointer 
                        text-shadow 
                        icon-hover 
                      `}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={`${display == 'nodata' ? '' : 'd-none'}`}>
        <NoDataFull />
      </div>
    </>
  )
}

export default Currency

