import './Dashboard.css'

import {
  CCol,
  CRow,
  CWidgetStatsA,
  CLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import {
  cilStar,
  cilPeople,
  cilDollar,
  cilMoney,
  cilChartLine,
  cilArrowCircleBottom,
  cilArrowCircleTop,
  cilSpeedometer,
  cilSync,
  cilOptions,
  cilArrowTop, // Add this line
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient'

import { BaccaratTables } from './DashboardData'
import GameCard from './DashboardComponents/GameCard'
import { Cards } from './DashboardComponents/Cards'
import { Card } from './DashboardComponents/Card'

const Dashboard = () => {
  const theme = useSelector((state) => state.theme)
  const [rouletteData, setRouletteData] = useState([])
  const [baccaratData, setBaccaratData] = useState([])
  const [andarBaharData, setAndarBaharData] = useState([])
  const [allTables, setAllTables] = useState([])
  const [allGames, setAllGames] = useState([])
  const [activeGames, setActiveGames] = useState([])

  const [languages, setLanguages] = useState([])
  const [themes, setThemes] = useState([])
  const [backgrounds, setBackgrounds] = useState([])
  const [currencys, setCurrencys] = useState([])

  const getData = async () => {
    try {
      const rouletteRes = await axiosClient.post(`/game/get/latest/data/of/roulette`)

      console.log('rouletteRes : ', rouletteRes)
      setRouletteData(rouletteRes.data.result)
    } catch (e) {
      console.log(e)
    }

    try {
      const andar_baharRes = await axiosClient.post(`/game/get/latest/data/of/andar_bahar`)

      console.log('andar_baharRes : ', andar_baharRes)
      setAndarBaharData(andar_baharRes.data.result)
    } catch (e) {
      console.log(e)
    }

    try {
      const baccaratRes = await axiosClient.post(`/game/get/latest/data/of/baccarat`)

      console.log('baccaratRes : ', baccaratRes)
      setBaccaratData(baccaratRes.data.result)
    } catch (e) {
      console.log(e)
    }

    try {
      const tableRes = await axiosClient.get(`/table/limits/get/all/tables`)

      console.log('tableRes : ', tableRes)
      setAllTables(tableRes.data.result)
    } catch (e) {
      console.log(e)
    }

    try {
      const gameRes = await axiosClient.get(`/game/get/all/games`)

      console.log('gameRes : ', gameRes)
      setAllGames(gameRes.data.result)
      let temp = gameRes.data.result
      let temp2 = []
      for(let i in temp){
        if(temp[i].active == 1){
        temp2.push(temp[i])
        }
      }
      setActiveGames(temp2)
    } catch (e) {
      console.log(e)
    }

    try {
      
      const response = await axiosClient.get('config/get/configs')
      const { languages, themes, backgrounds, currencys } = response.data
      setLanguages(languages)
      setThemes(themes)
      setBackgrounds(backgrounds)
      setCurrencys(currencys)
    } catch (error) {
      console.error('Error fetching configs:', error)
    }
  }


  useEffect(() => {
    setInterval(() => {
      //getData()
    }, 1000)
  }, [])

  useEffect(() => {
    console.log('allGames : ', allGames)
  }, [allGames])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 `}
      style={{ border: 'red' }}
    >
      <div className={``}>
        <h1 className="text-center text-shadow"> Dashboard</h1>
        <div className={``}>
          <div className={` my-2 py-2`}>
            <div className="row">
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='primary' lineColor="white" dotColor='white' textColor='white' dot={true} title='Total Games' value={allGames.length}  />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='success' lineColor="white" dotColor='white' textColor='white' dot={false} title='Active Games' value={activeGames.length} />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='warning' lineColor="white" dotColor='white' textColor='white' dot={true} title='Inactive Games' value={allGames.length - activeGames.length} />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='primary' lineColor="white" dotColor='white' textColor='white' dot={true} title='Total Tables' value={allTables.length} />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='secondary' lineColor="white" dotColor='white' textColor='white' dot={false} title='Languages' value={languages.length} />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='danger' lineColor="white" dotColor='white' textColor='white' dot={true} title='Themes' value={themes.length} />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='info' lineColor="white" dotColor='white' textColor='white' dot={true} title='Backgrounds' value={backgrounds.length} />
              </div>
              <div className={`col-12 col-sm-6 col-lg-4`}>
                <Card color='success' lineColor="white" dotColor='white' textColor='white' dot={false} title='Currencys' value={currencys.length} />
              </div>
            </div>
          </div>
          <div className={`row g-3`}>
            <div className={`col-12 col-sm-6 col-lg-4 `}>
              <GameCard
                game={rouletteData[0]?.game_type_name}
                data={rouletteData}
                lastNumber={rouletteData[0]?.winning_number}
              />
            </div>
            <div className={`col-12 col-sm-6 col-lg-4 `}>
              <GameCard
                game={baccaratData[0]?.game_type_name}
                data={baccaratData}
                winner={
                  baccaratData[0]?.winner == 'P'
                    ? 'Player'
                    : baccaratData[0]?.winner == 'B'
                      ? 'Banker'
                      : ''
                }
              />
            </div>
            <div className={`col-12 col-sm-6 col-lg-4 `}>
              <GameCard
                game={andarBaharData[0]?.game_type_name}
                data={andarBaharData}
                winner={
                  andarBaharData[0]?.winner == 'A'
                    ? 'Andar'
                    : andarBaharData[0]?.winner == 'B'
                      ? 'Bahar'
                      : ''
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
