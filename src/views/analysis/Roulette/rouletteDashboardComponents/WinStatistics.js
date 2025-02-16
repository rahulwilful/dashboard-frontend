import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const WinStatistics = (props) => {
  const [data, setData] = useState([])
  const [even, setEven] = useState(0)
  const [odd, setOdd] = useState(0)
  const [number1_18, setNumber1_18] = useState(0)
  const [numbers19_36, setNumbers19_36] = useState(0)
  const [fisrt12, setFisrt12] = useState(0)
  const [second12, setSecond12] = useState(0)
  const [third12, setThird12] = useState(0)
  const [oddEvenTotal, setOddEvenTotal] = useState(0)
  const [redTotal, setRedTotal] = useState(0)
  const [blackTotal, setBlackTotal] = useState(0)
  const [redBlackTotal, setRedBlackTotal] = useState(0)
  const [orphanLines, setOrphanLines] = useState(0)
  const [voisins, setVoisins] = useState(0)
  const [jeuOfZero, setJeuOfZero] = useState(0)
  const [tiers, setTiers] = useState(0)
  const theme = useSelector((state) => state?.theme)

  let tempData = [
    { name: '0', number: 0, color: 'green' },
    { name: '32', number: 0, color: 'red' },
    { name: '15', number: 0, color: 'black' },
    { name: '19', number: 0, color: 'red' },
    { name: '4', number: 0, color: 'black' },
    { name: '21', number: 0, color: 'red' },
    { name: '2', number: 0, color: 'black' },
    { name: '25', number: 0, color: 'red' },
    { name: '17', number: 0, color: 'black' },
    { name: '34', number: 0, color: 'red' },
    { name: '6', number: 0, color: 'black' },
    { name: '27', number: 0, color: 'red' },
    { name: '13', number: 0, color: 'black' },
    { name: '36', number: 0, color: 'red' },
    { name: '11', number: 0, color: 'black' },
    { name: '30', number: 0, color: 'red' },
    { name: '8', number: 0, color: 'black' },
    { name: '23', number: 0, color: 'red' },
    { name: '10', number: 0, color: 'black' },
    { name: '5', number: 0, color: 'red' },
    { name: '24', number: 0, color: 'black' },
    { name: '16', number: 0, color: 'red' },
    { name: '33', number: 0, color: 'black' },
    { name: '1', number: 0, color: 'red' },
    { name: '20', number: 0, color: 'black' },
    { name: '14', number: 0, color: 'red' },
    { name: '31', number: 0, color: 'black' },
    { name: '9', number: 0, color: 'red' },
    { name: '22', number: 0, color: 'black' },
    { name: '18', number: 0, color: 'red' },
    { name: '29', number: 0, color: 'black' },
    { name: '7', number: 0, color: 'red' },
    { name: '28', number: 0, color: 'black' },
    { name: '12', number: 0, color: 'red' },
    { name: '35', number: 0, color: 'black' },
    { name: '3', number: 0, color: 'red' },
    { name: '26', number: 0, color: 'black' },
  ]

  let orphenLinesNumbers = new Map([
    ['1', true],
    ['6', true],
    ['9', true],
    ['14', true],
    ['17', true],
    ['20', true],
    ['31', true],
    ['34', true],
  ])

  let voisinsNumbers = new Map()
  // Adding key-value pairs
  voisinsNumbers.set(22, true)
  voisinsNumbers.set(18, true)
  voisinsNumbers.set(29, true)
  voisinsNumbers.set(7, true)
  voisinsNumbers.set(28, true)
  voisinsNumbers.set(12, true)
  voisinsNumbers.set(35, true)
  voisinsNumbers.set(3, true)
  voisinsNumbers.set(26, true)
  voisinsNumbers.set(0, true)
  voisinsNumbers.set(32, true)
  voisinsNumbers.set(15, true)
  voisinsNumbers.set(19, true)
  voisinsNumbers.set(4, true)
  voisinsNumbers.set(21, true)
  voisinsNumbers.set(2, true)
  voisinsNumbers.set(25, true)

  let jeuOfZeroNumbers = new Map()
  jeuOfZeroNumbers.set(12, true)
  jeuOfZeroNumbers.set(35, true)
  jeuOfZeroNumbers.set(3, true)
  jeuOfZeroNumbers.set(26, true)
  jeuOfZeroNumbers.set(0, true)
  jeuOfZeroNumbers.set(32, true)
  jeuOfZeroNumbers.set(15, true)

  let tiersNumbers = new Map()
  tiersNumbers.set(27, true)
  tiersNumbers.set(13, true)
  tiersNumbers.set(36, true)
  tiersNumbers.set(11, true)
  tiersNumbers.set(30, true)
  tiersNumbers.set(8, true)
  tiersNumbers.set(23, true)
  tiersNumbers.set(10, true)
  tiersNumbers.set(5, true)
  tiersNumbers.set(24, true)
  tiersNumbers.set(16, true)
  tiersNumbers.set(33, true)

  useEffect(() => {
    if (props?.data) {
      let evenNumber = 0
      let oddNumber = 0
      let number1_18 = 0
      let numbers19_36 = 0
      let fisrt12 = 0
      let second12 = 0
      let third12 = 0
      let orphan = 0
      let jeu = 0
      let voisin = 0
      let tier = 0
      //console.log('props.data ', props.data)

      for (let i in props?.data) {
        if (props?.data[i]?.winning_number % 2 == 0) {
          evenNumber++
        } else {
          oddNumber++
        }

        if (props?.data[i]?.winning_number >= 1 && props?.data[i]?.winning_number <= 18) {
          number1_18++
        }

        if (props?.data[i]?.winning_number >= 19 && props?.data[i]?.winning_number <= 36) {
          numbers19_36++
        }

        if (props?.data[i]?.winning_number >= 1 && props?.data[i]?.winning_number <= 12) {
          fisrt12++
        }

        if (props?.data[i]?.winning_number >= 13 && props?.data[i]?.winning_number <= 24) {
          second12++
        }

        if (props?.data[i]?.winning_number >= 25 && props?.data[i]?.winning_number <= 36) {
          third12++
        }

        if (orphenLinesNumbers.get(String(props?.data[i]?.winning_number)) == true) {
          orphan++
        }

        if (jeuOfZeroNumbers.get(props?.data[i]?.winning_number) == true) {
          jeu++
        }

        if (voisinsNumbers.get(props?.data[i]?.winning_number) == true) {
          voisin++
        }

        if (tiersNumbers.get(props?.data[i]?.winning_number) == true) {
          tier++
        }
      }

      /*  console.log('tier: ', tier)
      console.log('props.data.length: ', props.data.length)
      console.log('even ', evenNumber, ' odd ', oddNumber) */
      setEven(evenNumber)
      setOdd(oddNumber)
      setOddEvenTotal(evenNumber + oddNumber)
      setNumber1_18(number1_18)
      setNumbers19_36(numbers19_36)
      setFisrt12(fisrt12)
      setSecond12(second12)
      setThird12(third12)
      setOrphanLines(orphan)
      setJeuOfZero(jeu)
      setVoisins(voisin)
      setTiers(tier)
    }
    setRedTotal(props?.red)
    setBlackTotal(props?.black)
    setRedBlackTotal(props?.redBlackTotal)
  }, [props?.data])

  useEffect(() => {
    //console.log('even ', even, ' odd ', odd)
  }, [even, odd])

  return (
    <div className="w-100">
      <div
        className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font12   ${theme === 'light' ? 'poppins-500' : 'poppins-400'} py-2 `}
        style={{ minHeight: '127px' }}
      >
        <div className="row h-100 w-100">
          <div className={`col-12 col-sm-6 col-lg-4 col-xxl-3  h-100 `}>
            <div className={`border-end border-secondary border-opacity-25  h-100 d-flex   px-2 `}>
              <table className={`table-${theme}   table-sm w-100 `}>
                <tbody>
                  <tr>
                    <td>Red</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((redTotal / redBlackTotal) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>black</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((blackTotal / redBlackTotal) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Even</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((even / oddEvenTotal) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Odd</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((odd / oddEvenTotal) * 100)}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`col-12 col-sm-6 col-lg-4 col-xxl-3  h-100 `}>
            <div className={`border-end border-secondary border-opacity-25  h-100 d-flex   px-2 `}>
              <table className={`table-${theme}   table-sm w-100 `}>
                <tbody>
                  <tr>
                    <td>1-18</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((number1_18 / (number1_18 + numbers19_36)) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>19-36</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((numbers19_36 / (number1_18 + numbers19_36)) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Neighbors-0</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((jeuOfZero / props?.data?.length) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Orphans</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((orphanLines / props?.data?.length) * 100)}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`col-12 col-sm-6 col-lg-4 col-xxl-3  h-100 `}>
            <div className={`border-end border-secondary border-opacity-25  h-100 d-flex   px-2 `}>
              <table className={`table-${theme}   table-sm w-100 `}>
                <tbody>
                  <tr>
                    <td>Voisins</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((voisins / props?.data?.length) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tiers</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((tiers / props?.data?.length) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>1st 12</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((fisrt12 / (fisrt12 + second12 + third12)) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>2nd 12</td>
                    <td className={`text-end`}>
                      <span
                        className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                      >
                        {Math.floor((second12 / (fisrt12 + second12 + third12)) * 100)}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`col-12 col-sm-6 col-lg-4 col-xxl-3  h-100 `}>
            <div
              className={`w-100  h-100 
                  `}
            >
              <div
                className={`w-100  py-2  d-flex   align-items-center border-end border-secondary border-opacity-25 px-2 `}
              >
                <table className={`table-${theme}   table-sm w-100 `}>
                  <tbody>
                    <tr>
                      <td>3rd 12</td>
                      <td className={`text-end`}>
                        <span
                          className={`rounded-1 bg-primary text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {Math.floor((third12 / (fisrt12 + second12 + third12)) * 100)}%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Games</td>
                      <td className={`text-end`}>
                        <span
                          className={`rounded-1 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {props?.data?.length}
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

export default WinStatistics
