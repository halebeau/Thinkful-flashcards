import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFound from "../NotFound";
import DeckDetails from "./DeckDetails";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import StudyDeck from "./StudyDeck";

function DeckRoutes() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={"/decks/:deckId"} exact={true}>
        <DeckDetails />
      </Route>
      <Route path={"/decks/:deckId/study"} exact={true}>
        <StudyDeck />
      </Route>
      <Route path={"/decks/:deckId/edit"} exact={true}>
        <EditDeck />
      </Route>
      <Route path={"/decks/:deckId/cards/new"} exact={true}>
        <AddCard />
      </Route>
      <Route path={"/decks/:deckId/cards/:cardId/edit"}>
        <EditCard />
      </Route>
      {
        //This will cover any undefined routes
      }
      <Route path={url}>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default DeckRoutes;
