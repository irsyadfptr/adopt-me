import { QueryFunction } from "@tanstack/react-query";
import { Animal, PetAPIResponse } from "../APIResponseTypes";

const fetchSearch: QueryFunction<
  PetAPIResponse,
  ["search", { location: string; animal: Animal; breed: string }]
> = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];
  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `Error fetching search results for ${animal} in ${location}`
    );
  }

  return apiRes.json();
};

export default fetchSearch;
