import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './Budget.css'
import image from './img.png'

const Reports = () => {
  const data = [
    { number: 32, value: 12, color: '#4caf50' },
    { number: 15, value: 22, color: '#0D47A1' },
    { number: 19, value: 14, color: '#0D47A1' },
    { number: 4, value: 20, color: '#333' },
    { number: 21, value: 12, color: '#0D47A1' },
    { number: 2, value: 22, color: '#333' },
    { number: 25, value: 18, color: '#0D47A1' },
    { number: 17, value: 20, color: '#333' },
    { number: 34, value: 14, color: '#0D47A1' },
    { number: 6, value: 12, color: '#333' },
    { number: 27, value: 16, color: '#0D47A1' },
    { number: 13, value: 18, color: '#333' },
    { number: 36, value: 22, color: '#0D47A1' },
    { number: 11, value: 10, color: '#333' },
    { number: 30, value: 12, color: '#0D47A1' },
    { number: 8, value: 20, color: '#333' },
    { number: 23, value: 18, color: '#0D47A1' },
    { number: 10, value: 14, color: '#333' },
    { number: 5, value: 20, color: '#0D47A1' },
    { number: 24, value: 14, color: '#333' },
    { number: 16, value: 22, color: '#0D47A1' },
    { number: 33, value: 10, color: '#333' },
    { number: 1, value: 18, color: '#0D47A1' },
    { number: 20, value: 22, color: '#333' },
    { number: 14, value: 12, color: '#0D47A1' },
    { number: 31, value: 16, color: '#333' },
    { number: 9, value: 10, color: '#0D47A1' },
    { number: 22, value: 12, color: '#333' },
    { number: 18, value: 8, color: '#0D47A1' },
    { number: 29, value: 12, color: '#333' },
    { number: 7, value: 14, color: '#0D47A1' },
    { number: 28, value: 22, color: '#333' },
    { number: 12, value: 8, color: '#0D47A1' },
    { number: 35, value: 26, color: '#333' },
    { number: 3, value: 20, color: '#0D47A1' },
    { number: 26, value: 14, color: '#333' },
  ]

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
        <h2 className="grid-c-title-text">Radar Chart of Wins</h2>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <img
          src={image}
          alt="Background"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '70%', // Adjust width as needed
            height: 'auto', // Maintain aspect ratio
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="number"
                tick={false} // Hide the ticks
                axisLine={false}
                //  tick={{ fill: 'white' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 'dataMax + 5']}
                // tick={{ fill: 'white' }}
                tick={false} // Hide the ticks
                axisLine={false}
              />
              <Tooltip />
              <Radar
                name="Wins"
                dataKey="value"
                stroke="#ff6f61" // White stroke
                fill="#ff6f61" // White fill
                fillOpacity={0.6}
                dot={{
                  r: 5,
                  fill: '#ff6f61',
                  stroke: '#ff6f61',
                  strokeWidth: 2,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Reports
