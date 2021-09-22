import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";
import Home from "./Home";
import Study from "./Study";
import DeckList from "./DeckList";
import ViewDeck from "./ViewDeck";
import { Route, Switch } from "react-router-dom";

function Layout() {
  //DeckList => listDecks
  const [decks, setDecks] = useState([]);
  //Study => readDeck - loads deck and cards
  const [deck, setDeck] = useState({});
  //AddCard, editCard, => createCard, updateCard
  const [card, setCard] = useState([]);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home decks={decks} setDecks={setDecks} />
          <DeckList decks={decks} setDecks={setDecks} />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study deck={deck} setDeck={setDeck} />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck deck={deck} setDeck={setDeck} />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard
            deck={deck}
            setDeck={setDeck}
            card={card}
            setCard={setCard}
          />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard
            deck={deck}
            setDeck={setDeck}
            card={card}
            setCard={setCard}
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
