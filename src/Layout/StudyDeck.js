import React, { useState, useEffect, useCallback } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, useHistory, useRouteMatch, Link } from "react-router-dom";




function StudyDeck() {
  const { deckId } = useParams();
  const { path } = useRouteMatch();
  const [deck, setDeck] = useState({ cards: [] });
  const [cardCounter, setCardCounter] = useState(0);
  const [frontSide, setFrontSide] = useState(true); //starting cards on the front side of the card
  const [lastCard, setLastCard] = useState(false);

  const history = useHistory();
  const callRead = useCallback( readTheDeck, [deckId]);

  async function readTheDeck(abortController) {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (err) {
      console.log(err, "Failure reading deck");
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    setLastCard(false);
    callRead(abortController);
    return () => abortController.abort();
  }, [callRead]);

  useEffect(() => {
    function restartDeck() {
      console.log("restartDeck: ", cardCounter, frontSide);
      if (lastCard && frontSide) {
        window.confirm("Would you like to restart deck?")
          ? setCardCounter(0) //set our index of cards back at the beginning
          : history.push("/"); //if not, send us to home page
        setLastCard(false);

      }
    }
    restartDeck();
  }, [cardCounter, frontSide, history, lastCard]);

  const onClickFlipHandler = () => {
    setFrontSide(!frontSide); //toggle front to back, or back to front
    // if (cardCounter === deck.cards.length) setRestart(!restart);
  };

  const onClickNextCardHandler = () => {
    setFrontSide(true); //starting on front side of next card
    if (cardCounter < deck.cards.length - 1)
      setCardCounter((cardCount) => cardCounter + 1); //if we're on the backside, we move on to next card so increase card counter
    if (cardCounter === deck.cards.length - 1) {
      setLastCard(true);
    }
    console.log(cardCounter);
  };

  return (
    <React.Fragment>
      <p className="card" style={{ backgroundColor: "lightgray" }}>
        <span>
          <Link to="/">Home</Link> /
          <Link to={path}> Study {deck.name}</Link>
        </span>
      </p>
      <h1>{deck.name}</h1>
      {deck && deck.cards.length < 2 ? (
        <h5>Not enough cards.</h5>
      ) : (
        <div className="card" style={{ width: "80%" }}>
          <h3>
            Card {cardCounter + 1} of {deck.cards.length}
          </h3>
          <p>
            {deck.cards && frontSide
              ? deck.cards[cardCounter].front
              : deck.cards[cardCounter].back}
          </p>
          <button
            className="btn btn-secondary"
            type="button"
            style={{ width: "12%" }}
            onClick={onClickFlipHandler}
          >
            Flip
          </button>
          {!frontSide && (
            <button
              className="btn btn-primary"
              type="button"
              style={{ width: "12%" }}
              onClick={onClickNextCardHandler}
            >
              Next
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default StudyDeck;
