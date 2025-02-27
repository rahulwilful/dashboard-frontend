import React, { useEffect, useState, useRef } from 'react'
import s from './RouletteDashboard.module.css'
import axiosClient from '../../../axiosClient.js'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { CFormInput, CFormCheck, CButton } from '@coreui/react'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import BarChartComponent from './rouletteDashboardComponents/BarChartComponent.js'
import RadarChartComponent from './rouletteDashboardComponents/RadarChartComponent.js'
import DataTableComponent from './rouletteDashboardComponents/DataTableComponent.js'
import DataTableComponent2 from './rouletteDashboardComponents/DataTableComponent2.js'
import WheelPocketStatistics from './rouletteDashboardComponents/WheelPocketStatistics.js'
import DropZoneStatistics from './rouletteDashboardComponents/DropZoneStatistics.js'
import WinStatistics from './rouletteDashboardComponents/WinStatistics.js'

import roulleteWheel from 'src/assets/images/roulleteDashboard/roulleteWheel.png'

import { GetCurrent } from '../../../getCurrent.js'

import NoData from '../../NoData/NoData'
import NoDataFull from '../../NoData/NoDataFull'
import { Loader } from '../../../components/Loader.js'

const RouletteDashboard = () => {
  const [display, setDisplay] = useState('loading')
  const navigate = useNavigate()
  const [renderKey, setRenderKey] = useState(0)
  const theme = useSelector((state) => state.theme)
  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()

  const [data, setData] = useState([])
  const [redTotal, setRedTotal] = useState(0)
  const [blackTotal, setBlackTotal] = useState(0)
  const [redBlackTotal, setRedBlackTotal] = useState(0)
  const [rouletteData, setRouletteData] = useState([])
  const [form, setForm] = useState({})

  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [statistics, setStatistics] = useState('WheelPocketStatistics')
  const [live, setLive] = useState(false)

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

  const [sDaviation, setSDaviation] = useState([])
  const [standardDeviation, setStandardDeviation] = useState(0)

  const [limit, setLimit] = useState(100)
  const [radioLimit, setRadioLimit] = useState(null)
  const [callOnTimeInterval, setCallOnTimeInterval] = useState(true)
  const [customLimit, setCustomLimit] = useState(100)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const tempRoulleteData = [
    { name: '0', number: 0, color: 'green' },
    { name: '32', number: 0, color: 'red' },
    { name: '15', number: 0, color: 'black' },
    { name: '19', number: 0, color: 'red' },
    { name: '4', number: 0, color: 'black' },
    { name: '21', number: 0, color: 'red' },
    { name: '2', number: 0, color: 'black' },
    { name: '25', number: 0, color: 'red' },
    { name: '17', number: 0, color: 'black' },
    { name: '34', number: 0, color: 'red' },
    { name: '6', number: 0, color: 'black' },
    { name: '27', number: 0, color: 'red' },
    { name: '13', number: 0, color: 'black' },
    { name: '36', number: 0, color: 'red' },
    { name: '11', number: 0, color: 'black' },
    { name: '30', number: 0, color: 'red' },
    { name: '8', number: 0, color: 'black' },
    { name: '23', number: 0, color: 'red' },
    { name: '10', number: 0, color: 'black' },
    { name: '5', number: 0, color: 'red' },
    { name: '24', number: 0, color: 'black' },
    { name: '16', number: 0, color: 'red' },
    { name: '33', number: 0, color: 'black' },
    { name: '1', number: 0, color: 'red' },
    { name: '20', number: 0, color: 'black' },
    { name: '14', number: 0, color: 'red' },
    { name: '31', number: 0, color: 'black' },
    { name: '9', number: 0, color: 'red' },
    { name: '22', number: 0, color: 'black' },
    { name: '18', number: 0, color: 'red' },
    { name: '29', number: 0, color: 'black' },
    { name: '7', number: 0, color: 'red' },
    { name: '28', number: 0, color: 'black' },
    { name: '12', number: 0, color: 'red' },
    { name: '35', number: 0, color: 'black' },
    { name: '3', number: 0, color: 'red' },
    { name: '26', number: 0, color: 'black' },
  ]

  useEffect(() => {
    if (limit) {
      getGameData(limit) // Call getGameData with the updated limit
    }
  }, [limit])

  const getGameDataByLimit = () => {
    setLimit(customLimit)
    getGameData(customLimit)
  }

  // Function that is called at regular time intervals
  const callOnTimeIntervalFunc = () => {
    // Check if the callOnTimeInterval flag is set to true in localStorage
    if (localStorage.getItem('callOnTimeInterval') === 'true') {
      // Fetch game data if the flag is true
      getGameData(limit)
    }
  }

  // calling on time interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      callOnTimeIntervalFunc()
    }, 10000)

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [limit])

  useEffect(() => {
    getCurrent()
    axiosClient.delete(`/game/older-than`)
  }, [])

  const getCurrent = async () => {
    console.log('called getCurrent')

    await GetCurrent('analysis')
    getGameData(100)
    return
  }

  /**
   * Fetches game data from the API based on the date range provided
   * and processes it.
   * @returns {Promise<void>}
   */
  const getGameDataByDate = async () => {
    console.log('fromDate ', fromDate, ' toDate ', toDate)

    const res = await axiosClient.post(`/game/get/${game}/${game_type_id}/${table_limit_id}`, {
      from_date: fromDate,
      to_date: toDate,
    })

    processData(res?.data?.result)
    setRenderKey(renderKey + 1)
    // Disable the callOnTimeInterval after fetching the data
    localStorage.setItem('callOnTimeInterval', false)
  }

  /**
   * Fetches game data from the API and processes it.
   * If the limit parameter is provided, it will be used instead of the default limit.
   * @param {number} limitParam The number of records to fetch.
   */
  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit

    try {
      const res = await axiosClient.get(
        `/game/get/${game}/${game_type_id}/${table_limit_id}/${limit}`,
      )
      // Process the data and update the state
      processData(res?.data?.result)
      let data = res?.data?.result
      console.log('response: ', data)
      if (data.length > 0) {
        // If there is data, show the data view
        setDisplay('data')
      }

      if (data?.length == 0) {
        // If there is no data, show the no data view
        setDisplay('nodata')
      }
      // Update the render key to trigger a re-render
      setRenderKey(renderKey + 1)
    } catch (err) {
      console.log('err: ', err)
      // If there is an error, show the no data view
      setDisplay('nodata')
    }

    // Set the callOnTimeInterval flag to true
    localStorage.setItem('callOnTimeInterval', true)
  }

  const processData = (resData) => {
    // Initialize the live status to false
    let live = false
    const currentTime = new Date()

    // Check if there is data and if the first entry has a date_time
    if (resData?.length > 0 && resData[0]?.date_time) {
      const resDataTime = new Date(resData[0]?.date_time)
      const diffInMs = currentTime - resDataTime
      const diffInMinutes = diffInMs / (1000 * 60)

      // If the difference is 1 minute or less, set live to true
      if (diffInMinutes <= 1) {
        live = true
      }
    }

    // Update the live status and live data
    setLive(live)
    if (live == true) {
      setLiveData(resData[0])
    }

    // Reset the roulette data counts
    for (let i in tempRoulleteData) {
      tempRoulleteData[i].number = 0
    }

    // Initialize counters for red and black numbers
    let red = 0
    let black = 0

    // Iterate through the roulette data and update counts
    for (let j = 0; j < tempRoulleteData.length; j++) {
      for (let i = 0; i < resData?.length; i++) {
        if (resData[i]?.winning_number == tempRoulleteData[j].name) {
          tempRoulleteData[j].number++
          if (tempRoulleteData[j].color == 'red' && tempRoulleteData[j].name != '0') {
            red++
          }
          if (tempRoulleteData[j].color == 'black' && tempRoulleteData[j].name != '0') {
            black++
          }
        }
      }
    }

    // Extract the numbers from the roulette data for standard deviation calculation
    let extractedNumbers = []
    for (let i in tempRoulleteData) {
      extractedNumbers.push(tempRoulleteData[i].number)
    }

    // Calculate the mean of the extracted numbers
    const mean = extractedNumbers?.reduce((sum, value) => sum + value, 0) / 37

    // Calculate the variance
    const variance =
      extractedNumbers?.reduce((sum, value) => {
        return sum + Math.pow(value - mean, 2)
      }, 0) /
      (37 - 1)

    // Calculate the standard deviation
    const tempStandardDeviation = Math.sqrt(variance)
    setSDaviation(extractedNumbers)
    setStandardDeviation(variance?.toFixed(2))

    // Update the state with the processed data
    setData(resData)
    setRouletteData(tempRoulleteData)
    setRedTotal(red)
    setBlackTotal(black)
    setRedBlackTotal(red + black)
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
    //if (data) console.log('data: ', data)
    //if (rouletteData) console.log('rouletteData: ', rouletteData)
  }, [data, rouletteData])

  const config = { threshold: 0.1 }

  let observer = new IntersectionObserver(function (entries, self) {
    let targets = entries.map((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target)
        return entry.target
      }
    })

    // Call our animation function
    fadeIn(targets)
  }, config)

  document.querySelectorAll('.box').forEach((box) => {
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

  return (
    <>
      <div
        className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 d-flex justify-content-center`}
      >
        <div className={`fade-in  ${s.main} w-100`}>
          <div className={'fade-in'}>
            <h3 className="text-center text-shadow capitalize poppins-400">
              {table_limit_name ? table_limit_name : 'Title'}
            </h3>
          </div>
          <div className={`${display == 'data' ? '' : 'd-none'}`}>
            <div className="row   poppins-400">
              <div className={` col-12 col-lg-7  form d-flex flex-column`}>
                <div
                  className={`w-100 border h-100 rounded border-0 px-1 box  ${s.opacity}  ${themeBorder} shadow-s`}
                >
                  <div
                    className={`d-flex align-items-center px-3 py-2 border-bottom border-opacity-25 ${theme == 'dark' ? 'border-secondary' : ''} mb-1 `}
                  >
                    {/* Dot */}
                    <div className="d-flex poppins-500 gap-1 ">
                      <div
                        className={`d-flex   align-items-center ${live == true ? `d-block` : `d-none`}`}
                      >
                        <div
                          className={`me-2 bg-success shadow-s rounded-circle `}
                          style={{
                            height: '10px',
                            width: '10px',
                          }}
                        ></div>
                        <div className="font10 text-shadow opacity-75"> Live</div>
                      </div>
                      <div
                        className={`d-flex   align-items-center ${live == false ? `d-block` : `d-none`}`}
                      >
                        <div
                          className={`me-2 bg-danger shadow-s rounded-circle `}
                          style={{
                            height: '10px',
                            width: '10px',
                          }}
                        ></div>
                        <div className="font10 poppins-700 text-shadow text-danger opacity-75">
                          Inactive{' '}
                        </div>
                      </div>
                    </div>
                    <div className={`mx-auto w-100 `}></div>
                  </div>

                  <div className={`w-100    `}>
                    <div
                      className={`row p-1 gx-1 font14  ${theme === 'light' ? 'poppins-500' : 'poppins-400'}  `}
                    >
                      <div className={`col-12  col-xl-3   `}>Live Data</div>
                      <div className={`col-6 col-md-6 col-lg-4 col-xl-3  fontText  `}>
                        <div
                          className={`w-100  rounded-1 border ${theme === 'light' ? 'border-secondary' : 'border-dark'} border-opacity-25 py-1   h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                        >
                          Warning Flag :
                          {liveData?.warning_flags == null ? (
                            <span>-</span>
                          ) : (
                            <span>{liveData?.warning_flags}</span>
                          )}
                        </div>
                      </div>
                      <div className={`col-6 col-md-6 col-lg-4 col-xl-3  fontText  `}>
                        <div
                          className={`w-100  rounded-1 border ${theme === 'light' ? 'border-secondary' : 'border-dark'} border-opacity-25 py-1   h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                        >
                          Spin No :{' '}
                          {liveData?.spine_numeric == null ? (
                            <span>-</span>
                          ) : (
                            <span>{liveData?.spine_numeric}</span>
                          )}
                        </div>
                      </div>

                      <div className={`col-6 col-md-6 col-lg-4 col-xl-3  fontText pt-1 pt-lg-0 `}>
                        <div
                          className={`w-100  rounded-1 border ${theme === 'light' ? 'border-secondary' : 'border-dark'} border-opacity-25  py-lg-1   h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                        >
                          Speed :{' '}
                          {liveData?.wheel_speed == null ? (
                            <span>-</span>
                          ) : (
                            <span>{liveData?.wheel_speed}</span>
                          )}
                        </div>
                      </div>
                      <div className={`col-6 col-md-6 col-lg-4   mt-1 fontText  `}>
                        <div
                          className={`w-100  rounded-1 border ${theme === 'light' ? 'border-secondary' : 'border-dark'} border-opacity-25 py-1   h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                        >
                          Date :
                          {liveData?.date_time == null ? (
                            <span> -</span>
                          ) : (
                            <span>{liveData?.date_time.slice(0, 19)}</span>
                          )}
                        </div>
                      </div>
                      <div className={`col-6 col-md-6 col-lg-4   mt-1 fontText  `}>
                        <div
                          className={`w-100  rounded-1 border ${theme === 'light' ? 'border-secondary' : 'border-dark'} border-opacity-25 py-1   h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                        >
                          Winning No :{' '}
                          {liveData?.winning_number == null ? (
                            <span>-</span>
                          ) : (
                            <span>{liveData?.winning_number}</span>
                          )}
                        </div>
                      </div>
                      <div className={`col-6 col-md-6 col-lg-4   mt-1 fontText  `}>
                        <div
                          className={`w-100  rounded-1 border ${theme === 'light' ? 'border-secondary' : 'border-dark'} border-opacity-25 py-1   h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                        >
                          Direction :{' '}
                          {liveData?.wheel_direction == null ? (
                            <span>-</span>
                          ) : (
                            <span>
                              {liveData?.wheel_direction == 1
                                ? ' 1 Anti Clock wise'
                                : '0 Clock Wise'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`row p-1 gx-1 `}>
                      <div
                        className={`col-12  d-flex justify-content-between border-bottom py-2 border-top border-secondary border-opacity-25 `}
                      >
                        <div
                          className={`font14 poppins-500 d-flex justify-content-center align-items-center `}
                        >
                          <div>Search Data</div>
                        </div>
                        <div className="gap-2 fontText poppins-500  w-75 d-flex flex-wrap justify-content-between align-items-center ">
                          <div className={`d-flex gap-2`}>
                            <lable> 100</lable>
                            <input
                              className="pointer text-dark "
                              type="radio"
                              value={'100'}
                              name="searchBy"
                              id="searchByDate"
                              onChange={(e) => setLimit(e.target.value)}
                            />
                          </div>
                          <div className={`d-flex gap-2`}>
                            <lable> 500</lable>
                            <input
                              className="pointer text-dark "
                              type="radio"
                              value={'500'}
                              name="searchBy"
                              id="searchByDate"
                              onChange={(e) => setLimit(e.target.value)}
                            />
                          </div>
                          <div className={`d-flex gap-2`}>
                            <lable> 1000</lable>
                            <input
                              className="pointer text-dark "
                              type="radio"
                              value={'1000'}
                              name="searchBy"
                              id="searchByDate"
                              onChange={(e) => setLimit(e.target.value)}
                            />
                          </div>
                          <></>
                          <button
                            className="btn btn-primary bg-gradient btn-sm  fontText"
                            type="button"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                      <div
                        className={`col-12  d-flex justify-content-between border-bottom py-2 border-secondary border-opacity-25 `}
                      >
                        <div className={`font14 poppins-500  `}>
                          <div>Custome Search</div>
                        </div>
                        <div className="gap-2 fontText poppins-500  w-75 d-flex justify-content-end gap-3 align-items-center ">
                          <div className={``}>
                            <input
                              className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}  `}
                              type="number"
                              placeholder="Enter Number Of Games"
                              onChange={(e) => setCustomLimit(e.target.value)}
                            />
                          </div>
                          <div className={``}>
                            <button
                              className="btn btn-primary bg-gradient btn-sm  fontText"
                              type="button"
                              onClick={() => getGameDataByLimit()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`col-12  d-flex flex-column flex-sm-row justify-content-between  py-2 border-secondary border-opacity-25 `}
                      >
                        <div className={`font14 poppins-500 mb-2 mb-sm-0 `}>
                          <div>Search By Date</div>
                        </div>
                        <div
                          className={`
                          gap-2
                        fontText
                        poppins-500
                        
                        d-flex
                        flex-sm-row
                        flex-column
                        flex-wrap
                        justify-content-end
                        gap-3
                        align-items-sm-center
                        align-items-end
                      `}
                        >
                          <div className={``}>
                            <div className={`input-group input-group-sm`}>
                              <span
                                className={`input-group-text font12 bg-${theme} ${themeBorder}`}
                                id="inputGroup-sizing-sm"
                              >
                                From
                              </span>
                              <input
                                style={{ maxWidth: '150px' }}
                                type="datetime-local"
                                className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={(e) => setFromDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="">
                            <div className="input-group input-group-sm ">
                              <span
                                className={`input-group-text font12 bg-${theme} ${themeBorder}`}
                                id="inputGroup-sizing-sm"
                              >
                                To
                              </span>
                              <input
                                style={{ maxWidth: '150px' }}
                                type="datetime-local"
                                className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}`}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={(e) => setToDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="">
                            <button
                              className={`btn btn-primary bg-gradient btn-sm fontText`}
                              type="button"
                              onClick={() => getGameDataByDate()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-100  mt-3 px-2  rounded poppins-500 shadow-s box  ${s.opacity}   ${themeBorder}`}
                >
                  <div className="">
                    <div className={`w-100 border-bottom border-secondary border-opacity-25 px-2 `}>
                      <div className="d-flex justify-content-evenly fontSubHeading my-1">
                        <div
                          className={`pointer font14 ${statistics == 'WheelPocketStatistics' ? 'border-bottom' : 'border-0'}`}
                          onClick={() => setStatistics('WheelPocketStatistics')}
                        >
                          Wheel & Pocket Statistics
                        </div>
                        <div
                          className={`pointer font14 ${statistics == 'DropZoneStatistics' ? 'border-bottom' : 'border-0'}`}
                          onClick={() => setStatistics('DropZoneStatistics')}
                        >
                          Drop Zone Statistics
                        </div>
                        <div
                          className={`pointer font14 ${statistics == 'WinStatistics' ? 'border-bottom' : 'border-0'}`}
                          onClick={() => setStatistics('WinStatistics')}
                        >
                          Win Statistics
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-100  d-flex justify-content-center gap-2 align-items-center  ${statistics == 'WheelPocketStatistics' ? 'd-block' : 'd-none'}   py-2 `}
                      style={{ minHeight: '127px' }}
                    >
                      <WheelPocketStatistics
                        data={data}
                        rouletteData={rouletteData}
                        standardDeviation={standardDeviation}
                      />
                    </div>

                    <div
                      className={`w-100 h-100 d-flex justify-content-center gap-2 align-items-center font10 ${statistics == 'DropZoneStatistics' ? 'd-block' : 'd-none'}  poppins-300 py-2 `}
                      style={{ minHeight: '127px' }}
                    >
                      <DropZoneStatistics
                        data={data}
                        rouletteData={rouletteData}
                        standardDeviation={standardDeviation}
                      />
                    </div>
                    <div
                      className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font10 ${statistics == 'WinStatistics' ? 'd-block' : 'd-none'}  poppins-300 py-2 `}
                      style={{ minHeight: '127px' }}
                    >
                      <WinStatistics
                        data={data}
                        red={redTotal}
                        black={blackTotal}
                        redBlackTotal={redBlackTotal}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}

              <div
                className={`col-lg-5 mt-3 mt-lg-0  position-relative  p-3 box ${s.opacity + ' ' + s.roullet_wheel_container}   `}
              >
                <div
                  className={`position-absolute  overflow-hidden  top-0 start-0 ${'bg-' + theme} bg-gradient shadow-s  p-2    rounded w-100 h-100 d-flex justify-content-center align-items-center`}
                >
                  <img
                    src={roulleteWheel}
                    alt=""
                    className={`borde-success object-fit-contain  drop_shadow  ${s.roullet_wheel}`}
                  />
                </div>

                <div
                  key={renderKey}
                  className={`w-100  py-2  bg-light  h-100 d-flex justify-content-center align-items-center `}
                >
                  <RadarChartComponent data={rouletteData} />
                </div>
              </div>
            </div>
            <div className={`row my-3   h-100`}>
              <div className={`col-12 col-xxl-7    box ${s.opacity}`}>
                <div
                  className={`w-100  rounded ${'bg-' + theme} bg-gradient  shadow-s   h-100 px-1`}
                >
                  <div className="w-100 border-bottom border-secondary  border-opacity-50 px-3 py-1 poppins-500">
                    <div>Graph</div>
                  </div>
                  <div className="w-100  d-flex justify-content-start justify-content-lg-center overflow-x-auto align-items-center  h-100  pe-4 pb-2">
                    <div minWidth="600px"></div>
                    <BarChartComponent data={rouletteData} />
                  </div>
                </div>
              </div>
              <div
                className={`col-xxl-5 col-0 d-none d-xxl-block   p-0  min-vh-50 box ${s.opacity}`}
              >
                <DataTableComponent data={data} />
              </div>
            </div>
            <div className={` my-3 mt-5 mt-lg-0 w-100  h-100`}>
              <div className={`box    w-100 ${s.opacity}`}>
                <div className="w-100 ">
                  <DataTableComponent2 data={data} />
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

export default RouletteDashboard
