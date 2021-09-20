import React, { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const { path } = useRouteMatch();
  const { deckId } = useParams(); //get the current deck's id for input placeholder data
  const [deck, setDeck] = useState({}); //incoming deck

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function readTheDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response); //get current deck information
      } catch (err) {
        console.log(err, "Reading the deck list failed");
      }
    }
    readTheDeck();
    return () => abortController.abort();
  }, [deckId]);

  const onChangeHandler = (event) => {
    setDeck({ ...deck, [event.target.id]: event.target.value }); //set our deck with new information according to form
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submit form");
    async function updateTheDeck() {
      try {
        await updateDeck(deck);
        //what can we use response for?
        history.push(`/decks/${deckId}`); //push our user to the url of the newly created deck
      } catch (err) {
        console.log(err, "Updating the deck failed");
      }
    }
    updateTheDeck();
  };
  return (
    <React.Fragment>
      <p className="card" style={{ backgroundColor: "lightgray" }}>
        <span>
          <Link to="/">Home</Link> /<Link to={`/decks/${deck.id}`}> {deck.name}</Link> / <Link to={path}> Edit Deck</Link>
        </span>
      </p>
      <h1>Edit Deck</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          style={{ width: "100%" }}
          placeholder="Deck Name"
          value={deck.name}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          style={{ width: "100%" }}
          placeholder="Deck description"
          value={deck.description}
          onChange={onChangeHandler}
        />
        <br />
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary" type="button">
            Cancel
          </button>
        </Link>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default EditDeck;
