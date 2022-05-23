import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import './style.css';
import { Chart as ChartJs, registerables } from 'chart.js';
ChartJs.register(...registerables);

export default function Chart() {
  let initialMaxIndex = 6;
  let expectedIndex = 7;
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(initialMaxIndex);
  const [disableButtonNext, setDisableButtonNext] = useState(false);
  const [disableButtonBack, setDisableButtonBack] = useState(true);

  // setup
  const labels = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  const backgroundColor = [
    'rgba(255, 26, 104, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(0, 0, 0, 0.2)',
  ];

  const borderColor = [
    'rgba(255, 26, 104, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(0, 0, 0, 1)',
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Weekly Sales 1',
        data: [
          18, 12, 6, 9, 12, 3, 9, 11, 10, 4, 9, 12, 3, 9, 1, 12, 5, 9, 1, 3, 2,
        ],
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
      {
        label: 'Weekly Sales 2',
        data: [
          20, 14, 8, 1, 14, 6, 2, 15, 1, 14, 7, 16, 13, 2, 5, 16, 2, 8, 10, 13,
          12,
        ],
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
      {
        label: 'Weekly Sales 3',
        data: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20,
        ],
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
    ],
  };

  const lengthArray = () => {
    let nArr = 0;
    let idx = 0;

    data.datasets.map((array) => {
      nArr += array.data.length;
      idx++;
      return nArr;
    });

    let value = Math.ceil(nArr / idx);

    return value;
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      xAxis: {
        min: minIndex,
        max: maxIndex,
      },
    },
  };

  const handlerClickBack = () => {
    let min = minIndex;
    let max = maxIndex;

    if (maxIndex < initialMaxIndex) {
      setMinIndex(0);
      setMaxIndex(initialMaxIndex);
      setDisableButtonBack(true);
    } else if (maxIndex > initialMaxIndex) {
      setMinIndex(min - expectedIndex);
      setMaxIndex(max - expectedIndex);
      setDisableButtonNext(false);
    }
  };

  const handlerClickNext = () => {
    setDisableButtonBack(false);

    let maxValue = lengthArray();
    let max = maxIndex;

    if (max < maxValue) {
      setMinIndex(max + 1);
      setMaxIndex(max * 2 + 1);
    } else if (max >= maxValue) {
      setMinIndex(maxValue - expectedIndex);
      setMaxIndex(maxValue - 1);
      setDisableButtonNext(true);
      setDisableButtonBack(false);
    }
  };

  return (
    <>
      <div className="chartMenu">
        <p>WWW.CHARTJS3.COM (Chart JS 3.7.1)</p>
      </div>
      <div className="chartCard">
        <button
          disabled={disableButtonBack}
          className="btn"
          onClick={handlerClickBack}
        >
          ←
        </button>
        <div className="chartBox">
          <Line id="ctx" data={data} options={options} />
        </div>
        <button
          disabled={disableButtonNext}
          className="btn"
          onClick={handlerClickNext}
        >
          →
        </button>
      </div>
    </>
  );
}
