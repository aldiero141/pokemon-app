import React from 'react';
import styled from "@emotion/styled"
import { useQuery } from '@apollo/react-hooks';
import { GET_DETAILS } from '../graphql/get-details';
import { Details } from './details';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    
`;
const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    width: 500px;
    height: 500px;
    padding: 25px;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 3;
    
    @media (max-width: 768px) {
        width: 300px;
        height: 600px;
    }
`;
const CloseButton = styled.div`
    position: relative;
    top: -2.5em;
    right: -15.5em;
    button{
        background: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 1em;
        z-index: 10;
    } 

    @media (max-width: 768px) {
        top: -3em;
        right: -9.5em;
    }
`;

export const PokemonModal = ({ pokemon_name, pokemon_image, setShowModal, showModal }) => { 
    const gqlVariables = {
        name: pokemon_name,
    };
   
    const { data : { pokemon = [] } = {} } = useQuery(GET_DETAILS, {
        variables: gqlVariables,
    });
    
    return (
        <>
            {showModal ? (
                <ModalBackground>
                    <ModalContainer>
                        <CloseButton >
                            <button onClick={() => setShowModal(prev => !prev)}>        
                                X   
                            </button>    
                        </CloseButton>
                        <Details image={pokemon_image} pokemon={pokemon} />
                    </ModalContainer>
                </ModalBackground>) 
            : null}
        </>
    );
  };

  export default PokemonModal;