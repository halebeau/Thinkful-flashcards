import React from "react"
import { Link, useHistory } from "react-router-dom"

import { deleteDeck } from "../../../utils/api"

const Deck = ( { deck } ) => {
  
  // Hook to send user home
  const herstory = useHistory()

  // Delete handler: deletes deck and reloads DeckList, or sends user home
  const handleDelete = async () => {
    const confirmMeDaddy = "Delete this deck?"
    const confirm = window.confirm(confirmMeDaddy)
    confirm === true ? 
    await deleteDeck(deck.id) && window.location.reload() : herstory.push("/")
  }

  return (
    <div className="rounded container border border-secondary mt-1 py-1 by-1">
      <div className="row my-1">
        <div className="col text-left">
          <h5>{deck.name}</h5>
        </div>
        <div className="col text-right">
          <p className="text-right">{deck.cards.length} cards</p>
        </div>
      </div>
      <p>{deck.description}</p>
      <div className="row my-1">
        <div className="col">
          <Link to={ "/decks/" + deck.id } className="btn btn-secondary">View</Link>
        </div>
        <div className = "col">
          <Link to={ "/decks/" + deck.id + "/study" } className="btn btn-primary">Study</Link>
        </div>
        <div className = "col">
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )

}

export default Deck