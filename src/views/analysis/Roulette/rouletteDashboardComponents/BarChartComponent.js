import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip border d-flex justify-content-center align-items-end  bg-light rounded text-dark text-center p-3">
        {`Number ${label} Hit ${payload[0]?.value} times`}
      </div>
    )
  }

  return null
}

const BarChartComponent = (props) => {
  const theme = useSelector((state) => state?.theme)
  const [data, setData] = useState([])
  const [textColor, setTextColor] = useState('rgb(11, 94, 215)')
  const [stroke, setStroke] = useState('rgb(11, 94, 215)')
  const tempData = [
    { name: '0', number: 0, color: 'rgb(20, 206, 67)' },
    { name: '32', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '15', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '19', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '4', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '21', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '2', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '25', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '17', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '34', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '24', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '6', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '27', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '13', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '36', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '11', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '30', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '8', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '23', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '10', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '5', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '24', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '16', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '33', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '1', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '20', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '14', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '31', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '9', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '22', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '18', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '29', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '7', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '28', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '12', number: 0, color: 'rgb(0, 0, 0)' },
    { name: '3', number: 0, color: 'rgb(255, 0, 0)' },
    { name: '26', number: 0, color: 'rgb(0, 0, 0)' },
  ]

  useEffect(() => {
    if (theme === 'dark') {
      setTextColor('rgb(255, 255, 255)')
      setStroke('#535459')
    } else {
      setTextColor('rgb(71, 72, 76)')
      setStroke('#e2e2e2')
    }

    if (props?.data) {
      for (let i = 0; i < props.data.length; i++) {
        tempData[i].name = props.data[i]?.name
        tempData[i].number = props.data[i]?.number
      }
      setData(tempData)
    } else {
      setData(tempData)
    }
  }, [props, theme])

  return (
    <ResponsiveContainer width="100%" minWidth={600} height={200} className={``}>
      <BarChart data={data}>
        <YAxis
          tick={{ fontSize: 13, fill: textColor }}
          stroke={textColor}
          className="text-shadow fw-bold"
        />
        <XAxis
          dataKey="name"
          interval={0}
          tick={({ x, y, payload, index }) => {
            return (
              <text
                x={x}
                y={y + 10} // Adjust label position
                fill={index === 0 ? 'rgb(20, 206, 67)' : textColor} // First label green, others default color
                fontSize={10}
                textAnchor="middle"
              >
                {payload?.value}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
        <CartesianGrid strokeDasharray="0 0 " stroke={stroke} vertical={false} />

        <Tooltip content={<CustomTooltip />} />
        {/*  <Tooltip /> */}

        {/*  <Legend /> */}

        <Bar
          className="drop_shadow"
          type="monotone "
          dataKey="number"
          stroke="rgb(76, 82, 255)"
          fill="rgb(76, 82, 255)"
          radius={[3, 3, 0, 0]}
          barSize={7}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={data[index]?.color} stroke={data[index]?.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent

/* 
//fisrt text color to be green
 <XAxis
          dataKey="name"
          tick={({ x, y, payload, index }) => {
            return (
              <text
                x={x}
                y={y + 10} // Adjust label position
                fill={index === 0 ? 'green' : textColor} // First label green, others default color
                fontSize={10}
                textAnchor="middle"
              >
                {payload?.value}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
*/
