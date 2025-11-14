// src/components/DashboardHome.jsx

import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  FaSun,
  FaPhoneAlt,
  FaPlus,
  FaClipboardCheck,
  FaWaveSquare,
  FaAddressBook,
} from "react-icons/fa";

// Dataset included within the same file
const dataset = [
  { month: "Jan", london: 78, paris: 60, newYork: 50, seoul: 45 },
  { month: "Feb", london: 80, paris: 65, newYork: 55, seoul: 50 },
  { month: "Mar", london: 85, paris: 70, newYork: 60, seoul: 55 },
  { month: "Apr", london: 90, paris: 75, newYork: 65, seoul: 60 },
  { month: "May", london: 95, paris: 80, newYork: 70, seoul: 65 },
  { month: "Jun", london: 100, paris: 85, newYork: 75, seoul: 70 },
];

const valueFormatter = (value) => `${value} mm`;

const chartSetting = {
  yAxis: [
    {
      label: "Rainfall (mm)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const stats = [
  {
    icon: <FaSun className="text-lg text-blue-500" />,
    label: "Agent incoming",
    value: 0,
  },
  {
    icon: <FaPhoneAlt className="text-lg text-blue-500" />,
    label: "Total campaign",
    value: 0,
  },
  {
    icon: <FaPlus className="text-lg text-blue-500" />,
    label: "Total Devices",
    value: 0,
  },
  {
    icon: <FaClipboardCheck className="text-lg text-blue-500" />,
    label: "Total task(s)",
    value: 0,
  },
  {
    icon: <FaWaveSquare className="text-lg text-blue-500" />,
    label: "Total flow response(s)",
    value: 0,
  },
  {
    icon: <FaAddressBook className="text-lg text-blue-500" />,
    label: "Total contact(s)",
    value: 0,
  },
];

const DashboardHome = () => {
  return (
    <>
    <div className="p-6 flex justify-between bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Rainfall Statistics
        </h2>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "london", label: "London", valueFormatter },
            { dataKey: "paris", label: "Paris", valueFormatter },
            { dataKey: "newYork", label: "New York", valueFormatter },
            { dataKey: "seoul", label: "Seoul", valueFormatter },
          ]}
          {...chartSetting}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Rainfall Statistics
        </h2>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "london", label: "London", valueFormatter },
            { dataKey: "paris", label: "Paris", valueFormatter },
            { dataKey: "newYork", label: "New York", valueFormatter },
            { dataKey: "seoul", label: "Seoul", valueFormatter },
          ]}
          {...chartSetting}
        />
      </div>
      
    </div>
    <div className="bg-white mt-2 shadow-lg rounded-xl p-6 w-full mx-auto">
      <ul className="space-y-4">
        {stats.map((stat, index) => (
          <li
            key={index}
            className="flex items-center justify-between   bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-500 rounded-full text-lg">{stat.icon}</div>
              <span className="text-lg font-semibold text-gray-700">{stat.label}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default DashboardHome;
