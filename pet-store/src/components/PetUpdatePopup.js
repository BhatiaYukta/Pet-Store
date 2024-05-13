import React, { useState } from "react";
import styled from "styled-components";

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: grey;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height:100%
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

const UpdateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const SuccessMessage = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  color:black
  padding: 10px 20px;
  border-radius: 6px;
`;

const PetUpdatePopup = ({ pet, onUpdate, onClose }) => {
    const [name, setName] = useState(pet.name);
    const [status, setStatus] = useState(pet.status);
    const [photoUrls, setPhotoUrls] = useState(pet.photoUrls.join(", "));
    const [showSuccessMessage, setShowSuccessMessage] = useState("");

    const handleUpdate = () => {
        const updatedPet = {
            id: pet.id,
            name: name,
            photoUrls: photoUrls.split(",").map(url => url.trim()),
            status: status
        };
        onUpdate(updatedPet);

        fetch("https://petstore.swagger.io/v2/pet", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPet)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Pet Updated Successfully:', data);
                setShowSuccessMessage("Pet Updated Successfully");
            
                setTimeout(() => {
               
                    setShowSuccessMessage("");
                }, 5000);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
    };
  

    return (
        <Popup>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <br></br>

            <br></br>
            <InputLabel>
                Name:
                <InputField
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputLabel>
            <InputLabel>
                Status:
                <InputField
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
            </InputLabel>
            
                <SuccessMessage>{showSuccessMessage}</SuccessMessage>
            
            <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
           
            <br></br>
        </Popup>
    );
};

export default PetUpdatePopup;
