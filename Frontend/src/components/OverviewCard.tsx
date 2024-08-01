import React from "react";

function OverviewCard({ cardTitle, cardValue }) {
  return (
    <div
      className="overviewcard  p-2 m-2"
      style={{ borderLeft: "8px solid #0CC9E8" }}
    >
      <p className="total-projects">{cardTitle}</p>
      <h1 className="proj-num">{cardValue}</h1>

    </div>
  );
}

export default OverviewCard;
