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

const BarChartComponent = (props) => {
  const theme = useSelector((state) => state.theme)
  const [data, setData] = useState([])
  const [textColor, setTextColor] = useState('rgb(11, 94, 215)')
  const [stroke, setStroke] = useState('rgb(11, 94, 215)')
  const tempData = [
    { name: '0', uv: 222, color: 'rgb(20, 206, 67)' },
    { name: '32', uv: 111, color: 'rgb(76,82,255)' },
    { name: '15', uv: 222, color: 'rgb(76,82,255)' },
    { name: '19', uv: 233, color: 'rgb(76,82,255)' },
    { name: '4', uv: 344, color: 'rgb(76,82,255)' },
    { name: '21', uv: 155, color: 'rgb(76,82,255)' },
    { name: '2', uv: 266, color: 'rgb(76,82,255)' },
    { name: '25', uv: 777, color: 'rgb(76,82,255)' },
    { name: '17', uv: 588, color: 'rgb(76,82,255)' },
    { name: '34', uv: 336, color: 'rgb(76,82,255)' },
    { name: '24', uv: 699, color: 'rgb(76,82,255)' },
    { name: '6', uv: 810, color: 'rgb(76,82,255)' },
    { name: '27', uv: 411, color: 'rgb(76,82,255)' },
    { name: '13', uv: 912, color: 'rgb(76,82,255)' },
    { name: '36', uv: 313, color: 'rgb(76,82,255)' },
    { name: '11', uv: 414, color: 'rgb(76,82,255)' },
    { name: '30', uv: 515, color: 'rgb(76,82,255)' },
    { name: '8', uv: 216, color: 'rgb(76,82,255)' },
    { name: '23', uv: 117, color: 'rgb(76,82,255)' },
    { name: '10', uv: 318, color: 'rgb(76,82,255)' },
    { name: '5', uv: 919, color: 'rgb(76,82,255)' },
    { name: '24', uv: 70, color: 'rgb(76,82,255)' },
    { name: '16', uv: 221, color: 'rgb(76,82,255)' },
    { name: '33', uv: 322, color: 'rgb(76,82,255)' },
    { name: '1', uv: 223, color: 'rgb(76,82,255)' },
    { name: '20', uv: 524, color: 'rgb(76,82,255)' },
    { name: '14', uv: 725, color: 'rgb(76,82,255)' },
    { name: '31', uv: 126, color: 'rgb(76,82,255)' },
    { name: '9', uv: 427, color: 'rgb(76,82,255)' },
    { name: '22', uv: 428, color: 'rgb(76,82,255)' },
    { name: '18', uv: 529, color: 'rgb(76,82,255)' },
    { name: '29', uv: 930, color: 'rgb(76,82,255)' },
    { name: '7', uv: 315, color: 'rgb(76,82,255)' },
    { name: '28', uv: 432, color: 'rgb(76,82,255)' },
    { name: '12', uv: 333, color: 'rgb(76,82,255)' },
    { name: '3', uv: 134, color: 'rgb(76,82,255)' },
    { name: '26', uv: 335, color: 'rgb(76,82,255)' },
  ]

  useEffect(() => {
    if (theme === 'dark') {
      setTextColor('rgb(255, 255, 255)')
      setStroke('#535459')
    } else {
      setTextColor('rgb(71, 72, 76)')
      setStroke('#e2e2e2')
    }

    if (props.data) {
      setData(props.data)
    } else {
      setData(tempData)
    }
  }, [props, theme])

  return (
    <ResponsiveContainer width="100%" height={200} className={``}>
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
                {payload.value}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
        <CartesianGrid strokeDasharray="0 0 " stroke={stroke} vertical={false} />
        <Tooltip />

        {/*  <Legend /> */}

        <Bar
          type="monotone "
          dataKey="uv"
          stroke="rgb(76, 82, 255)"
          fill="rgb(76, 82, 255)"
          radius={[4, 4, 0, 0]}
          barSize={7}
        >
          {data.map(
            (entry, index) => (
              console.log('index', index == 0 ? 'rgb(20, 206, 67)' : 'rgb(76, 82, 255)'),
              (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? 'rgb(20, 206, 67)' : 'rgb(76, 82, 255)'}
                  stroke={index === 0 ? 'rgb(20, 206, 67)' : 'rgb(76, 82, 255)'}
                />
              )
            ),
          )}
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
                {payload.value}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
*/
