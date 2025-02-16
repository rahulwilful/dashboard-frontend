import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import s from './PlayerBankerData.module.css'

const PlayerBankerData2 = (props) => {
  const theme = useSelector((state) => state.theme)
  const [renderKey, setRenderKey] = useState(0)
  const [currentShoe, setCurrentShoe] = useState(null)
  const [shoeData, setShoeData] = useState([{}])

  useEffect(() => {
    setCurrentShoe(props.shoes?.[0])

    console.log('props.shoeData[0]?.data[0]?.playerSplit[0]?.j', props.shoeData)

    /*  for (let i = 0; i < props.shoeData?.length; i++) {
        for (let j = 0; j < props.shoeData[i]?.data?.length; j++) {
          const tempPlayerSplit = props.shoeData[i]?.data[j]?.player_cards?.split(',')
          const tempBankerSplit = props.shoeData[i]?.data[j]?.banker_cards?.split(',')
  
          let PlayerSplit = []
          let BankerSplit = []
  
          for (let k = 0; k < tempPlayerSplit?.length; k++) {
            PlayerSplit.push(tempPlayerSplit[k])
          }
  
          for (let k = 0; k < tempBankerSplit?.length; k++) {
            BankerSplit.push(tempBankerSplit[k])
          }
  
          props.shoeData[i].data[j].playerSplit = PlayerSplit
          props.shoeData[i].data[j].bankerSplit = BankerSplit
        }
      } */

    setShoeData(props.shoeData)
    setRenderKey(renderKey + 1)
  }, [props])

  useEffect(() => {
    console.log('shoeData', shoeData)
  }, [shoeData])

  const handleShoeChange = (event) => {
    setCurrentShoe(event.target.value) // Update currentShoe with the selected value
  }

  return (
    <div
      className={`border ${theme === 'light' ? 'text-dark' : 'text-light'} ${shoeData ? '' : 'd-none'}`}
    >
      <div className={`row gx-1`}>
        {}
        <div className={`col-12 h-100 col-md-5 `}>
          <div className={`w-100 h-75 border player`}>
            <div
              className={` w-100 h-100 d-flex justify-content-center gap-2 p-2 align-items-center font12  `}
            >
              <div
                className={`w-100  border ${s.cards}  d-flex justify-content-center align-items-center`}
              >
                {shoeData?.length > 0 && shoeData[0]?.data?.length > 0
                  ? shoeData[0]?.data[0]?.playerCard1
                  : 'Loading...'}
              </div>
              <div
                className={`w-100 border ${s.cards}  d-flex justify-content-center align-items-center`}
              >
                2A
              </div>
            </div>
          </div>
        </div>
        <div className={`col-12 col-md-2`}>
          <div className={` h-100  border info p-3`}>
            <table className={`table-${theme}   table-sm w-100 `}>
              <tbody>
                <tr>
                  <td>Shoe :</td>
                  <td className={`text-end`}>
                    <select
                      className="rounded-1 px-2"
                      aria-label="Default select example"
                      value={currentShoe}
                      onChange={handleShoeChange} // Event handler for selection
                    >
                      {props.shoes?.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Winner</td>
                  <td className={`text-end`}>
                    <span
                      className={`rounded-1 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                    >
                      Banker
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Side</td>
                  <td className={`text-end`}>
                    <span
                      className={`rounded-1 px-4 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                    >
                      3
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`col-12 h-100 col-md-5 `}>
          <div className={`w-100 h-75 border player`}>
            <div
              className={` w-100 h-100 d-flex justify-content-center gap-2 p-2 align-items-center font12  `}
            >
              <div
                className={`w-100  border ${s.cards}  d-flex justify-content-center align-items-center`}
              >
                {' '}
                2A
              </div>
              <div
                className={`w-100 border ${s.cards}  d-flex justify-content-center align-items-center`}
              >
                {' '}
                2A
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBankerData2
