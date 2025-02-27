import React, { useEffect, useState, useRef } from 'react'
import s from './TableAnalysis.module.css'
import axiosClient from '../../axiosClient'
import cards from 'src/assets/images/dashboard/cards.jpg'
import roulletImage from 'src/assets/images/tables/2.png'
import baccaratBlue from 'src/assets/images/tables/baccarat_blue.png'
import baccaratGreen from 'src/assets/images/tables/baccarat_green.png'
import baccaratPink from 'src/assets/images/tables/baccarat_pink.png'
import baccaratRed from 'src/assets/images/tables/baccarat_red.png'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

import { GetCurrent } from '../../getCurrent'

import NoDataFull from '../NoData/NoDataFull'

import { BaccaratTables } from '../../components/Constants/TableImages'

gsap.registerPlugin(ScrollTrigger)

const TableAnalysis = () => {
  const { game, id } = useParams()

  const scrollRef = useRef(null)
  const theme = useSelector((state) => state?.theme)
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const [originaltables, setOriginalTables] = useState([])
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState('loading')
  const [image, setImage] = useState('')

  const baccarat = [baccaratBlue, baccaratGreen, baccaratPink, baccaratRed]

  const handleFaceImages = () => {
    console.log('game: ', game, ' ', BaccaratTables)
    if (game?.toLowerCase().includes('baccarat')) setImage(BaccaratTables[0]?.table)
    else if (game?.toLowerCase().includes('andar bahar')) setImage(BaccaratTables[1]?.table)
    else if (game?.toLowerCase().includes('3 card poker')) setImage(BaccaratTables[2]?.table)
    else if (game?.toLowerCase().includes('5 card poker')) setImage(BaccaratTables[3]?.table)
    else if (game?.toLowerCase().includes('house taxes')) setImage(BaccaratTables[4]?.table)
    else if (game?.toLowerCase().includes('mini flush')) setImage(BaccaratTables[5]?.table)
    else if (game?.toLowerCase().includes('casino war')) setImage(BaccaratTables[6]?.table)
    else if (game?.toLowerCase().includes('black jack')) setImage(BaccaratTables[7]?.table)
    else if (game?.toLowerCase().includes('dragon tiger')) setImage(BaccaratTables[8]?.table)
    else if (game?.toLowerCase().includes('7 up down')) setImage(BaccaratTables[9]?.table)
    else if (game?.toLowerCase().includes('teen patti')) setImage(BaccaratTables[10]?.table)
    else if (game?.toLowerCase().includes('texas holdem')) setImage(BaccaratTables[11]?.table)
    else if (game?.toLowerCase().includes('pai gow')) setImage(BaccaratTables[12]?.table)
    else if (game?.toLowerCase().includes('bai buu')) setImage(BaccaratTables[13]?.table)
    else if (game?.toLowerCase().includes('mahjong')) setImage(BaccaratTables[14]?.table)
    else if (game?.toLowerCase().includes('nui nui')) setImage(BaccaratTables[15]?.table)
    else setImage(BaccaratTables[18]?.table)
  }

  const getTables = async () => {
    try {
      const { data } = await axiosClient.get(`/table/limits/get/tables/${id}`)
      console.log('data', data)
      setTables(data?.result)
      setOriginalTables(data?.result)
      if (data?.result?.length == 0) {
        setDisplay('nodata')
      } else {
        setDisplay('data')
      }
      handleFaceImages()
    } catch (error) {
      console.error(error)
      setDisplay('nodata')
    }
  }

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setTables(originaltables)
    } else {
      const value = e.target.value.toLowerCase()
      const filtered = tables.filter((table) =>
        table?.table_limit_name?.toLowerCase().includes(value),
      )
      setTables(filtered)
      setSearch(value)
    }
  }

  const handleViewDashboard = (game_type_name, table_limit_name, game_type_id, table_limit_id) => {
    if (game?.toLowerCase().includes('roulette')) {
      navigate(
        `/dashboard/roulette/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }
    if (game?.toLowerCase().includes('baccarat')) {
      navigate(
        `/dashboard/baccarat/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (game?.toLowerCase().includes('andar bahar')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (game?.toLowerCase().includes('3 card poker')) {
      navigate(
        `/dashboard/threecardpoker/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (game?.toLowerCase().includes('5 card poker')) {
      navigate(
        `/dashboard/threecardpoker/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (game?.toLowerCase().includes('house taxes')) {
      navigate(
        `/dashboard/threecardpoker/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (game?.toLowerCase().includes('mini flush')) {
      navigate(
        `/dashboard/threecardpoker/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (game?.toLowerCase().includes('casino war')) {
      navigate(
        `/dashboard/threecardpoker/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }
  }

  const handleNavigate = (id) => {
    console.log('handleNavigate', id)
    navigate(`/limits/edit/table/${id}`)
  }

  const getCurrent = async () => {
    console.log('called getCurrent')

    await GetCurrent('analysis')
    getTables()
    return
  }

  useEffect(() => {
    getCurrent()
  }, [game, id])

  useEffect(() => {
    gsap.fromTo(
      '.fade-in',
      {
        delay: 0.5,
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
      },
    )

    const cards = scrollRef?.current?.children
    const config = { threshold: 0.1 }

    // Intersection Observer callback function
    const observer = new IntersectionObserver((entries, self) => {
      const targets = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => {
          self.unobserve(entry.target) // Stop observing once it's intersected
          return entry.target
        })

      // Call the fadeIn animation function
      fadeIn(targets)
    }, config)

    // Observe each card
    Array.from(cards)?.forEach((card) => observer.observe(card))

    return () => {
      observer.disconnect() // Cleanup the observer on component unmount
    }
  }, [tables, game, id, search])

  // Fade-in animation function using GSAP
  function fadeIn(targets) {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.inOut',
      stagger: 0.1,
    })
  }

  return (
    <>
      <div
        className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} table-main h-100 py-2 container capitalize `}
        key={game}
      >
        <h2 className="text-center my-2">{game}</h2>
        <div className="w-100 d-flex h-100 justify-content-between align-items-end ">
          <div className={`${s.form__group} ${s.field}  poppins-400`}>
            <input
              onChange={handleSearch}
              type="input"
              className={`${s.form__field} ${theme === 'dark' ? 'd-block' : 'd-none'}`}
              placeholder="Name"
              required=""
            />
            <input
              onChange={handleSearch}
              type="input"
              className={`${s.form__field2} ${theme === 'dark' ? 'd-none' : 'd-block'} text-secondary`}
              placeholder="Name"
              required=""
            />
            <label for="name" className={`${s.form__label}`}>
              Search
            </label>
          </div>
        </div>
        <div className={`row gap-0 w-100 px-3`} ref={scrollRef}>
          {tables?.map((table, i) => (
            <div
              key={i}
              className="col-12 col-sm-6 col-md-4 col-xxl-3 mb-3 mb-sm-0 mt-3"
              style={{ opacity: 0, transform: 'translateY(50px)' }}
            >
              <div
                className={`card-hover poppins-400 ${s.box} ${theme === 'light' ? s.black : s.blue} pointer shadow`}
                onClick={() =>
                  handleViewDashboard(
                    table?.game_type_name,
                    table?.table_limit_name,
                    table?.game_type_id,
                    table?.table_limit_id,
                  )
                }
              >
                <div
                  className="card border-0 overflow-hidden bg-transparent"
                  style={{ width: '100%' }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={game == 'roulette' ? roulletImage : image}
                      className="card-img-top card-hover2 bg-dark bg-gradient drop_shadow"
                      alt="..."
                    />
                  </div>
                  <div className="card-body bg-light  py-4">
                    <h5 className="card-title fontSubHeading poppins-500">
                      {table?.table_limit_name}
                    </h5>
                    <p
                      onClick={() =>
                        handleViewDashboard(
                          table?.game_type_name,
                          table?.table_limit_name,
                          table?.game_type_id,
                          table?.table_limit_id,
                        )
                      }
                      className="card-text"
                    >
                      Game: {table?.game_type_name} <br /> Min Bet: {table?.min_bet} <br /> Max Bet:{' '}
                      {table?.max_bet}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${display == 'nodata' ? 'd-block' : 'd-none'} fade-in`} key={display}>
        <NoDataFull />
      </div>
    </>
  )
}

export default TableAnalysis
