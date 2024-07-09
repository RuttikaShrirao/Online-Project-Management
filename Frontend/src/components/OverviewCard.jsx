import React from "react";

function OverviewCard({ cardTitle, cardValue }) {
  return (
    <div
      className="h-20 w-48 rounded-md p-2 m-4"
      style={{ backgroundColor: "white", borderLeft: "8px solid #6edaf2" }}
    >
      <h5>{cardTitle}</h5>
      <h1 className="text-4xl font-bold">{cardValue}</h1>
    </div>
  );
}

export default OverviewCard;
