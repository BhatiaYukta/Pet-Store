import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PetsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 80px;
  align-items: right;
  cursor: pointer;
`;

const CoverImage = styled.img`
  height: 362px;
  object-fit: cover; 
`;

const PetsName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const AddButton = styled.button`
  width: 150px; 
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white; 
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

const AddButtonText = styled.span`
  margin-right: 8px; 
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CenteredText = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: black;
`;

const CloseButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const SubmitButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
`;

const SuccessMessage = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: lightgreen;
  padding: 10px 20px;
  border-radius: 6px;
`;

const AddPet = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [petName, setPetName] = useState('');
    const [petID, setPetID] = useState('');
    const [photoUrls, setPhotoUrls] = useState('');
    const [status, setStatus] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddButtonClick = () => {
        setShowPopup(true);
    };

    const handleCloseButtonClick = () => {
        setShowPopup(false);
    };

    const handleSaveButtonClick = () => {
        const petData = {
            id: petID,
            name: petName,
            photoUrls: [photoUrls],
            status: status
        };

        console.log("Pet Data:", petData);

        fetch('https://petstore.swagger.io/v2/pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Show success message
                setShowSuccessMessage(true);
                // Close the popup after 2 seconds
                setTimeout(() => {
                    setShowPopup(false);
                    setShowSuccessMessage(false);
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);

            });
    };

    return (
        <div>
            <PetsDiv>
                <AddButton onClick={handleAddButtonClick}>
                    <AddButtonText>Add New Pet</AddButtonText>
                    <SearchIcon src="/Add.png" />
                </AddButton>
            </PetsDiv>
            {showPopup && (
                <Popup>
                    <CenteredText>Add New Pet</CenteredText>
                    <br />

                    <label>
                        Pet ID:{" "}
                        <input
                            type="text"
                            value={petID}
                            onChange={(e) => setPetID(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />

                    <label>
                        Pet Name:{" "}
                        <input
                            type="text"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Image URL:{" "}
                        <input
                            type="text"
                            value={photoUrls}
                            onChange={(e) => setPhotoUrls(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Status:{" "}
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <SubmitButton onClick={handleSaveButtonClick}>Submit</SubmitButton>
                    <CloseButton onClick={handleCloseButtonClick}>Close</CloseButton>
                </Popup>
            )}
            {showSuccessMessage && (
                <SuccessMessage>Pet added successfully!</SuccessMessage>
            )}
        </div>
    );
};

export default AddPet;
