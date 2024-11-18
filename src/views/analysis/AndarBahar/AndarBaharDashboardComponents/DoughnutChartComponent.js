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
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip border d-flex justify-content-center align-items-end  bg-light rounded text-dark text-center p-3">
        {`Number ${label} Hit ${payload[0].value} times`}
      </div>
    );
  }

  return null;
};

const DoughnutChartComponent = (props) => {
  const [data, setData] = useState([])
  const [isdataLoaded, setIsdataLoaded] = useState(false)
  const COLORS = ['rgb(22, 115, 253)', 'rgb(255, 43, 50)', 'rgb(50, 134, 252)', 'rgb(252, 68, 83)']
  useEffect(() => {
    setData(props.doughnutData)
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
              {data.map((entry, index) => (
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
