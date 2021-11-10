import React , { useState, useEffect } from 'react';
import styled from "@emotion/styled"
import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import success_icon from '../img/success-icon.svg';
import failed_icon from '../img/failed-icon.png';

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
    width: 450px;
    height: 400px;
    padding: 25px;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 3;

    @media (max-width: 768px) {
        width: 300px;
        height: 300px;
    }
`;
const ClosedButton = styled.div`
    position: relative;
    top: -1em;
    right: -14.5em;
    button{
        background: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 1em;
        z-index: 10;
    } 

    @media (max-width: 768px) {
        top: -1em;
        right: -9.5em;
    }
`;

const Success = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin: auto;
    h1{
        font-size: 2em;
        padding: 0;
        margin-bottom 1em;
        line-height: 0.5em;
        text-align: center;
    }
    p{
        font-size: 1em;
        line-height: 0.5em;
        text-align: center;
    }
    input{
        border: 1px solid #ccc ;
        border-radius: 0.5em;
        padding: 0.5em 4em;
        text-align: center;
    }
    img{
        width: 4em;
        margin: auto;
    }
    
    @media (max-width: 768px) {
        gap: 0.5em;

        input{
            border: 1px solid #ccc ;
            border-radius: 0.5em;
            padding: 0.5em 2em;
            text-align: center;
            font-size: 0.85em;
        }
        p{
            font-size: 0.85em;
        }
        h1{
            font-size: 1em
        }
        img{
            width: 4em;
            margin: auto;
        }
    }
`;

const Failed = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin: 1.5em auto auto auto;
    h1{
        font-size: 2em;
        padding: 0;
        margin-bottom 1em;
        line-height: 0.5em;
    }
    p{
        font-size: 1em;
        line-height: 0.5em;
    }
    input{
        border: 1px solid #ccc ;
        border-radius: 0.5em;
        padding: 0.5em 4em;
        text-align: center;
    }
    img{
        width: 8em;
        margin: auto;
    }
    
    @media (max-width: 768px) {
        img{
            width: 4em;
            margin: auto;
        }
    }
`;

const ConfirmButton = styled.button`
    background: none;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 8em;
    border-radius: 0.5em;
    z-index: 10;
    @media (max-width: 768px) {
        padding: 0.5em 4em;
        font-size: 0.85em;
    }
`;

const Error = styled.p`
    color: red;
    font-size: 1em;
    @media (max-width: 768px) {
        font-size: 0.85em;
`;


export function CaptureModal( {image,  pokemon, setShowModal, showModal, captured} ) {
    const myPokemonCollectionRef = collection(db, "my-pokemon");
    const [ newName, setNewName ] = useState("");
    const [ myPokemons, setMyPokemon ] = useState([]);
    const [ showError, setShowError ] = useState(false);
   

    const onCreateMyPokemon = async () => {
        await addDoc(myPokemonCollectionRef, { name: newName, pokemonName: pokemon.name, image: image});
        window.location.reload(false);
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      
    const createMyPokemon = async () => {
        let valid = true;
        myPokemons.map(pokemon => pokemon.name === capitalizeFirstLetter(newName) ? valid=false : null);
        if (valid) {
            onCreateMyPokemon();
            setShowModal(prev => !prev);
        }else{
            setShowError(true);
        }
    }

    useEffect(() => {
        const getMyPokemons = async () => {
            const data = await getDocs(myPokemonCollectionRef);
            setMyPokemon(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
        }
        getMyPokemons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
        {showModal ? (
                <ModalBackground>
                    <ModalContainer>
                        
                        { captured ?
                            <Success>
                                <h1>Pokemon Captured!</h1>
                                <img src={success_icon} alt={"success-icon"} />
                                <p>Please name your new Pokemon</p>
                                <input placeholder="Type Name Here" onChange={(event) => {setNewName(event.target.value);}}/>
                                {showError ? <Error>Name already taken...</Error>: null }
                                <ConfirmButton onClick={createMyPokemon}>Confirm</ConfirmButton>
                            </Success> : 
                            <>
                                <ClosedButton >
                                    <button onClick={() => setShowModal(prev => !prev)}>        
                                        X   
                                    </button>    
                                </ClosedButton>
                                <Failed>
                                    <h1>Captured Failed!</h1>
                                    <img src={failed_icon} alt={"failed-icon"} />
                                    <p>Try again next time...</p>
                                </Failed>
                            </> }
                    </ModalContainer>
                </ModalBackground>
            ) 
            : null}
        {}
        </>
    )
}