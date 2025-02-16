import React from 'react'
import {
    CCol,
    CRow,
    CWidgetStatsA,
    CLink,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
  } from '@coreui/react'
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
    cilOptions,
    cilArrowTop, // Add this line
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

export const Card = (props) => {
  return (
    <div>
        <CWidgetStatsA
                  className="mb-4 shadow-s border-0 bg-gradient text-shadow"
                  color={props?.color}
                  value={
                    <span className=''>
                      {props?.value}
                    </span>
                  }
                  title={props?.title}
                  options={{
                    tooltips: {
                      enabled: false,
                    },
                    // Disable the on hover labels
                    plugins: {
                      datalabels: {
                        display: false,
                      },
                    },
                  }}
                  chart={
                    <CChartLine
                      className="mt-3 mx-3 drop_shadow"
                      style={{ height: '70px' }}
                      data={{
                        labels: ['', '', '', '', '', '', ''],
                        datasets: [
                          {
                         
                            backgroundColor: 'transparent',
                            borderColor: props?.lineColor,
                            pointBorderColor: props?.dot ? props?.lineColor : 'transparent', 
                           
                            data: props?.data,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            border: {
                              display: false,
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 30,
                            max: 89,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  }
                />
    </div>
  )
}

