import React, { useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { readDeck } from "../../../utils/api"
import Breadcrumb from "./Components/Breadcrumb"
import CardList from "./Components/CardList"
import DeckInfo from "./Components/DeckInfo"

const ViewDeck = ( { deck, setDeck, cards, setCards } ) => {

  // Hook to get deck id from route parameters
  const { deckId } = useRouteMatch().params

  // Hook to load the deck and its card using the api call readDeck()
  useEffect(() => {
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    const cleanup = () => abortController.abort

    const loadDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortSignal)
        setDeck(deckData)
        setCards(deckData.cards)
      } catch (error) {
        if (error.name === "Aborted") {console.log("Aborted")}
        else {throw error}
      }
    }

    loadDeck()

    return cleanup

  }, [deckId, setDeck, setCards])

  return (
      <main className="container">
      <div className="col">
            {/* Breadcrumb nav bar */}
            <Breadcrumb deck={deck} />
            {/* Deck info: displays title, description and actions (edit, study, add card, delete) */}
            <DeckInfo deck={deck} />
            {/* Card list */}
            <CardList cards={cards} />
          </div>
        </main>
    
  )

}

export default ViewDeck