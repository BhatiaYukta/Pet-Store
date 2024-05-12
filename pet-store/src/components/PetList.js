import React from "react"
import styled from "styled-components"
const MovieDiv = styled.div`
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


const PetList =(props)=>{
    // console.log("props",props["pets"]["photoUrls"][0] && props["pets"]["photoUrls"][0].split(',').filter(url => url && url.includes('.png')))
    // let pngImage= props["pets"]["photoUrls"][0] && props["pets"]["photoUrls"][0].split(',').filter(url => url && url.includes('.png'))
    // console.log("pngImage",pngImage!==undefined && pngImage.length!==0 && if(Array.isArray(pngImage)){ pngImage[0]})
    
    return (
    <MovieDiv>
        {/* <CoverImage>src= {pngImage.length!==0 && pngImage}</CoverImage> */}
    </MovieDiv>
    )
}

export default PetList;