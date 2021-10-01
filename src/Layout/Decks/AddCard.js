import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../../utils/api/index";
import "./AddCard.css";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  //Creates a new card
  async function handleSubmit(card) {
    try {
      await createCard(deckId, card);
      showCardSuccessToast();
    } catch (err) {
      throw err;
    }
  }

  //Returns to deck details screen
  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  function showCardSuccessToast() {
    const toast = document.querySelector(".card-toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='bi bi-house-door-fill'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <div className='card-toast alert alert-success hidden'>Card Added!</div>
      <CardForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
}

export default AddCard;
