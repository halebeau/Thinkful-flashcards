import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import AddEditCardForm from "./AddEditCardForm";

function AddCard() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});


  useEffect(() => {
    const abortController = new AbortController();
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
          <Link to={`/decks/${deck.id}`}> {deck.name}</Link> /{" "}
          <Link to={path}> Add Card</Link>
        </span>
      </p>
      <h1>{deck.name}</h1>
      <AddEditCardForm />
    </React.Fragment>
  );
}

export default AddCard;
