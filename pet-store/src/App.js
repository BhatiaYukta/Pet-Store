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
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center; 
  
`;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const LoginPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height:70%
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const InputLabel = styled.label`
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const LoginSubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;


const App = () => {
  const [petsInfo, setPetsInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");

  useEffect(() => {
    fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=available")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]["name"]);
        setPetsInfo(data)
      });
  }, []);

  const handleLogin = () => {
    fetch(`https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setIsLoggedIn(true);
          setShowLoginPopup(false);
          setLoggedInUsername(username);
          setUsername("")
          setPassword("")
          alert("Logged In")
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUsername("");
  };

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
      <PetSoreImage src="/image.png" />
        <AppName>
         <b>PET STORE</b>
        
        </AppName>
        {isLoggedIn ? (
          <ButtonContainer>
            <span>Welcome, {loggedInUsername}!</span>
            <button onClick={handleLogout}>Logout</button>
          </ButtonContainer>
        ) : (
          <div>
          <button onClick={() => setShowLoginPopup(true)}>Login</button>
          <Signup/>
          </div>
        )}
      </Header>
      <AddPet />
      <MovieListContainer>
        {uniqueData?.length ? (
          uniqueData.map((pets, index) => <PetList key={index} pets={pets} />)
        ) : (
          <span style={{ color: "black" }}>Loading...</span>
        )}
      </MovieListContainer>

      {showLoginPopup && (
        <LoginPopup>
          <InputLabel>
            Username: {" "}
            <br></br>
            <InputField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputLabel>
          <InputLabel>
            Password:
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputLabel>
          <LoginSubmitButton onClick={handleLogin}>Login</LoginSubmitButton>
        </LoginPopup>
      )}
    </Container>
  );
};


export default App;