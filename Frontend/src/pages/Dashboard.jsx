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
    fetch(`https://online-project-management-back.onrender.com/api/dash`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data.data);
      });
  }, []);

  return (
    <DashboardNavWrapper>
      <div className="dashboard ">
        <div className="horizontal-overview flex">
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
            cardTitle="Clouser Delay"
            cardValue={card.project_status_count.Canceled}
          />
          <OverviewCard
            cardTitle="Cancelled"
            cardValue={card.project_status_count.Canceled}
          />
        </div>
        <p className="department-wise-to m-3">
          Department wise- Total & Closed
        </p>
        <div className="graph-box p-4 mb-14">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={150}
              height={130}
              data={card.deparmentwise_project_status}
              margin={{
                top: 15,
                right: 10,
                left:0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_projects" fill="#3153a3" minPointSize={1}>
                {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
              </Bar>
              <Bar dataKey="closed_projects" fill="#2ab544" minPointSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardNavWrapper>
  );
}

export default Dashboard;
