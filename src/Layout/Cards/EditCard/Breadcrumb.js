import React from "react"
import { Link, useRouteMatch } from "react-router-dom"

const Breadcrumb = ( { deck, card } ) => {
  const { deckId } = useRouteMatch().params

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to={"/decks/" + deckId}>{deck.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
      </ol>
    </nav>
  )

}

export default Breadcrumb