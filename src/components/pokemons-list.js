import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../graphql/get-pokemons';
import { Pokemon } from '../components/pokemon';
import styled from "@emotion/styled"  


const gqlVariables = {
    limit: 16,
    offset: 1,
};

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

export const PokemonsLists = () => {
  const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  return (
      <Wrapper>
        <Title>Pokemon List</Title>
        <Container>
          {pokemons.results && pokemons.results.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon}/>)}
        </Container>
      </Wrapper>
  )
}

export default PokemonsLists;