import React, { useEffect, useState } from 'react'
import s from './AddTable.module.css'
import { useSelector } from 'react-redux'
import gsap from 'gsap'

import showToast from '../../../components/Notification/ShowToast.js'
import axiosClient from '../../../axiosClient.js'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

import { GetCurrent } from '../../../getCurrent.js'

const EditTable = () => {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useSelector((state) => state.theme)
  const [languages, setLanguages] = useState([])
  const [themes, setThemes] = useState([])
  const [backgrounds, setBackgrounds] = useState([])
  const [tables, setTables] = useState([])
const [currencys, setCurrencys] = useState([])

  const getConfigs = async () => {
    await GetCurrent('limits')
    try {
      const response = await axiosClient.get('config/get/configs')
      console.log('response', response)

      const { languages, themes, backgrounds, games,currencys} = response.data
      setLanguages(languages)
      setBackgrounds(backgrounds)
      setThemes(themes)
      setTables(games)
      setCurrencys(currencys)

      let language = ''
      let background = ''
      let theme = ''
      let currency = ''
     

      const { data } = await axiosClient.get(`/table/limits/get/${params.id}`)
      console.log('response2', data)

      for(let i in languages){
        if(languages[i].language_id == data.result.language_id){
          language = languages[i].language_id
        }
      }

      for(let i in backgrounds){
        if(backgrounds[i].background_id == data.result.background_id){
         background = backgrounds[i].background_id
        }
      }

      for(let i in themes){
        if(themes[i].theme_id == data.result.theme_id){
         theme = themes[i].theme_id
        }
      }

      for(let i in currencys){
        if(currencys[i].currency_id == data.result.currency_id){
         currency = currencys[i].currency_id
        }
      }

      console.log("language: ",language)  
      console.log("background: ",background)  
      console.log("theme: ",theme)
      

      setFormData({
        ...formData,
        table_limit_name: data.result.table_limit_name,
        game_name: data.result.game_name,
        game_id: data.result.game_id,
        min_bet: data.result.min_bet,
        max_bet: data.result.max_bet,
        side_bet_min: data.result.side_bet_min,
        side_bet_max: data.result.side_bet_max,
        s_message: data.result.s_message,
        commission: data.result.commission,
        theme: theme,
        background: background,
        language: language,
        currency_id: currency
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [formData, setFormData] = useState({
    table_limit_name: '',
    table: '',
    game_name: '',
    game_id: '',
    min_bet: '',
    max_bet: '',
    side_bet_min: '',
    side_bet_max: '',
    s_message: '',
    theme: '',
    language: '',
    background: '',
    currency_id: '',
    commission:false,
  })

  useEffect(() => {
    getConfigs()
    console.log('params', params)

    //console.log('props', props)

    /*  setFormData({
      ...formData,
      game_name: props.table,
      game_id: props.id,
    }) */
  }, [])
  useEffect(() => {
    console.log('roulette theme', theme)
    console.log('formData', formData)
  }, [theme, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleUpdate = async () => {
    const { s_message, min_bet, max_bet, theme, background, side_bet_min, language, side_bet_max } =
      formData

    if (!min_bet) {
      showToast('Enter Minimum Bet', 'info')
      return
    }

    if (!theme) {
      showToast('Select Theme', 'info')
      return
    }

    if (!max_bet) {
      showToast('Enter Maximum Bet', 'info')
      return
    }
    if (!background) {
      showToast('Select Background', 'info')
      return
    }
    if (!side_bet_min) {
      showToast('Enter Side Bet Minimum', 'info')
      return
    }
    if (!language) {
      showToast('Select Language', 'info')
      return
    }
    if (!side_bet_max) {
      showToast('Enter Side Bet Maximum', 'info') 
      return
    }
    if (!formData.currency_id) return showToast('Select Currency', 'info')
      if(formData.min_bet > formData.max_bet) return showToast('Minimum Bet should be less than Maximum Bet', 'info',3000)
        if(formData.side_bet_min > formData.side_bet_max) return showToast('Side Bet Minimum should be less than Side Bet Maximum', 'info',3000)
  

    let dataToSend = {
      ...formData,
    }
    dataToSend.language_id = dataToSend.language
    dataToSend.theme_id = dataToSend.theme
    dataToSend.background_id = dataToSend.background
    //dataToSend.currency_id = dataToSend.currency
    console.log('Data to send:', dataToSend," id: ",params.id , " game: ", params.game)
    

    try {
      const response = await axiosClient.put(`table/limits/update/${params.id}`, dataToSend)
      console.log(response)
      showToast('Table Updated', 'success')
      setTimeout(() => {
        navigate(-1)
      }, 1500)
    } catch (error) {
      showToast('Error adding table limit', 'error')
      console.error(error)
    }
  }

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

  return (
    <div
      className={`${s.addtable_main} d-flex justify-content-center align-items-center ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
    >
      <div className="container">
        <div className="py-3 h-100 d-flex justify-content-center align-items-center">
          <div
            className={`row ${s.form} border-bottom border-2 border-top ${
              theme === 'dark' ? 'border-primary' : 'border-dark'
            } rounded-4 p-4 shadow-lg`}
          >
            <h1 className="text-center py-3 animate">Roulette</h1>
            <div className={`row `}>
              <div className="col-12 col-md-6">
                <div className="mb-2">
                  <label className="animate form-label ">Table Name</label>
                  <input
                    disabled
                    className="form-control animate form-control-sm"
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
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                  >
                    <option value="">Select Theme</option>
                    {themes.map((theme) => (
                      <option key={theme.theme_id} value={theme.theme_id}>
                        {theme.theme}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="animate form-label">Background</label>
                  <select
                    className="animate form-select form-select-sm"
                    name="background"
                    value={formData.background}
                    onChange={handleChange}
                  >
                    <option value="">Select Background</option>
                    {backgrounds.map((bg) => (
                      <option className="" key={bg.bg_id} value={bg.background_id}>
                        <div className="d-flex align-items-evenly border border-danger">
                          <div
                            className=" border mx-2"
                            style={{ backgroundColor: 'yellow', width: '10px', height: '100%' }}
                          ></div>
                          <div className="border">{bg.background}</div>
                        </div>
                      </option>
                    ))}
                  </select>
                </div>

                
                <div className="mb-2">
                  <label className="animate form-label">Language</label>
                  <select
                    className="animate form-select form-select-sm"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="">Select Language</option>
                    {languages.map((lang) => (
                      <option key={lang.lang_id} value={lang.language_id}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="animate form-label">Currency</label>
                  <select
                    className="animate form-select form-select-sm"
                    name="currency_id"
                    value={formData.currency_id}
                    onChange={handleChange}
                  >
                    <option value="">Select currency</option>
                    {currencys.map((curr) => (
                      <option key={curr.currency_id} value={curr.currency_id}>
                        {curr.currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-2">
                  <label className="animate form-label">Minimum Bet</label>
                  <input
                    className=" animate form-control form-control-sm"
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
                    className=" animate form-control form-control-sm"
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
                    className=" animate form-control form-control-sm"
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
                    className=" animate form-control form-control-sm"
                    type="number"
                    placeholder="Enter Side Bet Maximum"
                    name="side_bet_max"
                    value={formData.side_bet_max}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className={`mt-4 pt-3 ${params.game == 'baccarat' ? 'd-block': 'd-none'}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input animate"
                      type="checkbox"
                      name="commission"
                      checked={formData.commission}
                      onChange={()=>setFormData({...formData,commission:!formData.commission})}
                    />
                    <label className="form-check-label animate">Commission</label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} animate px-5`}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTable
