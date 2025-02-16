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

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value, percentage } = payload[0].payload;
    return (
      <div className='bg-light rounded p-2 text-dark'>
        <p>{` ${name} ${percentage}% is wins`}</p>
       
      </div>
    )
  }
  return null;
};

const DoughnutChartComponent = (props) => {
  const [data, setData] = useState([])
  const COLORS = ['rgb(22, 115, 253)', 'rgb(255, 43, 50)', 'rgb(50, 134, 252)', 'rgb(252, 68, 83)']

  useEffect(() => {
    let data = []
    let total = 0
    for (let i in props.doughnutData ?? []) {
      total += props.doughnutData[i].value ?? 0
    }

    console.log('total: ', total)

    for (let i in props.doughnutData ?? []) {
      data.push({
        name: props.doughnutData[i].name ?? '',
        value: props.doughnutData[i].value ?? 0,
        percentage: (props.doughnutData[i].value / total * 100).toFixed(0)
      })
    }

    console.log("data: ", data)

    setData(data)
  }, [props.doughnutData]) // Update when props change

  return (
    <div>
      <div className={``}>
        <ResponsiveContainer width="100%" height={300} className={'text-shadow'}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Pie
              className="drop_shadow"
              data={data}
              cx="50%"
              cy="50%"
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

