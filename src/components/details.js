import React , { useState } from 'react';
import styled from "@emotion/styled"
import { CaptureModal } from './capture-modal';

const Image = styled.img`
    width: 10em;
    height: 10em;
    border: 1px solid #eb7a34;
    border-radius: 0.5em;
    margin-bottom: 1em;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -2.5em;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: rows;
    gap: 1em;
`;

const Title = styled.div`
    h1{
        font-size: 1.25em;
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
    }
    p{
        font-size: 1.125em;
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
    }    
`;

const Body = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 1em;
    p{
        font-weight: 400;
        font-size: 0.875em;
        background-color: red;
        color: #fff;
        margin-bottom: 1em;
        padding: 0.5em;
        border-radius: 0.5em;
        text-align:center;
        margin:0;
    }
    @media (max-width: 768px) {
        grid-template-columns: auto auto;
    }
`;

const Type = styled.p`
    font-weight: 400;
    font-size: 0.875em;
    text-align: center;
    background-color: green;
    color: #fff;
    margin-bottom: 1em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    margin:0;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: rows;
    margin-top: 2em;
    button{
        padding: 0.5em 11em;
        background-color: #f16820;
        border: none;
        border-radius: 0.5em;
        color: #fff;
        cursor: pointer;
        font-size: 1.125em;
        font-weight: 600;
    }
    button:hover, button:active{
        background-color: #c48741;
    }

    @media (max-width: 768px) {
        button{
            padding: 0.5em 5em;
            background-color: #f16820;
            border: none;
            border-radius: 0.5em;
            color: #fff;
            cursor: pointer;
            font-size: 1.125em;
            font-weight: 600;
        }
    }
`;

export function Details({ image, pokemon }) {
   
    const [showModal, setShowModal] = useState(false);
    const [captured, setCaptured] = useState([false]);

    const openModal = () => {
      setShowModal(prev => !prev);
    }

    const catchPokemon = () => {
        let i = Math.floor(Math.random() * 2);
        if(i<1){
            setCaptured(true);
        }else{  
            setCaptured(false);
        }
        openModal();
    }

    return (
        <>
            <CaptureModal pokemon={pokemon} showModal={showModal} setShowModal={setShowModal} captured={captured} image={image}/>
            <Container>
                <Title>
                    <h1>{pokemon.name}</h1>
                </Title>
                <Image src={image} alt={pokemon.name} />
                <RowContainer> 
                    {pokemon.types && pokemon.types.map(pokemonTypes => <Type>{pokemonTypes.type.name}</Type> )}
                </RowContainer>
                <Title>
                    <p>Moves</p>
                </Title>
                <RowContainer> 
                    <Body>{pokemon.moves && pokemon.moves.slice(0, 8).map(pokemonMoves => <p>{pokemonMoves.move.name}</p> )}</Body>
                </RowContainer>
                <ButtonContainer>
                    <button onClick={catchPokemon}>        
                        Catch 
                    </button>    
                </ButtonContainer>
            </Container>
        </>
        
    )
}