import React, { useState } from "react";
import styled from "styled-components";

const Popup = styled.div`
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

const UpdateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const PetUpdatePopup = ({ pet, onUpdate, onClose }) => {
  const [name, setName] = useState(pet.name);
  const [status, setStatus] = useState(pet.status);
  const [photoUrls, setPhotoUrls] = useState(pet.photoUrls.join(", "));

  const handleUpdate = () => {
    const updatedPet = {
      id: pet.id,
      name: name,
      photoUrls: photoUrls.split(",").map(url => url.trim()),
      status: status
    };
    onUpdate(updatedPet);
    console.log("updatePet",updatedPet)
  };

  return (
    <Popup>
      <CloseButton onClick={onClose}>Close</CloseButton>
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
      <InputLabel>
        Photo URLs (comma separated):
        <InputField
          type="text"
          value={photoUrls}
          onChange={(e) => setPhotoUrls(e.target.value)}
        />
      </InputLabel>
      <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
    </Popup>
  );
};

export default PetUpdatePopup;
