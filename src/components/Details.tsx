import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "../fetcher/fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import { lazy, useContext, useState } from "react";
import AdoptedPetContext from "../context/AdoptedPetContext";
import { PetAPIResponse } from "../APIResponseTypes";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("No id is provided");
  }
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // const results = useQuery(["details", id], fetchPet);
  const results = useQuery<PetAPIResponse>(["details", id], fetchPet);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); // eslint-disable-line

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐾</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error("Pet not found");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
