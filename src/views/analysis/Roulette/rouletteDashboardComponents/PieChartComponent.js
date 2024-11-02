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

const PieChartComponent = () => {
  const [data, setData] = useState([])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#808000', '#C39BD3', '#FF8042']
  const tempData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ]

  useEffect(() => {
    setData(tempData)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />

        <Pie
          data={data}
          dataKey="amt"
          innerRadius={30}
          outerRadius={100}
          labelLine={true}
          label={({ name }) => name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

const customedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          <p className="font-weight-bold">{label}</p>
          <p>
            <span className="font-weight-bold">{payload[0].value.toLocaleString()}</span>
          </p>
          <p>
            <span className="font-weight-bold">{payload[1].value.toLocaleString()}</span>
          </p>
        </p>
      </div>
    )
  }
}

export default PieChartComponent
