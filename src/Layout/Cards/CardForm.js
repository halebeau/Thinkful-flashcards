import React from "react"
import { Link, useHistory } from "react-router-dom"
import { createCard, updateCard } from "../../utils/api"

const CardForm = ( { card, setCard } ) => {

  // Hook and variable to send user to View Deck
  const herstory = useHistory()
  const toParent = "/decks/" + card.deckId

  // Form change handler: uses state to edit current card object
  const handleChange = ( { target } ) => {
    const value = target.value
    setCard( { 
      ...card, 
      [target.name]: value 
    } )
  }

  // Conditional api calls: create if no id is present, update if id is present
  const cardSubmit = async (data, signal) => {
    !card.id ? await createCard(card.deckId, data, signal) : await updateCard(data, signal)
  }
  // Submit handler: makes appropriate api call and sends user to View Deck
  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    await cardSubmit(card, abortSignal)
    herstory.push(toParent)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="Front">Front</label>
        {/* Front input */}
        <textarea 
          rows="3" 
          className="form-control" 
          id="front" 
          name="front"
          onChange={handleChange}
          value={card.front}/>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        {/* Back input */}
        <textarea
          rows="3"
          className="form-control" 
          id="back" 
          name="back"
          onChange={handleChange}
          value={card.back}/>
      </div>
      {/* Cancel button: sends user to View Deck */}
      <Link to={toParent} type="button"  className="btn btn-secondary px-2">Cancel</Link>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary px-2 mx-1">Submit</button>
    </form>
  )

}

export default CardForm