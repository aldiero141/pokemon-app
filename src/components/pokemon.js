import React , { useState, useEffect } from 'react';
import styled from "@emotion/styled"
import PokemonModal from "./pokemon-modal";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10em;
  gap: 1em;
  margin-bottom: 1em;
  align-items: center;
  justify-content: center;
  border: 1px solid #ecd018;
  border-radius: 0.5em;
  overflow: hidden;
  cursor:pointer;
  transition: transform 300ms ease;
  &:hover{
    transform: scale(1.1);
  }
`;

const Detail = styled.div`
  h1{
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
    background-color: #ecd018;
    text-align: center;
    padding: 0.5em 10em;
    margin: 0;
  }
  p{
    font-size: 0.875em;
    font-weight: 500;
    text-transform: capitalize;
    padding: 0.5em 5em;
    margin: 0;
    background-color: #f16820;
    color: #fff;
    text-align: center;
  }
`;

const TextWrapper = styled.div`
  width: 100%
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 6em;
  height: 6em;
`;

export function Pokemon({ pokemon }) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(prev => !prev);
  }

  const [ myPokemons, setMyPokemon ] = useState([]);
  const myPokemonCollectionRef = collection(db, "my-pokemon");
  
  useEffect(() => {
    const getMyPokemons = async () => {
      const data = await getDocs(myPokemonCollectionRef);
      setMyPokemon(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    getMyPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PokemonModal key={pokemon.id} pokemon_name={pokemon.name} pokemon_image={pokemon.image} showModal={showModal} setShowModal={setShowModal} />
      <Wrapper onClick={openModal}>
        <Detail>
            <h1>
              {pokemon.name}
            </h1>
        </Detail>
        <Image src={pokemon.image} alt={pokemon.name} />
        <TextWrapper> 
          <Detail>
                  <p>Owned: {myPokemons.filter(mypokemon => mypokemon.pokemonName === pokemon.name).length}</p>
          </Detail>
        </TextWrapper>
      </Wrapper>
    </>
  )
}

export default Pokemon;