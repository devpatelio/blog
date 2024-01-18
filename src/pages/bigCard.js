import React, { useState } from "react";
import "./bigCard.css";


function bigCardStyle() {

  return (
    <div className="main">
    <div class="card-container">
    <div class="card">
      <img src="https://placekitten.com/300/200" alt="Card Image"></img>
      <div class="card-content">
        <div class="card-title">Title 1</div>
        <div class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
    </div>

    <div class="card">
      <img src="https://placekitten.com/300/201" alt="Card Image"></img>
      <div class="card-content">
        <div class="card-title">Title 2</div>
        <div class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
    </div>
    </div>
</div>
  );
}

export default bigCardStyle;
