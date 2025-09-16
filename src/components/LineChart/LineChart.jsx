// import React, { useEffect, useState } from 'react'
// import Chart from 'react-google-charts'

// const LineChart = (historicalData) => {

// const [data, setData]=useState([["Date","Prices"]])

// useEffect(()=>{
//   let dataCopy=[["Date","Prices"]];
//   if(historicalData.prices){
//     historicalData.prices.map((item)=>{
//         dataCopy.push([`${new Date(item[0]).toLocaleDateString().
//             slice(0,-5)
//         }`,item[1]])
//     })
//     setData(dataCopy);
//   }
// },[historicalData])

//   return (
//     <Chart
//      chartType='LineChart'
//      data={data}
//      height="100%"
//      legendToggle
//     />
//   )
// }

// export default LineChart


import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      const dataCopy = [["Date", "Prices"]];
      historicalData.prices.forEach((item) => {
        dataCopy.push([new Date(item[0]), item[1]]); // ✅ use Date object, not string
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="400px"
      legendToggle
      options={{
        hAxis: { title: "Date" },
        vAxis: { title: "Price" },
        curveType: "function",
        legend: { position: "bottom" },
      }}
    />
  );
};

export default LineChart;
