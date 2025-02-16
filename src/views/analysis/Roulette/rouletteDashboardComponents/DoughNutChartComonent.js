import React, { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const DoughNutChartComonent = (props) => {
  const [data, setData] = useState([])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#808000', '#C39BD3', '#FF8042']
  const tempData = [
    { name: ' z1', number: 1700 },
    { name: ' z2', number: 1210 },
    { name: ' z3', number: 2290 },
  ]

  useEffect(() => {
    if (props?.pieData) {
      setData(props.pieData)
    } else {
      setData(tempData)
    }
  }, [props])

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={'100%'}>
      <PieChart>
        <Tooltip />
        <Legend />

        <Pie
          data={data}
          dataKey="number"
          innerRadius={15}
          outerRadius={40}
          labelLine={false}
          lable={renderCustomizedLabel}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

const customedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload?.length) {
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

export default DoughNutChartComonent

