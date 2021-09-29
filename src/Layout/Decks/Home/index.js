import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { listDecks } from "../../../utils/api"
import Deck from "./Deck"

const Home = ( { setDeck } ) => {

  // State variable for listing decks
  const [ decks, setDecks ] = useState([])

  // Hook to load decks
  useEffect(() => {
    setDecks([])
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    const cleanup = () => abortController.abort

    const loadDecks = async () => {
      try {
        const decksData = await listDecks(abortSignal)
        setDecks(decksData)
      } catch (error) {
        if (error.name === "Aborted") {console.log("Aborted")}
        else {throw error}
      }
    }

    loadDecks()

    return cleanup
  }, [setDecks])

  // List of decks with action buttons (view, study, delete) & number of cards per deck
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} setDeck={setDeck} />)

  return (
    <main className="container mb-4">
      <section className="col">
        {/* Create deck button: sends user to deck form */}
        <Link to="/decks/new" className="btn btn-secondary" >+ Create Deck</Link>
        {list}
      </section>
    </main>
  )
}

export default Home