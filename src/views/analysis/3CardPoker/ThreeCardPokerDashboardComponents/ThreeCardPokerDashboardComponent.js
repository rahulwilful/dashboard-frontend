import React from 'react'
import { useSelector } from 'react-redux'

const ThreeCardPokerDashboardComponent = (props) => {
  const theme = useSelector((state) => state?.theme?.theme)

  return (
    <div className={`${theme === 'dark' ? 'text-light' : ' text-dark'} `}>
      <div className={`d-flex justify-content-evenly align-items-center gap-1 flex-wrap`}>
        <span
          className={`${props.data?.[0] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1 `}
        >
          Player 1
        </span>
        <span
          className={`${props.data?.[1] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1`}
        >
          Player 2
        </span>
        <span
          className={`${props.data?.[2] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1`}
        >
          Player 3
        </span>
        <span
          className={`${props.data?.[3] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1`}
        >
          Player 4
        </span>
        <span
          className={`${props.data?.[4] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1`}
        >
          Player 5
        </span>
        <span
          className={`${props.data?.[5] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1`}
        >
          Player 6
        </span>
        <span
          className={`${props.data?.[6] === 1 ? 'd-block' : 'd-none'} bg-gradient bg-primary text-light border-0 bg-gradient px-3 shadow-xs poppins-500 rounded-1`}
        >
          Player 7
        </span>
      </div>
    </div>
  )
}

export default ThreeCardPokerDashboardComponent

