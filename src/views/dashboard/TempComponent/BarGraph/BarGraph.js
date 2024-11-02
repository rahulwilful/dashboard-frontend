import './BarGraph.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
const BarGraph = () => {
  const data = [
    { number: 32, value: 12, color: '#4caf50' }, // Green for positive values
    { number: 15, value: 22, color: '#0D47A1' }, // Sky Blue for high values
    { number: 19, value: 14, color: '#0D47A1' }, // Sky Blue
    { number: 4, value: 20, color: '#333' }, // Dark Gray for lower values
    { number: 21, value: 12, color: '#0D47A1' }, // Sky Blue
    { number: 2, value: 22, color: '#333' }, // Dark Gray
    { number: 25, value: 18, color: '#0D47A1' }, // Sky Blue
    { number: 17, value: 20, color: '#333' }, // Dark Gray
    { number: 34, value: 14, color: '#0D47A1' }, // Sky Blue
    { number: 6, value: 12, color: '#333' }, // Dark Gray
    { number: 27, value: 16, color: '#0D47A1' }, // Sky Blue
    { number: 13, value: 18, color: '#333' }, // Dark Gray
    { number: 36, value: 22, color: '#0D47A1' }, // Sky Blue
    { number: 11, value: 10, color: '#333' }, // Dark Gray
    { number: 30, value: 12, color: '#0D47A1' }, // Sky Blue
    { number: 8, value: 20, color: '#333' }, // Dark Gray
    { number: 23, value: 18, color: '#0D47A1' }, // Sky Blue
    { number: 10, value: 14, color: '#333' }, // Dark Gray
    { number: 5, value: 20, color: '#0D47A1' }, // Sky Blue
    { number: 24, value: 14, color: '#333' }, // Dark Gray
    { number: 16, value: 22, color: '#0D47A1' }, // Sky Blue
    { number: 33, value: 10, color: '#333' }, // Dark Gray
    { number: 1, value: 18, color: '#0D47A1' }, // Sky Blue
    { number: 20, value: 22, color: '#333' }, // Dark Gray
    { number: 14, value: 12, color: '#0D47A1' }, // Sky Blue
    { number: 31, value: 16, color: '#333' }, // Dark Gray
    { number: 9, value: 10, color: '#0D47A1' }, // Sky Blue
    { number: 22, value: 12, color: '#333' }, // Dark Gray
    { number: 18, value: 8, color: '#0D47A1' }, // Sky Blue
    { number: 29, value: 12, color: '#333' }, // Dark Gray
    { number: 7, value: 14, color: '#0D47A1' }, // Sky Blue
    { number: 28, value: 22, color: '#333' }, // Dark Gray
    { number: 12, value: 8, color: '#0D47A1' }, // Sky Blue
    { number: 35, value: 26, color: '#333' }, // Dark Gray
    { number: 3, value: 20, color: '#0D47A1' }, // Sky Blue
    { number: 26, value: 14, color: '#333' }, // Dark Gray
  ]

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
        <h2 className="grid-c-title-text">Bar Graph of Wins</h2>
        {/* <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </button> */}
      </div>
      {/* <div className="grid-c1-content">
            <p>Balance</p>
            <div className="lg-value">$ 22,000</div>
            <div className="card-wrapper">
                <span className="card-pin-hidden">**** **** **** </span>
                <span>1234</span>
            </div>
            <div className="card-logo-wrapper">
                <div>
                    <p className="text text-silver-v1 expiry-text">Expires</p>
                    <p className="text text-sm text-white">12/22</p>
                </div>
                <div className="card-logo">
                    <div className="logo-shape1"></div>
                    <div className="logo-shape2"></div>
                </div>
            </div>
        </div> */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} barGap={15} barCategoryGap="40%">
          <XAxis dataKey="number" tick={{ fill: 'white' }} axisLine={{ stroke: 'white' }} />
          <YAxis
            domain={[0, 'dataMax + 5']} // Ensure the Y-axis starts at 0 and ends slightly above the max value
            tickCount={10} // Display 10 ticks
            interval={0} // Display all ticks
            axisLine={{ stroke: 'white' }}
            tick={{ fill: 'white' }}
          />
          <Tooltip />
          <Bar dataKey="value" barSize={20} radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarGraph
