import React,{useState} from "react"
import styled from "styled-components"
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

const UpdateButton = styled.button`
  background-color: grey;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const PetList = (props) => {
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const imageURL = props.pets.photoUrls.filter(url => url && (url.startsWith('http://') || url.startsWith('https://')));

    const handleUpdateClick = () => {
        setShowUpdatePopup(true);
      };
    return (
        <div>
            <PetsDiv>
                {/* {imageURL[0] !== undefined ? (
                    <CoverImage src={imageURL[0]} />
                ) : (
                    "Image Not Available"
                )} */}
                <CoverImage src="./Pet.png" />
                <PetsName> ID: {props.pets.id}</PetsName>
                <PetsName> Name: {props.pets.name}</PetsName>
                <PetsName> Status: {props.pets.status}</PetsName>
                <UpdateButton onClick={handleUpdateClick}>Update</UpdateButton>

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
        </div>
    );

}

export default PetList;
