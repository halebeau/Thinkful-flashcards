import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateCard, createCard } from "../utils/api";
import { readCard } from "../utils/api/index";

function AddEditCardForm({ cardId = null }) {
  const { deckId } = useParams();
  const history = useHistory();
  const newCardTemplate = {
    deckId: deckId,
    front: "",
    back: "",
    id: 0,
  };

  const [newCard, setNewCard] = useState(newCardTemplate);

  async function readTheCard(abortController) {
    try {
      if(!cardId) return
      const response = await readCard(cardId, abortController.signal);
      setNewCard(response);
    } catch (err) {
      console.log(err);
    }

  }

  const handleRead = useCallback(readTheCard, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();
    handleRead(abortController);
    return () => abortController.abort();
  }, [cardId, handleRead]);

  const handleFormChange = (event) => {
    setNewCard({
      ...newCard,
      [event.target.id]: event.target.value,
    }); //create a controlled input
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); //prevent page from reloading after form submission'
    if (newCard.front && newCard.back) {
      if (cardId) {
        //if we sent in cardId to update
        const card = {
          ...newCard,
          [event.target.id]: event.target.value,
          deckId: parseInt(deckId),
          id: parseInt(cardId),
        };
        setNewCard(card); //build the card we're updating
        //keep the same id as card we're editing
        try {
          await updateCard(card); //update care
        } catch (err) {
          console.log(err, "Error updating card");
        }
        setNewCard(newCardTemplate);
      } else {
        //if we're not updating then create a brand new card
        setNewCard({
          [event.target.id]: event.target.value,
          deckId: deckId,
        });
        try {
          await createCard(deckId, newCard);
        } catch (err) {
          console.log(err, "Error creating card");
        }
        setNewCard(newCardTemplate);
      }

      history.push(`/decks/${deckId}`);
    }else{
      window.confirm("Form fields cannot be black.");
    }
    // setNewCard(newCardTemplate);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="front">Front</label>
      <br />
      <textarea
        id="front"
        style={{ width: "100%" }}
        placeholder="Front side of card"
        value={newCard.front}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="back">Back</label>
      <br />
      <textarea
        id="back"
        style={{ width: "100%" }}
        placeholder="Back side of card"
        value={newCard.back}
        onChange={handleFormChange}
      />
      <br />
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">
        Done
      </Link>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}

export default AddEditCardForm;
