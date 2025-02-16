import React, { useEffect, useState } from 'react'
import roulletImage from 'src/assets/images/tables/2.png'
import { BaccaratTables } from '../../../components/Constants/TableImages'
import { useSelector } from 'react-redux'
import s from './GameCard.module.css'

const GameCard = (props) => {
  const [image, setImage] = useState()

  const handleFaceImages = () => {
    if (props?.game?.toLowerCase()?.includes('baccarat')) setImage(BaccaratTables[0]?.table)
    else if (props?.game?.toLowerCase()?.includes('andar bahar')) setImage(BaccaratTables[1]?.table)
    else if (props?.game?.toLowerCase()?.includes('3 card poker'))
      setImage(BaccaratTables[2]?.table)
    else if (props?.game?.toLowerCase()?.includes('5 card poker'))
      setImage(BaccaratTables[3]?.table)
    else if (props?.game?.toLowerCase()?.includes('house taxes')) setImage(BaccaratTables[4]?.table)
    else if (props?.game?.toLowerCase()?.includes('mini flush')) setImage(BaccaratTables[5]?.table)
    else if (props?.game?.toLowerCase()?.includes('casino war')) setImage(BaccaratTables[6]?.table)
    else if (props?.game?.toLowerCase()?.includes('black jack')) setImage(BaccaratTables[7]?.table)
    else if (props?.game?.toLowerCase()?.includes('dragon tiger'))
      setImage(BaccaratTables[8]?.table)
    else if (props?.game?.toLowerCase()?.includes('7 up down')) setImage(BaccaratTables[9]?.table)
    else if (props?.game?.toLowerCase()?.includes('teen patti')) setImage(BaccaratTables[10]?.table)
    else if (props?.game?.toLowerCase()?.includes('texas holdem'))
      setImage(BaccaratTables[11]?.table)
    else if (props?.game?.toLowerCase()?.includes('pai gow')) setImage(BaccaratTables[12]?.table)
    else if (props?.game?.toLowerCase()?.includes('bai buu')) setImage(BaccaratTables[13]?.table)
    else if (props?.game?.toLowerCase()?.includes('mahjong')) setImage(BaccaratTables[14]?.table)
    else if (props?.game?.toLowerCase()?.includes('nui nui')) setImage(BaccaratTables[15]?.table)
    else setImage(BaccaratTables[18]?.table)
  }

  useEffect(() => {
    if (props?.game) {
      handleFaceImages()
    }
  }, [props])

  const theme = useSelector((state) => state?.theme)

  return (
    <div
      className={`${theme === 'dark' ? 'text-light' : 'text-dark'} overflow-hidden table-main h-100 p-0 container capitalize card border-0 shadow-s card-hover`}
    >
      <div className="overflow-hidden w-100 h-75 rounded-top">
        <img
          src={props?.game === 'roulette' ? roulletImage : image}
          className="w-100 h-100 card-hover2 drop_shadow bg-dark bg-gradient object-fit-cover"
          alt={props?.game}
        />
      </div>
      <div className="d-flex flex-column gap-2 p-2 poppins-400">
        <div className={`text-dark ${props?.lastNumber ? '' : 'd-none'}`}>
          <span className="fw-semibold">Winning Number</span>: {props?.lastNumber ?? ''}
        </div>
        <div className={`text-dark ${props?.winner ? '' : 'd-none'}`}>
          <span className="fw-semibold">Winner</span>: {props?.winner}
        </div>
        <div className="text-dark">
          <span className="fw-semibold">Table Name</span>: {props?.data?.[0]?.table_name}
        </div>
        <div className="text-dark">
          <span className="fw-semibold">Table Limit</span>: {props?.data?.[0]?.table_limit_name}
        </div>
        <div className="text-dark">
          <span className="fw-semibold">Game Type</span>: {props?.game}
        </div>
      </div>
    </div>
  )
}

export default GameCard
