import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Banker Win', value: 0 },
  { name: 'Player Pair', value: 0 },
  { name: 'Tie', value: 0 },
]
const COLORS = [
  'rgb(21, 115, 253)',
  'rgb(255, 43, 50)',
  '#9C27B0',
  '#E91E63',
  '#FF9800',
  '#8BC34A',
  '#4CAF50',
  '#2196F3',
  '#03A9F4',
  '#009688',
  '#66D9EF',
  '#8F9E45',
  '#00BCD4',
]

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

const TooltipContent = ({ payload }) => {
  console.log('payload: ', payload)
  return (
    <div className="border p-2 rounded bg-light shadow-s  text-dark">
      {payload?.map((entry, index) => (
        <div key={index}>{`${entry?.name} won ${entry?.value} times`}</div>
      ))}
    </div>
  )
}

const PieChartComponent = (props) => {
  const [bankerVsPlayer, setBankerVsPlayer] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    setBankerVsPlayer(props?.bankerVsPlayer)
    setData(props?.data)
  }, [props?.bankerVsPlayer, props?.data])

  return (
    <ResponsiveContainer width="100%" height={300} className={'text-shadow '}>
      <PieChart>
        <Legend />
        <Tooltip content={<TooltipContent />} />
        <Pie
          className="drop_shadow"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="wins"
          labelLine={false}
          stroke={false}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
