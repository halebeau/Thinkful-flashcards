import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteDeck, deleteCard, readDeck } from "../utils/api/index";

function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId]);

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  function deckDeleteHandler(deckId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmed) {
      deleteDeck(deckId);
      history.push("/");
    }
  }

  function cardDeleteHandler(cardId) {
    const confirmed = window.confirm(
      "Delete this card? You will not be able to recover it."
    );

    if (confirmed) {
      deleteCard(cardId);
      window.location.reload(false);
    }
  }

  const cardList = deck.cards.map((card) => {
    return (
      <div className="card w-100" key={card.id}>
        <div className="card-body">
          <h5 className="card-title">{card.name}</h5>
          <h6 className="text-muted">Front</h6>
          <p className="card-text w-40">{card.front}</p>
          <hr />
          <h6 className="text-muted">Back</h6>
          <p className="card-text w-40">{card.back}</p>
          <div className="d-flex flex-row-reverse">
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <button className="btn  btn-secondary" type="button">
                Edit
              </button>
            </Link>
            <button
              className="btn  btn-secondary"
              type="button"
              onClick={() => cardDeleteHandler(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`}>
              <button className="btn  btn-secondary" type="button">
                Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary" type="button">
                Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button className="btn btn-primary" type="button">
                Add Cards
              </button>
            </Link>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => deckDeleteHandler(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3>Cards</h3>
        <div>{cardList}</div>
      </div>
    </>
  );
}

export default ViewDeck;
