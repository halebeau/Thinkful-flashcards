import React from "react";
import { Route, Switch, Link } from "react-router-dom";
//components
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import CreateDeck from "./CreateDeck";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Link
              to="/decks/new"
              className="btn btn-secondary"
              style={{ marginBottom: "2%", marginLeft: "20%" }}
            >
              + Create Deck
            </Link>
            {/* create a new deck button*/}
            <DeckList />
            {/* This renders our list of existing decks on the home page*/}
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
