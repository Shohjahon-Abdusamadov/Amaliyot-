import { useEffect, useState } from "react";

import HeroSection from "../components/HeroSection";

import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  Drawer,
  Button,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setCountries, setLoading, setError } from "../store/countriesSlice";
import {
  selectCountry,
  unSelectCountry,
} from "../store/selectedCountriesSlice";
import CustomPagination from "../components/pagination/CustomPagination";
import { Link } from "react-router-dom";

const customTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 border-blue-700",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body border-blue-700",
    cell: {
      base: "border-blue-700 px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-blue-50 even:bg-blue-200 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};

export default function Countries() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  const { countries, loading } = useSelector((store) => store.countries);

  const { selectedCountries } = useSelector((store) => store.selectedCountries);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCountries() {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error("Error fetching countries");
        }
        const fetchedCountries = await response.json();
        dispatch(setCountries(fetchedCountries));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchCountries();
  }, []);

  function handleSelectCountry(country, selected) {
    const selectedCountry = {
      cca2: country.cca2,
      name: country.name.common,
      population: country.population,
      flagURL: country.flags.png,
    };

    if (selected) {
      dispatch(unSelectCountry(country.cca2));
    } else {
      dispatch(selectCountry(selectedCountry));
    }
  }

  function isCountrySelected(cca2) {
    const selected = selectedCountries.some((country) => country.cca2 === cca2);
    return selected;
  }

  return (
    <div>
      <Drawer open={false}>
        <Drawer.Items>Drawer item</Drawer.Items>
      </Drawer>

      <HeroSection />

      {loading ?? <div>LOADING...</div>}

      <div className="max-w-[1140px] mx-auto mt-4">
        <Table striped theme={customTheme}>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Population</TableHeadCell>
            <TableHeadCell>Capital</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Select</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {countries.map((country) => {
              const selected = isCountrySelected(country.cca2);
              return (
                <Table.Row
                  key={country.cca2}
                  className="bg-white dark:border-gray-800 border-blue-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/country/${country.cca2}`}>{country.name.common}</Link>
                  </Table.Cell>
                  <Table.Cell>{country.population}</Table.Cell>
                  <Table.Cell>{country.capital}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={selected ? "success" : "gray"}
                      onClick={() => handleSelectCountry(country, selected)}
                    >
                      {selected ? "unselect" : "select"}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </TableBody>
        </Table>

        <div className="p-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={100}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
