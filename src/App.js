import React , { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from "./components/header.js";
import PokemonsList from "./components/pokemons-list";
import MyPokemonsList from "./components/mypokemons-list";
import { Global, css } from "@emotion/react";
import normalize from "normalize.css";
import img from './img/pokemon-bg.jpg';

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app/'
  });

  const [ menu, setMenu ] = useState(0);
  
  let page;
  if (menu === 0) 
    {
      page = <PokemonsList />
    }else{
      page = <MyPokemonsList />
    }

  return (
    <ApolloProvider client={client}>
      <Global styles={css`
          ${normalize}
          body {
            background-image: url(${img});
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size:cover;
            font-family: Poppins;
          }
        `}
      />
      <Header setMenu={setMenu} menu={menu}/>
      {page}
    </ApolloProvider>
  );
}

export default App;
