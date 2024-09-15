import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

import { Line } from "react-chartjs-2";
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
import LineChart from "../components/chart/LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SingleCountry() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}`
        );

        if (!response.ok) {
          throw new Error("Fetch country was not ok");
        }

        const [fetchedCountry] = await response.json();
        setCountry(fetchedCountry);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>No country data available</div>;

  return (
    <div className="flex items-center">
      <Card className="max-w-sm grow">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {country.name.common}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Population: {country.population}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Capital: {country.capital}
        </p>
      </Card>

      <div className="grow">
        <LineChart />
      </div>
    </div>
  );
}
