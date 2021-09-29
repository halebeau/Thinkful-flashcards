import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Decks/Home"
import Study from "./Decks/Study"
import CreateDeck from "./Decks/CreateDeck"
import ViewDeck from "./Decks/ViewDeck"
import EditDeck from "./Decks/EditDeck"
import AddCard from "./Cards/AddCard"
import EditCard from "./Cards/EditCard"
import NotFound from "./NotFound"

const Layout = () => {

  // Lifted state variables for use in multiple screens
  // Comes loaded with a blank deck to prevent race conditions with Create Deck
  const [ deck, setDeck ] = useState({ name: "", description: "",})
  const [ card, setCard ] = useState({})
  const [ cards, setCards ] = useState([])
 
  return (
    <div>
      <Header />
      <div className = "container">
        <Switch>
          {/* Home screen: a "create deck" button and list of decks 
          with buttons to view, study, and delete decks */}
          <Route exact path="/">
            <Home 
              setDeck={setDeck}
            />
          </Route>
          {/* Create Deck screen: a form with inputs for a name and description */}
          <Route path="/decks/new">
            <CreateDeck 
              deck={deck} 
              setDeck={setDeck}
            />
          </Route>
          {/* Deck screen: displays title, description, and list of cards for a given deck
          with buttons to edit, study, or delete the deck and buttons to add, edit, or view cards */}
          <Route exact path="/decks/:deckId">
            <ViewDeck 
              deck={deck} 
              setDeck={setDeck}
              card={card} 
              setCard={setCard} 
              cards={cards} 
              setCards={setCards} 
            />
          </Route>
           {/* Study screen: draw and and flip cards from a given deck */}
           <Route path="/decks/:deckId/study">
            <Study 
              deck={deck} 
              setDeck={setDeck} 
              card={card} 
              setCard={setCard} 
              cards={cards} 
              setCards={setCards}
            />
          </Route>
          {/* Edit Deck screen: a form that comes pre-filled with the selected deck's name and description */}
          <Route path="/decks/:deckId/edit">
            <EditDeck 
            deck={deck} 
            setDeck={setDeck} 
            />
          </Route>
          {/* Add Card screen: a form with inputs for the front and back of the card */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard 
              deck={deck} 
              setDeck={setDeck} 
              card={card} 
              setCard={setCard} 
            />
          </Route>
          {/* Edit Card screen: a form that comes pre-filled with the selected card's front and back text */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard 
              deck={deck} 
              card={card} 
              setCard={setCard} 
            />
          </Route>
          {/* 404 screen */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  )

}

export default Layout
