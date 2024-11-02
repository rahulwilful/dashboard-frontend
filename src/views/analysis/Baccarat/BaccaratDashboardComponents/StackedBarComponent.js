import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
]

const StackedBarComponent = () => {
  return (
    <>
      <div className="border d-flex  h-100 justify-content-center">
        <div className="border border-danger h-100">
          <ResponsiveContainer width="100%" minWidth={600} height={200} className={``}>
            <BarChart
              width={'100%'}
              height={'100%'}
              data={data}
              layout="vertical" // Changed to vertical layout
            >
              <YAxis type="category" />
              <XAxis type="number" />
              <Bar barSize={16} dataKey="uv" stackId="a" fill="#8884d8" />
              <Bar barSize={16} dataKey="pv" stackId="a" fill="#ffc658" />
              <Bar barSize={16} dataKey="amt" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default StackedBarComponent
