import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block">
      <div className="flex flex-wrap transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
        <img className="rounded-lg" src={hero} alt={name} />
        <div className="absolute bottom-6 px-4 text-xl text-white ">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div> */}
    </Link>
  );
};

export default Pet;
