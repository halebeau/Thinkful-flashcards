import React from "react"
import { Link, useHistory, useRouteMatch } from "react-router-dom"

import { deleteDeck } from "../../../../utils/api"

const DeckInfo = ( { deck } ) => {

  // Hooks to send user elsewhere or keep them here
  const herstory = useHistory()
  const url = useRouteMatch().url

  // Dialog box: deletes deck and sends user home, or keeps deck and keeps user here
  const deleteMeDaddy = async () => {
    const confirmMeDaddy = "Delete this deck?"
    const confirm = window.confirm(confirmMeDaddy)
    confirm === true ? 
    await deleteDeck(deck.id) && herstory.push("/") : herstory.push(url)
  }

  return (
    <div className="rounded border border-secondary p-2">
      <div className="row">
        <div className="col">
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
        </div>
      </div>
      {/* Action buttons: edit, study, add card, delete */}
      <div className="row">
        <div className="col">
          {/* Edit button: sends user to deck form */}
          <Link to={"/decks/" + deck.id + "/edit"} className="btn btn-secondary">Edit</Link>
        </div>
        <div className="col">
          {/* Study button: sends user to study screen */}
          <Link to={"/decks/" + deck.id + "/study"} className="btn btn-primary">Study</Link>
        </div>
        <div className="col">
          {/* Add card: sends user to card form */}
          <Link to={"/decks/" + deck.id + "/cards/new"} className="btn btn-primary">Add Card</Link>
        </div>
        <div className="col">
          {/* Delete button */}
          <button type="button" className="btn btn-danger" onClick={deleteMeDaddy}>Delete</button>
        </div>
      </div>
    </div>    
  )

}

export default DeckInfo