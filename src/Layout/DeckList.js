import React, { useEffect } from "react";
import Deck from "./Deck";
import { listDecks } from "../utils/api/index";

function DeckList({ decks, setDecks }) {
  useEffect(() => {
    async function loadDecks() {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    }
    loadDecks();
  }, [setDecks]);

  const deckList = decks.map((deck) => {
    return <Deck key={deck.id} deck={deck} decks={decks} setDecks={setDecks} />;
  });

  return <>{deckList}</>;
}

export default DeckList;
