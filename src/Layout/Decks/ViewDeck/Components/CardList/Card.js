import React from "react"
import { Link, useHistory, useRouteMatch } from "react-router-dom"

import { deleteCard } from "../../../../../utils/api"

const Card = ( { card } ) => {

  // Hooks to send user to View Deck
  const herstory = useHistory()
  const url = useRouteMatch().url

  // Dialog box: deletes card & keeps user on current screen, or keeps user on current screen
  const handleDelete = async () => {
    const confirmMeDaddy = "Delete this card?"
    const confirm = window.confirm(confirmMeDaddy)
    confirm === true ? 
    await deleteCard(card.id) && herstory.push(url) : herstory.push(url)
    window.location.reload()
  }

  return (
    <div className="card my-2">
      <div className="container mt-2">
        {/* Front text of card */}
        <p className="text-left">{card.front}</p>
      </div>
      <div className="container">
        {/* Back text of card */}
        <p className="text-right">{card.back}</p>
      </div>
      {/* Edit button: sends user to card form */}
      <Link to={"/decks/" + card.deckId + "/cards/" + card.id + "/edit"}
        className="btn btn-secondary">Edit</Link>
      {/* Delete button */}
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
    )

}

export default Card