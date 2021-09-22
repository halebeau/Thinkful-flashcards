import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck({ deck, setDeck }) {
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId, setDeck]);

  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });
  }

  function changeDesc(event) {
    setDeck({ ...deck, description: event.target.value });
  }

  function saveHandler(event) {
    event.preventDefault();
    updateDeck(deck).then((response) => history.push(`/decks/${deck.id}`));
  }

  function handleCancel() {
    history.push(`/decks/${deck.id}`);
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <form>
          <h1>Edit Deck</h1>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <textarea
              type="text"
              className="form-control"
              id="front"
              value={deck.name}
              onChange={changeName}
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="back"
              value={deck.description}
              onChange={changeDesc}
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={saveHandler}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;
