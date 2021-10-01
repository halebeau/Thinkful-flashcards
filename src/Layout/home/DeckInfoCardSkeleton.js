import React from "react";
import "./DeckInfoCard.css";

function SkeletonInfoCard() {
  //Unicode for non-breaking space - used in skeleton layout only
  const nbsp = "\u00A0";

  //Skeleton text before loading
  const skeletonText = <p className='animated-bg animated-bg-text'>{nbsp}</p>;

  return (
    <div className='card my-1'>
      <div className='card-body'>
        <div className='deck-card-header'>
          <h5 className='card-title animated-bg animated-bg-text'>{nbsp}</h5>
        </div>
        <div className='card-text'>
          {skeletonText}
          {skeletonText}
        </div>
        <div className='deck-card-buttons'>
          <button
            className='btn btn-secondary disabled'
            aria-disabled={true}
            disabled
          >
            <i className='bi bi-eye-fill'></i> View
          </button>
          <button
            className='btn btn-primary disabled'
            aria-disabled={true}
            disabled
          >
            <i className='bi bi-book'></i> Study
          </button>
          <button
            className='btn btn-danger delete-deck disabled'
            aria-disabled={true}
            disabled
          >
            <i className='bi bi-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkeletonInfoCard;
