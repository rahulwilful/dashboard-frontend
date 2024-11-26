import './Dashboard.css'
import Radar from './TempComponent/Radar/Radar'
import BarGraph from './TempComponent/BarGraph/BarGraph'
import { CCol, CRow, CWidgetStatsF, CLink } from '@coreui/react'
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


const Dashboard = () => {
  const theme = useSelector((state) => state.theme)
  const [rouletteData, setRouletteData] = useState([])
  const [baccaratData, setBaccaratData] = useState([])
  const [andarBaharData, setAndarBaharData] = useState([])

  const getData = async() => {

    try{
      const rouletteRes = await axiosClient.post(`/game/get/latest/data/of/roulette`)

      console.log("rouletteRes : ",rouletteRes)
      setRouletteData(rouletteRes.data.result)
    }catch(e){
      console.log(e)
    }

    try{
      const andar_baharRes = await axiosClient.post(`/game/get/latest/data/of/andar_bahar`)

      console.log("andar_baharRes : ",andar_baharRes)
      setAndarBaharData(andar_baharRes.data.result)
    }catch(e){
      console.log(e)
    }

    try{
      const baccaratRes = await axiosClient.post(`/game/get/latest/data/of/baccarat`)

      console.log("baccaratRes : ",baccaratRes)
      setBaccaratData(baccaratRes.data.result)
    }catch(e){
      console.log(e)
    }

    
   
  }

  useEffect(() => {
    setInterval(() => {
      //getData()
    },1000)
  },[])

  useEffect(()=>{
    console.log("andarBaharData : ",andarBaharData)
  },[andarBaharData])

  useEffect(()=>{
    getData()
  },[])

  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 `}
      style={{ border: 'red' }}
    >
      <div className={``}>
        <h1 className="text-center text-shadow"> Dashboard</h1>
        <div className={``}>
        <div className={`row g-3`}>
        <div className={`col-12 col-sm-6 col-lg-4 `}>
        <GameCard game={rouletteData[0]?.game_type_name}  data={rouletteData} lastNumber={rouletteData[0]?.winning_number} />
        
        </div>
        <div className={`col-12 col-sm-6 col-lg-4 `}>
        <GameCard game={baccaratData[0]?.game_type_name} data={baccaratData} winner={baccaratData[0]?.winner == 'P' ? 'Player' :baccaratData[0]?.winner == 'B' ? 'Banker' : ''} />
        
        </div>
        <div className={`col-12 col-sm-6 col-lg-4 `}>
        <GameCard game={andarBaharData[0]?.game_type_name} data={andarBaharData} winner={andarBaharData[0]?.winner == 'A' ? 'Andar' :andarBaharData[0]?.winner == 'B' ? 'Bahar' : ''} />
        
        </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Dashboard
