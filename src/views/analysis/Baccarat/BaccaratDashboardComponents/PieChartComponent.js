import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Banker Win', value: 0 },
  { name: 'Player Pair', value: 0 },
  { name: 'Tie', value: 0 },
]
const COLORS = ['rgb(21, 115, 253)', 'rgb(255, 43, 50)', 'rgb(36, 141, 92)', '#FF8042']

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
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const PieChartComponent = (props) => {
  const [bankerVsPlayer, setBankerVsPlayer] = useState(props?.bankerVsPlayer ?? [])

  useEffect(() => {
    setBankerVsPlayer(props?.bankerVsPlayer ?? [])
  }, [props?.bankerVsPlayer])

  return (
    <ResponsiveContainer width="100%" height={300} className={'text-shadow '}>
      <PieChart>
        <Legend />
        <Tooltip />
        <Pie
          className="drop_shadow"
          data={bankerVsPlayer}
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
            <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
