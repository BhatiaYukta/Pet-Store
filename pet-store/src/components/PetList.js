import React from "react"
import styled from "styled-components"


const PetsDiv = styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:280px;
box-shadow:0 3px 10px 0 #aaa;
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

const PetList = (props) => {
   
    const imageURL = props.pets.photoUrls.filter(url => url && (url.startsWith('http://') || url.startsWith('https://')))
    console.log(imageURL[0])
    return (
        <PetsDiv>

            { imageURL[0]!==undefined ? <CoverImage src={imageURL[0]}></CoverImage>: "Image Not Available"}

            <PetsName> Name : {props.pets.name}</PetsName>
            <PetsName> Status: {props.pets.status}</PetsName>
        </PetsDiv>
    )
}

export default PetList;