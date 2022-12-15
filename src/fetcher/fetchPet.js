const fetchPet = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

    if (!apiRes.ok) {
        throw new Error(`Error fetching pet with id ${id}`);
    }

    return apiRes.json();
};

export default fetchPet;