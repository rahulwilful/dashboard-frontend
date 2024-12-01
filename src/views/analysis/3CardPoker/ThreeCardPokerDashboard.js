import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../axiosClient'

import NoData from '../../NoData/NoData'
import NoDataFull from '../../NoData/NoDataFull'
import s from './ThreeCardPokerDashboard.module.css'

import BarChartComponent from './ThreeCardPokerDashboardComponents/BarChartComponent'
import PieChartComponent from './ThreeCardPokerDashboardComponents/PieChartComponent'
import ThreeCardPokerDashboardComponent from './ThreeCardPokerDashboardComponents/ThreeCardPokerDashboardComponent'

const ThreeCardPokerDashboard = () => {
  const theme = useSelector((theme) => theme.theme)
  const navigate = useNavigate()
  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()
  const [data, setData] = useState([])
  const [index, setIndex] = useState(0)

  const [limit, setLimit] = useState(100)
  const [display, setDisplay] = useState('loading')
  const [renderKey, setRenderKey] = useState(0)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [customLimit, setCustomLimit] = useState(100)
  const [originalData, setOriginalData] = useState([])

  const [radioLimit, setRadioLimit] = useState(null)
  const [callOnTimeInterval, setCallOnTimeInterval] = useState(true)

  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [live, setLive] = useState(false)

  const [currentWinners, setCurrentWinners] = useState([0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs  ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark bg-gradient bg-opacity-25  text-light border-secondary  border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border `,
    )
  }, [theme])

  useEffect(() => {
    getGameData()
    console.log('game:- ', game)
  }, [game_type_id, table_limit_id])

  useEffect(() => {
    console.log('display:- ', display)
  }, [display])

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(
        `/game/get/3_card_poker/${game_type_id}/${table_limit_id}/${limit}`,
      )
      console.log('response: ', res.data.result)
      processData(res.data.result)
      let data = res.data.result
      console.log('response: ', data)
      if (data.length > 0) {
        setDisplay('data')
      }

      if (data.length == 0) {
        setDisplay('nodata')
      }

      setRenderKey(renderKey + 1)
      localStorage.setItem('threeCardPokerCallOnTimeInterval', true)
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }
  }

  const getCustomeGameDataByRadio = async (limitParam) => {
    const limitToUse = limitParam || limit

    try {
      const res = await axiosClient.get(
        `/game/get/3_card_poker/${game_type_id}/${table_limit_id}/${limitParam}`,
      )
      console.log('getCustomeGameDataByRadio response: ', res.data.result)
      processData(res.data.result)
      setRenderKey(renderKey + 1)
      setLimit(limitParam)
      let data = res.data.result
      console.log('response: ', data)
      if (data.length > 0) {
        setDisplay('data')
      }

      if (data.length == 0) {
        setDisplay('nodata')
      }
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }
    localStorage.setItem('threeCardPokerCallOnTimeInterval', true)
  }

  const processData = (resData) => {
    console.log('data for precess: ', resData)
    setOriginalData(resData)

    let live = false
    const currentTime = new Date()
    //  console.log('time: ', currentTime)

    //checking if connection is live
    // Check if resData[0].date_time exists and is exactly 1 minute before current time
    if (resData.length > 0 && resData[0].date_time) {
      const resDataTime = new Date(resData[0].date_time)
      const diffInMs = currentTime - resDataTime
      const diffInMinutes = diffInMs / (1000 * 60)

      if (diffInMinutes <= 1) {
        live = true // Set live to true if difference is 1 minute or less
      }
    }

    console.log('live status: ', live, ' data.length: ', data.length)
    if (data.length > 0 && live == false) {
      return
    }
    setLive(live)
    if (live == true) {
      setLiveData(resData[0])
    }

    setCurrentWinners(resData[0].winner.split(','))

    let player1wins = 0
    let player2wins = 0
    let player3wins = 0
    let player4wins = 0
    let player5wins = 0
    let player6wins = 0
    let player7wins = 0

    //counting player wins
    for (let i in resData) {
      const splittedWinners = resData[i].winner.split(',')
      console.log('splittedWinners[i]: ', splittedWinners)
      if (splittedWinners[0] && splittedWinners[0] == '1') player1wins++
      if (splittedWinners[1] && splittedWinners[1] == '1') player2wins++
      if (splittedWinners[2] && splittedWinners[2] == '1') player3wins++
      if (splittedWinners[3] && splittedWinners[3] == '1') player4wins++
      if (splittedWinners[4] && splittedWinners[4] == '1') player5wins++
      if (splittedWinners[5] && splittedWinners[5] == '1') player6wins++
      if (splittedWinners[6] && splittedWinners[6] == '1') player7wins++
    }

    const tempData = []
    if (player1wins > 0) tempData.push({ name: 'player 1', wins: player1wins })
    if (player2wins > 0) tempData.push({ name: 'player 2', wins: player2wins })
    if (player3wins > 0) tempData.push({ name: 'player 3', wins: player3wins })
    if (player4wins > 0) tempData.push({ name: 'player 4', wins: player4wins })
    if (player5wins > 0) tempData.push({ name: 'player 5', wins: player5wins })
    if (player6wins > 0) tempData.push({ name: 'player 6', wins: player6wins })
    if (player7wins > 0) tempData.push({ name: 'player 7', wins: player7wins })

    setData(tempData)
  }

  const getCustomeGameData = async () => {
    setData([])
    try {
      const res = await axiosClient.get(
        `/game/get/3_card_poker/${game_type_id}/${table_limit_id}/${customLimit}`,
      )
      console.log('getCustomeGameData response: ', res.data.result)
      processData(res.data.result)
      let data = res.data.result
      console.log('response: ', data)
      if (data.length > 0) {
        setDisplay('data')
      }

      if (data.length == 0) {
        setDisplay('nodata')
      }
      setRenderKey(renderKey + 1)
      setLimit(customLimit)
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }

    localStorage.setItem('threeCardPokerCallOnTimeInterval', false)
  }

  const getGameDataByDate = async () => {
    //  console.log('fromDate ', fromDate, ' toDate ', toDate)
    setData([])
    console.log('first date: ', fromDate, 'second date: ', toDate)
    try {
      const res = await axiosClient.post(
        `/game/get/3_card_poker/${game_type_id}/${table_limit_id}`,
        {
          from_date: fromDate,
          to_date: toDate,
        },
      )
      //  console.log('res.data.result: ', res.data.result)
      processData(res.data.result)
      let data = res.data.result
      console.log('response: ', data)
      if (data.length > 0) {
        setDisplay('data')
      }

      if (data.length == 0) {
        setDisplay('nodata')
      }
      setRenderKey(renderKey + 1)
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }

    localStorage.setItem('threeCardPokerCallOnTimeInterval', false)
  }

  const handleIndexChange = (event) => {
    console.log('originalData: ', originalData)

    if (event == '+') {
      if (index == originalData.length - 1) return
      const tempIndex = index + 1
      setIndex(tempIndex)
      setCurrentWinners(originalData[tempIndex].winner.split(','))
      console.log('currentData', originalData[tempIndex].winner.split(','))
    } else {
      if (index == 0) return
      const tempIndex = index - 1
      setIndex(tempIndex)
      setCurrentWinners(originalData[tempIndex].winner.split(','))
    }
  }

  return (
    <>
      <div className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4  `}>
        <div className={`px-2`}>
          <div className={`row    d-flex justify-content-center`}>
            <div
              className={`col-12 col-md-10 col-xxl-12 border-0 shadow-s poppins-500 box ${s.opacity} ${themeClass} bg-gradient py-2 rounded`}
            >
              <div className={`row gx-1 gy-2`}>
                <div className={`col-12 col-md-6 col-xxl-3 d-flex `}>
                  <div
                    className={` d-flex gap-2 w-100 justify-content-between   justify-content-sm-evenly align-items-center`}
                  >
                    <div className={`d-flex gap-2`}>
                      <lable> 10</lable>
                      <input
                        className="pointer text-dark "
                        type="radio"
                        value={'10'}
                        name="searchBy"
                        id="searchByDate"
                        onClick={() => getCustomeGameDataByRadio(10)}
                      />
                    </div>
                    <div className={`d-flex gap-2`}>
                      <lable> 20</lable>
                      <input
                        className="pointer text-dark "
                        type="radio"
                        value={'20'}
                        name="searchBy"
                        id="searchByDate"
                        onClick={() => getCustomeGameDataByRadio(20)}
                      />
                    </div>
                    <div className={`d-flex gap-2`}>
                      <lable> 50</lable>
                      <input
                        className="pointer text-dark "
                        type="radio"
                        value={'50'}
                        name="searchBy"
                        id="searchByDate"
                        onClick={() => getCustomeGameDataByRadio(50)}
                      />
                    </div>
                    <div
                      className={`border-end border-secondary h-100 border-opacity-25 d-none d-md-block`}
                    ></div>
                  </div>
                </div>
                <div className={`col-12 col-md-6 col-xxl-3 `}>
                  <div
                    className={` w-100  d-flex justify-content-evenly w-100 d-flex gap-1  border-end-0  border-end-xxl-1 border-secondary border-opacity-25 `}
                  >
                    <div className="gap-2 fontText w-100 px-0 px-xxl-3  poppins-500 d-flex justify-content-evenly gap-3 align-items-center ">
                     
                      <div className={`w-100  `}>
                        <input
                          className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}  `}
                          type="number"
                          placeholder="NUmber Of Games"
                          onChange={(e) => setCustomLimit(e.target.value)}
                        />
                      </div>
                      <div className={` d-flex justify-content-end `}>
                        <button
                          className="btn btn-primary bg-gradient btn-sm  fontText"
                          type="button"
                          onClick={() => getCustomeGameData()}
                        >
                          Search
                        </button>
                      </div>
                      <div
                        className={`border-end border-secondary h-100 border-opacity-25 d-none d-xxl-block`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={`col-12 col-md-12 col-xl-12 col-xxl-6 px-0 px-xxl-3`}>
                  <div className={``}>
                    <div className={`row gx-2 gy-1 d-flex  justify-content-evenly`}>
                      <div className={`col-6 col-sm-5 col-lg-4`}>
                        <div className={``}>
                          <div className={`input-group  input-group-sm`}>
                            <span
                              className={`input-group-text  font12 bg-${theme} ${themeBorder}`}
                              id="inputGroup-sizing-sm"
                            >
                              From
                            </span>
                            <input
                              type="date"
                              className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-sm"
                              onChange={(e) => setFromDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={`col-6 col-sm-5 col-lg-4`}>
                        <div className="">
                          <div className="input-group input-group-sm ">
                            <span
                              className={`input-group-text font12 bg-${theme} ${themeBorder}`}
                              id="inputGroup-sizing-sm"
                            >
                              To
                            </span>
                            <input
                              type="date"
                              className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-sm"
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`col-12  col-lg-4 d-flex justify-content-lg-end justify-content-center align-items-center`}
                      >
                        <div className="">
                          <button
                            className={`btn btn-primary bg-gradient btn-sm fontText`}
                            type="button"
                            onClick={() => getGameDataByDate()}
                          >
                            Search By Date
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={` mt-3  ${themeBorder} p-2 rounded shadow-s`}>
          <div className={`pt-2`}>
            <ThreeCardPokerDashboardComponent data={currentWinners} />
          </div>
          <div className={`d-flex justify-content-center align-items-center gap-3 border-top border-secondary  border-opacity-25 mt-3 pt-1`}>
            <div className={``}>
              <button
                onClick={() => handleIndexChange('-')}
                type="button"
                className={`btn btn-primary btn-sm ${index == 0 ? 'd-none' : ''} `}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                disabled
                type="button"
                className={`btn btn-primary btn-sm ${index == 0 ? '' : 'd-none'}`}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </div>

            <div className={`fs-4 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
              {originalData.length}/{index + 1}
            </div>
            <div className={``}>
              <button
                onClick={() => handleIndexChange('+')}
                type="button"
                className={`btn btn-primary btn-sm ${index < originalData.length - 1 ? '' : 'd-none'}`}
              >
                <i className="bi bi-chevron-right  "></i>
              </button>
              <button
                disabled
                type="button"
                className={`btn btn-primary btn-sm ${index >= originalData.length - 1 ? '' : 'd-none'}`}
              >
                <i className="bi bi-chevron-right "></i>
              </button>
            </div>
          </div>
        </div>
        <div className={`row mt-3`}>
          <div className={`col-12 col-lg-6 `}>
            <div
              className={`  pt-3 pe-3 ${themeBorder} rounded-3 shadow-s h-100 d-flex align-items-center`}
            >
              <BarChartComponent data={data} />
            </div>
          </div>
          <div className={`col-12 col-lg-6`}>
            <div className={`  pt-3 pe-3 ${themeBorder} rounded-3 shadow-s`}>
              <PieChartComponent data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThreeCardPokerDashboard
