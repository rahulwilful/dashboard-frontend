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
import ShowHouseCards from './ThreeCardPokerDashboardComponents/ShowHouseCards'
import ShowPlayerCards from './ThreeCardPokerDashboardComponents/ShowPlayerCards'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

const ThreeCardPokerDashboard = () => {
  const theme = useSelector((theme) => theme?.theme)

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
  const [houseCards, setHouseCards] = useState([])
  const [communityCards, setCommunityCards] = useState([])
  const [showCommunityCards, setShowCommunityCards] = useState(false)
  const [player1cards, setPlayer1Cards] = useState([])
  const [player2cards, setPlayer2Cards] = useState([])
  const [player3cards, setPlayer3Cards] = useState([])
  const [player4cards, setPlayer4Cards] = useState([])
  const [player5cards, setPlayer5Cards] = useState([])
  const [player6cards, setPlayer6Cards] = useState([])
  const [player7cards, setPlayer7Cards] = useState([])
  const [player1Win, setPlayer1Win] = useState(false)
  const [player2Win, setPlayer2Win] = useState(false)
  const [player3Win, setPlayer3Win] = useState(false)
  const [player4Win, setPlayer4Win] = useState(false)
  const [player5Win, setPlayer5Win] = useState(false)
  const [player6Win, setPlayer6Win] = useState(false)
  const [player7Win, setPlayer7Win] = useState(false)

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs  ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark bg-gradient  bg-opacity-25  text-light border-secondary   border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border `,
    )
  }, [theme])

  useEffect(() => {
    console.log('display: ', display)
  }, [display])

  useEffect(() => {
    getGameData()
    axiosClient.delete(`/game/older-than`)
    console.log('game:- ', game)
  }, [game_type_id, table_limit_id])

  useEffect(() => {
    console.log('display:- ', display)
  }, [display])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (localStorage.getItem('threeCardPokerCallOnTimeInterval') === 'true') {
        // getGameData(limit)
        //checkLive(limit)
      }
    }, 10000)

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [limit])

  const checkLive = async (limitParam) => {
    //  console.log('getGameData: ', limitParam)
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(
        `/game/get/3_card_poker/${game_type_id}/${table_limit_id}/${limit}`,
      )
      //setShoePlayerBankerComponent(false)
      //processData(res.data.result)
      let data = res?.data?.result
      // setUpdatedData(res.data.result)
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

      console.log('live status: ', live)
      setLive(live)

      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
      setRenderKey(renderKey + 1)
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }

    localStorage.setItem('threeCardPokerCallOnTimeInterval', true)
  }

  const updateData = () => {
    window.location.reload()
    showToast('Data updated successfully', 'success')
  }

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    try {
      const res = await axiosClient.get(
        `/game/get/3_card_poker/${game_type_id}/${table_limit_id}/${limit}`,
      )
      console.log('response: ', res.data.result)
      let data = res?.data?.result
      console.log('response: ', data)
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
      processData(res.data.result)

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
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
        setDisplay('nodata')
      }
    } catch (err) {
      console.log('err: ', err)
      setDisplay('nodata')
    }
    localStorage.setItem('threeCardPokerCallOnTimeInterval', true)
  }

  /**
   * Processes the data received from the API to update the state variables.
   *
   * @param {Array} resData - The data received from the API.
   */
  const processData = (resData) => {
    console.log('data for process: ', resData)
    setOriginalData(resData)

    let live = false
    const currentTime = new Date()

    // Check if the connection is live based on the date_time of the first entry
    if (resData?.length > 0 && resData[0]?.date_time) {
      const resDataTime = new Date(resData[0]?.date_time)
      const diffInMs = currentTime - resDataTime
      const diffInMinutes = diffInMs / (1000 * 60)

      // Set live to true if the difference is 1 minute or less
      if (diffInMinutes <= 1) {
        live = true
      }
    }

    console.log('live status: ', live, ' data.length: ', data?.length)

    // If data is already loaded and the connection is not live, return early
    if (data?.length > 0 && !live) {
      return
    }

    setLive(live)

    // If live, update live data
    if (live) {
      setLiveData(resData[0])
    }

    // Set the current winners based on the first entry
    setCurrentWinners(resData[0]?.winner?.split(','))

    let player1wins = 0
    let player2wins = 0
    let player3wins = 0
    let player4wins = 0
    let player5wins = 0
    let player6wins = 0
    let player7wins = 0

    // Count player wins and split cards
    for (let i in resData) {
      if (resData[i]?.community_cards?.length > 0) setShowCommunityCards(true)
      const splittedWinners = resData[i]?.winner?.split(',')

      if (splittedWinners[0] && splittedWinners[0] == '1') player1wins++
      if (splittedWinners[1] && splittedWinners[1] == '1') player2wins++
      if (splittedWinners[2] && splittedWinners[2] == '1') player3wins++
      if (splittedWinners[3] && splittedWinners[3] == '1') player4wins++
      if (splittedWinners[4] && splittedWinners[4] == '1') player5wins++
      if (splittedWinners[5] && splittedWinners[5] == '1') player6wins++
      if (splittedWinners[6] && splittedWinners[6] == '1') player7wins++
    }

    // Split cards for the first entry
    handleSpliteCards(resData[0])

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

  /**
   * Splits the cards from the data and updates the state variables.
   *
   * @param {Object} data - The data containing the cards for house, community, and players.
   */
  const handleSpliteCards = (data) => {
    let houseCards = []
    let extraHouseCards = []
    let player1cards = []
    let player2cards = []
    let player3cards = []
    let player4cards = []
    let player5cards = []
    let player6cards = []
    let player7cards = []

    // Split the cards for house, community, and players
    let splittedHouseCards = data?.house_cards?.split(',')
    let splittedExtraHouseCards = data?.community_cards?.split(',')
    let splittedPlayer1Cards = data?.player1_cards?.split(',')
    let splittedPlayer2Cards = data?.player2_cards?.split(',')
    let splittedPlayer3Cards = data?.player3_cards?.split(',')
    let splittedPlayer4Cards = data?.player4_cards?.split(',')
    let splittedPlayer5Cards = data?.player5_cards?.split(',')
    let splittedPlayer6Cards = data?.player6_cards?.split(',')
    let splittedPlayer7Cards = data?.player7_cards?.split(',')

    // Remove any empty strings from the arrays
    splittedHouseCards = splittedHouseCards?.filter((card) => card != '')
    splittedExtraHouseCards = splittedExtraHouseCards?.filter((card) => card != '')
    splittedPlayer1Cards = splittedPlayer1Cards?.filter((card) => card != '')
    splittedPlayer2Cards = splittedPlayer2Cards?.filter((card) => card != '')
    splittedPlayer3Cards = splittedPlayer3Cards?.filter((card) => card != '')
    splittedPlayer4Cards = splittedPlayer4Cards?.filter((card) => card != '')
    splittedPlayer5Cards = splittedPlayer5Cards?.filter((card) => card != '')
    splittedPlayer6Cards = splittedPlayer6Cards?.filter((card) => card != '')
    splittedPlayer7Cards = splittedPlayer7Cards?.filter((card) => card != '')

    // Update the state variables with the split cards
    if (splittedHouseCards?.length > 0) houseCards = splittedHouseCards
    if (splittedExtraHouseCards?.length > 0) extraHouseCards = splittedExtraHouseCards
    if (splittedPlayer1Cards?.length > 0) player1cards = splittedPlayer1Cards
    if (splittedPlayer2Cards?.length > 0) player2cards = splittedPlayer2Cards
    if (splittedPlayer3Cards?.length > 0) player3cards = splittedPlayer3Cards
    if (splittedPlayer4Cards?.length > 0) player4cards = splittedPlayer4Cards
    if (splittedPlayer5Cards?.length > 0) player5cards = splittedPlayer5Cards
    if (splittedPlayer6Cards?.length > 0) player6cards = splittedPlayer6Cards
    if (splittedPlayer7Cards?.length > 0) player7cards = splittedPlayer7Cards

    console.log('extraHouseCards: ', extraHouseCards)

    // Set the state variables with the split cards
    setHouseCards(houseCards)
    setPlayer1Cards(player1cards)
    setPlayer2Cards(player2cards)
    setPlayer3Cards(player3cards)
    setPlayer4Cards(player4cards)
    setPlayer5Cards(player5cards)
    setPlayer6Cards(player6cards)
    setPlayer7Cards(player7cards)
    setCommunityCards(extraHouseCards)
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
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
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
      if (data?.length > 0) {
        setDisplay('data')
      }

      if (data?.length == 0) {
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
    // Log the original data for debugging
    console.log('originalData: ', originalData)

    // Check if the event is '+' for incrementing the index
    if (event === '+') {
      // Prevent incrementing if the index is already at the last element
      if (index === originalData?.length - 1) return
      // Increment index
      const tempIndex = index + 1
      setIndex(tempIndex)
      // Update the current winners state with the new index
      setCurrentWinners(originalData[tempIndex]?.winner?.split(','))
      // Split cards for the new index
      handleSpliteCards(originalData[tempIndex])
      // Log current data for debugging
      console.log('currentData', originalData[tempIndex]?.winner?.split(','))
    } else {
      // Prevent decrementing if the index is already at the first element
      if (index === 0) return
      // Decrement index
      const tempIndex = index - 1
      setIndex(tempIndex)
      // Update the current winners state with the new index
      setCurrentWinners(originalData[tempIndex]?.winner?.split(','))
      // Split cards for the new index
      handleSpliteCards(originalData[tempIndex])
    }
    // Update the render key to trigger re-render
    setRenderKey(renderKey + 1)
  }

  useEffect(() => {
    console.log('currentWinners : ', currentWinners)
    if (currentWinners?.length > 0) {
      if (currentWinners[0] == '1') setPlayer1Win(true)
      if (currentWinners[2] == '1') setPlayer2Win(true)
      if (currentWinners[3] == '1') setPlayer3Win(true)
      if (currentWinners[4] == '1') setPlayer4Win(true)
      if (currentWinners[5] == '1') setPlayer5Win(true)
      if (currentWinners[6] == '1') setPlayer6Win(true)
      if (currentWinners[7] == '1') setPlayer7Win(true)
    }
  }, [currentWinners])

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

  return (
    <>
      <div className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4   position_relative`}>
        <div className={`text-center text-shadow capitalize poppins-400`}>
          <h3> {table_limit_name ? table_limit_name : 'Title'}</h3>
        </div>
        <div className={`px-2 `}>
          <div className={`row    d-flex justify-content-center  `}>
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
        <div className={` ${display == 'data' ? '' : 'd-none'}`}>
          <div
            className={` mt-2  ${themeBorder} px-2 rounded bg-opacity-100 shadow-s position_top_sticky box ${s.opacity} `}
          >
            <div className={`d-flex justify-content-center align-items-center gap-3   py-1`}>
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
                {originalData?.length}/{index + 1}
              </div>
              <div className={``}>
                <button
                  onClick={() => handleIndexChange('+')}
                  type="button"
                  className={`btn btn-primary btn-sm ${index < originalData?.length - 1 ? '' : 'd-none'}`}
                >
                  <i className="bi bi-chevron-right  "></i>
                </button>
                <button
                  disabled
                  type="button"
                  className={`btn btn-primary btn-sm ${index >= originalData?.length - 1 ? '' : 'd-none'}`}
                >
                  <i className="bi bi-chevron-right "></i>
                </button>
              </div>
              <div className={``}>
                <div className={`d-flex gap-3 ${live ? 'text-light' : 'text-danger'}`}>
                  <div>{live ? 'Active' : 'Inactive'}</div>
                  <div>
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
            </div>
          </div>
          <div className={` py-2 mt-2`}>
            <div className={`row px-2 gy-2  `}>
              <div className={`col-12 col-sm-6 col-md-4 box ${s.opacity}   `}>
                <ShowHouseCards cards={houseCards} name="House Cards" win={'house'} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity} ${showCommunityCards ? '' : 'd-none'}   `}
              >
                <ShowHouseCards cards={communityCards} name="Community Cards" win={'community'} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player1cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player1cards} name="Player 1" win={currentWinners[0]} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player2cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player2cards} name="Player 2" win={currentWinners[1]} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player3cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player3cards} name="Player 3" win={currentWinners[2]} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player4cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player4cards} name="Player 4" win={currentWinners[3]} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player5cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player5cards} name="Player 5" win={currentWinners[4]} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player6cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player6cards} name="Player 6" win={currentWinners[5]} />
              </div>
              <div
                className={`col-12 col-sm-6 col-md-4 box ${s.opacity}  ${player7cards?.length == 0 ? 'd-none' : ''} `}
              >
                <ShowPlayerCards cards={player7cards} name="Player 7 " win={currentWinners[6]} />
              </div>
            </div>
          </div>
          <div className={`row mt-3`}>
            <div className={`col-12 col-lg-6  box ${s.opacity}`}>
              <div
                className={`  pt-3 pe-3 ${themeBorder} rounded-3 shadow-s h-100 d-flex align-items-center `}
              >
                <BarChartComponent data={data} />
              </div>
            </div>
            <div className={`col-12 col-lg-6  box ${s.opacity}`}>
              <div className={`  pt-3 pe-3 ${themeBorder} rounded-3 shadow-s`}>
                <PieChartComponent data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${display == 'nodata' ? '' : 'd-none'}`}>
        <NoDataFull />
      </div>
    </>
  )
}

export default ThreeCardPokerDashboard
