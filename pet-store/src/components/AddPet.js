import React from "react"
import styled from "styled-components"

const Container = styled.div`
display: flex,
flex-direction:column;
`;
const PetsDiv = styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:80px;
align-items:right
cursor:pointer;
`
const CoverImage = styled.img`
height:362px;
object-fit:cover; 
`
const PetsName = styled.span`
font-size:18px;
font-weight:600;
color:black;
margin: 15px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
`
const SearchBox = styled.div`
display:flex;
flex-direction:row;
padding: 10px 10px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50%;
align-items:center;
`

const SearchIcon = styled.img`
width:30px;
height:30px;
`
const AddButton = styled.button`
width:50px;
height:50px;
`

const AddPet = (props) => {
    function addNewPet(){
        
    }
    return (
        <PetsDiv>
            {/* <SearchBox > */}
                <AddButton onClick={addNewPet}> <SearchIcon src="/Add.png"></SearchIcon></AddButton>
               
                {/* <SearchInput placeholder="Search Movie" value={searchQuery} onChange={onTextChange}></SearchInput> */}
            {/* </SearchBox> */}
        </PetsDiv>
    )
}

export default AddPet;