import React, { useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { readDeck } from "../../../utils/api"
import Breadcrumb from "./Components/Breadcrumb"
import CardDisplay from "./Components/CardDisplay"
import NotEnoughCards from "./Components/NotEnoughCards"

const Study = ( { deck, setDeck, cards, setCards, card, setCard, } ) => {

  // Hook to get deckId from route parameters
  const { deckId } = useRouteMatch().params

  // Hook to set state variables using the api call readDeck()
  useEffect(() => {
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    const cleanup = () => abortController.abort

    const loadStudy = async () => {
      try {
        const deckData = await readDeck(deckId, abortSignal)
        setDeck(deckData)
        setCards(deckData.cards)
      } catch (error) {
        if (error.name === "Aborted") {console.log("Aborted")}
        else {throw error}
      }
    }

    loadStudy()

    return cleanup
  }, [deckId, setDeck, setCards])

  // Conditional render: displays an error message if the deck has under 3 cards
  // Otherwise displays the current card
  const cardDisplay = cards.length < 3 ? 
    <NotEnoughCards deck={deck} cards={cards} /> : <CardDisplay card={card} setCard={setCard} cards={cards} /> 

  return (
    <div className="container">
      {/* "Breadcrumb" style nav bar */}
      <Breadcrumb deck={deck} />
      <h1>Study: {deck.name}</h1>
      {cardDisplay}
    </div>
  )
}

export default Study