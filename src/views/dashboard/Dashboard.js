import './Dashboard.css'
import Radar from './TempComponent/Radar/Radar'
import BarGraph from './TempComponent/BarGraph/BarGraph'
import { CCol, CRow, CWidgetStatsF, CLink } from '@coreui/react'
import {
  cilStar,
  cilPeople,
  cilDollar,
  cilMoney,
  cilChartLine,
  cilArrowCircleBottom,
  cilArrowCircleTop,
  cilSpeedometer,
  cilSync,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const Dashboard = () => {
  const random = () => Math.round(Math.random() * 100)

  // Gradient functions for different chart types
  const gradientLine = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)')
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.5)')
    return gradient
  }

  const gradientBarRed = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.2)')
    return gradient
  }

  const gradientBarBlack = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.5)')
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
    return gradient
  }

  const gradientBarGreen = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)')
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)')
    return gradient
  }

  const gradientDoughnutRed = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.7)')
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)')
    return gradient
  }

  const gradientDoughnutBlack = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.7)')
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)')
    return gradient
  }

  const gradientDoughnutGreen = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)')
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.3)')
    return gradient
  }

  const gradientPieRed = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.7)')
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)')
    return gradient
  }

  const gradientPieBlack = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.7)')
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)')
    return gradient
  }

  const gradientPieGreen = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)')
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.3)')
    return gradient
  }

  const gradientPolarAreaRed = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 400, 400)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.7)')
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)')
    return gradient
  }

  const gradientPolarAreaBlack = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 400, 400)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.7)')
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)')
    return gradient
  }

  const gradientPolarAreaGreen = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 400, 400)
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)')
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.3)')
    return gradient
  }

  const gradientRadarRed = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.7)')
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)')
    return gradient
  }

  const gradientRadarBlack = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.7)')
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)')
    return gradient
  }

  const gradientRadarGreen = (ctx) => {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)')
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.3)')
    return gradient
  }

  return (
    // <div className="main-content-holder" style={{ border: 'red' }}>
    //   <CRow>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="info"
    //         title="Winning Number"
    //         value="27"
    //         icon={<CIcon icon={cilStar} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="success"
    //         title="Total Number of Players"
    //         value="27"
    //         icon={<CIcon icon={cilStar} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="warning"
    //         title="Total Bets"
    //         value="100"
    //         icon={<CIcon icon={cilDollar} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="danger"
    //         title="Total Amount"
    //         value="100000"
    //         icon={<CIcon icon={cilMoney} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Average"
    //         value="27"
    //         icon={<CIcon icon={cilChartLine} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="light"
    //         title="Minimum Bets"
    //         value="27"
    //         icon={<CIcon icon={cilArrowCircleBottom} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="dark"
    //         title="Maximum Bets"
    //         value="27"
    //         icon={<CIcon icon={cilArrowCircleTop} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="secondary"
    //         title="Spin Speed"
    //         value="20"
    //         icon={<CIcon icon={cilSpeedometer} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="secondary"
    //         title="Spin Direction"
    //         value="Clockwise"
    //         icon={<CIcon icon={cilSync} size="xl" />}
    //       />
    //     </CCol>
    //   </CRow>
    // </div>

    <div className="main-content-holder" style={{ border: 'red' }}>
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            title="Winning Number"
            value="27"
            icon={<CIcon icon={cilStar} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            title="Total Number of Players"
            value="110"
            icon={<CIcon icon={cilStar} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            title="Total Bets"
            value="110"
            icon={<CIcon icon={cilDollar} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            title="Total Amount"
            value="100000"
            icon={<CIcon icon={cilMoney} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            title="Average"
            value="15000"
            icon={<CIcon icon={cilChartLine} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            title="Minimum Bets"
            value="1150"
            icon={<CIcon icon={cilArrowCircleBottom} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            title="Maximum Bets"
            value="45000"
            icon={<CIcon icon={cilArrowCircleTop} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="secondary"
            title="Spin Speed"
            value="20"
            icon={<CIcon icon={cilSpeedometer} size="xl" />}
          />
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            title="Spin Direction"
            value="Clockwise"
            icon={<CIcon icon={cilSync} size="xl" />}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CCard className="mb-4">
            <CCardHeader>Doughnut Chart</CCardHeader>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: ['Red Wins', 'Black Wins', 'Green Wins'],
                  datasets: [
                    {
                      backgroundColor: (ctx) => [
                        gradientDoughnutRed(ctx.chart.ctx),
                        gradientDoughnutBlack(ctx.chart.ctx),
                        gradientDoughnutGreen(ctx.chart.ctx),
                      ],
                      data: [45, 35, 20],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CCard className="mb-4">
            <CCardHeader>Pie Chart</CCardHeader>
            <CCardBody>
              <CChartPie
                data={{
                  labels: ['Red', 'Black', 'Green'],
                  datasets: [
                    {
                      data: [55, 30, 15],
                      backgroundColor: (ctx) => [
                        gradientPieRed(ctx.chart.ctx),
                        gradientPieBlack(ctx.chart.ctx),
                        gradientPieGreen(ctx.chart.ctx),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CCard className="mb-4">
            <CCardHeader>Polar Area Chart</CCardHeader>
            <CCardBody>
              <CChartPolarArea
                data={{
                  labels: ['Red', 'Black', 'Green'],
                  datasets: [
                    {
                      data: [20, 30, 10],
                      backgroundColor: (ctx) => [
                        gradientPolarAreaRed(ctx.chart.ctx),
                        gradientPolarAreaBlack(ctx.chart.ctx),
                        gradientPolarAreaGreen(ctx.chart.ctx),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CCard className="mb-4">
            <CCardHeader>Radar Chart</CCardHeader>
            <CCardBody>
              <CChartRadar
                data={{
                  labels: [
                    'Round 1',
                    'Round 2',
                    'Round 3',
                    'Round 4',
                    'Round 5',
                    'Round 6',
                    'Round 7',
                  ],
                  datasets: [
                    {
                      label: 'Red Wins',
                      backgroundColor: (ctx) => gradientRadarRed(ctx.chart.ctx),
                      borderColor: (ctx) => gradientRadarRed(ctx.chart.ctx),
                      pointBackgroundColor: '#fff',
                      pointBorderColor: '#fff',
                      data: [10, 15, 20, 25, 30, 20, 15],
                    },
                    {
                      label: 'Black Wins',
                      backgroundColor: (ctx) => gradientRadarBlack(ctx.chart.ctx),
                      borderColor: (ctx) => gradientRadarBlack(ctx.chart.ctx),
                      pointBackgroundColor: '#fff',
                      pointBorderColor: '#fff',
                      data: [20, 25, 30, 35, 40, 30, 25],
                    },
                    {
                      label: 'Green Wins',
                      backgroundColor: (ctx) => gradientRadarGreen(ctx.chart.ctx),
                      borderColor: (ctx) => gradientRadarGreen(ctx.chart.ctx),
                      pointBackgroundColor: '#fff',
                      pointBorderColor: '#fff',
                      data: [15, 20, 25, 30, 35, 25, 20],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3}>
          <CCard className="mb-4">
            <CCardHeader>Line Chart</CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'Round 1',
                    'Round 2',
                    'Round 3',
                    'Round 4',
                    'Round 5',
                    'Round 6',
                    'Round 7',
                  ],
                  datasets: [
                    {
                      label: 'Winning Number',
                      backgroundColor: (ctx) => gradientLine(ctx.chart.ctx),
                      borderColor: (ctx) => gradientLine(ctx.chart.ctx),
                      pointBackgroundColor: '#fff',
                      pointBorderColor: '#fff',
                      data: [random(), random(), random(), random(), random(), random(), random()],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: [
                  'Round 1',
                  'Round 2',
                  'Round 3',
                  'Round 4',
                  'Round 5',
                  'Round 6',
                  'Round 7',
                ],
                datasets: [
                  {
                    label: 'Red',
                    backgroundColor: (ctx) => gradientBarRed(ctx.chart.ctx),
                    data: [10, 15, 20, 25, 30, 20, 15],
                  },
                  {
                    label: 'Black',
                    backgroundColor: (ctx) => gradientBarBlack(ctx.chart.ctx),
                    data: [20, 25, 30, 35, 40, 30, 25],
                  },
                  {
                    label: 'Green',
                    backgroundColor: (ctx) => gradientBarGreen(ctx.chart.ctx),
                    data: [5, 10, 5, 10, 5, 10, 5],
                  },
                ],
              }}
              labels="rounds"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </div>

    // <div className="main-content-holder">
    //   <div className="content-grid-one">
    //     <Radar />
    //   </div>
    //   <div className="content">
    //     <BarGraph />

    //     <div className="grid-two-item">
    //       <div className="subgrid-two">

    //       </div>
    //     </div>

    //     <div className="grid-two-item">
    //       <div className="subgrid-two">

    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="main-content-holder" style={{ border: 'red' }}>
    //   <CRow>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="wining number"
    //         value="27"
    //         icon={<CIcon icon={cilStar} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="total number of player"
    //         value="27"
    //         icon={<CIcon icon={cilStar} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Total Bets"
    //         value="100"
    //         icon={<CIcon icon={cilDollar} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Total amount"
    //         value="100000"
    //         icon={<CIcon icon={cilMoney} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Average"
    //         value="27"
    //         icon={<CIcon icon={cilChartLine} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Mininimum Bets"
    //         value="27"
    //         icon={<CIcon icon={cilArrowCircleBottom} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Maximum Bets"
    //         value="27"
    //         icon={<CIcon icon={cilArrowCircleTop} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Spin speed"
    //         value="20"
    //         icon={<CIcon icon={cilSpeedometer} size="xl" />}
    //       />
    //     </CCol>
    //     <CCol xs={12} sm={6} md={4} lg={3}>
    //       <CWidgetStatsF
    //         className="mb-3"
    //         color="primary"
    //         title="Spin Direction"
    //         value="Clockwise"
    //         icon={<CIcon icon={cilSync} size="xl" />}
    //       />
    //     </CCol>
    //   </CRow>

    // {/* <CCol xs={12} sm={6} md={4} lg={3}>
    //     <CWidgetStatsF
    //       className="mb-3"
    //       color="primary"
    //       padding={false}
    //       title="Widget title"
    //       value="89.9%"
    //     />
    //   </CCol> */}
    // {/* <CCol xs={12} sm={6} md={4} lg={3}>
    //     <CWidgetStatsF
    //       className="mb-3"
    //       color="warning"
    //       padding={false}
    //       title="Widget title"
    //       value="89.9%"
    //     />
    //   </CCol> */}
    // {/* <CRow>
    //   <CCol xs={12} sm={6} md={4} lg={3}>
    //     <CWidgetStatsF
    //       className="mb-3"
    //       color="primary"
    //       footer={
    //         <CLink
    //           className="font-weight-bold font-xs text-body-secondary"
    //           href="https://coreui.io/"
    //           rel="noopener noreferrer"
    //           target="_blank"
    //         >
    //           View more
    //         </CLink>
    //       }
    //       title="Widget title"
    //       value="89.9%"
    //     />
    //   </CCol>
    //   <CCol xs={12} sm={6} md={4} lg={3}>
    //     <CWidgetStatsF
    //       className="mb-3"
    //       color="warning"
    //       footer={
    //         <CLink
    //           className="font-weight-bold font-xs text-body-secondary"
    //           href="https://coreui.io/"
    //           rel="noopener noreferrer"
    //           target="_blank"
    //         >
    //           View more
    //         </CLink>
    //       }
    //       title="Widget title"
    //       value="89.9%"
    //     />
    //   </CCol>
    //   <CCol xs={12} sm={6} md={4} lg={3}>
    //     <CWidgetStatsF
    //       className="mb-3"
    //       color="primary"
    //       footer={
    //         <CLink
    //           className="font-weight-bold font-xs text-body-secondary"
    //           href="https://coreui.io/"
    //           rel="noopener noreferrer"
    //           target="_blank"
    //         >
    //           View more
    //         </CLink>
    //       }
    //       title="Widget title"
    //       value="89.9%"
    //     />
    //   </CCol>
    //   <CCol xs={12} sm={6} md={4} lg={3}>
    //     <CWidgetStatsF
    //       className="mb-3"
    //       color="warning"
    //       footer={
    //         <CLink
    //           className="font-weight-bold font-xs text-body-secondary"
    //           href="https://coreui.io/"
    //           rel="noopener noreferrer"
    //           target="_blank"
    //         >
    //           View more
    //         </CLink>
    //       }
    //       title="Widget title"
    //       value="89.9%"
    //     />
    //   </CCol>
    // </CRow> */}
    // </div>
  )
}

export default Dashboard
