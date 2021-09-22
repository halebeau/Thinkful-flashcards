import React from "react";

function CardForm({
changeFront,
changeBack,
handleSave,
handleDoneCancel,
cardValueFront,
cardValueBack,
}) {
   
   return (
      <form>
      <div className="mb-3">
         <label className="form-label">Front</label>
         <textarea
            type="text"
            className="form-control"
            id="front"
            placeholder="Front side of the card"
            value={cardValueFront}
            rows="3"
            onChange={changeFront}
         />
      </div>
      <div className="mb-3">
         <label className="form-label">Back</label>
         <textarea
            className="form-control"
            id="back"
            placeholder="Back side of card"
            value={cardValueBack}
            rows="3"
            onChange={changeBack}
         />
      </div>
      <button
         type="done"
         className="btn btn-secondary"
         onClick={handleDoneCancel}
      >
         Done
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSave}>
         Save
      </button>
      </form>
   );
}

export default CardForm;
