import React, { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const { path } = useRouteMatch(); //get our current path for nav
  const newDeckTemplate = {
    //new deck template
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(newDeckTemplate); //default new deck state var
  const history = useHistory();

  const handleFormChange = (event) => {
    setNewDeck({
      ...newDeck,
      [event.target.id]: event.target.value,
    }); //create a controlled input
  };

  function onSubmitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    async function createTheDeck() {
      //create deck with call to api with createDeck function
      try {
        const newDeckInfo = await createDeck(newDeck, abortController.signal); // data from the new deck we create
        history.push(`/decks/${newDeckInfo.id}`); //push our user to the url of the newly created deck
      } catch (err) {
        console.log(err, "Creating a new deck failed");
      }
    }
    createTheDeck();
    return () => abortController.abort();
  }

  return (
    <React.Fragment>
      <p className="card" style={{ backgroundColor: "lightgray" }}>
        <span>
          <Link to="/">Home</Link> /<Link to={path}> Create Deck</Link>
        </span>
      </p>
      <h1>Create Deck</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          style={{ width: "100%" }}
          placeholder="Deck Name"
          value={newDeck.name}
          onChange={handleFormChange} //create controlled input
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="textarea"
          id="description"
          name="description"
          style={{ width: "100%" }}
          placeholder="Brief description of the deck"
          value={newDeck.description}
          onChange={handleFormChange} //create controlled input
        />
        <br />
        <br />
        <Link to="/">
          <button type="submit" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;
