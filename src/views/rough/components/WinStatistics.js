import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const WinStatistics = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  return (
    <div className="w-100">
      <div
        className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font12   ${theme === 'light' ? 'poppins-500' : 'poppins-400'} py-2 `}
        style={{ height: '127px' }}
      >
        <div className={`border-end border-secondary border-opacity-25  w-50 h-100 d-flex   px-2 `}>
          <table className={`table-${theme}   table-sm `}>
            <tbody>
              <tr>
                <td>Red</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>black</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Even</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Odd</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`border-end border-secondary border-opacity-25  w-50 h-100 d-flex   px-2 `}>
          <table className={`table-${theme}   table-sm `}>
            <tbody>
              <tr>
                <td>1-18</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>19-36</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Neighbors-0</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Orphans</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`border-end border-secondary border-opacity-25  w-50 h-100 d-flex   px-2 `}>
          <table className={`table-${theme}   table-sm `}>
            <tbody>
              <tr>
                <td>1st 12</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>2nd 12</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>3rd 12</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Series 5-8</td>
                <td className={`text-end`}>
                  <span
                    className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                  >
                    49%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className={`  w-100 h-100 
                  `}
        >
          <div
            className={`w-100 h-100 d-flex flex-column gap-1 justify-content-center align-items-center `}
          >
            <div> Total Games Used In Calculation</div>
            <div>
              {' '}
              <span
                className={`rounded-1 bg-success text-light border-0 bg-gradient px-2 shadow-xs border border-secondary border-opacity-25`}
              >
                450
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinStatistics
