import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { rouletteDataForChi, rouletteDataForSelectOption } from './RouletteData'

const WheelPocketStatistics = (props) => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state?.theme)
  const [expectedValue, setExpectedValue] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState('0')
  const [gameCount, setGameCount] = useState(0)
  const [selectedChiSuqare, setSelectedChiSuqare] = useState(0)
  const [selectedObservedFrequency, setSelectedObservedFrequency] = useState(0)
  const [standardDeviationFromExpected, setStandardDeviationFromExpected] = useState(0)
  const [chiRouletteData, setChiRouletteData] = useState([])

  const [chiSquare, setChiSquare] = useState(0)
  let tempChiRouletteData = rouletteDataForChi

  useEffect(() => {
    console?.log('props.rouletteData: ', props?.rouletteData)
    console?.log('props.data: ', props?.data)

    if (props?.rouletteData) {
      setGameCount(props?.data?.length)
      const gameCount = props?.data?.length
      setExpectedValue((props?.data?.length / 37)?.toFixed(2))

      let expected = (props?.data?.length / 37)?.toFixed(2)

      for (let i = 0; i < props?.rouletteData?.length; i++) {
        if (props?.rouletteData[i]?.name == tempChiRouletteData[i]?.name) {
          tempChiRouletteData[i].observed = props?.rouletteData[i]?.number
        }
      }

      let chi = 0

      for (let i = 0; i < tempChiRouletteData?.length; i++) {
        if (tempChiRouletteData[i]?.name == selectedNumber) {
          setSelectedObservedFrequency(tempChiRouletteData[i]?.observed)
        }

        tempChiRouletteData[i].chi =
          ((tempChiRouletteData[i]?.observed - expected) *
            (tempChiRouletteData[i]?.observed - expected)) /
          expected

        chi += tempChiRouletteData[i]?.chi
      }
      //console.log('chi', chi.toFixed(2))
      let mean = 0
      let temp = 0
      let temp2 = 0
      let s = 0
      let tempExpected = props?.data?.length / 37

      for (let i = 0; i < 37; i++) {
        temp = temp + tempExpected
      }
      //console.log('temp', temp)
      mean = temp / 37
      //console.log('mean', mean)
      for (let i = 0; i < 37; i++) {
        temp2 = temp2 + (tempExpected - mean) * (tempExpected - mean)
      }

      //console.log('temp2', temp2)

      s = temp2 / (37 - 1)
      //console.log('s ', s)

      setChiSquare(chi?.toFixed(2))
    }

    //console.log('roullete', tempChiRouletteData)
    setChiRouletteData(tempChiRouletteData)
  }, [props])

  const selectNumber = (event) => {
    const selected = parseInt(event?.target?.value, 10)
    setSelectedNumber(selected)

    for (let i = 0; i < tempChiRouletteData?.length; i++) {
      if (tempChiRouletteData[i]?.name == selected) {
        setSelectedObservedFrequency(tempChiRouletteData[i]?.observed)
      }
    }
  }

  useEffect(() => {
    //console.log(selectedNumber)
  }, [selectedNumber])

  return (
    <div className="w-100">
      <div
        className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font12    ${theme === 'light' ? 'poppins-500' : 'poppins-400'} py-2 `}
        style={{ minHeight: '147px' }}
      >
        <div className="row h-100 w-100">
          <div className={`col-12 col-lg-6 col-xxl-4 h-100 `}>
            <div
              className={`border-end border-secondary border-opacity-25  w-100 h-100 d-flex   px-2 `}
            >
              <table className={`table-${theme}   table-sm w-100`}>
                <thead>
                  <tr>
                    <th colSpan={2} className={`text-center`}>
                      Wheel Statistics
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-toggle="tooltip" title="Add Admin">
                      total spin
                    </td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {props?.data?.length}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Standard Deviation</td>
                    <td className={`text-end`}>
                      {' '}
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {props?.standardDeviation}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Chi Test</td>
                    <td className={`text-end`}>
                      {' '}
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {chiSquare}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`col-12 col-lg-6 col-xxl-4 h-100 `}>
            <div className={`border-end border-secondary border-opacity-25  w-100  d-flex   px-2`}>
              <div className={`w-100 d-flex flex-column gap-1`}>
                <table className={`table-sm   table-${theme} w-100`}>
                  <thead>
                    <tr>
                      <th colSpan={2} className={`text-center`}>
                        Pocket Statistics
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-100">
                    <tr>
                      <td>Select Pocket</td>
                      <td className={`text-end `}>
                        <select
                          className="rounded-1 px-2"
                          aria-label="Default select example"
                          value={selectedNumber}
                          onChange={selectNumber} // Event handler for selection
                        >
                          {rouletteDataForSelectOption?.map((item) => (
                            <option key={item?.name} value={item?.name}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Observerd Frequency</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {selectedObservedFrequency}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Expected Frequency</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {expectedValue}
                        </span>
                      </td>
                    </tr>
                    <tr className="">
                      <td>Total Spins %</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {((selectedObservedFrequency / props?.data?.length) * 100)?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                    <tr className="d-block d-xxl-none w-100  d-flex justify-content-between">
                      <td>Observerd Pocket Bias</td>
                      <td className={`text-end text-danger`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-danger text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {(
                            ((selectedObservedFrequency - expectedValue) / props?.data?.length) *
                            100
                          )?.toFixed(2)}
                        </span>
                      </td>
                    </tr>

                    <tr className="d-block d-xxl-none w-100  d-flex justify-content-between">
                      <td>Expected Standard Deviation</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          500
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={`col-12 col-lg-6 d-xxl-block d-none col-xxl-4 h-100 `}>
            <div
              className={`  w-100 h-100 
                    `}
            >
              <div className={`w-100 d-flex flex-column gap-1`}>
                <table className={`table-sm   mt-0 mt-md-3 table-${theme}`}>
                  <tbody>
                    <tr>
                      <td>Observerd Pocket Bias</td>
                      <td className={`text-end text-danger`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-danger text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {(
                            ((selectedObservedFrequency - expectedValue) / props?.data?.length) *
                            100
                          )?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Expected Standard Deviation</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          500
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheelPocketStatistics
