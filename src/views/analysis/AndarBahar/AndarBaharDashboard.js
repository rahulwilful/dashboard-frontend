import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../axiosClient'

import PieChartComponent from './AndarBaharDashboardComponents/PieChartComponent'
import PieChartComponent2 from './AndarBaharDashboardComponents/PieChartComponent2'
import DoughnutChartComponent from './AndarBaharDashboardComponents/DoughnutChartComponent'
import BarChartComponent from './AndarBaharDashboardComponents/BarChartComponent'

import { CardImages } from './AndarBaharDashboardComponents/AndarBaharData'

import cardImage from 'src/assets/images/baccarat/card.png'

import s from './AndarBaharDashboard.module.css'

import NoData from '../../NoData/NoData'
import NoDataFull from '../../NoData/NoDataFull'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/all'
import { CardImage } from 'react-bootstrap-icons'

import { GetCurrent } from '../../../getCurrent'

gsap.registerPlugin(CustomEase)

const AndarBaharDashboard = () => {
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theme)
  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()
  const [renderKey, setRenderKey] = useState(0)
  const [display, setDisplay] = useState('loading')

  const [data, setData] = useState([])
  const [index, setIndex] = useState(0)
  const [andarCards, setAndarCards] = useState([])
  const [baharCards, setBaharCards] = useState([])
  const [showDoughnutChart, setShowDoughnutChart] = useState(false)
  const [andarWinVsBaharWin, setAndarWinVsBaharWin] = useState([
    { name: 'andar', value: 0 },
    { name: 'bahar', value: 0 },
  ])

  const [andarShotWinVsBaharShotWin, setAndarShotWinVsBaharShotWin] = useState([
    { name: 'andarShot', value: 0 },
    { name: 'baharShoe', value: 0 },
  ])

  const [graphData, setGraphData] = useState([
    { name: 'andar', value: 0 },
    { name: 'bahar', value: 0 },
    { name: 'andarShot', value: 0 },
    { name: 'baharShoe', value: 0 },
  ])

  const [winner, setWinner] = useState('')
  const [jokerCard, setJokerCard] = useState('')
  const [jokerCardImage, setJokerCardImage] = useState(null)
  const [side_win, setSideWin] = useState('')
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

  const [currentGame, setCurrentGame] = useState()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    console.log('display: ', display)
  }, [display])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (localStorage.getItem('andarBaharCallOnTimeInterval') === 'true') {
        checkLive(limit)
      }
    }, 10000)

    return () => clearInterval(intervalId)
  }, [limit])

  const checkLive = async (limitParam) => {
    //  console.log('getGameData: ', limitParam)
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(
        `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${limit}`,
      )

      let data = res.data.result

      console.log('response: ', data)

      let live = false
      const currentTime = new Date()

      if (data.length > 0 && data[0].date_time) {
        const resDataTime = new Date(data[0].date_time)
        const diffInMs = currentTime - resDataTime
        const diffInMinutes = diffInMs / (1000 * 60)

        if (diffInMinutes <= 1) {
          live = true
        }
      }

      console.log('live status: ', live)
      setLive(live)

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

    localStorage.setItem('andarBaharCallOnTimeInterval', true)
  }

  const updateData = () => {
    window.location.reload()
    showToast('Data updated successfully', 'success')
  }

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

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(
        `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${limit}`,
      )
      //console.log('response: ', res.data.result)
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
      localStorage.setItem('andarBaharCallOnTimeInterval', true)
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }
  }

  const getCustomeGameDataByRadio = async (limitParam) => {
    setData([])
    const limitToUse = limitParam || limit

    try {
      const res = await axiosClient.get(
        `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${limitParam}`,
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
    localStorage.setItem('andarBaharCallOnTimeInterval', true)
  }

  const getCustomeGameData = async () => {
    setData([])
    try {
      const res = await axiosClient.get(
        `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${customLimit}`,
      )
      console.log('getCustomeGameDataByRadio response: ', res.data.result)
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

    localStorage.setItem('andarBaharCallOnTimeInterval', false)
  }

  const getGameDataByDate = async () => {
    //  console.log('fromDate ', fromDate, ' toDate ', toDate)
    setData([])
    console.log('first date: ', fromDate, 'second date: ', toDate)
    try {
      const res = await axiosClient.post(
        `/game/get/andar_bahar/${game_type_id}/${table_limit_id}`,
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

    localStorage.setItem('andarBaharCallOnTimeInterval', false)
  }

  const processData = (resData) => {
    // Initialize live status and get the current time
    let live = false
    const currentTime = new Date()

    // Check if the connection is live based on the date_time of the first entry
    if (resData.length > 0 && resData[0].date_time) {
      const resDataTime = new Date(resData[0].date_time)
      const diffInMs = currentTime - resDataTime
      const diffInMinutes = diffInMs / (1000 * 60)

      // Set live to true if the difference is 1 minute or less
      if (diffInMinutes <= 1) {
        live = true
      }
    }

    if (data.length > 0 && live == false) {
      return
    }
    setLive(live)

    // If live, update live data
    if (live == true) {
      setLiveData(resData[0])
    }

    // Initialize counters for Andar and Bahar wins and shots
    let andarTotal = 0
    let baharTotal = 0
    let andarShot = 0
    let baharShot = 0

    // Process each entry in resData to compute totals and split cards
    for (let i in resData) {
      const splittedAndar = resData[i].andar_cards.split(',')
      const splittedBahar = resData[i].bahar_cards.split(',')

      resData[i].splittedAndar = splittedAndar
      resData[i].splittedBahar = splittedBahar

      // Update win and shot counts based on winners
      if (resData[i].winner == 'A') andarTotal++
      if (resData[i].winner == 'B') baharTotal++
      if (resData[i].side_win == 'A') andarShot++
      if (resData[i].side_win == 'B') baharShot++
    }

    // Initialize streak tracking variables
    let streak = []
    let tempStreak = []
    let andarStreak = 0
    let baharStreak = 0
    let curWinner = resData[0].winner

    // Determine streaks of winners
    for (let i = 1; i < resData.length; i++) {
      if (curWinner == resData[i].winner) {
        tempStreak.push(curWinner)
      } else {
        if (tempStreak.length > 0) {
          streak.push(tempStreak)
          tempStreak = []
        }
        curWinner = resData[i].winner
      }
    }

    // Add remaining streak to the list if it exists
    if (tempStreak.length > 0) streak.push(tempStreak)

    // Count andar and bahar streaks
    for (let i in streak) {
      if (streak[i][0] == 'A') andarStreak++
      else baharStreak++
    }

    // Initialize temporary card arrays
    let tempAndarCards = resData[0].splittedAndar
    let tempAndarCards2 = []
    let tempBaharCards = resData[0].splittedBahar
    let tempBaharCards2 = []

    // Map card names to card images and positions for Andar cards
    for (let i in tempAndarCards) {
      if (i == 0) {
        for (let j in CardImages) {
          if (tempAndarCards[i] == CardImages[j].name) {
            tempAndarCards2.push({
              name: tempAndarCards[i],
              image: CardImages[j].card,
              position: 0,
            })
          }
        }
      } else {
        for (let j in CardImages) {
          if (tempAndarCards[i] == CardImages[j].name) {
            tempAndarCards2.push({
              name: tempAndarCards[i],
              image: CardImages[j].card,
              position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
            })
          }
        }
      }
    }

    // Map card names to card images and positions for Bahar cards
    for (let i in tempBaharCards) {
      if (i == 0) {
        for (let j in CardImages) {
          if (tempBaharCards[i] == CardImages[j].name) {
            tempBaharCards2.push({
              name: tempBaharCards[i],
              image: CardImages[j].card,
              position: 0,
            })
          }
        }
      } else {
        for (let j in CardImages) {
          if (tempBaharCards[i] == CardImages[j].name) {
            tempBaharCards2.push({
              name: tempBaharCards[i],
              image: CardImages[j].card,
              position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
            })
          }
        }
      }
    }

    // Show or hide the doughnut chart based on shot counts
    if (andarShot == 0 && baharShot == 0) {
      setShowDoughnutChart(false)
    } else {
      setShowDoughnutChart(true)
    }

    // Set the joker card image
    for (let i in CardImages) {
      if (CardImages[i].name == resData[0].joker_cards) {
        setJokerCardImage(CardImages[i].card)
      }
    }

    // Update state variables with processed data
    setIndex(0)
    setAndarCards(tempAndarCards2)
    setBaharCards(tempBaharCards2)
    setJokerCard(resData[0].joker_cards)
    setWinner(resData[0].winner)
    setSideWin(resData[0].side_win)
    setData(resData)
    localStorage.setItem('andarBaharDataLength', resData.length)
    setAndarWinVsBaharWin([
      { name: 'Andar ', value: andarTotal },
      { name: 'Bahar ', value: baharTotal },
    ])
    setAndarShotWinVsBaharShotWin([
      { name: 'Andar Shot', value: andarShot },
      { name: 'Bahar Shot', value: baharShot },
    ])
    setGraphData([
      { name: 'Andar ', value: andarTotal, color: 'rgb(36, 141, 92)' },
      { name: 'Bahar ', value: baharTotal, color: 'rgb(255, 43, 50)' },
      { name: 'Andar Shot', value: andarShot, color: 'rgb(36, 141, 92)' },
      { name: 'Bahar Shot', value: baharShot, color: 'rgb(255, 43, 50)' },
    ])
  }

  /**
   * Handles the change of the index to display the previous or next set of cards.
   *
   * @param {string} event - The event triggering the index change, either '+' for next or '-' for previous.
   */
  const handleIndexChange = (event) => {
    let tempAndarCards2 = []
    let tempBaharCards2 = []

    // Determine the new index based on the event
    if (event === '+') {
      const tempIndex = index + 1
      setIndex(tempIndex)

      // Get the Andar and Bahar cards for the new index
      let tempAndarCards = data[tempIndex].splittedAndar
      let tempBaharCards = data[tempIndex].splittedBahar

      // Map Andar cards to include image and position
      for (let i in tempAndarCards) {
        if (i == 0) {
          for (let j in CardImages) {
            if (tempAndarCards[i] == CardImages[j].name) {
              tempAndarCards2.push({
                name: tempAndarCards[i],
                image: CardImages[j].card,
                position: 0,
              })
            }
          }
        } else {
          for (let j in CardImages) {
            if (tempAndarCards[i] == CardImages[j].name) {
              tempAndarCards2.push({
                name: tempAndarCards[i],
                image: CardImages[j].card,
                position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
              })
            }
          }
        }
      }

      // Map Bahar cards to include image and position
      for (let i in tempBaharCards) {
        if (i == 0) {
          for (let j in CardImages) {
            if (tempBaharCards[i] == CardImages[j].name) {
              tempBaharCards2.push({
                name: tempBaharCards[i],
                image: CardImages[j].card,
                position: 0,
              })
            }
          }
        } else {
          for (let j in CardImages) {
            if (tempBaharCards[i] == CardImages[j].name) {
              tempBaharCards2.push({
                name: tempBaharCards[i],
                image: CardImages[j].card,
                position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
              })
            }
          }
        }
      }

      // Set the joker card image for the new index
      for (let i in CardImages) {
        if (CardImages[i].name == data[tempIndex].joker_cards) {
          setJokerCardImage(CardImages[i].card)
        }
      }

      // Update the winner and side win for the new index
      setWinner(data[tempIndex].winner)
      setJokerCard(data[tempIndex].joker_cards)
      setSideWin(data[tempIndex].side_win)
    } else {
      const tempIndex = index - 1
      setIndex(tempIndex)

      // Get the Andar and Bahar cards for the new index
      let tempAndarCards = data[tempIndex].splittedAndar
      let tempBaharCards = data[tempIndex].splittedBahar

      // Map Andar cards to include image and position
      for (let i in tempAndarCards) {
        if (i == 0) {
          for (let j in CardImages) {
            if (tempAndarCards[i] == CardImages[j].name) {
              tempAndarCards2.push({
                name: tempAndarCards[i],
                image: CardImages[j].card,
                position: 0,
              })
            }
          }
        } else {
          for (let j in CardImages) {
            if (tempAndarCards[i] == CardImages[j].name) {
              tempAndarCards2.push({
                name: tempAndarCards[i],
                image: CardImages[j].card,
                position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
              })
            }
          }
        }
      }

      // Map Bahar cards to include image and position
      for (let i in tempBaharCards) {
        if (i == 0) {
          for (let j in CardImages) {
            if (tempBaharCards[i] == CardImages[j].name) {
              tempBaharCards2.push({
                name: tempBaharCards[i],
                image: CardImages[j].card,
                position: 0,
              })
            }
          }
        } else {
          for (let j in CardImages) {
            if (tempBaharCards[i] == CardImages[j].name) {
              tempBaharCards2.push({
                name: tempBaharCards[i],
                image: CardImages[j].card,
                position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
              })
            }
          }
        }
      }

      // Set the joker card image for the new index
      for (let i in CardImages) {
        if (CardImages[i].name == data[tempIndex].joker_cards) {
          setJokerCardImage(CardImages[i].card)
        }
      }

      // Update the winner and side win for the new index
      setWinner(data[tempIndex].winner)
      setJokerCard(data[tempIndex].joker_cards)
      setSideWin(data[tempIndex].side_win)
    }

    // Update the state with the new Andar and Bahar cards
    setAndarCards(tempAndarCards2)
    setBaharCards(tempBaharCards2)
  }

  useEffect(() => {
    //  console.log('andarCards: ', andarCards)
    //  console.log('baharCards: ', baharCards)
  }, [andarCards, baharCards])

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
    gsap.from('.animateAndar', {
      opacity: 0,
      x: -53,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.1,
    })
  }, [andarCards])
  useEffect(() => {
    gsap.from('.animateBahar', {
      opacity: 0,
      x: -53,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.1,
    })
  }, [baharCards])

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
    <div className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 `}>
      <div className={``}>
        <div className={``}>
          <h3 className="text-center text-shadow capitalize">
            {' '}
            {table_limit_name ? table_limit_name : 'Title'}
          </h3>
        </div>

        <div className={`px-2`}>
          <div className={`row    d-flex justify-content-center`}>
            <div
              className={`  col-12 col-md-10 col-xxl-12 border-0 shadow-s poppins-500 box ${s.opacity} ${themeClass} bg-gradient py-2 rounded`}
            >
              <div className={`row gx-1 gy-2 `}>
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
                      {/*   <div className={`w-100 `}>
                          <input
                            className={`form-control font12 form-control-sm ${s.placeholder_grey} bg-${theme} ${themeBorder}  `}
                            type="number"
                            placeholder="From Shoe"
                        
                          />
                        </div> */}
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

        <div className={`${display == 'data' ? '' : 'd-none'} `}>
          <div className={`mt-3`}>
            <div className={`row g-3   align-items-stretch`}>
              <div className={`col-12 col-md-5 box ${s.opacity}`}>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div
                  className={`${andarCards.length > 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded  ${themeBorder} `}
                >
                  <div
                    className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                  >
                    <div className={``}>
                      {' '}
                      <span
                        className={`bg-gradient bg-primary text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                      >
                        Andar
                      </span>
                    </div>
                  </div>
                  <div className={``}>
                    <div
                      className={`  d-flex position-relative justify-content-start align-items-center overflow-x-auto `}
                      style={{ height: '240px', position: 'relative', width: '100%' }}
                      key={index}
                    >
                      {andarCards.length > 0 && andarCards[0].position !== undefined ? (
                        andarCards.map((card, i) => (
                          <div
                            key={i}
                            className={`animateAndar `}
                            style={{
                              position: 'absolute',
                              left: `${card.position}rem`,
                            }}
                          >
                            <div className={`px-2`}>
                              <div className={``}>{}</div>
                            </div>
                            <div className={``}>
                              <img
                                src={card.image}
                                alt=""
                                className={`${theme == 'dark' ? 'card_drop_shadow_dark' : 'card_drop_shadow_light'}`}
                                style={{ height: '200px', transform: 'rotateY(15deg)' }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No cards available</p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${andarCards.length == 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded  ${themeBorder} `}
                >
                  <div
                    className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                  >
                    <div className={``}>
                      {' '}
                      <span
                        className={`bg-gradient bg-primary text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                      >
                        Andar
                      </span>
                    </div>
                  </div>
                  <div className={``}>
                    <div
                      className={`  d-flex position-relative justify-content-start align-items-center overflow-x-auto `}
                      style={{ height: '240px', position: 'relative', width: '100%' }}
                      key={index}
                    >
                      <div className={` h-100  w-100`}>
                        <div
                          className={`d-flex justify-content-center align-items-center`}
                          style={{ height: '200px' }}
                        >
                          <NoData />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

              <div className={`col-12 col-md-2  align-items-stretch box ${s.opacity}`}>
                <div
                  className={` shadow-s px-2 pb-2 rounded  h-100 d-flex flex-column  justify-content-center align-items-center  ${themeBorder}`}
                >
                  <div className={`w-100`}>
                    <div
                      className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                    >
                      {' '}
                      <span
                        className={`bg-gradient bg-warning text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                      >
                        Joker
                      </span>
                    </div>
                  </div>
                  <div
                    className={` h-100 d-flex flex-column  justify-content-center align-items-center `}
                  >
                    <div
                      className={`d-flex justify-content-start justify-content-md-center align-items-center `}
                    >
                      <div className={`${jokerCard ? '' : 'd-none'}`} style={{ maxWidth: '130px' }}>
                        <img
                          src={jokerCardImage}
                          alt=""
                          className={`${theme == 'dark' ? 'card_drop_shadow_dark' : 'card_drop_shadow_light'}`}
                          style={{ width: '100%', transform: 'rotateY(15deg)' }}
                        />
                      </div>
                      <div
                        className={`${!jokerCard ? '' : 'd-none'}`}
                        style={{ maxWidth: '130px' }}
                      >
                        <div className={``}>
                          <NoData />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

              <div className={`col-12 col-md-5 box ${s.opacity}`}>
                <div
                  className={`${baharCards.length > 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded    ${themeBorder} `}
                >
                  <div className={``}>
                    <div
                      className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                    >
                      {' '}
                      <span
                        className={`bg-gradient bg-danger text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                      >
                        Bahar
                      </span>
                    </div>
                  </div>
                  <div
                    className={`  d-flex position-relative justify-content-start align-items-center overflow-x-auto `}
                    style={{ height: '240px', position: 'relative', width: '100%' }}
                    key={index}
                  >
                    {baharCards.length > 0 && baharCards[0].position !== undefined ? (
                      baharCards.map((card, i) => (
                        <div
                          key={i}
                          className={`animateBahar `}
                          style={{
                            position: 'absolute',
                            left: `${card.position}rem`,
                          }}
                        >
                          <div className={`px-2`}>
                            <div className={``}>{}</div>
                          </div>
                          <img
                            src={card.image}
                            alt=""
                            className={`${theme == 'dark' ? 'card_drop_shadow_dark' : 'card_drop_shadow_light'}`}
                            style={{ height: '200px', transform: 'rotateY(15deg)' }}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No cards available</p>
                    )}
                  </div>
                </div>
                <div
                  className={`${baharCards.length == 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded  ${themeBorder} `}
                >
                  <div
                    className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                  >
                    <div className={``}>
                      {' '}
                      <span
                        className={`bg-gradient bg-danger text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                      >
                        Bahar
                      </span>
                    </div>
                  </div>
                  <div className={``}>
                    <div
                      className={`  d-flex position-relative justify-content-start align-items-center overflow-x-auto `}
                      style={{ height: '240px', position: 'relative', width: '100%' }}
                      key={index}
                    >
                      <div className={` h-100  w-100`}>
                        <div
                          className={`d-flex justify-content-center align-items-center`}
                          style={{ height: '200px' }}
                        >
                          <NoData />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            </div>
          </div>

          <div className={`mt-3 box  ${s.opacity}`}>
            <div
              className={`text-light d-flex w-100 py-1 justify-content-center gap-2 align-items-center font12 ${themeBorder} shadow-s  rounded `}
            >
              <div className={`fontTextHeading  poppins-500`}>
                winner :{' '}
                <span
                  className={`bg-gradient bg-primary text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${winner == 'A' ? '' : 'd-none'}`}
                >
                  Andar
                </span>
                <span
                  className={`bg-gradient bg-danger text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${winner == 'B' ? '' : 'd-none'}`}
                >
                  Bahar
                </span>
              </div>
              <div className={`fontTextHeading  poppins-500`}>
                Side Win :{' '}
                <span
                  className={`bg-gradient bg-primary text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${side_win == 'A' ? '' : 'd-none'}`}
                >
                  Andar
                </span>
                <span
                  className={`bg-gradient bg-danger text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${side_win == 'B' ? '' : 'd-none'}`}
                >
                  Bahar
                </span>
                <span
                  className={`bg-gradient bg-dark text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${side_win == '' ? '' : 'd-none'}`}
                >
                  -----
                </span>
              </div>
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
                {data.length}/{index + 1}
              </div>
              <div className={``}>
                <button
                  onClick={() => handleIndexChange('+')}
                  type="button"
                  className={`btn btn-primary btn-sm ${index < data.length - 1 ? '' : 'd-none'}`}
                >
                  <i className="bi bi-chevron-right  "></i>
                </button>
                <button
                  disabled
                  type="button"
                  className={`btn btn-primary btn-sm ${index >= data.length - 1 ? '' : 'd-none'}`}
                >
                  <i className="bi bi-chevron-right "></i>
                </button>
              </div>
              <div
                className={`fontTextHeading  poppins-500  d-flex justify-content-center align-items-center gap-2 ${live ? 'text-ligt' : 'text-danger'}`}
              >
                <div className={``}>Active</div>
                <span
                  className={`rounded-circle d-flex justify-content-center    ${live ? 'bg-success' : 'bg-danger disabled'} text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25 pointer`}
                  disabled={!live}
                  onClick={live ? updateData : null}
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </span>
              </div>
            </div>
          </div>

          <div className={``}>
            <div className={``}>
              <div className={`mt-2`}>
                <div className={`row  py-2 gx-3 `}>
                  <div className={` col-12 col-md-4 box ${s.opacity}`}>
                    <div className={`rounded shadow-s ${themeBorder}`}>
                      <DoughnutChartComponent doughnutData={andarWinVsBaharWin} />
                    </div>
                  </div>
                  <div className={` col-12 col-md-4  box ${s.opacity}`}>
                    <div
                      className={`rounded shadow-s ${themeBorder} ${showDoughnutChart ? '' : 'd-none'} `}
                    >
                      <DoughnutChartComponent doughnutData={andarShotWinVsBaharShotWin} />
                    </div>
                    <div
                      className={`rounded h-100 d-flex justify-content-center align-items-center shadow-s ${themeBorder} ${showDoughnutChart ? 'd-none' : ''} `}
                    >
                      <NoData />
                    </div>
                  </div>
                  <div className={` col-12 col-md-4  box ${s.opacity}`}>
                    <div className={`rounded shadow-s ${themeBorder} `}>
                      <DoughnutChartComponent doughnutData={graphData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-2  rounded  shadow-s ${themeBorder}  bg-gradient box ${s.opacity}`}>
              <div className={`py-1 row    d-flex justify-content-center `}>
                <div className={`col-12 col-sm-10 h-100 mt-2`}>
                  <div className={``} key={renderKey}>
                    <BarChartComponent graphData={graphData} />
                  </div>
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
  )
}

export default AndarBaharDashboard
