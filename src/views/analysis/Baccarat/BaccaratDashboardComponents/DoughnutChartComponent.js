import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

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
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (value === 0 || percent === 0) {
    return null
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="12px"
    >
      {`${(percent * 100)?.toFixed(0)}%`}
    </text>
  )
}

const DoughnutChartComponent = (props) => {
  const [data, setData] = useState([])
  const [isdataLoaded, setIsdataLoaded] = useState(false)
  const COLORS = ['rgb(55, 64, 239)', 'rgb(255, 43, 50)', 'rgb(38, 175, 255)', 'rgb(255, 100, 22)']
  useEffect(() => {
    setData(props?.doughnutData)
  })
  return (
    <div>
      <div className={``}>
        <ResponsiveContainer width="100%" height={300} className={'text-shadow '}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              className="drop_shadow"
              data={data}
              cx="50%"
              cy="50%"
              radius={[0, 9, 9, 0]}
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
              stroke={false}
            >
              {data?.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={``}></div>
    </div>
  )
}

export default DoughnutChartComponent

