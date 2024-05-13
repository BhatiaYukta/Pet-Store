import React, { useState } from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  color: black;
  padding: 15px;
  font-size: 27px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  align-items: center;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PetStoreImage = styled.img`
  width: 90px;
  height: 60px;
  margin: 15px;
`;

const SignupButton = styled.button`
  background-color: grey;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const SignupPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const InputLabel = styled.label`
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const SignupSubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Signup = () => {
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSignupButtonClick = () => {
        setShowSignupPopup(true);
    };

    const handleCloseSignupPopup = () => {
        setShowSignupPopup(false);
    };

    const handleSignupSubmit = () => {
        // Construct the formData object
        const formData = {
            id: 0,
            username: username,
            password: password,
            userStatus: 0
        };
    
        // Send the formData to the server using fetch
        fetch("https://petstore.swagger.io/v2/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Signup Successful:", data);
            // Show success message
            alert("Signup Successful!");
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle error
        });
    };

    return (
        <>
            <Header>

                <SignupButton onClick={handleSignupButtonClick}>Signup</SignupButton>
            </Header>
            {showSignupPopup && (
                <SignupPopup>
                    <CloseButton onClick={handleCloseSignupPopup}>Close</CloseButton>
                    <InputLabel>
                        Username:
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
                    <SignupSubmitButton onClick={handleSignupSubmit}>Submit</SignupSubmitButton>
                </SignupPopup>
            )}
        </>
    );
};

export default Signup;
