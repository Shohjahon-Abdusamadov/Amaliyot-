import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountries:
    JSON.parse(localStorage.getItem("selectedCountries")) || [],
  loading: false,
  error: null,
};

const saveToLocalStorage = (countries) => {
  localStorage.setItem("selectedCountries", JSON.stringify(countries));
};

const selectedCountriesSlice = createSlice({
  name: "selectedCountries",
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountries.push(action.payload);
      saveToLocalStorage(state.selectedCountries);
    },
    unSelectCountry: (state, action) => {
      state.selectedCountries = state.selectedCountries.filter(
        (country) => country.cca2 !== action.payload
      );
      saveToLocalStorage(state.selectedCountries);
    },
  },
});

export default selectedCountriesSlice.reducer;
export const { selectCountry, unSelectCountry } =
  selectedCountriesSlice.actions;
