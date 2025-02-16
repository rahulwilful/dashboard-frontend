import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useSelector } from 'react-redux'

const BarChartComponent = (props) => {
  const theme = useSelector((state) => state?.theme)

  const [textColor, setTextColor] = useState('rgb(11, 94, 215)')
  const [stroke, setStroke] = useState('rgb(11, 94, 215)')
  const [data, setData] = useState([])

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

  useEffect(() => {
    if (theme === 'dark') {
      setTextColor('rgb(255, 255, 255)')
      setStroke('#535459')
    } else {
      setTextColor('rgb(71, 72, 76)')
      setStroke('#e2e2e2')
    }
  }, [theme])

  useEffect(() => {
    if (props?.data && Array.isArray(props?.data)) {
      setData(props?.data)
    } else {
      setData([]) // Ensure fallback
    }
  }, [props?.data])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip border p-2 rounded bg-light shadow-s  text-dark">
          <div>
            <span>{label}</span> won <span>{payload[0]?.value}</span> times
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer width="100%" height={250} className={' '}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
        barCategoryGap={1} // Add gap between bars here
      >
        <CartesianGrid strokeDasharray="0 0" stroke={stroke} vertical={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 13, fill: textColor }}
          stroke={textColor}
          className="text-shadow "
          padding={{ top: 10, down: 10 }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={({ x, y, payload }) => {
            const maxLabelWidth = 100
            const truncatedText =
              payload?.value?.length > maxLabelWidth / 7
                ? `${payload?.value?.slice(0, maxLabelWidth / 7)}...`
                : payload?.value

            return (
              <text
                x={x}
                y={y}
                fill={textColor}
                fontSize={13}
                textAnchor="end"
                dy={3}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: `${maxLabelWidth}px`,
                }}
              >
                {truncatedText}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow poppins-600"
          interval={0} // Ensure all labels are displayed
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="wins" radius={[0, 9, 9, 0]} barSize={13} className="drop_shadow">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
