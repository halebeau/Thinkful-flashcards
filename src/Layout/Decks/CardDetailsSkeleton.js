import React from "react";
import "./CardDetails.css";

function CardDetailsSkeleton() {
  return (
    <div className='card my-1'>
      <div className='card-body'>
        <div className='card-content'>
          <p className='card-text mx-2 animated-bg animated-bg-text'>&nbsp;</p>
          <p className='card-text mx-2 animated-bg animated-bg-text'>&nbsp;</p>
        </div>
        <div className='card-buttons'>
          <button className='btn btn-secondary disabled'>
            <i className='bi bi-pencil-fill'></i> Edit
          </button>
          <button className='btn btn-danger delete-deck disabled'>
            <i className='bi bi-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetailsSkeleton;
