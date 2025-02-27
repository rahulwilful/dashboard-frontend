import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import s from './PlayerBankerDashboardComponent.module.css'
import card from 'src/assets/images/baccarat/card.png'
import Select from 'react-select'
import { Cards, ShoeSideWin, CardImages } from './BaccaratData.js'
import PieChartComponent from './PieChartComponent'
import DoughnutChartComponent from './DoughnutChartComponent'
import BarChartComponent from './BarChartComponent.js'
import axiosClient from '../../../../axiosClient.js'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import NoData from '../../../NoData/NoData.js'

const PlayerBankerDashboardComponent = (props) => {
  const theme = useSelector((state) => state.theme)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')

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

  const [renderKey, setRenderKey] = useState(0)
  const [index, setIndex] = useState(0)
  const [currentShoe, setCurrentShoe] = useState(null)
  const [currentOption, setCurrentOption] = useState(null)
  const [currentShoeData, setCurrentShoeData] = useState([])
  const [shoeData, setShoeData] = useState([])
  const [shoes, setShoes] = useState([{ value: null, label: null }])
  const [options, setOptions] = useState([{ value: 0, label: 0 }])
  const [shoeDataSize, setShoeDataSize] = useState(0)
  const [sideWin, setSideWin] = useState(ShoeSideWin)
  const [dataSize, setDataSize] = useState(0)
  const [bankerVsPlayer, setBankerVsPlayer] = useState([
    { name: 'Banker', value: 0 },
    { name: 'Player', value: 0 },
    { name: 'Tie', value: 0 },
  ])
  const [doughnutData, setDoughnutData] = useState([
    { name: 'Banker Streak', value: 0 },
    { name: 'Player Streak', value: 0 },
    { name: 'Banker Pair', value: 0 },
    { name: 'Player Pair', value: 0 },
  ])
  const [showDoughnut, setShowDoughnut] = useState(true)
  const [playerCardImage1, setPlayerCardImage1] = useState(null)
  const [playerCardImage2, setPlayerCardImage2] = useState(null)
  const [playerCardImage3, setPlayerCardImage3] = useState(null)
  const [bankerCardImage1, setBankerCardImage1] = useState(null)
  const [bankerCardImage2, setBankerCardImage2] = useState(null)
  const [bankerCardImage3, setBankerCardImage3] = useState(null)

  /**
   * Processes the shoe data to update the state variables for visualization and analysis.
   *
   * @param {Array} shoeData - The data received from the API containing shoe information.
   */
  const processData = (shoeData) => {
    console.log('processData: ', shoeData)

    // Return early if there is no data
    if (shoeData?.length === 0) return

    // Reset the values of ShoeSideWin
    for (let i in ShoeSideWin) {
      ShoeSideWin[i].value = 0
    }

    // Set the size of the shoe data
    setShoeDataSize(shoeData?.length)

    // Initialize variables to track streaks, pairs, and winners
    let playerStreak = 0
    let bankerStreak = 0
    let playerPair = 0
    let bankerPair = 0
    let streak = []
    let tempStreak = []
    let tempCurrentWinner = shoeData[0]?.winner

    // Initialize bankerVsPlayer to track the count of wins for Player, Banker, and Tie
    let bankerVsPlayer = [
      { name: 'Player', value: 0 },
      { name: 'Banker', value: 0 },
      { name: 'Tie', value: 0 },
    ]

    // Iterate through the shoe data to identify streaks
    for (let i = 0; i < shoeData?.length; i++) {
      if (i < shoeData?.length - 2 && tempCurrentWinner === shoeData[i + 1]?.winner) {
        tempStreak.push(tempCurrentWinner)
      } else {
        if (tempStreak?.length > 0) {
          streak.push(tempStreak)
          tempStreak = []
        }
        if (i < shoeData?.length - 2) {
          tempCurrentWinner = shoeData[i + 1]?.winner
        }
      }
    }

    // Count the number of player and banker streaks
    for (let i in streak) {
      if (streak[i][0] === 'P') {
        playerStreak++
      }
      if (streak[i][0] === 'B') {
        bankerStreak++
      }
    }

    // Iterate through the shoe data to update win counts, pairs, and side wins
    for (let i = 0; i < shoeData?.length; i++) {
      if (shoeData[i]?.winner === 'P') bankerVsPlayer[0].value += 1
      if (shoeData[i]?.winner === 'B') bankerVsPlayer[1].value += 1
      if (shoeData[i]?.winner === 'T') bankerVsPlayer[2].value += 1

      if (shoeData[i]?.playerCard1 === shoeData[i]?.playerCard2) playerPair += 1
      if (shoeData[i]?.bankerCard1 === shoeData[i]?.bankerCard2) bankerPair += 1
      if (
        shoeData[i]?.playerCard3 &&
        shoeData[i]?.playerCard1 !== shoeData[i]?.playerCard2 &&
        shoeData[i]?.playerCard2 === shoeData[i]?.playerCard3
      ) {
        playerPair += 1
      }
      if (
        shoeData[i]?.bankerCard3 &&
        shoeData[i]?.bankerCard1 !== shoeData[i]?.bankerCard2 &&
        shoeData[i]?.bankerCard2 === shoeData[i]?.bankerCard3
      ) {
        bankerPair += 1
      }

      // Update side win counts based on the side_win property
      if (shoeData[i]?.side_win === 'PP') sideWin[2].value += 1
      if (shoeData[i]?.side_win === 'BP') sideWin[3].value += 1
      if (shoeData[i]?.side_win === 'TG') sideWin[4].value += 1
      if (shoeData[i]?.side_win === 'S6') sideWin[5].value += 1
      if (shoeData[i]?.side_win === 'TGR') sideWin[6].value += 1
      if (shoeData[i]?.side_win === 'TP') sideWin[7].value += 1
      if (shoeData[i]?.side_win === 'TW') sideWin[8].value += 1
      if (shoeData[i]?.side_win === 'TT') sideWin[9].value += 1
      if (shoeData[i]?.side_win === 'BT') sideWin[10].value += 1
      if (shoeData[i]?.side_win === 'ST') sideWin[11].value += 1
      if (shoeData[i]?.side_win === 'BD') sideWin[12].value += 1
      if (shoeData[i]?.side_win === 'SD') sideWin[13].value += 1
      if (shoeData[i]?.side_win === 'DT') sideWin[14].value += 1
    }

    // Update the sideWin array with the streak counts
    sideWin[0].value = playerStreak
    sideWin[1].value = bankerStreak

    // Prepare the doughnut data for visualization
    const doughnutData = [
      { name: 'Player Streak', value: playerStreak },
      { name: 'Banker Streak', value: bankerStreak },
      { name: 'Player Pair', value: playerPair },
      { name: 'Banker Pair', value: bankerPair },
    ]

    // Determine whether to show the doughnut chart based on the data
    if (playerStreak === 0 && bankerStreak === 0 && playerPair === 0 && bankerPair === 0) {
      setShowDoughnut(false)
      console.log('false')
    } else {
      setShowDoughnut(true)
      console.log('true')
    }

    // Update the state variables with the processed data
    setBankerVsPlayer(bankerVsPlayer)
    setDoughnutData(doughnutData)
    setSideWin(sideWin)
    setRenderKey(renderKey + 1)
  }

  useEffect(() => {
    if (!props?.shoeData || props?.shoeData?.length <= 0) {
      // If props.shoeData is undefined or empty, don't proceed
      // console.error('shoeData is undefined or empty')
      return
    }

    let tempOptions = []
    let tempCurrShoe = null

    // Fetch current shoe from localStorage if available
    const currentShoeFromStorage = localStorage.getItem('currentShoe')
    console.log('currentShoe', currentShoeFromStorage)

    // Ensure props.shoes and props.shoeData are valid
    if (props?.shoeData && props?.shoeData?.length > 0) {
      //console.log('shoeData', shoeData)
      const currentShoeExists = props?.shoes?.some((shoe) => shoe === currentShoeFromStorage)

      if (currentShoeFromStorage && currentShoeExists) {
        setCurrentShoe(currentShoeFromStorage)
        setCurrentOption({ label: currentShoeFromStorage, value: currentShoeFromStorage })
        tempCurrShoe = currentShoeFromStorage
      } else {
        const firstShoe = props?.shoes[0]
        setCurrentShoe(firstShoe)
        setCurrentOption({ label: firstShoe, value: firstShoe })
        tempCurrShoe = firstShoe
      }

      // Process shoeData for the selected shoe
      setShoeData(props?.shoeData)
      setDataSize(props?.shoeData?.length)
      let flag = 0
      let tempData = []

      if (
        localStorage.getItem('currentShoe') != null ||
        localStorage.getItem('currentShoe') != '' ||
        localStorage.getItem('currentShoe') != undefined
      ) {
        for (let i = 0; i < props?.shoeData?.length; i++) {
          console.log(
            'props?.shoeData[i]?.shoe: ',
            props?.shoeData[i]?.shoe,
            ' currentShoeFromStorage: ',
            currentShoeFromStorage,
          )
          if (props?.shoeData[i]?.shoe == currentShoeFromStorage) {
            console.log('inside if block props?.shoeData[i]?.shoe: ', props?.shoeData[i]?.shoe)
            setCurrentShoeData(props?.shoeData[i]?.data)

            setCurrentShoe(props?.shoeData[i]?.shoe)
            setCurrentOption({ label: props?.shoeData[i]?.shoe, value: props?.shoeData[i]?.shoe })
            tempCurrShoe = props?.shoeData[i]?.shoe
            tempData = props?.shoeData[i]?.data
            flag = 1
            break
          }
        }
      }

      if (flag == 0) {
        setCurrentShoeData(props?.shoeData[0]?.data)
        tempData = props?.shoeData[0]?.data
        tempCurrShoe = props?.shoeData[0]?.shoe
        localStorage.setItem('currentShoe', tempCurrShoe)
        console.log('current Shoe flag == 0: ', localStorage.getItem('currentShoe'))
        setCurrentShoe(props?.shoeData[0]?.shoe)
        setCurrentOption({ label: props?.shoeData[0]?.shoe, value: props?.shoeData[0]?.shoe })
      }

      processData(tempData)

      // console.log('tempData : ', tempData)

      // Build options list for the dropdown
      for (let i = 0; i < props?.shoes?.length; i++) {
        tempOptions.push({ label: props?.shoes[i], value: props?.shoes[i] })
      }

      setRenderKey(renderKey + 1)
      setOptions(tempOptions)
    }
  }, [props?.shoeData, props?.shoes])

  useEffect(() => {
    if (currentShoeData?.length > 0) {
      handleCardImages(0)
    }
  }, [currentShoeData])

  /**
   * Handles the change of the selected shoe from the dropdown.
   *
   * @param {Object} selectedOption - The selected shoe option from the dropdown.
   */
  const handleShoeChange = (selectedOption) => {
    console.log('handleShoeChange: ', selectedOption)

    let flag = 0

    // Iterate through the shoeData to find the selected shoe
    for (let i = 0; i < shoeData?.length; i++) {
      if (shoeData[i]?.shoe == selectedOption?.value) {
        // Update the currentShoeData with the data of the selected shoe
        setCurrentShoeData(shoeData[i]?.data)

        // Process the data of the selected shoe
        processData(shoeData[i]?.data)

        // Update the currentOption and currentShoe with the selected shoe
        setCurrentOption(selectedOption)
        setCurrentShoe(selectedOption?.value)

        // Store the selected shoe in localStorage
        localStorage.setItem('currentShoe', selectedOption?.value)

        flag = 1
        break
      }
    }

    // If the selected shoe is not found in shoeData, fetch the data from the server
    if (flag == 0) {
      getDataByShoe(selectedOption?.value)
      localStorage.setItem('currentShoe', selectedOption?.value)
    }

    // Reset the index to 0 and update the card images for the new shoe
    setIndex(0)
    handleCardImages(0)
  }

  const getDataByShoe = async (shoe) => {
    //console.log('getDataByShoe: ', shoe)

    try {
      const res = await axiosClient.get(
        `/baccarat/get/by/shoe/${currentShoeData[0]?.game_type_id}/${currentShoeData[0]?.table_limit_id}/${shoe}`,
      )

      if (res) {
        let resData = res?.data?.result

        for (let i in resData) {
          const tempPlayerSplit = resData[i]?.player_cards?.split(',')
          const tempBankerSplit = resData[i]?.banker_cards?.split(',')

          let PlayerSplit = []
          let BankerSplit = []

          // Splitting cards to easy access and computations
          resData[i].playerCard1 = tempPlayerSplit[0]
          resData[i].playerCard2 = tempPlayerSplit[1]
          if (tempPlayerSplit[2]) resData[i].playerCard3 = tempPlayerSplit[2]

          resData[i].bankerCard1 = tempBankerSplit[0]
          resData[i].bankerCard2 = tempBankerSplit[1]
          if (tempBankerSplit[2]) resData[i].bankerCard3 = tempBankerSplit[2]
        }

        let tempShoeData = shoeData
        tempShoeData.push({ shoe: shoe, data: resData })
        //console.log('tempShoeData: ', tempShoeData)
        setShoeData(tempShoeData)

        for (let i = 0; i < tempShoeData?.length; i++) {
          if (tempShoeData[i]?.shoe == shoe) {
            console.log("localStorage.setItem('currentShoe', shoe): ", shoe)
            localStorage.setItem('currentShoe', shoe)

            setCurrentShoeData(tempShoeData[i]?.data)
            processData(tempShoeData[i]?.data)
            setCurrentOption({ label: tempShoeData[i]?.shoe, value: tempShoeData[i]?.shoe })
            setCurrentShoe(shoe)
          }
        }

        // console.log('getDataByShoe result: ', resData)
        props?.getDataByShoe(res?.data?.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log('shoeData', shoeData)
    fadeInAnimation()
  }, [shoeData])

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

  const fadeInAnimation = () => {
    document.querySelectorAll('.boxPlayerBanker')?.forEach((box) => {
      observer.observe(box)
    })
  }

  function fadeIn(targets) {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power1.out',
    })
  }

  const handleIndexChange = (event) => {
    let tempIndex = index
    if (event == '+') {
      tempIndex = index + 1
      setIndex(index + 1)
    } else {
      tempIndex = index - 1
      setIndex(index - 1)
    }
    handleCardImages(tempIndex)

    // Update currentShoe with the selected value
  }

  // Changes card images according to current index
  const handleCardImages = (tempIndex) => {
    if (currentShoeData[tempIndex]?.playerCard1) {
      for (let i in CardImages) {
        if (CardImages[i]?.name == currentShoeData[tempIndex]?.playerCard1) {
          setPlayerCardImage1(CardImages[i]?.card)
        }
      }
    } else {
      setPlayerCardImage1(null)
    }

    if (currentShoeData[tempIndex]?.playerCard2) {
      for (let i in CardImages) {
        if (CardImages[i]?.name == currentShoeData[tempIndex]?.playerCard2) {
          setPlayerCardImage2(CardImages[i]?.card)
        }
      }
    } else {
      setPlayerCardImage2(null)
    }

    if (currentShoeData[tempIndex]?.playerCard3) {
      for (let i in CardImages) {
        if (CardImages[i]?.name == currentShoeData[tempIndex]?.playerCard3) {
          setPlayerCardImage3(CardImages[i]?.card)
        }
      }
    } else {
      setPlayerCardImage3(null)
    }

    if (currentShoeData[tempIndex]?.bankerCard1) {
      for (let i in CardImages) {
        if (CardImages[i]?.name == currentShoeData[tempIndex]?.bankerCard1) {
          setBankerCardImage1(CardImages[i]?.card)
        }
      }
    } else {
      setBankerCardImage1(null)
    }

    if (currentShoeData[tempIndex]?.bankerCard2) {
      for (let i in CardImages) {
        if (CardImages[i]?.name == currentShoeData[tempIndex]?.bankerCard2) {
          setBankerCardImage2(CardImages[i]?.card)
        }
      }
    } else {
      setBankerCardImage2(null)
    }

    if (currentShoeData[tempIndex]?.bankerCard3) {
      for (let i in CardImages) {
        if (CardImages[i]?.name == currentShoeData[tempIndex]?.bankerCard3) {
          setBankerCardImage3(CardImages[i]?.card)
        }
      }
    } else {
      setBankerCardImage3(null)
    }

    return
  }

  return (
    <div
      className={` ${theme === 'light' ? 'text-dark' : 'text-light'} ${shoeData ? '' : 'd-none'}`}
    >
      <div className={` `}>
        {currentShoeData[0] ? (
          <div>
            <div className={`row g-3 `}>
              <div
                className={`col-12 ${playerCardImage1 ? 'h-100' : 'h-full'} col-md-5 boxPlayerBanker  ${s.opacity}  `}
              >
                <div
                  className={`w-100  ${playerCardImage1 ? 'h-75' : 'h-100'}   player shadow-s rounded ${themeBorder} bg-gradient px-1 `}
                >
                  <div
                    className={`d-flex justify-content-center align-items-center pt-2 py-1 fontTextHeading border-bottom border-secondary  border-opacity-25 `}
                  >
                    <span
                      className={`bg-gradient bg-primary text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                    >
                      Player
                    </span>
                  </div>
                  <div
                    className={`row gx-1  w-100 h-100 d-flex justify-content-center  p-2 align-items-center font12 ${playerCardImage1 ? '' : 'd-none'} `}
                  >
                    <div className={`col-4`}>
                      <div
                        className={`w-100   ${s.cards}  d-flex justify-content-center align-items-center`}
                      >
                        <div className={`h-100 w-100 p-1`}>
                          {/* <div className={`text-center`}>{currentShoeData[index].playerCard1}</div> */}

                          <img src={playerCardImage1} className="w-100 drop_shadow" />
                        </div>
                      </div>
                    </div>
                    <div className={`col-4`}>
                      <div
                        className={`w-100  ${s.cards}  d-flex justify-content-center align-items-center`}
                      >
                        <div className={`h-100 w-100 p-1`}>
                          {/* <div className={`text-center`}>{currentShoeData[index].playerCard2}</div> */}

                          <img src={playerCardImage2} className="w-100 drop_shadow" />
                        </div>
                      </div>
                    </div>
                    <div className={`col-4 ${currentShoeData[index]?.playerCard3 ? '' : 'd-none'}`}>
                      <div
                        className={`w-100  ${s.cards}  d-flex justify-content-center align-items-center `}
                      >
                        <div className={`h-100 w-100 p-1`}>
                          {/* <div className={`text-center`}>{currentShoeData[index].playerCard3}</div> */}

                          <img src={playerCardImage3} className="w-100 drop_shadow" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`row gx-1  w-100 h-100 d-flex justify-content-center   p-2 align-items-center font12 ${!playerCardImage1 ? '' : 'd-none'} `}
                  >
                    <NoData />
                  </div>
                </div>
              </div>

              <div className={`col-12  col-md-2 boxPlayerBanker ${s.opacity} `}>
                <div
                  className={` h-100  shadow-s rounded ${themeBorder} bg-gradient info p-3 d-flex flex-column justify-content-between align-items-center`}
                >
                  <div className={`w-100`}>
                    <table className={`table-${theme} fontText  table-sm w-100 `}>
                      <tbody>
                        <tr className="border-bottom border-secondary border-opacity-25 mb-1">
                          <td className={`${props?.live ? 'text-light' : 'text-danger'}`}>
                            {props?.live ? 'Active' : 'Inactive'}
                          </td>
                          <td className={`d-flex justify-content-center align-items-center py-2`}>
                            <span
                              className={`rounded-circle d-flex justify-content-center    ${props?.live ? 'bg-success' : 'bg-danger disabled'} text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25 pointer`}
                              disabled={!props?.live}
                              onClick={props?.live ? props?.updateData : null}
                            >
                              <i className="bi bi-arrow-clockwise"></i>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Shoe </td>
                          <td className={`text-end  `}>
                            <Select
                              className="rounded-1 shadow-xs"
                              styles={{
                                menu: (base) => ({
                                  ...base,
                                  fontSize: '0.8rem',
                                  zIndex: 100, // Ensure it's above other components
                                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                }),
                                option: (base) => ({
                                  ...base,
                                  color: 'black',
                                }),
                                control: (provided) => ({
                                  ...provided,
                                  minHeight: '15px', // Adjust height
                                  backgroundColor: theme == 'dark' ? 'black' : 'white',
                                  fontSize: '12px', // Optional: smaller text
                                }),
                                valueContainer: (provided) => ({
                                  ...provided,
                                  padding: '0px 8px', // Optional: adjust padding
                                }),
                                dropdownIndicator: (provided) => ({
                                  ...provided,
                                  padding: '4px', // Optional: adjust dropdown icon size
                                }),
                                singleValue: (provided) => ({
                                  ...provided,
                                  color: theme == 'dark' ? 'white' : 'black', // Text color for selected value
                                }),
                                input: (provided) => ({
                                  ...provided,
                                  color: theme == 'dark' ? 'white' : 'black', // Text color for input value
                                }),
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: theme == 'dark' ? 'white' : 'black', // Placeholder text color
                                }),
                              }}
                              value={currentOption}
                              onChange={handleShoeChange}
                              options={options}
                              placeholder="Select a shoe"
                              isSearchable={true}
                              isClearable={false}
                              components={{ DropdownIndicator: () => null }}
                              theme={(theme) => ({
                                ...theme,
                                colors: {
                                  ...theme.colors,
                                  text: 'black',
                                },
                              })}
                              menuPosition="fixed" // Ensures it stays fixed on the screen
                              menuPortalTarget={document.body} // Renders dropdown outside the parent hierarchy
                            />

                            {/*  <select
                            className="rounded-1 px-2"
                            aria-label="Default select example"
                            value={currentShoe}
                            onChange={handleShoeChange} // Event handler for selection
                          >
                            {props.shoes.map((item, i) => (
                              <option key={i} value={item}>
                                {item}
                              </option>
                            ))}
                          </select> */}
                          </td>
                        </tr>
                        <tr>
                          <td>Winner</td>
                          <td className={`text-end`}>
                            <span
                              className={`rounded-1 ${currentShoeData[index]?.winner == 'P' ? 'bg-primary' : currentShoeData[index]?.winner == 'B' ? 'bg-danger' : 'bg-success'} d-flex justify-content-center   px-2 text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                            >
                              {currentShoeData[index]?.winner == 'B'
                                ? 'Banker'
                                : currentShoeData[index]?.winner == 'P'
                                  ? 'Player'
                                  : 'Tie'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Side</td>
                          <td className={`text-end`}>
                            <span
                              className={`rounded-1 d-flex justify-content-center  px-2 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                            >
                              {currentShoeData[index]?.side_win
                                ? currentShoeData[index]?.side_win
                                : '-'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Total Shoes</td>
                          <td className={`text-end`}>
                            <span
                              className={`rounded-1 d-flex justify-content-center  px-2 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                            >
                              {dataSize}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={`text-light d-flex w-100 py-1 justify-content-center gap-2 align-items-center font12 mt-2 border-top border-secondary border-opacity-25`}
                  >
                    <div className={``}>
                      <button
                        onClick={() => handleIndexChange('-')}
                        type="button"
                        className={`btn btn-primary btn-sm ${index == 0 ? 'd-none' : ''}`}
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
                      {currentShoeData?.length}/{index + 1}
                    </div>
                    <div className={``}>
                      <button
                        onClick={() => handleIndexChange('+')}
                        type="button"
                        className={`btn btn-primary btn-sm ${index < currentShoeData?.length - 1 ? '' : 'd-none'}`}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                      <button
                        disabled
                        type="button"
                        className={`btn btn-primary btn-sm  ${index >= currentShoeData?.length - 1 ? '' : 'd-none'}`}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`col-12  ${bankerCardImage1 ? 'h-100' : 'h-full'}  col-md-5 boxPlayerBanker ${s.opacity} `}
              >
                <div
                  className={`w-100  ${bankerCardImage1 ? 'h-75' : 'h-100'}  shadow-s rounded ${themeBorder} bg-gradient player   px-1`}
                >
                  <div
                    className={`d-flex justify-content-center align-items-center pt-2 py-1 fontTextHeading border-bottom border-secondary  border-opacity-25 `}
                  >
                    <span
                      className={`bg-gradient bg-danger text-light border-0 bg-gradient px-2 shadow-xs poppins-500 rounded-1 `}
                    >
                      Banker
                    </span>
                  </div>
                  <div
                    className={`row gx-1 w-100 h-100 d-flex justify-content-center  p-2 align-items-center font12 `}
                  >
                    <div className={`col-4`}>
                      <div
                        className={`w-100   ${s.cards}  d-flex justify-content-center align-items-center`}
                      >
                        <div className={`h-100 w-100 p-1`}>
                          {/* <div className={`text-center`}>{currentShoeData[index].bankerCard1}</div> */}

                          <img src={bankerCardImage1} className="w-100 drop_shadow" />
                        </div>
                      </div>
                    </div>
                    <div className={`col-4`}>
                      <div
                        className={`w-100  ${s.cards}  d-flex justify-content-center align-items-center`}
                      >
                        <div className={`h-100 w-100 p-1`}>
                          {/* <div className={`text-center`}>{currentShoeData[index].bankerCard2}</div> */}

                          <img src={bankerCardImage2} className="w-100 drop_shadow" />
                        </div>
                      </div>
                    </div>
                    <div className={`col-4 ${currentShoeData[index]?.bankerCard3 ? '' : 'd-none'}`}>
                      <div
                        className={`w-100  ${s.cards}  d-flex justify-content-center align-items-center `}
                      >
                        <div className={`h-100 w-100 p-1`}>
                          {/* <div className={`text-center`}>{currentShoeData[index].bankerCard3}</div> */}

                          <img src={bankerCardImage3} className="w-100 drop_shadow" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`row gx-1  w-100 h-100 d-flex justify-content-center   p-2 align-items-center font12 ${!bankerCardImage1 ? '' : 'd-none'} `}
                  >
                    <NoData />
                  </div>
                </div>
              </div>
            </div>
            <div className={`w-100  mt-3 `}>
              <div className={`row  g-3  `}>
                <div className={`col-12 col-md-6 boxPlayerBanker ${s.opacity}   `}>
                  <div className={` shadow-s rounded ${themeBorder} bg-gradient`}>
                    <div className={`p-2`}>
                      <div className={`px-2 border-bottom border-secondary border-opacity-25`}>
                        Shoe -{currentShoe}
                      </div>
                    </div>
                    <div className={``}>
                      <PieChartComponent bankerVsPlayer={bankerVsPlayer} />
                    </div>
                  </div>
                </div>
                <div className={`col-12 col-md-6 boxPlayerBanker min-h-full  ${s.opacity}  `}>
                  <div
                    className={` shadow-s rounded ${themeBorder} bg-gradient ${showDoughnut == true ? 'd-block' : 'd-none'}`}
                  >
                    <div className={``}>
                      <div className={`p-2`}>
                        <div className={`px-2 border-bottom border-secondary border-opacity-25`}>
                          Shoe -{currentShoe}
                        </div>
                      </div>
                      <div className={``}>
                        <DoughnutChartComponent doughnutData={doughnutData} />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-100  d-flex justify-content-center align-items-center shadow-s rounded ${themeBorder} bg-gradient ${showDoughnut == false ? 'd-block' : 'd-none'}`}
                  >
                    <div className={`content h-100 w-100  d-flex flex-column`}>
                      <div className={`p-2`}>
                        <div className={`px-2 border-bottom border-secondary border-opacity-25`}>
                          Shoe -{currentShoe}
                        </div>
                      </div>
                      <div
                        className={`h-100  d-flex justify-content-center align-items-center`}
                        key={renderKey}
                      >
                        <h3 className="">No Data</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`py-3 boxPlayerBanker ${s.opacity}  `}>
              <div
                className={`py-1 row shadow-s rounded  d-flex justify-content-center ${themeBorder} bg-gradient`}
              >
                <div className={``}>
                  <div className={`border-bottom border-secondary border-opacity-25 px-2`}>
                    Shoe -{currentShoe}
                  </div>
                </div>
                <div className={`col-12 col-sm-10 h-100 mt-2`}>
                  <div className={``}>
                    <BarChartComponent sideWin={sideWin} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default PlayerBankerDashboardComponent
