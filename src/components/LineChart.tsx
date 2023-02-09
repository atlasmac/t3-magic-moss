import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { CoreScaleOptions, Scale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type Observation =
  | {
      date: string;
      cfs: number;
      ft: number;
    }[]
  | [];

interface props {
  forecastData: Observation;
  observedData: Observation;
  lastObserved: Observation;
}

const LineChart = ({ forecastData, observedData, lastObserved }: props) => {
  const data = {
    datasets: [
      {
        label: "Observed",
        data: observedData,
        backgroundColor: ["rgb(152, 168, 248)"],
        borderColor: "rgb(152, 168, 248)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.5,
        parsing: {
          xAxisKey: "date",
          yAxisKey: "cfs",
        },
      },
      {
        label: "Current",
        data: lastObserved,
        backgroundColor: ["red"],
        borderColor: "red",
        borderWidth: 1,
        pointRadius: 9,
        pointHoverBorderWidth: 9,
        pointStyle: "star",
        order: 1,
        parsing: {
          xAxisKey: "date",
          yAxisKey: "cfs",
        },
      },
      {
        label: "Forecast",
        data: forecastData,
        backgroundColor: ["rgb(205, 252, 246)"],
        borderColor: "rgb(205, 252, 246)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.5,
        parsing: {
          xAxisKey: "date",
          yAxisKey: "cfs",
        },
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        title: {
          display: true,
          text: "Cubic Feet per Second (cfs)",
          color: "rgb(166, 173, 186)",
          font: {
            size: 26,
            family: "'Roboto Slab', Times, serif",
          },
        },
        labels: {
          color: "rgb(166, 173, 186)", // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 14, // 'size' now within object 'font {}'
          },
        },
      },
      tooltip: {
        intersect: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: 0,
        ticks: {
          color: "rgb(166, 173, 186)",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
      x: {
        ticks: {
          color: "rgb(166, 173, 186)",
          font: {
            size: 12,
          },
          maxTicksLimit: 11,
          maxRotation: 0,
          minRotation: 0,
          callback: function (this: Scale<CoreScaleOptions>, value: any) {
            return this.getLabelForValue(value)
              .split(" ")
              .filter((el, i) => {
                return i === 0 || i === 1;
              })
              .map((el, i) => {
                return i === 1 ? el.split("/")[1] : el;
              })
              .map((el: any) => {
                const strTest = /^[a-zA-Z]+$/;
                if (strTest.test(el)) {
                  return el;
                }
                if (el[0] === "1" && el.length > 1) {
                  return `${el}th`;
                }
                if (el[el.length - 1] === "1") {
                  console.log(el);
                  return `${el}st`;
                } else if (el[el.length - 1] === "2") {
                  return `${el}nd`;
                } else if (el[el.length - 1] === "3") {
                  return `${el}rd`;
                } else {
                  return `${el}th`;
                }
              });
          },
        },
      },
    },
  };

  return (
    <div className="h-[90vh] pt-8 pb-8">
      {observedData && forecastData && <Line data={data} options={options} />}
    </div>
  );
};

export default LineChart;
