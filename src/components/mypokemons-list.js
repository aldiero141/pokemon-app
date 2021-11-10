
import React , { useState, useEffect } from 'react';
import styled from "@emotion/styled"  
import MyPokemon from '../components/mypokemon';
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  background-color: transparent
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 10em 10em 10em 10em;
  gap: 2em; 
  align-items: center;
  justify-content: center;
  max-width: 900px;
  margin: auto;
  background-color: white;
  
  @media (max-width: 768px) {
    grid-template-columns: 10em;
  }
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2em;
    font-weight: bolder;
    margin: 2em 0;
`;

export const MyPokemons = () => {
  const [ myPokemons, setMyPokemon ] = useState([]);
  const myPokemonCollectionRef = collection(db, "my-pokemon");
  
  useEffect(() => {
    const getMyPokemons = async () => {
      // const data = await getDocs(myPokemonCollectionRef);
      onSnapshot(myPokemonCollectionRef, (data) => {
        setMyPokemon(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
      });
    }
    getMyPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
    <>
      <Wrapper>
        <Title>My Pokemons</Title>
        <Container>
          {myPokemons && myPokemons.filter(pokemon => pokemon.name !== '').map(pokemon => <MyPokemon key={pokemon.id} pokemon={pokemon}/>)}
        </Container>
        </Wrapper>
    </>
  )
}

export default MyPokemons;



