import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'andar', value: 0 },
  { name: 'bahar', value: 0 },
]
const COLORS = ['rgb(36, 141, 92)', 'rgb(255, 43, 50)', 'rgb(255, 43, 50)', 'rgb(255, 43, 50)']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (value === 0 || percent === 0) {
    return null
  }

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100)?.toFixed(0)}%`}
    </text>
  )
}

const PieChartComponent = (props) => {
  const [bankerVsPlayer, setBankerVsPlayer] = useState([])
  const [pieData, setPieData] = useState([])

  useEffect(() => {
    setPieData(props?.pieData ?? [])
  }, [props?.pieData])

  return (
    <ResponsiveContainer width="100%" height={300} className={'text-shadow '}>
      <PieChart>
        <Legend />
        <Tooltip />
        <Pie
          className="drop_shadow"
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          stroke={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent

