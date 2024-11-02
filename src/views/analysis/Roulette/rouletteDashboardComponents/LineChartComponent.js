import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const LineChartComponent = () => {
  const [data, setData] = useState([])
  const color = 'blue'
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
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        {/* Update axis text color */}
        <YAxis tick={{ fill: 'blue', fontSize: 10 }} stroke={color} />
        <XAxis dataKey="name" tick={{ fill: 'blue', fontSize: 10 }} stroke={color} />
        <CartesianGrid strokeDasharray="5 5" stroke={color} />
        {/* Custom tooltip */}
        <Tooltip content={customedTooltip} />

        {/* Update legend text color */}
        <Legend wrapperStyle={{ color: 'blue' }} />

        <Line
          stackId={1}
          type="monotone"
          dataKey="uv"
          stroke="rgb(11, 94, 215)"
          fill="rgba(11, 94, 190,0.5)"
          dot={{ strokeWidth: 2, r: 4 }}
        />
        <Line
          stackId={1}
          type="monotone"
          dataKey="pv"
          stroke="rgb(162, 94, 215)"
          fill="rgba(162, 94, 190,0.5)"
          dot={{ strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const customedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ color: 'white' }}>
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

export default LineChartComponent
