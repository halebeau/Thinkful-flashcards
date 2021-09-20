import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import AddEditCardForm from "./AddEditCardForm";

function EditCard() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();
  const { cardId } = useParams();

  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    // const [newCard, setNewCard] = useState(newCardTemplate);

    async function readTheDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (err) {
        console.log(err, "Failure reading deck");
      }
    }
    readTheDeck();
    return () => abortController.abort();
  }, [deckId]);

  return (
    <React.Fragment>
      <p className="card" style={{ backgroundColor: "lightgray" }}>
        <span>
          <Link to="/">Home</Link> /
          <Link to={`/decks/${deckId}`}> {deck.name}</Link> /
          <Link to={path}> Edit Card</Link>
        </span>
      </p>
      <AddEditCardForm cardId={cardId} />
    </React.Fragment>
  );
}

export default EditCard;
