import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function HeroSection() {
  const { selectedCountries } = useSelector((state) => state.selectedCountries);

  const countryChunks = chunkArray(selectedCountries, 4);

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {countryChunks.map((chunk, index) => (
          <div key={index} className="flex justify-between p-4">
            {chunk.map((country) => (
              <div key={country.cca2} className="flex flex-col items-center">
                <h2 className="text-lg font-bold">{country.name}</h2>
                <img src={country.flagURL} alt={country.name.common} className="w-32 h-20 object-cover" />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
