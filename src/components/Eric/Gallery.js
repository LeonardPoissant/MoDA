import React from 'react';
import styled, {keyframes} from 'styled-components';

const Gallery = () => {
  return (
    <Wrapper>
      <ArtDiv>
        <Art>LOL</Art>
        <Art>LOL</Art>
        <Art>LOL</Art>
        <Art>LOL</Art>
        <Art>LOL</Art>
        <Art>LOL</Art>
      </ArtDiv>
      <NavigationDiv>
        <Exit>Exit</Exit>
        <NextRoom>NEXT ROOM</NextRoom>
      </NavigationDiv>
    </Wrapper>
  )
}

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`

const Art = styled.div`
  border: 3px solid black;
  width: 200px;
  height: 200px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    animation: ${shake} 0.5s;
    animation-iteration-count: infinite;
  }
`

const NextRoom = styled.div`
  position: absolute;
  color: orange;
  bottom: 0px;
  right: 0px;
  height: 400px;
  width: 100px;
  border-top:3px solid black;
  border-left:3px solid black;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: red;
  }
`

const Exit = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 400px;
  width: 100px;
  color: orange;
  background-color: orange;
  border-top:3px solid black;
  border-right:3px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: red;
  }
`

const NavigationDiv = styled.div`

`

const ArtDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr 1fr;
  background-color: blue;
  height: 500px;
  width: 800px;
  align-items: center;
  justify-items: center;
  border: 3px solid black;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Gallery