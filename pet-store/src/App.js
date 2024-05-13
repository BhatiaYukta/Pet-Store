import React, { useState, useEffect } from "react"
import styled from "styled-components"

import PetList from "./components/PetList";
import AddPet from "./components/AddPet";
import Signup from "./components/SignUp";
const Container = styled.div`
display: flex,
flex-direction:column;
`;
const Header = styled.div`
display:flex;
flex-direction: row;
background-color: white;
color: black;
padding: 15px;
font-size:27px;
font-weight:bold;
box-shadow: 0 3px 6px 0 #555;
justify-content:space-between;
align-items:center;
`
const AppName = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`
const PetSoreImage = styled.img`
width:90px;
height:60px;
margin:15px;
`
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;



const App = () => {
  const [petsInfo, setPetsInfo] = useState([])


  useEffect(() => {
    fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=available")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]["name"]);
        setPetsInfo(data)
      });
  }, [])

  const uniqueNames = {};

  // Filter out duplicates based on the "name" property
  const uniqueData = petsInfo.reduce((acc, current) => {
    // Check if the name is already in the uniqueNames object
    if (!uniqueNames[current.id]) {
      // If not, add it to the uniqueNames object and push it to the accumulator array
      uniqueNames[current.id] = true;
      acc.push(current);
    }
    return acc;
  }, []);
  return (
    <Container>
      <Header>
        <AppName>
          <PetSoreImage src="/image.png"></PetSoreImage>
          Pet Store
        </AppName>
        <Signup/>
      </Header>
      <AddPet />
      <MovieListContainer>
        {uniqueData?.length
          ? uniqueData.map((pets, index) => (<PetList key={index} pets={pets} />)
          ) : <span style={{ color: "black" }}>Loading...</span>}
      </MovieListContainer>
    </Container>
  )
}

export default App;