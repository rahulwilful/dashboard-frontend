import React, { useEffect, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'

const CoreUiLineChart = (props) => {
  const [background, setBackground] = useState('bg-info')
  const [data, setData] = useState({})
  const random = () => Math.round(Math.random() * 100)

  useEffect(() => {
    setBackground(props?.background ?? 'bg-info')
    setData(props?.data ?? tempData)

    if (props?.backgroundColor) {
      tempData.datasets?.[0]?.backgroundColor = props?.backgroundColor
      tempData.datasets?.[0]?.borderColor = props?.backgroundColor
      setData(tempData)
    }
  }, [props])

  let tempData = {
    labels: Array.from({ length: 7 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',

        fill: true,
        data: [60, 81, 30, 59, 30, 22, 40],
      },
    ],
  }

  return (
    <>
      <div
        className={`${background} bg-gradient rounded overflow-hidden h-100 w-100 d-flex align-items-end flex-column  ${background === 'bg-dark' ? 'text-light' : 'text-dark'}`}
      >
        <div className=" w-100 px-2  ">
          <div className=" border-bottom border-secondary border-opacity-25 w-100  text-shadow">
            Title
          </div>
          <div className=" w-100  text-shadow text-sm">Reading : 40</div>
        </div>

        <CChartLine
          className={`mt-1 w-100 p-0`}
          style={{ height: '70px' }}
          data={data}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },

            elements: {
              line: {
                borderWidth: 2,
                tension: 0.4,
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </>
  )
}

export default CoreUiLineChart

