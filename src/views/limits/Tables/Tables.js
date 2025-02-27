import React, { useEffect, useState, useRef } from 'react'
import s from './Tables.module.css'
import axiosClient from '../../../axiosClient'
import cards from 'src/assets/images/dashboard/cards.jpg'
import roulletImage from 'src/assets/images/tables/2.png'
import baccaratBlue from 'src/assets/images/tables/baccarat_blue.png'
import baccaratGreen from 'src/assets/images/tables/baccarat_green.png'
import baccaratPink from 'src/assets/images/tables/baccarat_pink.png'
import baccaratRed from 'src/assets/images/tables/baccarat_red.png'

import { BaccaratTables } from '../../../components/Constants/TableImages'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

import { GetCurrent } from '../../../getCurrent'

import NoData from '../../NoData/NoData'
import NoDataFull from '../../NoData/NoDataFull'

gsap.registerPlugin(ScrollTrigger)

const Tables = (props) => {
  const [display, setDisplay] = useState('loading')
  const scrollRef = useRef(null)
  const theme = useSelector((state) => state?.theme)
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const [originaltables, setOriginalTables] = useState([])
  const [search, setSearch] = useState('')
  const [image, setImage] = useState()

  const baccarat = [baccaratBlue, baccaratGreen, baccaratPink, baccaratRed]

  const handleFaceImages = () => {
    console.log('props.table: ', props?.table)
    if (props?.table?.toLowerCase().includes('baccarat')) setImage(BaccaratTables[0]?.table)
    else if (props?.table?.toLowerCase().includes('andar bahar')) setImage(BaccaratTables[1]?.table)
    else if (props?.table?.toLowerCase().includes('3 card poker'))
      setImage(BaccaratTables[2]?.table)
    else if (props?.table?.toLowerCase().includes('5 card poker'))
      setImage(BaccaratTables[3]?.table)
    else if (props?.table?.toLowerCase().includes('house taxes')) setImage(BaccaratTables[4]?.table)
    else if (props?.table?.toLowerCase().includes('mini flush')) setImage(BaccaratTables[5]?.table)
    else if (props?.table?.toLowerCase().includes('casino war')) setImage(BaccaratTables[6]?.table)
    else if (props?.table?.toLowerCase().includes('black jack')) setImage(BaccaratTables[7]?.table)
    else if (props?.table?.toLowerCase().includes('dragon tiger'))
      setImage(BaccaratTables[8]?.table)
    else if (props?.table?.toLowerCase().includes('7 up down')) setImage(BaccaratTables[9]?.table)
    else if (props?.table?.toLowerCase().includes('teen patti')) setImage(BaccaratTables[10]?.table)
    else if (props?.table?.toLowerCase().includes('texas holdem'))
      setImage(BaccaratTables[11]?.table)
    else if (props?.table?.toLowerCase().includes('pai gow')) setImage(BaccaratTables[12]?.table)
    else if (props?.table?.toLowerCase().includes('bai buu')) setImage(BaccaratTables[13]?.table)
    else if (props?.table?.toLowerCase().includes('mahjong')) setImage(BaccaratTables[14]?.table)
    else if (props?.table?.toLowerCase().includes('nui nui')) setImage(BaccaratTables[15]?.table)
    else setImage(BaccaratTables[19]?.table)
  }

  const getTables = async () => {
    try {
      await GetCurrent('limits')
      const { data } = await axiosClient.get(`/table/limits/get/tables/${props?.id}`)
      setTables(data?.result)
      let tempData = data?.result

      console.log('table response: ', data)
      if (tempData?.length > 0) {
        setDisplay('data')
      }

      if (tempData?.length == 0) {
        setDisplay('nodata')
      }
      setOriginalTables(data?.result)
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
    console.log('props.table: ', props?.table)

    if (props?.table?.toLowerCase().includes('roulette')) {
      navigate(
        `/dashboard/roulette/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }
    if (props?.table?.toLowerCase().includes('baccarat')) {
      navigate(
        `/dashboard/baccarat/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('andar bahar')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('3 card poker')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('5 card poker')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('House Taxes')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('mini flush')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('casino war')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('5 card poker')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }

    if (props?.table?.toLowerCase().includes('5 card poker')) {
      navigate(
        `/dashboard/andarbahar/${game_type_name}/${table_limit_name}/${game_type_id}/${table_limit_id}`,
      )
    }
  }

  const handleNavigate = (id, game_type) => {
    console.log('handleNavigate', id)
    navigate(`/limits/edit/${game_type}/${id}`)
  }

  useEffect(() => {
    getTables()
  }, [props?.table, props?.id])

  useEffect(() => {
    const cards = scrollRef?.current?.children
    const config = { threshold: 0.1 }

    const observer = new IntersectionObserver((entries, self) => {
      const targets = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => {
          self.unobserve(entry.target)
          return entry.target
        })

      fadeIn(targets)
    }, config)

    Array.from(cards)?.forEach((card) => observer.observe(card))

    return () => {
      observer.disconnect()
    }
  }, [tables, props?.id, search])

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
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} table-main h-100 py-2 container capitalize`}
    >
      <h2 className="text-center my-2">{props?.table}</h2>
      <div className={`w-100`}>
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

          <div>
            <button
              type="button"
              onClick={() => props?.toggleAddNew(true)}
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} btn-sm px-3 bg-gradient capitalize`}
            >
              Add {props?.table}
            </button>
          </div>
        </div>
        <div className="row gap-0 w-100 px-3" ref={scrollRef}>
          {tables?.map((table, i) => (
            <div
              key={i}
              className="col-12 col-sm-6 col-md-4 col-xxl-3 mb-3 mb-sm-0 mt-3"
              style={{ opacity: 0, transform: 'translateY(50px)' }}
            >
              <div
                className={`card-hover poppins-400 ${s.box} ${theme === 'light' ? s.black : s.blue} pointer shadow`}
              >
                <div
                  className="card border-0 bg-transparent overflow-hidden"
                  style={{ width: '100%' }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={props?.table == 'roulette' ? roulletImage : image}
                      className="card-img-top card-hover2 bg-dark bg-gradient drop_shadow"
                      alt="..."
                      onClick={() => handleNavigate(table?.table_limit_id, table?.game_type_name)}
                    />
                  </div>
                  <div className="card-body bg-light ">
                    <h5
                      onClick={() => handleNavigate(table?.table_limit_id, table?.game_type_name)}
                      className="card-title fontSubHeading poppins-500"
                    >
                      {table?.table_limit_name}
                    </h5>
                    <p
                      onClick={() => handleNavigate(table?.table_limit_id, table?.game_type_name)}
                      className="card-text"
                    >
                      Game: {table?.game_type_name} <br /> Language: {table?.language}
                    </p>
                    <div className="d-flex justify-content-end">
                      <i
                        onClick={() => handleNavigate(table?.table_limit_id, table?.game_type_name)}
                        className={`bi bi-pen-fill icon-size font-size icon icon-hover pointer text-shadow icon-hover ${
                          theme === 'light' ? 'text-dark' : 'text-dark'
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${display == 'nodata' ? '' : 'd-none'}`}>
        <NoDataFull />
      </div>
    </div>
  )
}

export default Tables
