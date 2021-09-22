   import React from "react";
   import { useHistory, Link } from "react-router-dom";
   import { deleteDeck } from "../utils/api/index";

function Deck({ deck }) {
   const history = useHistory();

   function deleteHandler(deckId) {
      const confirmed = window.confirm(
         "Are you sure you want to delete this deck?"
      );

      if (confirmed) {
         deleteDeck(deckId);
         history.push("/");
         window.location.reload(false);
      }
   }

   return (
      <div>
         <div className="card w-75">
         <div className="card-body">
            <h5 className="card-title" key={deck.id}>
               {deck.name}
            </h5>
            <p>{deck.cards.length} cards</p>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}`}>
               <button className="btn  btn-secondary" type="button">
               View
               </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
               <button className="btn btn-primary" type="button">
               Study
               </button>
            </Link>
            <button
               className="btn btn-danger"
               type="button"
               onClick={() => deleteHandler(deck.id)}
            >
               Delete
            </button>
         </div>
         </div>
      </div>
   );
}

   export default Deck;
