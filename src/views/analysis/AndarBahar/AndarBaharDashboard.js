import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../axiosClient'

import PieChartComponent from './AndarBaharDashboardComponents/PieChartComponent'
import PieChartComponent2 from './AndarBaharDashboardComponents/PieChartComponent2'
import DoughnutChartComponent from './AndarBaharDashboardComponents/DoughnutChartComponent'
import BarChartComponent from './AndarBaharDashboardComponents/BarChartComponent'

import cardImage from 'src/assets/images/baccarat/card.png'

import s from './AndarBaharDashboard.module.css'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/all'
import { CardImage } from 'react-bootstrap-icons'

gsap.registerPlugin(CustomEase)

const AndarBaharDashboard = () => {
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theme)
  const [renderKey, setRenderKey] = useState(0)

  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()

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
    const intervalId = setInterval(() => {
      if (localStorage.getItem('baccaratCallOnTimeInterval') === 'true') {
        //getGameData(limit)
      }
    }, 2000)

    return () => clearInterval(intervalId)
  }, [limit])

  useEffect( () => {
   /*  getCurrent().then(()=>{
      getGameData(100)
    }) */
      getGameData(100)
    // Ensure the current limit is passed
  }, [])

  const  getCurrent = async ()=>{
    console.log("called getCurrent")
  
    try{
      const res = await axiosClient.get(`/user/get/current`)
    ////  console.log('res.data.result: ', res)
      if(!res){
        navigate('/login')
      }
    
    }catch(err){
      console.log("error: ",err)
      navigate('/login')
  
    }
    return
    
  }

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    const res = await axiosClient.get(
      `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${limit}`,
    )
    processData(res.data.result)
    setRenderKey(renderKey + 1)
    localStorage.setItem('callOnTimeInterval', true)
  }

  const processData = (resData) => {
    //console.log('tempRoulleteData: ', tempRoulleteData)

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

  //  console.log('live status: ', live)
    setLive(live)
    if (live == true) {
      setLiveData(resData[0])
    }

    let andarTotal = 0
    let baharTotal = 0
    let andarShot = 0
    let baharShot = 0

    for (let i in resData) {
      const splittedAndar = resData[i].andar_cards.split(',')
      const splittedBahar = resData[i].bahar_cards.split(',')

      resData[i].splittedAndar = splittedAndar
      resData[i].splittedBahar = splittedBahar

      if (resData[i].winner == 'A') andarTotal++
      if (resData[i].winner == 'B') baharTotal++
      if (resData[i].side_win == 'A') andarShot++
      if (resData[i].side_win == 'B') baharShot++
    }

    let streak = []
    let tempStreak = []
    let andarStreak = 0
    let baharStreak = 0
    let curWinner = resData[0].winner
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

    if (tempStreak.length > 0) streak.push(tempStreak)

    for (let i in streak) {
      if (streak[i][0] == 'A') andarStreak++
      else baharStreak++
    }

    let tempAndarCards = resData[0].splittedAndar
    let tempAndarCards2 = []
    let tempBaharCards = resData[0].splittedBahar
    let tempBaharCards2 = []

    for (let i in tempAndarCards) {
      if (i == 0) {
        tempAndarCards2.push({ name: tempAndarCards[i], image: cardImage, position: 0 })
      } else {
        tempAndarCards2.push({
          name: tempAndarCards[i],
          image: cardImage,
          position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
        })
      }
    }

    for (let i in tempBaharCards) {
      if (i == 0) {
        tempBaharCards2.push({ name: tempBaharCards[i], image: cardImage, position: 0 })
      } else {
        tempBaharCards2.push({
          name: tempBaharCards[i],
          image: cardImage,
          position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
        })
      }
    }

  //  console.log('tempAndarCards: ', tempAndarCards2)
  //  console.log('tempBaharCards2: ', tempBaharCards2)

  //  console.log('res.data.result: ', resData)
    if (andarShot == 0 && baharShot == 0) {
      setShowDoughnutChart(false)
    } else {
      setShowDoughnutChart(true)
    }
    setIndex(0)
    setAndarCards(tempAndarCards2)
    setBaharCards(tempBaharCards2)
    setJokerCard(resData[0].joker_cards)
    setWinner(resData[0].winner)
    setSideWin(resData[0].side_win)
    setData(resData)
    setAndarWinVsBaharWin([
      { name: 'Andar Win', value: andarTotal },
      { name: 'Bahar Win', value: baharTotal },
    ])
    setAndarShotWinVsBaharShotWin([
      { name: 'Andar Shot', value: andarShot },
      { name: 'Bahar Shot', value: baharShot },
    ])
    setGraphData([
      { name: 'Andar Win', value: andarTotal, color: 'rgb(36, 141, 92)' },
      { name: 'Bahar Win', value: baharTotal, color: 'rgb(255, 43, 50)' },
      { name: 'Andar Shot', value: andarShot, color: 'rgb(36, 141, 92)' },
      { name: 'Bahar Shot', value: baharShot, color: 'rgb(255, 43, 50)' },
    ])
  //  console.log('andarTotal: ', andarTotal)
  //  console.log('baharTotal: ', baharTotal)
  //  console.log('streak: ', streak)
  //  console.log('andarStreak: ', andarStreak)
  //  console.log('baharStreak: ', baharStreak)
  }

  const handleIndexChange = (event) => {
    let tempAndarCards2 = []
    let tempBaharCards2 = []
    if (event == '+') {
      const tempIndex = index + 1
      setIndex(index + 1)
      let tempAndarCards = data[tempIndex].splittedAndar

      let tempBaharCards = data[tempIndex].splittedBahar

      for (let i in tempAndarCards) {
        if (i == 0) {
          tempAndarCards2.push({ name: tempAndarCards[i], image: cardImage, position: 0 })
        } else {
          tempAndarCards2.push({
            name: tempAndarCards[i],
            image: cardImage,
            position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
          })
        }
      }

      for (let i in tempBaharCards) {
        if (i == 0) {
          tempBaharCards2.push({ name: tempBaharCards[i], image: cardImage, position: 0 })
        } else {
          tempBaharCards2.push({
            name: tempBaharCards[i],
            image: cardImage,
            position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
          })
        }
      }
      setWinner(data[tempIndex].winner)
      setJokerCard(data[tempIndex].joker_cards)
      setSideWin(data[tempIndex].side_win)
    } else {
      const tempIndex = index - 1
      setIndex(index - 1)
      let tempAndarCards = data[tempIndex].splittedAndar

      let tempBaharCards = data[tempIndex].splittedBahar

      for (let i in tempAndarCards) {
        if (i == 0) {
          tempAndarCards2.push({ name: tempAndarCards[i], image: cardImage, position: 0 })
        } else {
          tempAndarCards2.push({
            name: tempAndarCards[i],
            image: cardImage,
            position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
          })
        }
      }

      for (let i in tempBaharCards) {
        if (i == 0) {
          tempBaharCards2.push({ name: tempBaharCards[i], image: cardImage, position: 0 })
        } else {
          tempBaharCards2.push({
            name: tempBaharCards[i],
            image: cardImage,
            position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
          })
        }
      }
      setWinner(data[tempIndex].winner)
      setJokerCard(data[tempIndex].joker_cards)
      setSideWin(data[tempIndex].side_win)
    }
    setAndarCards(tempAndarCards2)
    setBaharCards(tempBaharCards2)
  //  console.log('tempAndarCards2 : ', tempAndarCards2)
  //  console.log('tempBaharCards2 : ', tempBaharCards2)
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
        <div className={``}>
          <div className={`row g-3   align-items-stretch`}>
            <div className={`col-12 col-md-5 box ${s.opacity}`}>
              <div
                className={`${andarCards.length > 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded  ${themeBorder} `}
              >
                <div
                  className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                >
                  <div className={``}>
                    {' '}
                    <span
                      className={`bg-gradient bg-success text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
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
                          className={`animateAndar h-100`}
                          style={{
                            position: 'absolute',
                            left: `${card.position}rem`,
                          }}
                        >
                          <div className={`px-2`}>
                            <div className={``}>{card.name}</div>
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
            </div>
            <div className={`col-12 col-md-2  align-items-stretch box ${s.opacity}`}>
              <div
                className={`${andarCards.length > 0 || baharCards.length > 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded  h-100 d-flex flex-column  justify-content-center align-items-center  ${themeBorder}`}
              >
                <div className={`w-100`}>
                  <div
                    className={`border-bottom border-secondary  border-opacity-25  py-1 px-3 fontTextHeading`}
                  >
                    {' '}
                    <span
                      className={`bg-gradient bg-primary text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                    >
                      Joker
                    </span>
                  </div>
                </div>
                <div
                  className={` h-100 d-flex flex-column  justify-content-center align-items-center `}
                >
                  <div
                    className={`px-2 d-flex justify-content-start justify-content-md-center align-items-center`}
                  >
                    <div className={``}>{jokerCard}</div>
                  </div>
                  <div
                    className={`d-flex justify-content-start justify-content-md-center align-items-center `}
                  >
                    <div className={``} style={{ maxWidth: '130px' }}>
                      <img
                        src={cardImage}
                        alt=""
                        className={`${theme == 'dark' ? 'card_drop_shadow_dark' : 'card_drop_shadow_light'}`}
                        style={{ width: '100%', transform: 'rotateY(15deg)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-12 col-md-5 box ${s.opacity}`}>
              <div
                className={`${andarCards.length > 0 ? '' : 'd-none'} shadow-s px-2 pb-2 rounded    ${themeBorder} `}
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
                        className={`animateBahar h-100`}
                        style={{
                          position: 'absolute',
                          left: `${card.position}rem`,
                        }}
                      >
                        <div className={`px-2`}>
                          <div className={``}>{card.name}</div>
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
            </div>
          </div>
        </div>
        <div className={`mt-3 box ${s.opacity}`}>
          <div
            className={`text-light d-flex w-100 py-1 justify-content-center gap-2 align-items-center font12 ${themeBorder} shadow-s  rounded `}
          >
            <div className={`fontTextHeading  poppins-500`}>
              winner :{' '}
              <span
                className={`bg-gradient bg-success text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${winner == 'A' ? '' : 'd-none'}`}
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
                className={`bg-gradient bg-success text-light border-0 bg-gradient px-2 shadow-xs  poppins-500 rounded-1 ${side_win == 'A' ? '' : 'd-none'}`}
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
                    className={`rounded shadow-s ${themeBorder} ${showDoughnutChart ? '' : 'd-none'}`}
                  >
                    <DoughnutChartComponent doughnutData={andarShotWinVsBaharShotWin} />
                  </div>
                </div>
                <div className={` col-12 col-md-4  box ${s.opacity}`}>
                  <div
                    className={`rounded shadow-s ${themeBorder} ${showDoughnutChart ? '' : 'd-none'}`}
                  >
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
    </div>
  )
}

export default AndarBaharDashboard
