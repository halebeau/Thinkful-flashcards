import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createDeck, updateDeck } from "../../utils/api"

const DeckForm = ( { deck } ) => {

  // State variable to ensure form inputs are controlled
  const [ formDeck, setFormDeck ] = useState(deck)

  // Hook to ensure deck info is loaded every time the form component is mounted
  // Handles an edge case where user reloads page on Edit Deck
  useEffect(() => setFormDeck(deck), [setFormDeck, deck])

  // Hook and conditional: called together to send user elsewhere
  // Sends user home if no deck id is present, otherwise sends them to View Deck
  const herstory = useHistory()
  const toParent = !deck.id? "/" : "/decks/" + deck.id

  // Form change handler: uses state to edit current deck object
  const handleChange = ( { target } ) => {
    const value = target.value
    setFormDeck( { 
      ...formDeck, 
      [target.name]: value 
    } )
  }

  // Conditional api calls: create if no id is present, update if id is present
  const deckSubmit = async (data, signal) => {
    !deck.id? await createDeck(data, signal) : await updateDeck(data, signal)
  }
  // Submit handler: makes appropriate api call and sends user to the parent screen
  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    await deckSubmit(formDeck, abortSignal)
    herstory.push(toParent)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        {/* Name input */}
        <input
          id="name" 
          type="text"
          className="form-control" 
          name="name"
          value={formDeck.name}
          onChange={handleChange}
          placeholder="Deck Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        {/* Description input */}
        <textarea
          id="description" 
          rows="3"
          className="form-control" 
          name="description"
          value={formDeck.description}
          onChange={handleChange}
          placeholder="Brief description of the deck"/>
      </div>
      {/* Cancel button: sends user to parent screen */}
      <Link to={toParent} type="button"  className="btn btn-secondary px-2">Cancel</Link>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary px-2 mx-1">Submit</button>
    </form>
  )

}

export default DeckForm