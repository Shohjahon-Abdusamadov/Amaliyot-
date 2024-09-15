export const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ],
  datasets: [
    {
      label: "2023",
      data: [0, 10, 10.5, 20, 30, 40, 50, 60],
      fill: true,
      tension: 0.2,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "2024",
      data: [50, 30, 40.5, 20, 50, 30, 10, 50],
      fill: true,
      tension: 0.2,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart Example",
    },
  },
};
