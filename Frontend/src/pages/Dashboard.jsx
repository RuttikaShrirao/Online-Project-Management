import React, { PureComponent, useState } from "react";
import { useEffect } from "react";
import "../index.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import DashboardNavWrapper from "../components/DashboardNavWrapper";
import OverviewCard from "../components/OverviewCard";

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#3153a3" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

function Dashboard() {
  const [card, setCard] = useState({
    project_status_count: {},
    deparmentwise_project_status: {},
  });

  useEffect(() => {
    fetch(`http://localhost:7000/api/dash`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data.data);
      });
  }, []);
  console.log(card,"----")

  return (
    <DashboardNavWrapper>
      <div className="flex justify-center absolute top-28 px-14 shrink">
        <OverviewCard
          cardTitle="Total Project"
          cardValue={card.total_project_count}
        />
        <OverviewCard
          cardTitle="closed"
          cardValue={card.project_status_count.closed}
        />
        <OverviewCard
          cardTitle="Running"
          cardValue={card.project_status_count.Running}
        />
        <OverviewCard
          cardTitle="Cancelled"
          cardValue={card.project_status_count.Canceled}
        />
      </div>
      <p
        className="font-medium"
        style={{ position: "absolute", top: "37%", left: "8%" }}
      >
        Department wise- Total & Closed
      </p>
      <div
        className="p-6"
        style={{
          width: "40rem",
          height: "50%",
          backgroundColor: "white",
          position: "absolute",
          bottom: "5%",
          left: "9%",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={150}
            height={130}
            data={card.deparmentwise_project_status}
            margin={{
              top: 35,
              right: 30
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_projects" fill="#3153a3" minPointSize={1}>
              <LabelList dataKey="name" content={renderCustomizedLabel} />
            </Bar>
            <Bar dataKey="closed_projects" fill="#2ab544" minPointSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardNavWrapper>
  );
}

export default Dashboard;
