import React, { useEffect } from "react"
import { useRouteMatch } from "react-router"
import { readDeck } from "../../../utils/api"
import DeckForm from "../DeckForm"
import Breadcrumb from "./Breadcrumb"

const EditDeck = ( { deck, setDeck } ) => {

  // Hook to pull deck id from route parameters
  const { deckId } = useRouteMatch().params

  // Hook to load deck information when component is mounted
  useEffect(() => {
    const abortController = new AbortController()
    const abortSignal = abortController.signal

    const loadDeck = async () => {

      try {
        const deckData = await readDeck(deckId, abortSignal)
        setDeck(deckData)
      } catch (error) {
        if (error.name === "Aborted") {console.log("Aborted")}
        else {throw error}
      }
    }
    
    loadDeck()

  }, [deckId, setDeck])

  return (
    <div className="container">
      <div className="col">
        {/* Breadcrumb style nav bar */}
        <Breadcrumb deck={deck} />
        <h1>Edit Deck</h1>
        <DeckForm deck={deck} setDeck={setDeck} />
      </div>
    </div>
  )
}

export default EditDeck