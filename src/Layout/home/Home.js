import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckInfoCard from "./DeckInfoCard";
import { listDecks, deleteDeck } from "../../utils/api/index";
import SkeletonInfoCard from "./DeckInfoCardSkeleton";

function Home() {
  const [decks, setDecks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //Loads deck information. Triggers a re-render when they are loaded
  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        let _decks = await listDecks(abortController.signal);
        setDecks(_decks);
        setLoaded(true);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

  //Deletes a deck and triggers a re-render with the deck removed
  async function handleDeleteDeck(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      setDecks(() => decks.filter((deck) => deck.id !== id));
    }
  }

  //Maps decks to JSX elements
  const rows = decks.map((deck) => DeckInfoCard({ ...deck, handleDeleteDeck }));

  //Before loading, add skeleton deck info cards
  if (!loaded) {
    for (let i = 0; i < 3; i++) {
      rows.push(<SkeletonInfoCard key={i + 10} />);
    }
  }

  return (
    <>
      <div className='row'>
        <Link to='/decks/new' className='btn btn-secondary'>
          <i className='bi bi-plus-lg'></i> Create Deck
        </Link>
      </div>
      <div className='row my-4'>{rows}</div>
    </>
  );
}

export default Home;
