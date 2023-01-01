import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AdoptedPetContext from "../context/AdoptedPetContext";
import fetchSearch from "../fetcher/fetchSearch";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";
const ANIMAL = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [BREEDS] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["pets", requestParams], fetchSearch);
  const pets = results?.data?.pets || [];

  return (
    <div className="my-0 mx-auto w-11/12">
      {adoptedPet ? (
        <div className="flex w-full p-10 mb-10 rounded-lg bg-gray-200 shadow-lg">
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
          <h2 className="text-2xl text-bold text-center self-center">
            Thanks for adopting {adoptedPet.name} 🐾🐾🐾
          </h2>
        </div>
      ) : null}
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            className="search-input"
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-input"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMAL.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            name="breed"
            className="search-input grayed-out-disabled"
            disabled={!BREEDS.length}
          >
            <option />
            {BREEDS.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
