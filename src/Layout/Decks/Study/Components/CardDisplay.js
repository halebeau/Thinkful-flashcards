import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

const CardDisplay = ( { card, setCard, cards } ) => {

  // Hook to send user home
  const herstory = useHistory()

  // State variables for managing cards
  const [ count, setCount ] = useState(1)
  const [ flip, setFlip ] = useState(false)

  // Hook to draw a card using state variables
  useEffect(() => {
    const loadCard = () => setCard(cards[count-1])
    setFlip(false)
    loadCard()
  }, [setCard, cards, count])

  // Draws next card by adjusting the count state, limits count variable to deck length
  const countLimiter = Math.min(count+1, cards.length)
  const drawNextCard = () => setCount(countLimiter)
  
  // Dialog box: resets deck or sends user home
  const resetMeDaddy = () => {
    const confirmMeDaddy = "Reset cards? Click 'Cancel' to return to the home page."
    const confirm = window.confirm(confirmMeDaddy)
    confirm === true ? setCount(1) : herstory.push("/") 
    setFlip(false)
  }
  
  // Click handler for Next button: draws a new card until the last card is drawn
  // Uses conditional to open reset dialog on the last card
  const handleNext = () => count === cards.length ? resetMeDaddy() : drawNextCard()

  // Conditional render: based on flip state, displays either front or back of card
  const cardText = flip ?  
    <p className="card-text">{card.back}</p> : <p className="card-text">{card.front}</p>

  // Conditional render: shows Next button only when card is flipped
  const nextCard = flip ? 
    <button className="card-link btn btn-primary" onClick={() => handleNext()}>Next</button> : null

  return (
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">Card {count} of {cards.length}</h5>
        {cardText}
        {/* Flip card button */}
        <button className="card-link btn btn-secondary" onClick={() => setFlip(!flip)}>Flip</button>
        {nextCard}
      </div>
    </div>
  )

}

export default CardDisplay