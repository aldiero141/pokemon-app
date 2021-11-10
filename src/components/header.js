import React from 'react';
import styled from "@emotion/styled"
import logo from '../img/pokemon-logo.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  align-items: center;
  justify-content: center;
  margin: auto;
  background-color: transparent
`;

const Image = styled.img`
  width: 20em;
  margin: 2em 0 2em 0;
  background-color: white;
  
  @media (max-width: 768px) {
    width: 15em;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: rows;
  align-items: center;
`;

const ButtonMyPokemon = styled.button`
  cursor: pointer;
  background: none;
  background-color: #fff;
  border: 2px solid #2b65c2;
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  color: #2b65c2;

  &:hover{
    background-color: #2b65c2;
    color: #fff;
  }
`;

const ButtonPokemonList = styled.button`
  cursor: pointer;
  background: none;
  background-color: #2b65c2;
  border: 2px solid #2b65c2;
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  color: #fff;

  &:hover{
    background-color: #fff;
    color: #2b65c2;
  }
`;

export function header({ setMenu, menu }) {

  let buttonToggle;
  if (menu === 0) 
    {
      buttonToggle = <ButtonMyPokemon onClick={() => setMenu(menu = 1)}>My Pokemon</ButtonMyPokemon>
    }else{
      buttonToggle = <ButtonPokemonList onClick={() => setMenu(menu = 0)}>Pokemon List</ButtonPokemonList>
    }

  return (
    <Wrapper>
      <Image src={logo} alt={"pokemon-logo"}/>
      <ButtonContainer>
        {buttonToggle}
      </ButtonContainer>
    </Wrapper>
  )
}

export default header;