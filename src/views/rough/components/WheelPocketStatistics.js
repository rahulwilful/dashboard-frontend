import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const WheelPocketStatistics = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  return (
    <div className="w-100">
      <div
        className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font12    ${theme === 'light' ? 'poppins-500' : 'poppins-400'} py-2 `}
        style={{ height: '147px' }}
      >
        <div
          className={`border-end border-secondary border-opacity-25  w-100 h-100 d-flex   px-2 `}
        >
          <table className={`table-${theme}   table-sm `}>
            <thead>
              <tr>
                <th colSpan={2} className={`text-center`}>
                  Wheel Statistics
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>total spin</td>
                <td className={`text-end`}>500</td>
              </tr>
              <tr>
                <td>Standard Deviation</td>
                <td className={`text-end`}>500</td>
              </tr>
              <tr>
                <td>Chi Test</td>
                <td className={`text-end`}>500</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`border-end border-secondary border-opacity-25  w-100  d-flex   px-2`}>
          <div className={`w-100 d-flex flex-column gap-1`}>
            <table className={`table-sm   table-${theme}`}>
              <thead>
                <tr>
                  <th colSpan={2} className={`text-center`}>
                    Pocket Statistics
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Selected Pocket</td>
                  <td className={`text-end`}>
                    <select className="" aria-label="Default select example">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Observerd Frequency</td>
                  <td className={`text-end`}>500</td>
                </tr>
                <tr>
                  <td>Expected Frequency</td>
                  <td className={`text-end`}>500</td>
                </tr>
                <tr>
                  <td>Total Spins</td>
                  <td className={`text-end`}>500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`  w-100 h-100 
                    `}
        >
          <div className={`w-100 d-flex flex-column gap-1`}>
            <table className={`table-sm   mt-0 mt-md-3 table-${theme}`}>
              <tbody>
                <tr>
                  <td>Observerd Pocket Bias</td>
                  <td className={`text-end text-danger`}>500</td>
                </tr>
                <tr>
                  <td>Expected Standard Deviation</td>
                  <td className={`text-end`}>500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheelPocketStatistics
