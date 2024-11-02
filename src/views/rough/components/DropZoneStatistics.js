import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DoughNutChartComonent from './DoughNutChartComonent'

const DropZoneStatistics = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  return (
    <div className="w-100">
      <div
        className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font12   ${theme === 'light' ? 'poppins-500' : 'poppins-400'}  py-2 `}
        style={{ height: '127px' }}
      >
        <div
          className={`border-end border-secondary border-opacity-25  w-100 h-100 d-flex   px-2 `}
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
        <div className={`border-end border-secondary border-opacity-25  w-100 h-100 d-flex   px-2`}>
          <div className={`w-100 d-flex flex-column gap-1`}>
            <table className={`table-sm  text-shadow table-${theme}`}>
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
                  <td className={`text-end`}>500</td>
                  <td className={`text-end`}>500%</td>
                </tr>
                <tr>
                  <td>Zone 2</td>
                  <td className={`text-end`}>500</td>
                  <td className={`text-end`}>500%</td>
                </tr>
                <tr>
                  <td>Zone 3</td>
                  <td className={`text-end`}>500</td>
                  <td className={`text-end`}>500%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`  w-100 h-100 
                    `}
        >
          <DoughNutChartComonent />
        </div>
      </div>
    </div>
  )
}

export default DropZoneStatistics
