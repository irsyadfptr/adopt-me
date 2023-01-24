import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponse } from "../APIResponseTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) {
    return [];
  }

  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error(`Error fetching breeds for ${animal}`);
  }

  return apiRes.json();
};

export default fetchBreedList;
