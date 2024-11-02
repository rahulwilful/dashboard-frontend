import React, { useEffect, useState } from 'react'
//import s from './UpdateTableLimits.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

const UpdateTableLimits = (props) => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [form, setForm] = useState({ game_type_id: '', game_type_name: '' })
  const getGames = async () => {
    const { data } = await axiosClient.get(`/config/get/table/type`)
    console.log(data)

    setGames(data.game_types)
  }

  const handleSetForm = (table) => {
    setForm({ game_type_id: table.game_type_id, game_type_name: table.game_type_name })
  }

  const updateTableType = async () => {
    try {
      const { data } = await axiosClient.put(`/config/update/game/type/${form.game_type_id}`, form)
      console.log(data)
      showToast('Table Type updated successfully!', 'success')
      const temp = games
      for (let i in temp) {
        if (temp[i].game_type_id == form.game_type_id) {
          temp[i].game_type_name = form.game_type_name
        }
      }
      setGames(temp)
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
                  Table Type Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="game_type_name"
                  value={form.game_type_name}
                  onChange={(e) => setForm({ ...form, game_type_name: e.target.value })}
                />
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
      <div className=" table-main  py-2 container">
        <h2 className="text-center my-2">Games</h2>
        <div className="row gap-0 w-100 px-3 ">
          {games.map((table, i) => (
            <div key={i} className="col-12 col-sm-3  mb-3 mb-sm-0 mt-2">
              <div className="card card-hover shadow border-0  p-0  ">
                <div className="card-body   m-0 d-flex  ">
                  <div className=" ">
                    <img src={roulleteWheel} className="" style={{ width: '100px' }} />
                  </div>
                  <div className=" w-100">
                    <div className="">
                      <h5 className="card-title  capitalize">{table.game_type_name}</h5>
                      <p className="card-text capitalize "></p>
                    </div>
                    <div className=" d-flex justify-content-end ">
                      <i
                        onClick={() => handleSetForm(table)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        class="bi bi-pen-fill icon-size font-size icon pointer text-shadow icon-hover"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UpdateTableLimits
