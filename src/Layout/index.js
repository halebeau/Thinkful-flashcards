import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./home/Home";
import CreateDeck from "./decks/CreateDeck";
import DeckRoutes from "./decks/DeckRoutes";
import { Switch, Route } from "react-router-dom";
import "./index.css";

function Layout() {
  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact={true} path='/'>
            <Home />
          </Route>
          <Route exact={true} path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route path='/decks/:deckId'>
            <DeckRoutes />
          </Route>
          <Route path='/'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
