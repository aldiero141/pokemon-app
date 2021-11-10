import React from 'react';
import styled from "@emotion/styled"
import { db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

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
  button{
    font-size: 0.875em;
    font-weight: 500;
    text-transform: capitalize;
    padding: 0.5em 5em;
    margin: 0;
    background-color: #2b65c2;
    color: #fff;
    text-align: center;
    border: none;
  }
  button:hover, button:active{
    background-color: #ff0000;
    cursor:pointer;
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

export function myPokemon({ pokemon }) {

  const deleteMyPokemon = async (id) => {
    const myPokemonDoc = doc(db, "my-pokemon", id);
    await deleteDoc(myPokemonDoc);
  };
  
  return (
    <>
      <Wrapper>
        <Detail>
          <h1>
            {pokemon.pokemonName}
          </h1>
        </Detail>
        <Image src={pokemon.image} alt={pokemon.name} />
        <TextWrapper> 
        <Detail>
          <p>
              {pokemon.name}
          </p>
        </Detail>
        <Detail>
          <button onClick={ () => deleteMyPokemon(pokemon.id)}>Release</button>
        </Detail>
        </TextWrapper>
      </Wrapper>
    </>
  )
}
export default myPokemon;