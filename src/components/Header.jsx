"use client";
import { Link } from "react-router-dom";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountry,
  unSelectCountry,
} from "../store/selectedCountriesSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch();
  const { selectedCountries } = useSelector((state) => state.selectedCountries);

  return (
    <div className="max-w-[1140px] flex justify-between items-center bg-gray-200 mx-auto p-2 px-4 rounded-md mb-2">
      <Link to="/">Header</Link>

      <div>
        <Button onClick={() => setIsOpen(true)}>Selected Countries</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-[500px]" >
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <ul className="flex gap-4 flex-wrap">
            {selectedCountries.length === 0 ? (
              <div>You have not selected any country yet!</div>
            ) : (
              selectedCountries.map((country) => (
                <li key={country.cca2}>
                  {country.name}
                  <img height={200} width={200} src={country.flagURL} alt={country.name.common} />
                </li>
              ))
            )}
          </ul>
        </Drawer.Items>
      </Drawer>
    </div>
  );
}
