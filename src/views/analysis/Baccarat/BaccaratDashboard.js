import React, { useEffect, useState, useRef } from 'react'
import s from './BaccaratDashboard.module.css'

import axiosClient from '../../../axiosClient.js'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { CFormInput, CFormCheck, CButton } from '@coreui/react'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { Cards, SideWin } from './BaccaratDashboardComponents/BaccaratData.js'

import StackedBarComponent from './BaccaratDashboardComponents/StackedBarComponent.js'
import PlayerBankerData2 from './BaccaratDashboardComponents/PlayerBankerData2.js'
import DoughnutChartComponent from './BaccaratDashboardComponents/DoughnutChartComponent.js'
import PieChartComponent from './BaccaratDashboardComponents/PieChartComponent.js'
import BarChartComponent from './BaccaratDashboardComponents/BarChartComponent.js'
import PlayerBankerDashboardComponent from './BaccaratDashboardComponents/PlayerBankerDashboardComponent.js'

import { GetCurrent } from '../../../getCurrent.js'

import NoData from '../../NoData/NoData'
import NoDataFull from '../../NoData/NoDataFull'
import showToast from '../../../components/Notification/ShowToast.js'
import { Loader } from '../../../components/Loader.js'

const BaccaratDashboard = () => {
  const navigate = useNavigate()
  const [renderKey, setRenderKey] = useState(0)
  const [renderDashboardKey, setRenderDashboardKey] = useState(0)
  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()
  const [display, setDisplay] = useState('loading')

  const [shoePlayerBankerComponent, setShoePlayerBankerComponent] = useState(false)
  const [data, setData] = useState([{ shoe: 0, data: [] }])
  const [bankerVsPlayer, setBankerVsPlayer] = useState([
    { name: 'Banker', value: 0 },
    { name: 'Player', value: 0 },
    { name: 'Tie', value: 0 },
  ])

  const [form, setForm] = useState({})
  const theme = useSelector((state) => state?.theme)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [statistics, setStatistics] = useState('WheelPocketStatistics')
  const [live, setLive] = useState(false)
  const [updatedData, setUpdatedData] = useState([]) // to store data after fetching live data

  const [liveData, setLiveData] = useState({
    date_time: '-',
    game_type_id: null,
    roulette_id: null,
    spine_numeric: null,
    state: null,
    table_Name: '-',
    table_limit_id: null,
    warning_flags: null,
    wheel_direction: null,
    wheel_speed: null,
    winning_number: null,
  })

  const [limit, setLimit] = useState(10)
  const [shoes, setShoes] = useState([])
  const [dataSize, setDataSize] = useState(0)
  const [sideWin, setSideWin] = useState(SideWin)
  const [doughnutData, setDoughnutData] = useState([
    { name: 'Banker Streak', value: 0 },
    { name: 'Player Streak', value: 0 },
    { name: 'Banker Pair', value: 0 },
    { name: 'Player Pair', value: 0 },
  ])
  const [callOnTimeInterval, setCallOnTimeInterval] = useState(true)
  const [customLimit, setCustomLimit] = useState(100)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [rawData, setRawData] = useState([])
  const [fromShoe, setFromShoe] = useState(0)
  const [toShoe, setToShoe] = useState(0)

  useEffect(() => {
    if (limit) {
      getGameData(limit) // Call getGameData with the updated limit
    }
  }, [limit])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (localStorage.getItem('baccaratCallOnTimeInterval') === 'true') {
        checkLive(limit)
      }
    }, 10000)

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [limit])

  useEffect(() => {
    getCurrent()
    axiosClient.delete(`/game/older-than`)
  }, [])

  const getCurrent = async () => {
    //console.log('called getCurrent')

    await GetCurrent('analysis')
    getGameData(10)
    return
  }

  const checkLive = async (limitParam) => {
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(`/baccarat/get/${game_type_id}/${table_limit_id}/${limit}`)
      setShoePlayerBankerComponent(false)
      let data = res?.data?.result
      setUpdatedData(res?.data?.result)
      //console.log('response: ', data)

      let live = false
      const currentTime = new Date()

      if (data?.length > 0 && data[0]?.date_time) {
        const resDataTime = new Date(data[0]?.date_time)
        const diffInMs = currentTime - resDataTime
        const diffInMinutes = diffInMs / (1000 * 60)

        if (diffInMinutes <= 1) {
          live = true
        }
      }

      //console.log('live status: ', live)
      setLive(live)

      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
      setRenderKey(renderKey + 1)
    } catch (err) {
      //console.log('err: ', err)
      setDisplay('nodata')
    }

    localStorage.setItem('baccaratCallOnTimeInterval', true)
  }

  const updateData = () => {
    window.location.reload()
    showToast('Data updated successfully', 'success')
  }

  const getGameDataByDate = async () => {
    //console.log('fromDate ', fromDate, ' toDate ', toDate)
    try {
      const res = await axiosClient.post(`/game/get/${game}/${game_type_id}/${table_limit_id}`, {
        from_date: fromDate,
        to_date: toDate,
      })
      processData(res?.data?.result)
      let data = res?.data?.result
      //console.log('response: ', data)
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
      setRenderKey(renderKey + 1)
    } catch (err) {
      //console.log('err: ', err)
      setDisplay('nodata')
    }

    localStorage.setItem('baccaratCallOnTimeInterval', false)
  }

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(`/baccarat/get/${game_type_id}/${table_limit_id}/${limit}`)
      setShoePlayerBankerComponent(false)
      processData(res?.data?.result)
      let data = res?.data?.result
      //console.log('response: ', data)
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
      setRenderKey(renderKey + 1)
    } catch (err) {
      //console.log('err: ', err)
      setDisplay('nodata')
    }

    localStorage.setItem('baccaratCallOnTimeInterval', true)
  }

  const getGameDataByFromShoeToToShoe = async () => {
    if (fromShoe > toShoe) {
      showToast('From Shoe should be less than To Shoe', 'error')
      return
    }
    if (toShoe < 0) {
      showToast(' To Shoe should be greater than 0', 'error')
      return
    }
    if (!fromShoe || !toShoe) {
      showToast('From Shoe and To Shoe should not be empty', 'error')
      return
    }
    localStorage.setItem('currentShoe', toShoe)
    setDisplay('loading')
    try {
      const res = await axiosClient.get(
        `/baccarat/get/from/to/${game_type_id}/${table_limit_id}/${fromShoe}/${toShoe}`,
      )

      setShoePlayerBankerComponent(false)
      processData(res?.data?.result)
      let data = res?.data?.result
      //console.log('response: ', res?.data?.result)
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
    } catch (err) {
      //console.log(err)
      setDisplay('nodata')
    }
    localStorage.setItem('baccaratCallOnTimeInterval', false)
  }

  const processData = async (resData) => {
    // console.log('processData: ', resData)
    setRawData(resData)

    const resShoes = await axiosClient.get(`/baccarat/get/shoes/${game_type_id}/${table_limit_id}`)

    let live = false
    const currentTime = new Date()

    if (resData?.length > 0 && resData[0]?.date_time) {
      const resDataTime = new Date(resData[0]?.date_time)
      const diffInMs = currentTime - resDataTime
      const diffInMinutes = diffInMs / (1000 * 60)

      if (diffInMinutes <= 1) {
        live = true
      }
    }

    //console.log('live status: ', live)
    setLive(live)
    if (live == true) {
      setLiveData(resData[0])
    }

    let shoes = []
    let tempShoe = resData[0]?.shoe_no
    let tempData = []
    let data = []
    let playerStreak = 0
    let bankerStreak = 0
    let playerPair = 0
    let bankerPair = 0
    let streak = []
    let tempStreak = []
    let flag = 0
    let tempCurrentWinner = ''

    for (let i in resData) {
      if (resData[i]?.winner == 'B' || resData[i]?.winner == 'P') {
        tempCurrentWinner = resData[i]?.winner
        break
      }
    }

    let bankerVsPlayer = [
      { name: 'Player', value: 0 },
      { name: 'Banker', value: 0 },
      { name: 'Tie', value: 0 },
    ]
    const sideWin = SideWin

    for (let i = 0; i < resData?.length; i++) {
      if (i < resData?.length - 2 && tempCurrentWinner == resData[i + 1]?.winner) {
        tempStreak.push(tempCurrentWinner)
      } else {
        if (tempStreak?.length > 0) {
          streak.push(tempStreak)
          tempStreak = []
        }
        if (i < resData?.length - 2) {
          tempCurrentWinner = resData[i + 1]?.winner
        }
      }
    }

    for (let i = 0; i < resData?.length; i++) {
      if (resData[i]?.winner == 'P') bankerVsPlayer[0].value += 1
      if (resData[i]?.winner == 'B') bankerVsPlayer[1].value += 1
      if (resData[i]?.winner == 'T') bankerVsPlayer[2].value += 1

      if (resData[i]?.side_win == 'PP') sideWin[2].value += 1
      if (resData[i]?.side_win == 'BP') sideWin[3].value += 1
      if (resData[i]?.side_win == 'TG') sideWin[4].value += 1
      if (resData[i]?.side_win == 'S6') sideWin[5].value += 1
      if (resData[i]?.side_win == 'TGR') sideWin[6].value += 1
      if (resData[i]?.side_win == 'TP') sideWin[7].value += 1
      if (resData[i]?.side_win == 'TW') sideWin[8].value += 1
      if (resData[i]?.side_win == 'TT') sideWin[9].value += 1
      if (resData[i]?.side_win == 'BT') sideWin[10].value += 1
      if (resData[i]?.side_win == 'ST') sideWin[11].value += 1
      if (resData[i]?.side_win == 'BD') sideWin[12].value += 1
      if (resData[i]?.side_win == 'SD') sideWin[13].value += 1
      if (resData[i]?.side_win == 'DT') sideWin[14].value += 1

      if (tempShoe != resData[i]?.shoe_no) {
        shoes.push(tempShoe)

        data.push({ shoe: tempShoe, data: tempData })
        tempShoe = resData[i]?.shoe_no
        tempData = []
      }

      const tempPlayerSplit = resData[i]?.player_cards?.split(',')
      const tempBankerSplit = resData[i]?.banker_cards?.split(',')

      resData[i].playerCard1 = tempPlayerSplit[0]
      resData[i].playerCard2 = tempPlayerSplit[1]
      if (tempPlayerSplit[2]) resData[i].playerCard3 = tempPlayerSplit[2]

      resData[i].bankerCard1 = tempBankerSplit[0]
      resData[i].bankerCard2 = tempBankerSplit[1]
      if (tempBankerSplit[2]) resData[i].bankerCard3 = tempBankerSplit[2]

      if (resData[i]?.playerCard1 == resData[i]?.playerCard2) playerPair += 1
      if (resData[i]?.bankerCard1 == resData[i]?.bankerCard2) bankerPair += 1
      if (
        resData[i]?.playerCard3 &&
        resData[i]?.playerCard1 != resData[i]?.playerCard2 &&
        resData[i]?.playerCard2 == resData[i]?.playerCard3
      ) {
        playerPair += 1
      }
      if (
        resData[i]?.bankerCard3 &&
        resData[i]?.bankerCard1 != resData[i]?.bankerCard2 &&
        resData[i]?.bankerCard2 == resData[i]?.bankerCard3
      ) {
        bankerPair += 1
      }

      tempData.push(resData[i])
    }

    shoes.push(tempShoe)

    data.push({ shoe: tempShoe, data: tempData })
    for (let i in streak) {
      if (streak[i][0] == 'P') {
        playerStreak++
      }
      if (streak[i][0] == 'B') {
        bankerStreak++
      }
    }

    const doughnutData = [
      { name: 'Player Streak', value: playerStreak },
      { name: 'Banker Streak', value: bankerStreak },
      { name: 'Player Pair', value: playerPair },
      { name: 'Banker Pair', value: bankerPair },
    ]

    sideWin[0].value = playerStreak
    sideWin[1].value = bankerStreak

    setBankerVsPlayer(bankerVsPlayer)
    setShoes(resShoes?.data?.result)
    //console.log('processed data', data)
    setData(data)
    setDataSize(data?.length)
    setDoughnutData(doughnutData)
    setSideWin(sideWin)
    setShoePlayerBankerComponent(true)
    setRenderKey(renderKey + 1)
  }

  const getDataByShoe = async (data) => {
    let tempRawData = rawData
    for (let i in data) {
      tempRawData.push(data[i])
    }
    processData(tempRawData)
  }

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark bg-gradient bg-opacity-25  text-light border-secondary  border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border `,
    )
  }, [theme])

  useEffect(() => {
    /*  if (data) console.log('data: ', data)
    if (rawData) console.log('rawData: ', rawData) */
  }, [data])

  const config = { threshold: 0.1 }

  let observer = new IntersectionObserver(function (entries, self) {
    let targets = entries.map((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target)
        return entry.target
      }
    })

    fadeIn(targets)
  }, config)

  document.querySelectorAll('.box')?.forEach((box) => {
    observer.observe(box)
  })

  function fadeIn(targets) {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power1.out',
    })
  }

  const options = [
    { value: 20, label: 20 },
    { value: 19, label: 19 },
    { value: 18, label: 18 },
    { value: 17, label: 17 },
    { value: 16, label: 16 },
    { value: 15, label: 15 },
    { value: 14, label: 14 },
  ]

  return (
    <>
      <div
        className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 d-flex justify-content-center`}
      >
        <div className={`w-100`}>
          <div className={`text-center text-shadow capitalize poppins-400`}>
            <h3> {table_limit_name ? table_limit_name : 'Title'}</h3>
          </div>

          <div className={`px-2 py-1 `}>
            <div className={`px-1`}>
              <div className={`row    d-flex justify-content-center`}>
                <div
                  className={`col-12 col-md-10 col-xxl-12 border-0 shadow-s poppins-500 box ${s.opacity} ${themeClass} bg-gradient py-2 rounded`}
                >
                  <div className={`row  gy-2`}>
                    <div className={`col-12 col-md-6 col-xxl-3 d-flex `}>
                      <div
                        className={` d-flex gap-2 w-100 justify-content-between   justify-content-sm-evenly align-items-center`}
                      >
                        <div className={`d-flex gap-2`}>
                          <label> 10</label>
                          <input
                            className="pointer text-dark "
                            type="radio"
                            value={'10'}
                            name="searchBy"
                            id="searchByDate"
                            onChange={(e) => setLimit(e.target.value)}
                          />
                        </div>
                        <div className={`d-flex gap-2`}>
                          <label> 20</label>
                          <input
                            className="pointer text-dark "
                            type="radio"
                            value={'20'}
                            name="searchBy"
                            id="searchByDate"
                            onChange={(e) => setLimit(e.target.value)}
                          />
                        </div>
                        <div className={`d-flex gap-2`}>
                          <label> 50</label>
                          <input
                            className="pointer text-dark "
                            type="radio"
                            value={'50'}
                            name="searchBy"
                            id="searchByDate"
                            onChange={(e) => setLimit(e.target.value)}
                          />
                        </div>
                        <div
                          className={`border-end border-secondary h-100 border-opacity-25 d-none d-md-block`}
                        ></div>
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 col-xxl-3  px-1 `}>
                      <div
                        className={` w-100 gap-1  d-flex justify-content-evenly w-100 d-flex   border-end-0  border-end-xxl-1 border-secondary border-opacity-25 `}
                      >
                        <div className="gap-1 fontText w-100 px-0 px-xxl-1  poppins-500 d-flex justify-content-evenly gap-0 align-items-center ">
                          <div className={`w-100 `}>
                            <input
                              className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}  `}
                              type="number"
                              placeholder="From Shoe"
                              onChange={(e) => setFromShoe(e.target.value)}
                            />
                          </div>
                          <div className={`w-100 `}>
                            <input
                              className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}  `}
                              type="number"
                              placeholder="To Shoe"
                              onChange={(e) => setToShoe(e.target.value)}
                            />
                          </div>
                          <div className={` d-flex justify-content-end `}>
                            <button
                              className="btn btn-primary bg-gradient btn-sm  fontText"
                              type="button"
                              onClick={() => getGameDataByFromShoeToToShoe()}
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
                                  type="datetime-local"
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
                                  type="datetime-local"
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
          </div>

          <div className={` ${display == 'data' ? '' : 'd-none'}`} key={renderDashboardKey}>
            <div className={`position-relative`}>
              <div className={`w-100 mt-2  `} key={renderKey}>
                <PlayerBankerDashboardComponent
                  shoes={shoes}
                  shoeData={data}
                  dataSize={dataSize}
                  getDataByShoe={getDataByShoe}
                  live={live}
                  updateData={updateData}
                />
              </div>
              <div className={`w-100   mt-3`}>
                <div className={`row  g-3  `}>
                  <div className={`col-12 col-md-6 box ${s.opacity} `}>
                    <div className={` shadow-s rounded py-2 ${themeBorder} bg-gradient`}>
                      <div className={`px-1`}>
                        <div className={`border-bottom border-secondary border-opacity-25 px-2`}>
                          Total Shoes {dataSize}
                        </div>
                      </div>
                      <div className={``}>
                        <PieChartComponent bankerVsPlayer={bankerVsPlayer} />
                      </div>
                    </div>
                  </div>
                  <div className={`col-12 col-md-6 box ${s.opacity}`}>
                    <div className={` shadow-s rounded py-2 ${themeBorder} bg-gradient`}>
                      <div className={`px-1`}>
                        <div className={`border-bottom border-secondary border-opacity-25 px-2`}>
                          Total Shoes {dataSize}
                        </div>
                      </div>
                      <div className={``}>
                        <DoughnutChartComponent doughnutData={doughnutData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={` box mt-3 box  ${s.opacity}`}>
                <div
                  className={`py-3 row shadow-s rounded  d-flex justify-content-center ${themeBorder} bg-gradient`}
                >
                  <div className={``}>
                    <div className={`border-bottom border-secondary border-opacity-25 px-2`}>
                      Total Shoes {dataSize}
                    </div>
                  </div>
                  <div className={`col-11 col-sm-10 h-100 mt-2`}>
                    <BarChartComponent sideWin={sideWin} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${display == 'nodata' ? '' : 'd-none'}`}>
            <NoDataFull />
          </div>
        </div>
      </div>

      <Loader display={display} />
    </>
  )
}

export default BaccaratDashboard
