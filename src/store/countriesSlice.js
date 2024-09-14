import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  selectedCountries: [],
  loading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    selectCountry: (state, action) => {
      state.selectedCountries.push(action.payload);
    },
    unSelectCountry: (state, action) => {
      state.selectedCountries = state.selectedCountries.filter(
        (country) => country.cca2 !== action.payload
      );
    },
  },
});

export default countriesSlice.reducer;
export const {
  setCountries,
  setLoading,
  setError,
  selectCountry,
  unSelectCountry,
} = countriesSlice.actions;
