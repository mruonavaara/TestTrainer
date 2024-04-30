import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import _ from "lodash";

function StatisticsPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data._embedded.trainings))
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const calculateActivityDuration = () => {
    const groupedByActivity = _.groupBy(trainings, "activity");
    const activityDuration = [];

    for (const activity in groupedByActivity) {
      const totalDuration = _.sumBy(groupedByActivity[activity], "duration");
      activityDuration.push({ activity, totalDuration });
    }

    return activityDuration;
  };

  return (
    <div style={{ textAlign: "center", width: '100vw', height: '100vw' }}>
      <h2 style={{ color: 'black' }}>Activity Duration Statistics</h2>
      <BarChart width={800} height={400} data={calculateActivityDuration()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalDuration" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default StatisticsPage;