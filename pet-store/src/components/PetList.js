import React, { useState } from "react";
import styled from "styled-components";
import PetUpdatePopup from "./PetUpdatePopup";

const PetsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
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

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
`;

const PetList = (props) => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const imageURL = props.pets.photoUrls.filter(url => url && (url.startsWith('http://') || url.startsWith('https://')));

  const handleUpdateClick = () => {
    setShowUpdatePopup(true);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDeleteConfirmation = () => {
    // Perform delete action here
    fetch(`https://petstore.swagger.io/v2/pet/${props.pets.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      // Handle response status, for example:
      if (response.ok) {
        console.log('Pet deleted successfully'); 
        window.location.reload();
        // Additional logic after successful deletion, if needed
      } else {
        console.error('Failed to delete pet');
      }
    })
    .catch(error => {
      console.error('Error occurred while deleting pet:', error);
    })
    .finally(() => {
      setShowDeletePopup(false);
    });
  };

  return (
    <div>
      <PetsDiv>
        <CoverImage src="./Pet.png" />
        <PetsName> ID: {props.pets.id}</PetsName>
        <PetsName> Name: {props.pets.name}</PetsName>
        <PetsName> Status: {props.pets.status}</PetsName>
        <ActionButtons>
          <Button bgColor="grey" onClick={handleUpdateClick}>Update</Button>
          <Button bgColor="red" onClick={handleDeleteClick}>Delete</Button>
        </ActionButtons>
      </PetsDiv>
      {showUpdatePopup && (
        <PetUpdatePopup
          pet={props.pets}
          onUpdate={() => {
            // Handle update logic here
            setShowUpdatePopup(false);
          }}
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
      {showDeletePopup && (
        <div>
          <p>Are you sure you want to delete?</p>
          <Button bgColor="green" onClick={handleDeleteConfirmation}>Yes</Button>
          <Button bgColor="red" onClick={() => setShowDeletePopup(false)}>No</Button>
        </div>
      )}
    </div>
  );
};

export default PetList;
