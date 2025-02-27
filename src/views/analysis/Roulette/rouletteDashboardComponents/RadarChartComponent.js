import React, { useState, useEffect } from 'react'
import {
  RadarChart,
  Radar,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from 'recharts'

const RadarChartComponent = (props) => {
  const [data, setData] = useState([])
  const tempData = [
    { name: '1', number: 9800, color: 'red' },
    { name: '2', number: 1398, color: 'black' },
    { name: '3', number: 9800, color: 'red' },
    { name: '4', number: 3908, color: 'black' },
    { name: '5', number: 4800, color: 'red' },
    { name: '6', number: 3802, color: 'black' },
    { name: '7', number: 4300, color: 'red' },
    { name: '8', number: 6800, color: 'black' },
    { name: '9', number: 4800, color: 'red' },
    { name: '10', number: 3802, color: 'black' },
    { name: '11', number: 4300, color: 'red' },
    { name: '12', number: 6800, color: 'black' },
    { name: '13', number: 4800, color: 'red' },
    { name: '14', number: 3802, color: 'black' },
    { name: '15', number: 4300, color: 'red' },
    { name: '16', number: 6800, color: 'black' },
    { name: '17', number: 4800, color: 'red' },
    { name: '18', number: 3802, color: 'black' },
    { name: '19', number: 4300, color: 'red' },
    { name: '20', number: 6800, color: 'black' },
    { name: '21', number: 4800, color: 'red' },
    { name: '22', number: 3802, color: 'black' },
    { name: '23', number: 4300, color: 'red' },
    { name: '24', number: 6800, color: 'black' },
    { name: '25', number: 4800, color: 'red' },
    { name: '26', number: 3802, color: 'black' },
    { name: '27', number: 4300, color: 'red' },
    { name: '28', number: 6800, color: 'black' },
    { name: '29', number: 4800, color: 'red' },
    { name: '30', number: 3802, color: 'black' },
    { name: '31', number: 4300, color: 'red' },
    { name: '32', number: 6800, color: 'black' },
    { name: '33', number: 4800, color: 'red' },
    { name: '34', number: 3802, color: 'black' },
    { name: '35', number: 4300, color: 'red' },
    { name: '36', number: 6800, color: 'black' },
  ]

  useEffect(() => {
    //console.log('props.data: ', props.data)
    if (props.data?.length) {
      setData(props.data)
      // console.log('props.data: ', props.data)
    } else {
      setData(tempData)
    }
  }, [props.data?.length])

  return (
    <ResponsiveContainer width="100%" height={'100%'} className="">
      <RadarChart outerRadius="80%" data={data}>
        <Tooltip dataKey="name" />
        {/*   <PolarGrid /> */}
        {/* <PolarAngleAxis dataKey="name" /> */}
        {/*   <PolarRadiusAxis /> */}
        <PolarGrid gridType="" radialLines={false} />
        <Radar
          data={data}
          dataKey="number"
          stroke="rgb(76, 82, 255)"
          strokeWidth={1.5}
          fill="#8884d8"
          fillOpacity={0.3}
          dot={{ strokeWidth: 4, r: 2 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

const customedTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          <p className="font-weight-bold">{label}</p>
          <p>
            <span className="font-weight-bold">{payload[0]?.value?.toLocaleString()}</span>
          </p>
          <p>
            <span className="font-weight-bold">{payload[1]?.value?.toLocaleString()}</span>
          </p>
        </p>
      </div>
    )
  }
}

export default RadarChartComponent
