import React, { useEffect, useState } from 'react'
import { CardImages } from './ThreeCardPokerData'
import { useSelector } from 'react-redux'
import s from './HouseCardAndPlayers.module.css'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ShowPlayerCards = (props) => {
  const [index, setIndex] = useState(0)
  const green = 'linear-gradient(to bottom, rgb(100, 251, 168), rgb(37, 247, 131))'
  const red = 'rgb(242, 55, 55)'

  const theme = useSelector((theme) => theme?.theme)
  const [cards, setCards] = useState([])

  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs  ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(theme === 'dark' ? `   text-light   ${s.placeholder_grey}` : `text-dark    `)
  }, [theme])

  useEffect(() => {
    //console.log(props.name," wins: " , props.win)

    let tempCards = []

    for (let i in props?.cards) {
      let tempImage = null
      for (let j in CardImages) {
        if (props?.cards[i] == CardImages[j]?.name) {
          tempImage = CardImages[j]?.card
        }
      }

      if (i == 0) {
        tempCards.push({
          name: props?.cards[i],
          card: tempImage,
          position: 0,
        })
      } else {
        tempCards.push({
          name: props?.cards[i],
          card: tempImage,
          position: tempCards[tempCards.length - 1]?.position + 3,
        })
      }
    }

    //console.log("tempCards: ",tempCards)

    setCards(tempCards)
  }, [props?.cards])

  useEffect(() => {
    gsap.to('.animateCards', {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.05,
    })
  }, [cards])

  return (
    <div
      className={` shadow-s rounded   ${themeBorder} `}
      key={props?.cards}
      style={{ background: props?.win == true ? green : red }}
    >
      <div
        className={`border-bottom  ${props?.win == true ? 'border-secondary' : 'border-light'}  border-opacity-25  py-1 px-3 fontTextHeading`}
      >
        <div className={``}>
          {' '}
          <span
            className={`bg-gradient ${props?.win == 'house' ? 'bg-primary' : props?.win == true ? 'bg-success' : 'bg-danger'} text-light border-0 bg-opacity-75 px-2 shadow-xs poppins-500 rounded-1 `}
          >
            {props?.name}
          </span>
        </div>
      </div>
      <div className={` px-2`}>
        <div
          className={`  d-flex position-relative justify-content-start align-items-center overflow-x-auto    `}
          style={{ height: '240px', position: 'relative', width: '100%' }}
          key={index}
        >
          {cards?.length > 0 && cards[0]?.position !== undefined ? (
            cards.map((card, i) => (
              <div
                key={card?.name + 1}
                className={`animateCards  ${s.cards}`}
                style={{
                  position: 'absolute',
                  left: `${card?.position}rem`,
                }}
              >
                <div className={``}>
                  <img
                    src={card?.card}
                    alt=""
                    className={`${theme == 'dark' ? 'card_drop_shadow_dark' : 'card_drop_shadow_light'}`}
                    style={{ height: '200px', transform: 'rotateY(15deg)' }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No cards available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShowPlayerCards
