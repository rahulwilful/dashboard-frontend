import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DoughNutChartComonent from './DoughNutChartComonent'
import { Zone1RouletteData, Zone2RouletteData, Zone3RouletteData } from './RouletteData'

const DropZoneStatistics = (props) => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state?.theme)
  const [Zone1, setZone1] = useState(0)
  const [Zone2, setZone2] = useState(0)
  const [Zone3, setZone3] = useState(0)
  const [Zone1Total, setZone1Total] = useState(0)
  const [Zone2Total, setZone2Total] = useState(0)
  const [Zone3Total, setZone3Total] = useState(0)
  const [chiSquare, setChiSquare] = useState(0)
  const [pieData, setPieData] = useState([
    { name: 'z1', number: 0 },
    { name: 'z2', number: 0 },
    { name: 'z3', number: 0 },
  ])
  let expectedValue = 0

  useEffect(() => {
    let z1 = 0
    let z2 = 0
    let z3 = 0

    if (props?.rouletteData) {
      expectedValue = props.data?.length / 3
      //console.log('props.rouletteData: ', props.rouletteData)
      for (let i = 0; i < props?.rouletteData?.length; i++) {
        if (i <= 12) {
          z1 += props?.rouletteData[i]?.number || 0
        }
        if (i >= 13 && i <= 24) {
          z2 += props?.rouletteData[i]?.number || 0
        }
        if (i > 24) {
          z3 += props?.rouletteData[i]?.number || 0
        }
      }

      //console.log('z1 z2 z3 ', z1, ' ', z2, ' ', z3)
      setZone1Total(z1)
      setZone2Total(z2)
      setZone3Total(z3)
      const tempPieData = [
        { name: 'z1', number: z1 },
        { name: 'z2', number: z2 },
        { name: 'z3', number: z3 },
      ]
      let chi = ((z1 - expectedValue) * (z1 - expectedValue)) / expectedValue
      chi += ((z2 - expectedValue) * (z2 - expectedValue)) / expectedValue
      chi += ((z3 - expectedValue) * (z3 - expectedValue)) / expectedValue

      setPieData(tempPieData)
      setChiSquare(chi.toFixed(2))
    }
  }, [props])

  return (
    <div className="w-100 h-100">
      <div
        className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font12   ${theme === 'light' ? 'poppins-500' : 'poppins-400'}  py-2 `}
        style={{ minHeight: '127px' }}
      >
        <div className="row h-100 w-100">
          <div className={`col-12 col-lg-6 col-xxl-4 h-100 `}>
            <div
              className={`border-end border-secondary border-opacity-25  d-flex justify-content-center w-100 h-100 d-flex   px-2 `}
            >
              <table className={`table-${theme}  text-shadow table-sm `}>
                <thead>
                  <tr>
                    <th colSpan={2} className={`text-center`}>
                      Drop Zone Statistics
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>total spin</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {props.data?.length || 0}
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
                        {props.standardDeviation || 0}
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
                        {chiSquare || 0}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`col-12 col-lg-6 col-xxl-4 h-100 `}>
            <div
              className={` border-end border-secondary border-opacity-25   d-flex justify-content-center   w-100 h-100 d-flex   px-2`}
            >
              <div className={`  gap-1`}>
                <table className={`table-sm  text-shadow  table-${theme}`}>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Frequency</th>
                      <th>percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Zone 1</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {Zone1Total || 0}
                        </span>
                      </td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {((Zone1Total / props.data?.length) * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Zone 2</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {Zone2Total || 0}
                        </span>
                      </td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {((Zone2Total / props.data?.length) * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Zone 3</td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {Zone3Total || 0}
                        </span>
                      </td>
                      <td className={`text-end`}>
                        {' '}
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {((Zone3Total / props.data?.length) * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={`col-12 col-lg-6 col-xxl-4  `} style={{ minHeight: '127px' }}>
            <div
              className={`  w-100 h-100 border-end   border-secondary border-opacity-25
                    `}
            >
              <DoughNutChartComonent pieData={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropZoneStatistics

