import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "../../store/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// 📅 Week calculation
const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();
const day = date.getDate();
const weekday = date.getDay();
const start = new Date(year, month, day - weekday);
const end = moment(start).add(6, "day");

function AttendanceTabs() {
  const [dates, setDates] = useState([]);
  const [datas, setDatas] = useState([]);

  // 🔹 Generate week labels
  useEffect(() => {
    const labels = [];
    for (let i = 0; i < 7; i++) {
      labels.push(moment(start).add(i, "day").format("dd"));
    }
    setDates(labels);
  }, []);

  // 🔹 Fetch weekly attendance (✅ CORRECT API)
  useEffect(() => {
    const formattedDate = moment(start).format("DD-MM-YYYY");

    axios
      .get("/api/attendance/week", {
        params: { date: formattedDate },
      })
      .then((res) => {
        // Expecting [{ value: number }, ...]
        setDatas(res.data.map((e) => e.value));
      })
      .catch((err) => {
        console.error("Attendance API error:", err);
        setDatas([]);
      });
  }, []);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Attendance",
        data: datas,
        backgroundColor: "#051f3e",
        borderColor: "#051f3e",
        borderWidth: 1,
      },
    ],
  };

  // ✅ Chart.js v3+ correct options
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard__attendance content__container">
      <h6 className="mb-5">
        Attendance Report from {moment(start).format("D MMMM YYYY")} to{" "}
        {moment(end).format("D MMMM YYYY")}
      </h6>
      <Bar data={data} options={options} />
    </div>
  );
}

export default AttendanceTabs;
