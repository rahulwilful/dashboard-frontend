import React, { useEffect, useState } from 'react'
//import s from './UpdateTableLimits.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BaccaratTables } from './TableImages'

import gsap from 'gsap'
import NoDataFull from '../../NoData/NoDataFull'

const UpdateTableLimits = (props) => {
  const [renderKey, setRenderKey] = useState(0)
  const theme = useSelector((state) => state.theme)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [originalGames, setOriginalGames] = useState([])
  const [display, setDisplay] = useState('loading')
  const [form, setForm] = useState({ game_type_id: '', game_type_name: '', active: true })
  const getGames = async () => {
    const { data } = await axiosClient.get(`/config/get/table/type`)
    console.log('data: ', data)

    if (data?.game_types) {
      setDisplay('data')
    } else {
      setDisplay('nodata')
    }
    setGames(data?.game_types ?? [])
    setOriginalGames(data?.game_types ?? [])
  }

  const handleSetForm = (table) => {
    setForm({
      game_type_id: table?.game_type_id ?? '',
      game_type_name: table?.game_type_name ?? '',
      active: table?.active ?? true,
    })
  }

  const updateTableType = async () => {
    try {
      const { data } = await axiosClient.put(`/config/update/game/type/${form.game_type_id}`, form)
      console.log(data)
      showToast('Table Type updated successfully!', 'success')
      let temp = games
      for (let i in temp) {
        if (temp[i]?.game_type_id == form.game_type_id) {
          temp[i].game_type_name = form.game_type_name
          temp[i].active = form.active
        }
      }

      setGames(temp)
      setOriginalGames(temp)
      setRenderKey(renderKey + 1)
    } catch (error) {
      console.error(error)
      showToast('Error while updating Table Type', 'error')
    }
  }

  useEffect(() => {
    console.log('Games', games)
    console.log('form after setting', form)
  }, [games, form])

  useEffect(() => {
    getGames()
  }, [])

  const handleSearch = (e) => {
    console.log('handleSearch called')
    if (e.target.value === '') {
      setGames(originalGames)
    } else {
      const value = e.target.value.toLowerCase()
      const filtered = games.filter((game) => game?.game_type_name?.toLowerCase().includes(value))
      setGames(filtered)
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
                <label htmlFor="game_type_name" className="form-label">
                  Game Type
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="game_type_name"
                  value={form?.game_type_name ?? ''}
                  onChange={(e) => setForm({ ...form, game_type_name: e.target.value })}
                />
              </div>
              <div className={``}>
                <div className="form-check ">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    name="commission"
                    checked={form?.active ?? true}
                    onChange={() => setForm({ ...form, active: !form?.active ?? false })}
                  />
                  <label className="form-check-label ">Analysis</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateTableType}
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
      <div className={`table-main py-2 container ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
        <h2 className={`text-center my-2 animate`}>Games</h2>
        <div className={``}>
          <div className={`mb-3`}>
            <input
              type="input"
              className={`form-control animate`}
              placeholder="Search Game"
              onChange={handleSearch}
              id="search"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div
          className={`row gap-0 w-100 px-3 ${display == 'data' ? '' : 'd-none'}`}
          key={renderKey}
        >
          {games.map((table, i) => (
            <div key={i} className={`col-12 col-sm-3 mb-3 mb-sm-0 mt-2`}>
              <div className={`card card-hover shadow border-0 p-0 animate`}>
                <div className={`card-body m-0 d-flex gap-1`}>
                  <div className={``}>
                    <img
                      src={
                        table?.game_type_name == 'roulette'
                          ? roulleteWheel
                          : BaccaratTables[i % 20]?.table ?? ''
                      }
                      className={`object-fit-cover`}
                      style={{ width: '60px', height: '60px' }}
                    />
                  </div>
                  <div className={`w-100`}>
                    <div className={``}>
                      <h5 className={`card-title capitalize`}>{table?.game_type_name ?? ''}</h5>
                      <p
                        className={`card-text capitalize bg-gradient shadow-xs rounded-circle ${table?.active == true ? 'bg-success' : 'bg-danger'}`}
                        style={{ width: 10, height: 10 }}
                      ></p>
                    </div>
                    <div className={`d-flex justify-content-end`}>
                      <i
                        onClick={() => handleSetForm(table)}
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

export default UpdateTableLimits

