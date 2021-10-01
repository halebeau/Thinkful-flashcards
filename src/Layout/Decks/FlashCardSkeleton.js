import React from "react";
import "./FlashCard.css";

function FlashCardSkeleton() {
  return (
    <div className='card my-1 front'>
      <div className='card-body front'>
        <h5 className='card-title animated-bg animated-bg-text'>&nbsp;</h5>
        <p className='card-text front-text animated-bg animated-bg-text'>
          &nbsp;
        </p>
        <button className='btn btn-secondary disabled' disabled>
          Flip
        </button>
      </div>
    </div>
  );
}

export default FlashCardSkeleton;
